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
    // Lectures kept for the final stay in Module II and are also listed by Module III. Their questions and
    // guide entries are copied for Module III under new ids, so each module keeps its own practice record.
    const kept = new Set((layer.modules || []).flatMap(module => module.carriedLectureIds || []));
    for (const question of [...data.questions]) {
      if (question.moduleId !== 'module2' || !kept.has(question.lectureId) || has(data.questions, question.id + '-m3')) continue;
      data.questions.push({...question, id: question.id + '-m3', moduleId: 'module3'});
    }
    for (const entry of [...data.guide]) {
      const refs = entry.refs || [];
      if ((entry.moduleIds || []).includes('module3') || !refs.length || !refs.every(ref => kept.has(ref.collection))) continue;
      if (!data.guide.some(item => item.title === entry.title && (item.moduleIds || []).includes('module3'))) data.guide.push({...entry, moduleIds: ['module3']});
    }
    return data;
  }
  function mergeEdition(payload, layer) {
    payload.collections = {...payload.collections, ...(layer.collections || {})};
    if (layer.availableModules) payload.availableModules = layer.availableModules;
    return payload;
  }
  // A "v2" version (id ending in -t2) is its base version with the v2 Lecture 19 text put in place.
  async function secondVersion(path, init) {
    const basePath = path.replace('-t2.json', '.json'), second = await layerFor(path);
    if (!second) return new Response('', {status: 404});
    let payload;
    if (second.base === 'v1') {
      // Version 1 is the course data's own teaching.
      const data = mergeData(await (await real('data.json', init)).json(), (await layerFor('data.json')) || {});
      payload = {id: 'v1', collections: Object.fromEntries(data.collections.filter(c => c.role === 'lecture').map(c => [c.id,
        {title: c.title, sections: c.sections.map(s => ({id: s.id, page: s.page, title: s.title, kind: s.kind, teaching: s.teaching}))}]))};
    } else {
      const [response, layer] = await Promise.all([real(basePath, init), layerFor(basePath)]);
      if (!response.ok) return response;
      payload = mergeEdition(await response.json(), layer || {});
    }
    payload = {...payload, id: second.id, label: second.label, availableModules: second.availableModules,
      collections: {...payload.collections, ...second.collections}};
    return new Response(JSON.stringify(payload), {status: 200, headers: {'Content-Type': 'application/json'}});
  }
  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input && input.url;
    const second = typeof url === 'string' && !/module3\//.test(url) && url.split('?')[0].match(/^(?:\.\/)?((?:modern\/)?transcripts-[\w.-]+-t2\.json)$/);
    if (second) return secondVersion(second[1], init);
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
