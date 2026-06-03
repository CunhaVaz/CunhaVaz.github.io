// ============================================================
//  Agente IA do CV — pesquisa local + modo backend opcional
// ============================================================

(function () {
  const fab = document.getElementById('chatFab');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatText');
  const body = document.getElementById('chatBody');
  const modeLabel = document.getElementById('chatMode');

  if (!fab || !panel) return;

  // ---------- abrir/fechar ----------
  function open() {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    setTimeout(() => input.focus(), 100);
  }
  function close() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }
  fab.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  document.querySelectorAll('[data-open-chat]').forEach(b => b.addEventListener('click', open));

  // ---------- quick prompts ----------
  body.addEventListener('click', e => {
    const btn = e.target.closest('.quick button');
    if (btn) {
      const q = btn.getAttribute('data-q');
      input.value = q;
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  });

  // ---------- submit ----------
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

  // ---------- render ----------
  function addMsg(role, text) {
    const div = document.createElement('div');
    div.className = 'msg ' + role;
    div.innerHTML = text.replace(/\n/g, '<br/>');
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }
  let typingNode = null;
  function addTyping() {
    typingNode = document.createElement('div');
    typingNode.className = 'msg bot';
    typingNode.textContent = '… a pensar';
    body.appendChild(typingNode);
    body.scrollTop = body.scrollHeight;
  }
  function removeTyping() {
    if (typingNode) { typingNode.remove(); typingNode = null; }
  }

  // ---------- core: responder ----------
  async function answerQuestion(q) {
    // Se houver backend configurado, usa-o
    if (window.CV_AGENT_ENDPOINT) {
      if (modeLabel) modeLabel.textContent = 'Modo: LLM (backend)';
      const context = pickTopChunks(q, 4).map(c => c.text).join('\n\n');
      const res = await fetch(window.CV_AGENT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, context }),
      });
      if (!res.ok) throw new Error('Endpoint error ' + res.status);
      const data = await res.json();
      return data.answer || 'Sem resposta.';
    }

    // Caso contrário, pesquisa local sobre os chunks do CV
    if (modeLabel) modeLabel.textContent = 'Modo: pesquisa local';
    return localSearch(q);
  }

  // ---------- pesquisa local ----------
  // Estratégia: scoring por palavras-chave + tópicos + presença no texto.
  // Devolve resposta combinada com 1–3 chunks mais relevantes.
  function tokenize(s) {
    return s
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '') // remove acentos
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 2);
  }
  const STOP = new Set(['que','com','para','dos','das','por','sobre','tem','tens','você','vocês','meu','minha','seu','sua','sao','são','foi','tem','está','esta','este','isto','isso','aquele','aquela','onde','quando','quem','como','muito','muita','muitos','muitas','mais','menos','também','tambem','seja','seja','tudo','todo','toda','todos','todas','algo','alguma','algum','um','uma','uns','umas','que','não','sim','também','isto','aqui','ali','ele','ela','elas','eles','foi','será','sera','tem','têm','teu','tua','teus','tuas','nos','nós']);
  function score(qTokens, chunk) {
    const text = (chunk.topics.join(' ') + ' ' + chunk.text).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
    let s = 0;
    for (const t of qTokens) {
      if (STOP.has(t)) continue;
      if (chunk.topics.some(top => top.normalize('NFD').replace(/[̀-ͯ]/g,'').includes(t))) s += 3;
      const matches = text.split(t).length - 1;
      s += matches;
    }
    return s;
  }
  function pickTopChunks(q, k) {
    const qTokens = tokenize(q);
    const scored = window.CV_CHUNKS.map(c => ({ c, s: score(qTokens, c) }));
    scored.sort((a, b) => b.s - a.s);
    return scored.filter(x => x.s > 0).slice(0, k).map(x => x.c);
  }

  function localSearch(q) {
    const top = pickTopChunks(q, 3);
    if (!top.length) {
      return [
        "Não encontrei uma resposta direta no CV do Francisco. Pergunta-me outra coisa, por exemplo:",
        "• <em>“Que experiência tem em IA aplicada à indústria?”</em>",
        "• <em>“Que projetos fez em África?”</em>",
        "• <em>“Que ferramentas técnicas domina?”</em>",
        "",
        "Para contacto direto: <strong>cunha.vaz@sapo.pt</strong> · <strong>+351 926 771 211</strong>"
      ].join('<br/>');
    }
    const intro = top.length === 1
      ? 'Resposta com base no CV:'
      : 'Resumo a partir de ' + top.length + ' secções do CV:';
    const body = top.map((c, i) => `<strong>${i + 1}.</strong> ${c.text}`).join('<br/><br/>');
    const close = '<br/><br/><em>Para conversa direta: cunha.vaz@sapo.pt</em>';
    return intro + '<br/><br/>' + body + close;
  }
})();
