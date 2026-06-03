(function () {
  const fab = document.getElementById('chatFab');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatText');
  const body = document.getElementById('chatBody');
  const modeLabel = document.getElementById('chatMode');
  if (!fab || !panel) return;

  function open() { panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); setTimeout(() => input.focus(), 100); }
  function close() { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); }
  fab.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  document.querySelectorAll('[data-open-chat]').forEach(b => b.addEventListener('click', open));

  body.addEventListener('click', e => {
    const btn = e.target.closest('.quick button');
    if (btn) { input.value = btn.getAttribute('data-q'); form.dispatchEvent(new Event('submit', { cancelable: true })); }
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    addMsg('user', q);
    input.value = '';
    addTyping();
    try {
      const answer = await answerQuestion(q);
      removeTyping();
      addMsg('bot', answer);
    } catch (err) {
      removeTyping();
      addMsg('bot', 'Houve um erro a processar a pergunta. Tenta de novo.');
      console.error(err);
    }
  });

  function addMsg(role, text) { const div = document.createElement('div'); div.className = 'msg ' + role; div.innerHTML = text.replace(/\n/g, '<br/>'); body.appendChild(div); body.scrollTop = body.scrollHeight; }
  let typingNode = null;
  function addTyping() { typingNode = document.createElement('div'); typingNode.className = 'msg bot'; typingNode.textContent = '… a pensar'; body.appendChild(typingNode); body.scrollTop = body.scrollHeight; }
  function removeTyping() { if (typingNode) { typingNode.remove(); typingNode = null; } }

  async function answerQuestion(q) {
    const isEN = location.pathname.includes('/en/') || document.documentElement.lang === 'en';
    const T = isEN
      ? { llm: 'Mode: LLM (backend)', local: 'Mode: local search', intro1: 'Answer based on the CV:', introN: n => 'Summary from ' + n + ' sections of the CV:', close: '<br/><br/><em>For direct contact: francisco.vaz@ubi.pt</em>', notFound: ["I couldn't find a direct answer in Francisco's CV. Try another question, for example:","• <em>“What is his experience with AI applied to industry?”</em>","• <em>“What projects has he led in Africa?”</em>","• <em>“What technical tools does he master?”</em>","","For direct contact: <strong>francisco.vaz@ubi.pt</strong> · <strong>+351 926 771 211</strong>"].join('<br/>') }
      : { llm: 'Modo: LLM (backend)', local: 'Modo: pesquisa local', intro1: 'Resposta com base no CV:', introN: n => 'Resumo a partir de ' + n + ' secções do CV:', close: '<br/><br/><em>Para conversa direta: francisco.vaz@ubi.pt</em>', notFound: ["Não encontrei uma resposta direta no CV do Francisco. Pergunta-me outra coisa, por exemplo:","• <em>“Que experiência tem em IA aplicada à indústria?”</em>","• <em>“Que projetos fez em África?”</em>","• <em>“Que ferramentas técnicas domina?”</em>","","Para contacto direto: <strong>francisco.vaz@ubi.pt</strong> · <strong>+351 926 771 211</strong>"].join('<br/>') };

    if (window.CV_AGENT_ENDPOINT) {
      if (modeLabel) modeLabel.textContent = T.llm;
      const context = pickTopChunks(q, 4).map(c => c.text).join('\n\n');
      const res = await fetch(window.CV_AGENT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: q, context }) });
      if (!res.ok) throw new Error('Endpoint error ' + res.status);
      const data = await res.json();
      return data.answer || 'Sem resposta.';
    }

    if (modeLabel) modeLabel.textContent = T.local;
    return localSearch(q, T);
  }

  function tokenize(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length > 2); }
  const STOP = new Set(['que','com','para','dos','das','por','sobre','tem','tens','meu','minha','seu','sua','sao','são','foi','está','esta','este','isto','isso','onde','quando','quem','como','muito','mais','menos','também','tambem','tudo','algo','não','sim','seja','the','and','for','with','that','this','what','have','has','was','are','from']);
  function score(qTokens, chunk) {
    const text = (chunk.topics.join(' ') + ' ' + chunk.text).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
    let s = 0;
    for (const t of qTokens) {
      if (STOP.has(t)) continue;
      if (chunk.topics.some(top => top.normalize('NFD').replace(/[̀-ͯ]/g,'').includes(t))) s += 3;
      s += text.split(t).length - 1;
    }
    return s;
  }
  function pickTopChunks(q, k) {
    const qTokens = tokenize(q);
    const scored = window.CV_CHUNKS.map(c => ({ c, s: score(qTokens, c) }));
    scored.sort((a, b) => b.s - a.s);
    return scored.filter(x => x.s > 0).slice(0, k).map(x => x.c);
  }

  function localSearch(q, T) {
    const top = pickTopChunks(q, 3);
    if (!top.length) return T.notFound;
    const intro = top.length === 1 ? T.intro1 : T.introN(top.length);
    const body = top.map((c, i) => `<strong>${i + 1}.</strong> ${c.text}`).join('<br/><br/>');
    return intro + '<br/><br/>' + body + T.close;
  }
})();
