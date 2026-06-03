// Conteúdo factual do CV — usado pelo agente de pesquisa local.
// Cada chunk tem tópicos (palavras-chave) e texto.
// Quando se quiser usar um LLM real (Cloudflare Worker / Vercel function / n8n),
// estes chunks servem de "contexto" para um RAG simples.

window.CV_PROFILE = {
  name: "Francisco António Cunha Vaz",
  headline: "Gestor Sénior · Transformação Digital & IA · Operações · Liderança Internacional",
  location: "Covilhã, Portugal",
  email: "cunha.vaz@sapo.pt",
  phone: "+351 926 771 211",
  linkedin: "https://www.linkedin.com/in/francisco-vaz-78986721",
  github: "https://github.com/CunhaVaz",
  languages: ["Português (materna)", "Espanhol fluente", "Francês fluente", "Inglês bom nível profissional"],
};

window.CV_CHUNKS = [
  {
    topics: ["resumo", "perfil", "sobre", "quem", "experiência total", "anos"],
    text: "Gestor sénior com mais de 25 anos de experiência em operações industriais, qualidade, logística e consultoria, em contextos nacionais e internacionais (Portugal, Angola, RDC). Combina visão executiva, capacidade de implementação no terreno e competências técnicas em Inteligência Artificial aplicada — Python, Machine Learning, LLMs, Power BI, automação e construção de agentes. Fluente em português, espanhol e francês, e bom nível de inglês profissional."
  },
  {
    topics: ["ia", "inteligência artificial", "ai", "machine learning", "ml", "llm", "python", "automação", "rag", "agentes"],
    text: "Competências em IA: Python (análise, automação, ML), Power BI, LLMs (ChatGPT, Claude, NotebookLM), construção de agentes de IA com n8n e Zapier, integração de APIs, RAG sobre documentação. Aplicação prática em automação de relatórios, classificação de não-conformidades e análise preditiva em ambiente industrial."
  },
  {
    topics: ["industrial", "indústria", "fábrica", "industry 4.0", "indústria 4.0", "manufatura", "produção", "metalomecânica"],
    text: "Aplicação de IA à indústria: durante a função de Global Quality Manager na Biagio Indústria S.A. introduzi IA em processos industriais (relatórios automáticos, classificação de não-conformidades, dashboards Power BI). Em consultoria, desenhei roadmaps de transformação digital e Industry 4.0 para PMEs industriais — manutenção preditiva, qualidade visual, forecasting, otimização energética, assistente RAG sobre SOPs."
  },
  {
    topics: ["projetos", "tipo de projeto", "consultoria", "encaixe", "porquê", "nearshore", "fundão", "covilhã"],
    text: "Tipos de projeto onde pode contribuir: transformação digital, IA aplicada a operações, qualidade e supply chain, consultoria a clientes industriais, Industry 4.0, manutenção preditiva, automação de processos, copilotos generativos para equipas operacionais. Combina experiência executiva sénior em ambientes industriais complexos com competências técnicas atualizadas em IA. Preferência por modelo nearshore a partir de Covilhã / Fundão ou projetos internacionais (PT, AO, RDC e mercados europeus). Idiomas: PT, ES, FR fluentes; EN bom nível profissional."
  },
  {
    topics: ["angola", "rdc", "congo", "kinshasa", "áfrica", "africa", "internacional", "expatriação"],
    text: "Experiência em África: desde 2017 com operações no continente. Em Angola foi Diretor de Logística do grupo Vivangola / Agroangola / Vivasuper (2017–2019), responsável pela cadeia logística — armazéns, transporte, distribuição, retalho. Desde outubro de 2024 é General Manager da Biagio Congo, S.A. em Kinshasa, RDC, a liderar a implementação de uma unidade fabril de raiz."
  },
  {
    topics: ["biagio", "kinshasa", "congo", "general manager", "unidade fabril", "raiz", "greenfield"],
    text: "Como General Manager da Biagio Congo, S.A. (Kinshasa, RDC, desde Out 2024) é responsável pela implementação de uma unidade fabril de raiz: viabilidade, plano de investimentos, layout industrial, definição de processos, recrutamento e formação de equipa local (5–10 colaboradores), supply chain (importação de matérias-primas → distribuição), SOPs, melhoria contínua, e negociação institucional num ambiente regulatório complexo."
  },
  {
    topics: ["qualidade", "haccp", "iso 22000", "food safety", "auditoria", "segurança alimentar"],
    text: "Qualidade & Food Safety: Global Quality Manager da Biagio Indústria S.A. desde Set 2023. Implementação e monitorização de HACCP e ISO 22000, definição de KPIs e dashboards em Power BI, coordenação de auditorias internas e externas, garantia de conformidade legal e normativa, introdução de IA na gestão de qualidade. Certificado de Especialista em HACCP, Certificação em ISO 22000 e Auditor em Segurança Alimentar."
  },
  {
    topics: ["consultoria", "franck young", "cliente", "negócio", "estratégia"],
    text: "CEO / Consultor na Franck Young Consulting, Lda. desde 2019. Consultoria em gestão, operações, transformação digital e análise de investimentos. Construção de agentes de IA e workflows automatizados (LLMs, n8n, Zapier, APIs). Marketing digital — estratégia de conteúdo, redes sociais, SEO/SEM, funis de conversão, Meta Ads e Google Ads."
  },
  {
    topics: ["logística", "supply chain", "armazém", "transporte", "distribuição"],
    text: "Logística & Supply Chain: Diretor de Logística do grupo Vivangola / Agroangola / Vivasuper em Angola (2017–2019). Gestão de armazéns, transportes, distribuição, retalho. Gestor de Operações de Logística na Würth Portugal (1998–1999) e Gestor de Transportes na SPC – Serviço Português de Contentores S.A. (1997–1998). Operações no mercado RDC desde 2024."
  },
  {
    topics: ["formação", "académico", "académica", "mestrado", "pós-graduação", "licenciatura", "mba"],
    text: "Formação académica: Mestrado em Inteligência Artificial Aplicada (Universidade Europeia, 2025–2026); Pós-Graduação em IA Aplicada à Gestão (ISCTE, 2025); Máster em Mindfulness (Universidad de Zaragoza, 2018–2020); MBA em Ciências Empresariais (Universidade da Beira Interior, 2002–2004); Licenciatura em Engenharia e Gestão Industrial (Universidade da Beira Interior, 1991–1997)."
  },
  {
    topics: ["ferramentas", "stack", "tecnologia", "técnicas", "software", "ferramenta"],
    text: "Ferramentas técnicas: Python (análise, automação, ML), Power BI, Excel avançado, SPSS, R, KNIME, Google Colab, LLMs (ChatGPT, Claude, NotebookLM), Zapier, n8n, ERPs (SAP, PHC, Primavera, MES), integração front-office / back-office em lojas, clínicas, logística e finanças."
  },
  {
    topics: ["liderança", "equipas", "multicultural", "internacional", "gestão de pessoas"],
    text: "Liderança internacional: liderança de equipas multiculturais em Portugal, Angola e República Democrática do Congo. Recrutamento, formação e desenvolvimento de equipas em ambientes operacionais exigentes. Negociação institucional com autoridades governamentais, organismos oficiais e empresas privadas. Direção do Instituto de Ciências Contemplativas – Plenitude, com programas de gestão do stress e bem-estar organizacional para equipas clínicas e empresariais."
  },
  {
    topics: ["mindfulness", "bem-estar", "stress", "saúde"],
    text: "Mindfulness e bem-estar: Máster em Mindfulness pela Universidad de Zaragoza, Teacher Certificate em Mindfulness-Based Stress Reduction (MBSR) pela Universidade de Brown, certificado em Medicina del Estilo de Vida Aplicada a la Salud Mental (Nirakara, Madrid, com excelência). Fundador e diretor do Instituto de Ciências Contemplativas – Plenitude, focado em formação, investigação e promoção do bem-estar organizacional."
  },
  {
    topics: ["idiomas", "línguas", "português", "espanhol", "francês", "inglês"],
    text: "Idiomas: Português (língua materna), Espanhol (fluente), Francês (fluente), Inglês (bom nível profissional). Capacidade de operar em contextos nearshore para clientes europeus, africanos e latino-americanos."
  },
  {
    topics: ["contacto", "contactar", "email", "telefone", "linkedin", "github"],
    text: "Contactos: e-mail cunha.vaz@sapo.pt, telefone +351 926 771 211, LinkedIn linkedin.com/in/francisco-vaz-78986721, GitHub github.com/CunhaVaz. Sediado na Covilhã, Portugal. Disponível para projetos nearshore (Covilhã / Fundão) ou internacionais."
  },
  {
    topics: ["lidl", "fundão", "primeiro emprego", "início", "carreira"],
    text: "Início de carreira: Chefe de Loja / Chefe de Expedição na LIDL (Fundão / Sintra, 1996–1997), Gestor de Transportes na SPC (1997–1998), Gestor de Operações de Logística na Würth Portugal (1998–1999), Diretor de Produção na Beiralã S.A. (1999–2002) e na Frulact S.A. (2002–2007). Professor Convidado no ISMAG / Universidade Lusófona (1999–2005)."
  },
  {
    topics: ["frulact", "diretor de produção", "industrial", "diretor industrial"],
    text: "Direção industrial: Diretor de Produção na Frulact S.A. (2002–2007), Diretor Industrial na Paniserra (2007–2009) e na Salsicharia Trancosense / Casa da Prisca (2009–2011), Consultor Industrial e Formador na Biofun S.A. e AECBP (2000–2017), Gestor em Vogais e Números, Lda. da rede Meu Super / SONAE (2011–2016)."
  },
  {
    topics: ["formação complementar", "cursos", "certificações", "certificado"],
    text: "Certificações e formação complementar: Especialista em HACCP, ISO 22000, Auditor em Segurança Alimentar, MBSR (Universidade de Brown), CAP – Formador (IEFP, 2009), Especialista em Direito Tributário Angolano (Universidade Agostinho Neto, 2019), Boosting Productivity with AI (Nova SBE Executive Education, 2025), Practitioner em PNL (2020), Análise Financeira (Portal da Gestão, 2018), cursos de IVA em PT e AO (Universidade Católica / Angola, 2019)."
  }
];

// === Modo backend (LLM real) — opcional ===
// Para usar um LLM real (em vez de pesquisa local), aponta para um endpoint próprio.
// O endpoint deve aceitar POST { question, context } e devolver { answer }.
// Exemplos: Cloudflare Worker, Vercel function, webhook n8n.
// Se for null, o agente usa pesquisa local.
window.CV_AGENT_ENDPOINT = null;
