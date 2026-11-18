/* Module III layer for the LING285 Study Studio.

   The studio files for Lectures 01 to 18 are locked so that nothing already studied can
   change. Module III (Lecture 19 onward) is kept in ling285/module3/ instead, and this
   script merges it into the course data and into each teaching version as the app loads
   them. Nothing is merged into storage: notes, read marks and practice keep their keys. */
(() => {
  'use strict';
  if (window.LING285_MODULE3_LAYER) return;
  window.LING285_MODULE3_LAYER = true;
  const real = window.fetch.bind(window);
  const base = new URL('module3/', document.baseURI);
  const layerFor = async name => {
    try {
      const response = await real(new URL(name, base), {cache: 'no-cache'});
      return response.ok ? await response.json() : null;
    } catch { return null; }
  };
  const has = (list, id) => list.some(item => item.id === id);
  function mergeData(data, layer) {
    for (const module of layer.modules || []) if (!has(data.modules, module.id)) data.modules.push(module);
    for (const collection of layer.collections || []) {
      if (has(data.collections, collection.id)) continue;
      let lastLecture = -1;
      data.collections.forEach((item, index) => { if (item.role === 'lecture') lastLecture = index; });
      data.collections.splice(lastLecture + 1, 0, collection);
    }
    for (const question of layer.questions || []) if (!has(data.questions, question.id)) data.questions.push(question);
    for (const entry of layer.guide || []) if (!data.guide.some(item => item.title === entry.title)) data.guide.push(entry);
    return data;
  }
  function mergeEdition(payload, layer) {
    payload.collections = {...payload.collections, ...(layer.collections || {})};
    if (layer.availableModules) payload.availableModules = layer.availableModules;
    return payload;
  }
  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input && input.url;
    const match = typeof url === 'string' && !/module3\//.test(url) &&
      url.split('?')[0].match(/^(?:\.\/)?((?:modern\/)?transcripts-[\w.-]+\.json|data\.json)$/);
    if (!match) return real(input, init);
    const [response, layer] = await Promise.all([real(input, init), layerFor(match[1])]);
    if (!response.ok || !layer) return response;
    const body = await response.json();
    const merged = match[1] === 'data.json' ? mergeData(body, layer) : mergeEdition(body, layer);
    return new Response(JSON.stringify(merged), {status: 200, headers: {'Content-Type': 'application/json'}});
  };
})();
