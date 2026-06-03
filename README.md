# CV Web — Francisco António Cunha Vaz

One-pager profissional com **agente IA do CV** integrado. Pronto a publicar no GitHub Pages.

URL final típico: `https://CunhaVaz.github.io/cv` (ou `https://CunhaVaz.github.io` se publicado no repositório `CunhaVaz.github.io`).

## Estrutura

```
cv-web/
├── index.html              ← one-pager (perfil, áreas, projetos, experiência, formação, contacto)
├── assets/
│   ├── style.css           ← design responsivo e profissional
│   ├── app.js              ← lógica do agente IA (pesquisa local + modo backend)
│   └── cv-data.js          ← conteúdo do CV em chunks (editável)
├── .nojekyll               ← evita processamento Jekyll no GitHub Pages
└── README.md
```

## Como publicar no GitHub Pages (passo a passo)

### Opção A — Site no domínio `CunhaVaz.github.io`

1. Cria um repositório novo chamado **`CunhaVaz.github.io`** no GitHub.
2. Copia o conteúdo da pasta `cv-web/` para a raiz do repositório.
3. Faz `git add . && git commit -m "CV web" && git push`.
4. O site fica online em poucos minutos em `https://CunhaVaz.github.io`.

### Opção B — Site dentro de um repositório (ex.: `cv`)

1. Cria um repositório chamado **`cv`**.
2. Copia o conteúdo de `cv-web/` para a raiz.
3. Em **Settings → Pages**, escolhe `Deploy from a branch`, branch `main`, pasta `/ (root)`.
4. Fica online em `https://CunhaVaz.github.io/cv`.

### Comandos git (exemplo Opção A)

```bash
cd cv-web
git init -b main
git add .
git commit -m "Initial CV web"
git remote add origin https://github.com/CunhaVaz/CunhaVaz.github.io.git
git push -u origin main
```

## Anexar o ficheiro .docx para descarga

O botão "Descarregar CV (.docx)" aponta para `CV_Francisco_Vaz.docx`.
Copia o ficheiro para a mesma pasta do `index.html` antes de publicar.

## Editar o conteúdo

- **Texto da página:** edita `index.html` diretamente.
- **Respostas do agente:** edita `assets/cv-data.js` — cada bloco em `CV_CHUNKS` tem `topics` (palavras-chave) e `text` (resposta).
- **Estilos:** edita `assets/style.css`.

## Modo agente — local vs. LLM real

Por defeito o agente corre **100% no browser**, sem chamadas externas e sem chaves de API.
Faz pesquisa por palavras-chave sobre os chunks definidos em `cv-data.js` e devolve as 1–3 secções mais relevantes.

### Upgrade para LLM real (opcional)

Para responder com um LLM verdadeiro (ChatGPT, Claude, Gemini), precisas de um pequeno **backend**
que esconda a tua chave de API. O GitHub Pages não suporta código de servidor, mas há opções gratuitas:

#### Cloudflare Worker (recomendado)

1. Cria uma conta gratuita em Cloudflare → Workers.
2. Cria um Worker com o seguinte código (exemplo OpenAI):

```js
export default {
  async fetch(req, env) {
    if (req.method !== 'POST') return new Response('POST only', { status: 405 });
    const { question, context } = await req.json();
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.OPENAI_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'És o assistente do CV de Francisco Vaz. Responde em pt-PT, conciso, só com base no CONTEXT. Se não souberes, diz que não encontraste no CV.' },
          { role: 'user', content: 'CONTEXT:\n' + context + '\n\nPERGUNTA: ' + question },
        ],
      }),
    });
    const data = await r.json();
    return new Response(JSON.stringify({
      answer: data.choices?.[0]?.message?.content || 'Sem resposta.',
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
}
```

3. Em **Worker → Settings → Variables**, adiciona `OPENAI_KEY` (encriptada).
4. Copia o URL do Worker (ex.: `https://cv-agent.cunhavaz.workers.dev`).
5. Em `assets/cv-data.js`, edita a última linha:

```js
window.CV_AGENT_ENDPOINT = "https://cv-agent.cunhavaz.workers.dev";
```

6. Push para o GitHub. O agente passa automaticamente para modo LLM real.

#### Alternativas

- **Vercel Functions** — semelhante; cria um endpoint `/api/agent.js`.
- **n8n webhook** — se já usas n8n, cria um workflow com webhook de entrada → chamada LLM → resposta JSON.
- **Hugging Face Inference API** — gratuito para modelos open-source.

## Modificações habituais

- **Adicionar projeto** — duplica um bloco `<article class="case">` em `index.html`.
- **Adicionar competência ou skill** — adiciona um `<span>` em `.chips` ou nas tags do perfil.
- **Foto real** — substitui o `.profile-avatar` (com "FV") por um `<img src="assets/foto.jpg">`.

## Verificação local

Antes de publicar, abre `index.html` no browser e:

1. Confirma que as quatro secções da landing scrollam bem.
2. Carrega no botão "Pergunta à IA sobre o meu CV" e testa 3–4 perguntas.
3. Verifica que os links de contacto funcionam.

---

© 2026 Francisco António Cunha Vaz · Construído com IA · Pronto para GitHub Pages
