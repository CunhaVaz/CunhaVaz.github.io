# CV Web — Francisco António Cunha Vaz

One-pager profissional bilingue (PT/EN) com **agente IA do CV** integrado. Pronto a publicar no GitHub Pages.

URL público: `https://cunhavaz.github.io` (PT) e `https://cunhavaz.github.io/en/` (EN).

## Estrutura

```
cv-web/
├── index.html                  ← PT
├── en/
│   ├── index.html              ← EN
│   └── assets/cv-data.js       ← chunks EN do agente
├── assets/
│   ├── style.css               ← partilhado
│   ├── app.js                  ← agente bilingue
│   ├── cv-data.js              ← chunks PT do agente
│   └── foto.jpg                ← foto de perfil (adicionar manualmente)
├── CV_Francisco_Vaz.pdf
├── CV_Francisco_Vaz.docx
├── .nojekyll
└── README.md
```

## Publicar no GitHub Pages

1. Clone ou abre o repo `CunhaVaz.github.io`.
2. Substitui todos os ficheiros pelos desta pasta.
3. `git add . && git commit -m "Update CV web" && git push`.
4. O site atualiza em 1–2 minutos.

## Modo agente — local vs. LLM real

Por defeito o agente corre 100% no browser com pesquisa local por palavras-chave.

Para passar a LLM real (Cloudflare Worker, Vercel function, n8n…), edita `assets/cv-data.js`:

```js
window.CV_AGENT_ENDPOINT = "https://teu-backend.com/agent";
```
