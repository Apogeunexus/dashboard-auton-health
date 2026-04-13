"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import ReactDOM from "react-dom";

/* ── Design System ── */
const DS = {
  primary: "#1B4266", primaryLight: "#2D6293", accent: "#3B82F6",
  success: "#10B981", error: "#EF4444", warning: "#F59E0B",
  bgCard: "#FFFFFF", bgTableRow: "#F8F9FA",
  textPrimary: "#1A1A1A", textSecondary: "#666666", textTertiary: "#999999", textDisabled: "#CCCCCC",
  border: "#E5E7EB", divider: "#F2F2F2",
  cardRadius: 3, cardShadow: "0 4px 4px rgba(0,0,0,0.25)",
};
const C = { purple: "#7C3AED", orange: "#EA580C", teal: "#0F6E56" };

/* ── Competitors ── */
const competitors = [
  {
    handle: "@drajulianasaude", name: "Dra. Juliana", niche: "Medicina Integrativa",
    score: 87, delta: +2, threat: 8.5, sparkline: [82, 83, 84, 85, 86, 87, 87],
    scoreHistory: [80,81,82,83,84,85,85,86,86,87,87,87,86,87,87,87,87,88,87,87,87,86,87,87,87,87,87,87,87,87],
    ig: { seguidores: "124K", crescSemana: "+2.4K", engRate: 4.8, postsSemana: 5, saves: 1240, shares: 890, melhorFormato: "Reels", ultimoPost: "Hoje", totalPosts: 842, curtidas: "594K", visualizacoes: "2.1M", comentarios: "31.2K", mediaCurtidas: 5940, mediaComentarios: 312 },
    google: { nota: 4.8, avaliacoes: 342, avalSemana: 8, sentimento: 85, respondidas: "95%", fotos: 12 },
    comercial: { linkBio: true, cta: true, shopping: false, anuncios: 2, ofertas: 1, funnel: true, score: 83 },
  },
  {
    handle: "@clinicavidaintegra", name: "Clinica Vida Integra", niche: "Clinica Geral",
    score: 81, delta: +3, threat: 7.2, sparkline: [74, 76, 77, 78, 79, 80, 81],
    scoreHistory: [70,71,72,73,74,75,76,77,77,78,78,79,79,80,80,80,81,81,81,81,80,80,81,81,81,81,81,81,81,81],
    ig: { seguidores: "98K", crescSemana: "+2.8K", engRate: 3.9, postsSemana: 7, saves: 980, shares: 720, melhorFormato: "Carrossel", ultimoPost: "Ontem", totalPosts: 1203, curtidas: "382K", visualizacoes: "1.4M", comentarios: "18.7K", mediaCurtidas: 3890, mediaComentarios: 187 },
    google: { nota: 4.5, avaliacoes: 287, avalSemana: 12, sentimento: 78, respondidas: "88%", fotos: 8 },
    comercial: { linkBio: true, cta: true, shopping: true, anuncios: 3, ofertas: 2, funnel: true, score: 88 },
  },
  {
    handle: "@drfelipeortopedia", name: "Dr. Felipe Ortopedia", niche: "Ortopedia",
    score: 79, delta: -1, threat: 6.8, sparkline: [78, 79, 80, 80, 79, 79, 79],
    scoreHistory: [75,76,77,78,78,79,79,80,80,80,79,79,79,79,79,79,79,78,78,79,79,79,79,79,79,79,79,79,79,79],
    ig: { seguidores: "67K", crescSemana: "+1.1K", engRate: 3.2, postsSemana: 3, saves: 540, shares: 380, melhorFormato: "Reels", ultimoPost: "2 dias", totalPosts: 567, curtidas: "214K", visualizacoes: "890K", comentarios: "9.8K", mediaCurtidas: 2140, mediaComentarios: 98 },
    google: { nota: 4.6, avaliacoes: 198, avalSemana: 5, sentimento: 82, respondidas: "92%", fotos: 15 },
    comercial: { linkBio: true, cta: false, shopping: false, anuncios: 1, ofertas: 0, funnel: false, score: 52 },
  },
  {
    handle: "@nutri.marina", name: "Nutri Marina", niche: "Nutricao Funcional",
    score: 76, delta: +1, threat: 6.1, sparkline: [72, 73, 74, 75, 75, 76, 76],
    scoreHistory: [68,69,70,71,72,72,73,73,74,74,75,75,75,75,76,76,76,76,76,76,76,76,76,76,76,76,76,76,76,76],
    ig: { seguidores: "89K", crescSemana: "+1.9K", engRate: 5.1, postsSemana: 6, saves: 1480, shares: 1050, melhorFormato: "Reels", ultimoPost: "Hoje", totalPosts: 734, curtidas: "454K", visualizacoes: "1.8M", comentarios: "28.4K", mediaCurtidas: 5100, mediaComentarios: 284 },
    google: { nota: 4.2, avaliacoes: 156, avalSemana: 3, sentimento: 71, respondidas: "80%", fotos: 6 },
    comercial: { linkBio: true, cta: true, shopping: false, anuncios: 1, ofertas: 1, funnel: true, score: 74 },
  },
  {
    handle: "@dermato.renata", name: "Dra. Renata Dermato", niche: "Dermatologia",
    score: 74, delta: 0, threat: 5.5, sparkline: [73, 73, 74, 74, 74, 74, 74],
    scoreHistory: [70,71,71,72,72,73,73,73,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74],
    ig: { seguidores: "112K", crescSemana: "+1.5K", engRate: 3.5, postsSemana: 4, saves: 870, shares: 620, melhorFormato: "Carrossel", ultimoPost: "Hoje", totalPosts: 623, curtidas: "392K", visualizacoes: "1.5M", comentarios: "15.6K", mediaCurtidas: 3920, mediaComentarios: 156 },
    google: { nota: 4.3, avaliacoes: 224, avalSemana: 6, sentimento: 76, respondidas: "90%", fotos: 20 },
    comercial: { linkBio: true, cta: true, shopping: true, anuncios: 2, ofertas: 3, funnel: true, score: 91 },
  },
  {
    handle: "@fisio.carlos", name: "Fisio Carlos", niche: "Fisioterapia Esportiva",
    score: 71, delta: -2, threat: 4.9, sparkline: [74, 73, 73, 72, 72, 71, 71],
    scoreHistory: [76,76,75,75,74,74,73,73,73,72,72,72,72,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71],
    ig: { seguidores: "45K", crescSemana: "+0.6K", engRate: 2.8, postsSemana: 2, saves: 320, shares: 210, melhorFormato: "Stories", ultimoPost: "3 dias", totalPosts: 289, curtidas: "126K", visualizacoes: "520K", comentarios: "5.4K", mediaCurtidas: 1260, mediaComentarios: 54 },
    google: { nota: 4.1, avaliacoes: 89, avalSemana: 2, sentimento: 68, respondidas: "75%", fotos: 4 },
    comercial: { linkBio: false, cta: false, shopping: false, anuncios: 0, ofertas: 0, funnel: false, score: 18 },
  },
  {
    handle: "@psicologa.ana", name: "Psic. Ana", niche: "Psicologia Clinica",
    score: 68, delta: +4, threat: 5.8, sparkline: [61, 63, 64, 65, 66, 67, 68],
    scoreHistory: [55,56,57,58,59,60,61,62,63,63,64,64,65,65,66,66,67,67,67,68,68,68,68,68,68,68,68,68,68,68],
    ig: { seguidores: "78K", crescSemana: "+2.1K", engRate: 4.2, postsSemana: 5, saves: 1100, shares: 780, melhorFormato: "Reels", ultimoPost: "Ontem", totalPosts: 512, curtidas: "328K", visualizacoes: "1.2M", comentarios: "21.8K", mediaCurtidas: 4200, mediaComentarios: 218 },
    google: { nota: 4.7, avaliacoes: 310, avalSemana: 9, sentimento: 90, respondidas: "98%", fotos: 10 },
    comercial: { linkBio: true, cta: true, shopping: false, anuncios: 1, ofertas: 0, funnel: true, score: 71 },
  },
  {
    handle: "@odonto.rafael", name: "Dr. Rafael Odonto", niche: "Odontologia Estetica",
    score: 65, delta: +1, threat: 4.3, sparkline: [62, 63, 63, 64, 64, 65, 65],
    scoreHistory: [58,59,59,60,60,61,61,62,62,63,63,63,64,64,64,64,65,65,65,65,65,65,65,65,65,65,65,65,65,65],
    ig: { seguidores: "53K", crescSemana: "+0.9K", engRate: 3.0, postsSemana: 3, saves: 410, shares: 290, melhorFormato: "Carrossel", ultimoPost: "2 dias", totalPosts: 401, curtidas: "159K", visualizacoes: "680K", comentarios: "7.2K", mediaCurtidas: 1590, mediaComentarios: 72 },
    google: { nota: 3.9, avaliacoes: 132, avalSemana: 4, sentimento: 62, respondidas: "70%", fotos: 7 },
    comercial: { linkBio: true, cta: false, shopping: false, anuncios: 0, ofertas: 1, funnel: false, score: 40 },
  },
];

/* ── SEO / Google Data ── */
const seoKpis = [
  { label: "Posicao Media Google", value: "7.8", delta: "↑ 1.4 pos", up: true, status: "warn" as const },
  { label: "Keywords no Top 10", value: "18/32", delta: "+3 vs semana", up: true, status: "ok" as const },
  { label: "Share of Voice", value: "23.4%", delta: "+2.1pp", up: true, status: "ok" as const, spark: [18,19,20,21,23] },
  { label: "Gap de Conteudo", value: "34", delta: "", up: false, status: "warn" as const, badge: "34 oportunidades" },
];
const sovData = [
  { w:"Sem 1",voce:18,c1:25,c2:20,c3:15 },{ w:"Sem 2",voce:19,c1:24,c2:21,c3:16 },
  { w:"Sem 3",voce:20,c1:23,c2:19,c3:17 },{ w:"Sem 4",voce:21,c1:22,c2:20,c3:16 },
  { w:"Sem 5",voce:22,c1:21,c2:21,c3:15 },{ w:"Sem 6",voce:22,c1:21,c2:20,c3:16 },
  { w:"Sem 7",voce:23,c1:20,c2:19,c3:17 },{ w:"Sem 8",voce:23,c1:20,c2:20,c3:16 },
];
const sovLines = [
  { key:"voce",label:"Auton Health",color:"#378ADD" },
  { key:"c1",label:"@drajulianasaude",color:"#EF4444" },
  { key:"c2",label:"@drmarcosfuncional",color:"#F59E0B" },
  { key:"c3",label:"@clinicavidaintegra",color:"#10B981" },
];
const seoKws = [
  { kw:"medicina integrativa online", pos:3, comp:"@drajulianasaude", cPos:1, vol:12400, act:"Otimizar pagina" },
  { kw:"consulta funcional telemedicina", pos:7, comp:"@drmarcosfuncional", cPos:2, vol:8900, act:"Construir links" },
  { kw:"saude integrativa plataforma", pos:2, comp:"@clinicavidaintegra", cPos:5, vol:6200, act:"Monitorar" },
  { kw:"diagnostico integrativo IA", pos:1, comp:"—", cPos:0, vol:4800, act:"Monitorar" },
  { kw:"plano terapeutico digital", pos:12, comp:"@drajulianasaude", cPos:4, vol:3200, act:"Criar conteudo" },
  { kw:"exames funcionais online", pos:18, comp:"@drmarcosfuncional", cPos:3, vol:5100, act:"Criar conteudo" },
  { kw:"nutricao funcional app", pos:25, comp:"@nutri.marina", cPos:6, vol:9800, act:"Criar conteudo" },
  { kw:"teleconsulta medicina integrativa", pos:5, comp:"@drajulianasaude", cPos:2, vol:7400, act:"Otimizar pagina" },
  { kw:"protocolo destox digital", pos:0, comp:"@drmarcosfuncional", cPos:8, vol:2900, act:"Criar conteudo" },
  { kw:"saude hormonal telemedicina", pos:9, comp:"@clinicavidaintegra", cPos:3, vol:4300, act:"Construir links" },
];
const seoScatter = [
  { kw:"nutricao funcional app",vol:9800,dif:28,comp:"@nutri.marina" },
  { kw:"protocolo destox digital",vol:2900,dif:15,comp:"@drmarcosfuncional" },
  { kw:"suplementacao inteligente",vol:7200,dif:22,comp:"@drajulianasaude" },
  { kw:"microbioma saude mental",vol:8400,dif:18,comp:"ninguem" },
  { kw:"eixo HPA tratamento",vol:3600,dif:12,comp:"ninguem" },
  { kw:"longevidade medicina funcional",vol:6800,dif:42,comp:"@drajulianasaude" },
  { kw:"fitoterapia evidencia",vol:4100,dif:30,comp:"@clinicavidaintegra" },
  { kw:"detox hepatico natural",vol:11200,dif:48,comp:"@drmarcosfuncional" },
  { kw:"ansiedade tratamento integrativo",vol:15600,dif:62,comp:"@drajulianasaude" },
  { kw:"imunidade suplementos",vol:18400,dif:71,comp:"@nutri.marina" },
];

/* ── Tooltip tips ── */
const TIPS: Record<string, { t: string; d: string; s: string }> = {
  // VISAO GERAL (11)
  vg_kpis: { t: "KPIs Gerais de Concorrentes", d: "Resumo dos principais indicadores de desempenho dos seus concorrentes, incluindo score medio, engajamento e presenca digital geral.", s: "Consolidado Instagram + Google + Comercial" },
  vg_score_chart: { t: "Grafico de Score Competitivo", d: "Mostra a pontuacao geral de cada concorrente ao longo do tempo. Quanto maior o score, mais forte a presenca digital dele.", s: "Algoritmo interno de scoring" },
  vg_ranking: { t: "Ranking Geral", d: "Posicao de cada concorrente ordenada pelo score geral. Voce ve quem esta acima e abaixo de voce no mercado.", s: "Score composto de todas as fontes" },
  vg_formatos: { t: "Formatos Mais Usados", d: "Quais tipos de conteudo (Reels, Carrossel, Stories, Fotos) os concorrentes mais publicam no Instagram.", s: "Instagram API" },
  vg_sentimento: { t: "Sentimento Geral", d: "Analise se as mencoes e avaliacoes dos concorrentes sao positivas, negativas ou neutras.", s: "Google Reviews + Mencoes sociais" },
  vg_gaps: { t: "Gaps Identificados", d: "Oportunidades onde seus concorrentes estao fracos e voce pode se destacar. Sao pontos que ninguem esta cobrindo bem.", s: "Analise comparativa IA" },
  vg_heatmap: { t: "Mapa de Calor de Atividade", d: "Mostra em quais dias e horarios os concorrentes mais publicam conteudo. Ideal para saber quando competir.", s: "Instagram API - ultimas 4 semanas" },
  vg_briefing: { t: "Briefing Semanal", d: "Resumo automatico dos principais movimentos dos concorrentes nesta semana.", s: "IA generativa sobre dados consolidados" },
  vg_lider: { t: "Lider do Setor", d: "Quem esta com o maior score competitivo neste momento e o que esta fazendo de diferente.", s: "Ranking por score geral" },
  vg_sentimento_setor: { t: "Sentimento do Setor", d: "Como esta o humor geral do mercado baseado nas avaliacoes e mencoes de todos os concorrentes.", s: "Analise de sentimento consolidada" },
  vg_gap_ia: { t: "Gaps por IA", d: "A inteligencia artificial analisou todos os concorrentes e encontrou lacunas no mercado que podem ser exploradas.", s: "Modelo de IA proprietario" },

  // RANKING (7)
  rk_filtros: { t: "Filtros de Ranking", d: "Escolha ver o ranking por fonte: Instagram, Google ou Comercial. Cada filtro muda as colunas e a ordenacao da tabela.", s: "Filtro de interface" },
  rk_kpis: { t: "KPIs do Ranking", d: "Indicadores principais que mudam conforme o filtro selecionado. Mostra medias do setor e destaques.", s: "Dados da fonte selecionada" },
  rk_tabela: { t: "Tabela de Ranking", d: "Lista completa dos concorrentes ordenados pela metrica principal do filtro atual. Colunas mudam por fonte.", s: "Dados coletados em tempo real" },
  rk_barras: { t: "Grafico de Barras", d: "Visualizacao em barras da metrica principal de cada concorrente para comparacao rapida.", s: "Mesma fonte do filtro ativo" },
  rk_historico: { t: "Historico de Posicoes", d: "Como a posicao de cada concorrente mudou ao longo das ultimas semanas no ranking.", s: "Historico semanal de scoring" },
  rk_media: { t: "Media do Setor", d: "Valor medio da metrica principal entre todos os concorrentes monitorados.", s: "Calculo sobre dados coletados" },
  rk_engajamento: { t: "Engajamento Comparado", d: "Compara a taxa de engajamento de todos os concorrentes lado a lado.", s: "Instagram API" },

  // PERFIL (14)
  pf_seletor: { t: "Seletor de Concorrente", d: "Escolha qual concorrente quer analisar em detalhe. Todos os dados abaixo mudam para o perfil selecionado.", s: "Interface de selecao" },
  pf_kpis: { t: "KPIs do Perfil", d: "Principais numeros do concorrente selecionado: score, engajamento, seguidores e nota Google.", s: "Dados consolidados do perfil" },
  pf_evolucao: { t: "Evolucao do Score", d: "Como o score deste concorrente evoluiu nos ultimos 30 dias. Mostra tendencia de crescimento ou queda.", s: "Historico diario de scoring" },
  pf_calendario: { t: "Calendario de Posts", d: "Quando este concorrente publicou nos ultimos 30 dias. Mostra frequencia e consistencia de postagem.", s: "Instagram API" },
  pf_posts: { t: "Ultimos Posts", d: "Os posts mais recentes do concorrente com metricas de curtidas, comentarios e compartilhamentos.", s: "Instagram API" },
  pf_hashtags: { t: "Hashtags Mais Usadas", d: "As hashtags que este concorrente mais utiliza nos seus posts. Util para estrategia de SEO social.", s: "Instagram API" },
  pf_formatos: { t: "Distribuicao de Formatos", d: "Porcentagem de cada tipo de conteudo que este concorrente publica (Reels, Carrossel, Stories, Foto).", s: "Instagram API" },
  pf_reviews: { t: "Reviews Google", d: "Ultimas avaliacoes que este concorrente recebeu no Google com nota e texto resumido.", s: "Google Places API" },
  pf_nota: { t: "Nota Google", d: "A nota media no Google deste concorrente e como ela se compara ao setor.", s: "Google Places API" },
  pf_comparativo: { t: "Comparativo com Voce", d: "Compara diretamente as metricas do concorrente com as suas. Verde onde voce ganha, vermelho onde perde.", s: "Seu perfil vs concorrente" },
  pf_score: { t: "Score Detalhado", d: "Decomposicao do score em suas partes: presenca, engajamento, comercial e reputacao.", s: "Algoritmo de scoring" },
  pf_engrate: { t: "Taxa de Engajamento", d: "Porcentagem de seguidores que interagem com os posts. Acima de 3% e considerado bom no setor saude.", s: "Instagram API" },
  pf_ameaca: { t: "Nivel de Ameaca", d: "De 0 a 10, quanto este concorrente representa de ameaca para o seu negocio baseado em crescimento e sobreposicao de publico.", s: "Modelo de ameaca IA" },
  pf_google: { t: "Perfil Google", d: "Todas as metricas do Google deste concorrente: nota, avaliacoes, sentimento e tempo de resposta.", s: "Google Places API" },

  // MAPA (8)
  mp_bolhas: { t: "Mapa de Bolhas", d: "Visualizacao onde cada concorrente e uma bolha. Tamanho = seguidores, cor = nicho, posicao = score vs engajamento.", s: "Dados consolidados" },
  mp_kpis: { t: "KPIs do Mapa", d: "Numeros totais do mercado: total de concorrentes, media de score, total de seguidores no setor.", s: "Soma de todos os concorrentes" },
  mp_nichos: { t: "Nichos Identificados", d: "Quais especialidades medicas estao representadas entre seus concorrentes e quantos atuam em cada.", s: "Classificacao por nicho" },
  mp_radar: { t: "Grafico Radar", d: "Compara os concorrentes em 5 dimensoes: Presenca, Engajamento, Comercial, Reputacao e Conteudo.", s: "Scoring multidimensional" },
  mp_distribuicao: { t: "Distribuicao por Score", d: "Histograma mostrando quantos concorrentes estao em cada faixa de score (0-50, 50-70, 70-85, 85+).", s: "Algoritmo de scoring" },
  mp_quadrante: { t: "Quadrante Estrategico", d: "Divide os concorrentes em 4 quadrantes: Lideres, Desafiadores, Seguidores e Nicho. Mostra onde cada um se posiciona.", s: "Analise de posicionamento" },
  mp_anuncios: { t: "Deteccao de Anuncios", d: "Quantos e quais tipos de anuncios cada concorrente esta rodando no Instagram e Google.", s: "Meta Ad Library + Google Ads Transparency" },
  mp_nicho_disputa: { t: "Nicho em Disputa", d: "Identifica nichos com maior concentracao de concorrentes fortes, sinalizando areas de maior competicao.", s: "Analise de densidade competitiva" },

  // VOZ (12)
  vz_kpis: { t: "KPIs de Voz do Mercado", d: "Indicadores do sentimento geral: total de mencoes, media de sentimento, volume de reclamacoes e elogios.", s: "Google Reviews + Redes sociais" },
  vz_sentimento_barras: { t: "Sentimento por Concorrente", d: "Grafico de barras mostrando o percentual de sentimento positivo de cada concorrente.", s: "Analise de sentimento IA" },
  vz_evolucao: { t: "Evolucao do Sentimento", d: "Como o sentimento do setor variou ao longo das ultimas semanas. Mostra tendencia geral.", s: "Historico semanal de sentimento" },
  vz_nuvem: { t: "Nuvem de Palavras", d: "As palavras mais mencionadas nas avaliacoes e comentarios dos concorrentes. Maior = mais frequente.", s: "Analise textual de reviews" },
  vz_perguntas: { t: "Perguntas Frequentes", d: "As perguntas que os pacientes mais fazem nos comentarios e reviews dos concorrentes.", s: "Extracao de perguntas por IA" },
  vz_reclamacoes: { t: "Principais Reclamacoes", d: "Os temas mais reclamados pelos pacientes dos concorrentes. Oportunidade para voce ser melhor.", s: "Analise de reviews negativos" },
  vz_elogios: { t: "Principais Elogios", d: "O que os pacientes mais elogiam nos concorrentes. Pontos fortes a considerar na sua estrategia.", s: "Analise de reviews positivos" },
  vz_google_evo: { t: "Evolucao Notas Google", d: "Como a nota media do setor no Google mudou mes a mes nos ultimos 6 meses.", s: "Google Places API - historico" },
  vz_melhor: { t: "Melhor Avaliado", d: "O concorrente com a melhor nota no Google e o que os pacientes mais destacam.", s: "Google Places API" },
  vz_pior: { t: "Pior Avaliado", d: "O concorrente com a pior nota e os principais motivos das avaliacoes negativas.", s: "Google Places API" },
  vz_tema: { t: "Temas em Alta", d: "Assuntos que estao ganhando volume de mencoes no setor. Podem indicar tendencias ou problemas.", s: "Analise de tendencias IA" },
  vz_total_reclamacoes: { t: "Total de Reclamacoes", d: "Numero absoluto de reclamacoes identificadas no setor nas ultimas 4 semanas.", s: "Google Reviews + Reclame Aqui" },

  // ALERTAS (7)
  al_kpis: { t: "KPIs de Alertas", d: "Resumo dos alertas ativos: quantos sao criticos, oportunidades identificadas e alertas resolvidos.", s: "Sistema de monitoramento" },
  al_filtros: { t: "Filtros de Alertas", d: "Filtre por tipo (critico, oportunidade, informativo), por concorrente ou por fonte.", s: "Interface de filtros" },
  al_volume: { t: "Volume de Alertas", d: "Grafico mostrando quantos alertas foram gerados por dia nas ultimas 2 semanas.", s: "Historico de alertas" },
  al_feed: { t: "Feed de Alertas", d: "Lista cronologica de todos os alertas com detalhes. Os mais recentes aparecem primeiro.", s: "Sistema de monitoramento em tempo real" },
  al_config: { t: "Configuracoes de Alerta", d: "Defina quais tipos de mudanca devem gerar alertas e com qual frequencia voce quer ser notificado.", s: "Preferencias do usuario" },
  al_criticos: { t: "Alertas Criticos", d: "Mudancas que precisam de atencao imediata: queda brusca de nota, pico de reclamacoes ou crescimento acelerado de concorrente.", s: "Deteccao de anomalias IA" },
  al_oportunidades: { t: "Oportunidades Detectadas", d: "Situacoes onde o mercado apresenta uma brecha que voce pode aproveitar agora.", s: "Analise de oportunidades IA" },

  // BRIEFING (7)
  br_kpis: { t: "KPIs do Briefing", d: "Numeros-chave da semana: movimentos registrados, oportunidades e pontos de atencao.", s: "Consolidado semanal" },
  br_movimento: { t: "Movimentos da Semana", d: "Principais acoes que os concorrentes realizaram esta semana: novos posts, campanhas, mudancas de perfil.", s: "Monitoramento diario" },
  br_oportunidade: { t: "Oportunidades da Semana", d: "Situacoes identificadas esta semana que representam chances de voce ganhar mercado.", s: "Analise de oportunidades IA" },
  br_destaque: { t: "Destaque da Semana", d: "O acontecimento mais relevante entre todos os concorrentes nesta semana.", s: "Ranking de relevancia IA" },
  br_atencao: { t: "Pontos de Atencao", d: "Alertas importantes que nao sao criticos mas merecem acompanhamento.", s: "Sistema de alertas" },
  br_acoes: { t: "Acoes Sugeridas", d: "Lista de acoes concretas que voce pode tomar baseado nos movimentos dos concorrentes.", s: "Recomendacoes IA" },
  br_historico: { t: "Historico de Briefings", d: "Acesse os briefings das semanas anteriores para comparar evolucao.", s: "Arquivo de briefings" },
  // Column headers — Todos
  col_score: { t: "Score Composto", d: "Nota geral do concorrente de 0 a 100. Calculada como media ponderada: 40% presenca + 35% engajamento + 25% comercial.", s: "Calculo interno do sistema" },
  col_ameaca: { t: "Indice de Ameaca", d: "De 0 a 10, indica o quanto esse concorrente representa uma ameaca direta ao seu negocio. Leva em conta score, crescimento e sobreposicao de nicho.", s: "Modelo de ameaca IA" },
  col_seguidores: { t: "Seguidores", d: "Numero total de seguidores no Instagram. Atualizado diariamente pelo scrapper.", s: "Instagram scrapper diario" },
  col_engrate: { t: "Taxa de Engajamento", d: "Percentual de interacao: (curtidas + comentarios) / seguidores x 100. Media dos ultimos 30 posts.", s: "Instagram scrapper + calculo" },
  col_nota_google: { t: "Nota Google", d: "Avaliacao media do Google Business em estrelas (1 a 5). Atualizada diariamente.", s: "Google Business scrapper" },
  col_sentimento: { t: "Sentimento", d: "Percentual de comentarios e avaliacoes classificados como positivos pela IA.", s: "Analise de sentimento IA" },
  col_delta: { t: "Variacao Semanal", d: "Quantos pontos o score composto subiu ou caiu na ultima semana.", s: "Comparativo semanal" },
  col_trend: { t: "Tendencia 7 Dias", d: "Grafico miniatura mostrando a evolucao do score nos ultimos 7 dias.", s: "Historico de scores" },
  // Column headers — Instagram
  col_ig_seguidores: { t: "Seguidores Instagram", d: "Total de seguidores do perfil. Numero absoluto atualizado diariamente.", s: "Instagram scrapper" },
  col_ig_cresc: { t: "Crescimento Semanal", d: "Quantos seguidores ganhou (ou perdeu) nos ultimos 7 dias.", s: "Instagram scrapper — diferenca semanal" },
  col_ig_engrate: { t: "Eng Rate Instagram", d: "(Curtidas + Comentarios) / Seguidores x 100. Media dos ultimos 30 posts.", s: "Instagram scrapper + calculo" },
  col_ig_posts: { t: "Total de Posts", d: "Numero total de publicacoes no perfil (feed + reels).", s: "Instagram scrapper" },
  col_ig_curtidas: { t: "Curtidas Totais", d: "Soma de todas as curtidas em todos os posts do perfil.", s: "Instagram scrapper" },
  col_ig_views: { t: "Visualizacoes", d: "Total de visualizacoes acumuladas (reels + videos).", s: "Instagram scrapper" },
  col_ig_comentarios: { t: "Comentarios Totais", d: "Soma de todos os comentarios em todos os posts.", s: "Instagram scrapper" },
  col_ig_media_curtidas: { t: "Media de Curtidas", d: "Media de curtidas por post nos ultimos 30 posts.", s: "Instagram scrapper + calculo" },
  col_ig_media_comentarios: { t: "Media de Comentarios", d: "Media de comentarios por post nos ultimos 30 posts.", s: "Instagram scrapper + calculo" },
  col_ig_saves: { t: "Saves", d: "Quantidade de vezes que os posts foram salvos. So aparece para contas com acesso a esse dado.", s: "Instagram scrapper (estimado)" },
  col_ig_formato: { t: "Melhor Formato", d: "Tipo de conteudo com maior engajamento medio: Reels, Carrossel, Stories ou Foto.", s: "Analise de performance IA" },
  // Column headers — Google
  col_g_nota: { t: "Nota Google", d: "Media das avaliacoes no Google Business (1 a 5 estrelas).", s: "Google Business scrapper" },
  col_g_avaliacoes: { t: "Total Avaliacoes", d: "Quantidade total de avaliacoes no Google Business.", s: "Google Business scrapper" },
  col_g_aval_semana: { t: "Avaliacoes/Semana", d: "Novas avaliacoes recebidas nos ultimos 7 dias.", s: "Google Business scrapper — diferenca semanal" },
  col_g_sentimento: { t: "Sentimento Google", d: "% de avaliacoes classificadas como positivas pela IA.", s: "Analise de sentimento IA sobre reviews Google" },
  col_g_respondidas: { t: "Respondidas", d: "Percentual de avaliacoes que o negocio respondeu. Indica cuidado com a reputacao.", s: "Google Business scrapper" },
  col_g_fotos: { t: "Fotos Recentes", d: "Quantidade de fotos adicionadas ao perfil Google nos ultimos 30 dias.", s: "Google Business scrapper" },
  // Column headers — Comercial
  col_c_score: { t: "Score Comercial", d: "Nota de 0 a 100 que mede a sofisticacao comercial: link na bio, CTA, Shopping, anuncios e funil.", s: "Calculo interno" },
  col_c_linkbio: { t: "Link na Bio", d: "Se o perfil tem link ativo na bio do Instagram (Linktree, site, etc).", s: "Instagram scrapper" },
  col_c_cta: { t: "CTA Ativo", d: "Se o perfil usa chamadas para acao (agendar, comprar, etc) nas legendas.", s: "Analise de legendas IA" },
  col_c_shopping: { t: "Shopping Ativo", d: "Se o perfil tem Instagram Shopping configurado com produtos.", s: "Instagram scrapper" },
  col_c_anuncios: { t: "Anuncios Pagos", d: "Quantidade de anuncios pagos ativos detectados no Meta Ad Library.", s: "Meta Ad Library scrapper" },
  col_c_ofertas: { t: "Ofertas Detectadas", d: "Promocoes ou descontos identificados nas publicacoes recentes.", s: "Analise de legendas IA" },
  col_c_funnel: { t: "Funnel Detectado", d: "Se foi identificado um funil de vendas (link bio → landing page → checkout).", s: "Analise de links IA" },
};

/* ── CITooltip ── */
function CITooltip({ id }: { id: string }) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const ref = useRef<HTMLButtonElement>(null);
  const info = TIPS[id];
  if (!info) return null;
  const show = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ top: r.bottom + 8, left: r.right + 320 > window.innerWidth ? Math.max(8, r.right - 320) : r.left });
  };
  return (
    <span style={{ display: "inline-flex", marginLeft: 6 }}>
      <button ref={ref} onMouseEnter={show} onMouseLeave={() => setPos(null)}
        style={{ width: 18, height: 18, borderRadius: "50%", background: pos ? DS.primary : "#F8F9FA", border: `1px solid ${pos ? DS.primary : DS.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: pos ? "#fff" : "#999", lineHeight: 1 }}>i</span>
      </button>
      {pos && ReactDOM.createPortal(
        <div style={{ position: "fixed", top: pos.top, left: pos.left, zIndex: 999999, width: 300, background: "#1A1A1A", borderRadius: 10, padding: 14, boxShadow: "0 12px 40px rgba(0,0,0,.35)", pointerEvents: "none" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", margin: "0 0 5px" }}>{info.t}</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.85)", margin: "0 0 10px", lineHeight: 1.5 }}>{info.d}</p>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 8 }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: "#10B981", margin: "0 0 3px" }}>FONTE</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,.7)", margin: 0 }}>{info.s}</p>
          </div>
        </div>,
        document.body
      )}
    </span>
  );
}

/* ── Shared card style ── */
const cardS: React.CSSProperties = { background: "#fff", borderRadius: 3, boxShadow: "0 4px 4px rgba(0,0,0,0.25)", padding: 24 };

/* ── Sparkline SVG ── */
function Spark({ data, color = DS.accent, w = 80, h = 24 }: { data: number[]; color?: string; w?: number; h?: number }) {
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - mn) / rng) * h}`).join(" ");
  return <svg width={w} height={h} style={{ display: "block" }}><polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} /></svg>;
}

/* ── Simple bar ── */
function Bar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: DS.textSecondary, marginBottom: 3 }}>
        <span>{label}</span><span style={{ fontWeight: 600, color: DS.textPrimary }}>{value}</span>
      </div>
      <div style={{ height: 8, background: DS.divider, borderRadius: 4 }}>
        <div style={{ height: 8, borderRadius: 4, background: color, width: `${Math.min(100, (value / max) * 100)}%` }} />
      </div>
    </div>
  );
}

/* ── KPI Card ── */
function KPI({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div style={{ ...cardS, flex: 1, minWidth: 160, padding: 16 }}>
      <p style={{ fontSize: 11, color: DS.textTertiary, margin: "0 0 4px", textTransform: "uppercase", fontWeight: 600, letterSpacing: 0.5 }}>{label}</p>
      <p style={{ fontSize: 24, fontWeight: 700, color: color || DS.textPrimary, margin: "0 0 2px" }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: DS.textSecondary, margin: 0 }}>{sub}</p>}
    </div>
  );
}

/* ================================================== */
/*  TAB: VISAO GERAL                                  */
/* ================================================== */
function VisaoGeralTab() {
  const leader = competitors.reduce((a, b) => a.score > b.score ? a : b);
  const avgScore = Math.round(competitors.reduce((s, c) => s + c.score, 0) / competitors.length);
  const totalSegs = competitors.reduce((s, c) => s + parseInt(c.ig.seguidores.replace("K", "")) * 1000, 0);
  const avgSent = Math.round(competitors.reduce((s, c) => s + c.google.sentimento, 0) / competitors.length);
  const formats: Record<string, number> = {};
  competitors.forEach(c => { formats[c.ig.melhorFormato] = (formats[c.ig.melhorFormato] || 0) + 1; });

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
  const hours = ["8h", "10h", "12h", "14h", "16h", "18h", "20h"];
  const heatData = days.map(() => hours.map(() => Math.floor(Math.random() * 10)));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* KPIs */}
      <div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Indicadores Gerais</h3>
          <CITooltip id="vg_kpis" />
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <KPI label="Score Medio" value={avgScore} sub="do setor" />
          <KPI label="Concorrentes" value={competitors.length} sub="monitorados" />
          <KPI label="Total Seguidores" value={`${Math.round(totalSegs / 1000)}K`} sub="no setor" />
          <KPI label="Sentimento Medio" value={`${avgSent}%`} sub="positivo" color={avgSent > 70 ? DS.success : DS.warning} />
        </div>
      </div>

      {/* Score chart */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Score Competitivo</h3>
          <CITooltip id="vg_score_chart" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {competitors.sort((a, b) => b.score - a.score).map(c => (
            <div key={c.handle} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 12, color: DS.textSecondary, width: 140, flexShrink: 0 }}>{c.name}</span>
              <div style={{ flex: 1, height: 20, background: DS.divider, borderRadius: 3 }}>
                <div style={{ height: 20, borderRadius: 3, background: c.score >= 80 ? DS.success : c.score >= 70 ? DS.accent : DS.warning, width: `${c.score}%`, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>{c.score}</span>
                </div>
              </div>
              <Spark data={c.sparkline} w={60} h={18} />
            </div>
          ))}
        </div>
      </div>

      {/* Ranking preview */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Ranking Geral</h3>
          <CITooltip id="vg_ranking" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[...competitors].sort((a, b) => b.score - a.score).map((c, i) => (
            <div key={c.handle} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: i % 2 === 0 ? DS.bgTableRow : "#fff", borderRadius: 3 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: i < 3 ? DS.accent : DS.textTertiary, width: 24 }}>#{i + 1}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: DS.textPrimary, flex: 1 }}>{c.name}</span>
              <span style={{ fontSize: 12, color: DS.textSecondary }}>{c.handle}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, width: 40, textAlign: "right" }}>{c.score}</span>
              <span style={{ fontSize: 11, color: c.delta > 0 ? DS.success : c.delta < 0 ? DS.error : DS.textTertiary, width: 40, textAlign: "right" }}>{c.delta > 0 ? `+${c.delta}` : c.delta}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formatos */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Formatos Mais Usados</h3>
          <CITooltip id="vg_formatos" />
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {Object.entries(formats).sort((a, b) => b[1] - a[1]).map(([fmt, count]) => (
            <div key={fmt} style={{ textAlign: "center", minWidth: 80 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: DS.accent }}>{count}</div>
              <div style={{ fontSize: 12, color: DS.textSecondary }}>{fmt}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sentimento */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Sentimento Geral do Setor</h3>
          <CITooltip id="vg_sentimento" />
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: DS.success }}>{avgSent}%</div>
            <div style={{ fontSize: 12, color: DS.textSecondary }}>Positivo</div>
          </div>
          <div style={{ flex: 1 }}>
            {competitors.map(c => (
              <Bar key={c.handle} label={c.name} value={c.google.sentimento} max={100} color={c.google.sentimento > 80 ? DS.success : c.google.sentimento > 65 ? DS.accent : DS.warning} />
            ))}
          </div>
        </div>
      </div>

      {/* Gaps */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Gaps Identificados</h3>
          <CITooltip id="vg_gaps" />
        </div>
        {[
          { gap: "Nenhum concorrente faz Lives educativas regularmente", area: "Conteudo", impacto: "Alto" },
          { gap: "Apenas 2 tem Shopping ativo no Instagram", area: "Comercial", impacto: "Medio" },
          { gap: "Baixa taxa de resposta a reviews negativos (media 85%)", area: "Reputacao", impacto: "Alto" },
          { gap: "Poucos usam Threads como canal complementar", area: "Presenca", impacto: "Baixo" },
        ].map((g, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? `1px solid ${DS.divider}` : "none" }}>
            <span style={{ fontSize: 18 }}>&#9888;</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: DS.textPrimary, margin: 0 }}>{g.gap}</p>
              <p style={{ fontSize: 11, color: DS.textSecondary, margin: "2px 0 0" }}>Area: {g.area}</p>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: g.impacto === "Alto" ? DS.error : g.impacto === "Medio" ? DS.warning : DS.textTertiary, padding: "2px 8px", background: g.impacto === "Alto" ? "#FEF2F2" : g.impacto === "Medio" ? "#FFFBEB" : "#F9FAFB", borderRadius: 4 }}>{g.impacto}</span>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Mapa de Calor de Atividade</h3>
          <CITooltip id="vg_heatmap" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ display: "flex", gap: 2, marginLeft: 40 }}>{hours.map(h => <div key={h} style={{ width: 36, textAlign: "center", fontSize: 10, color: DS.textTertiary }}>{h}</div>)}</div>
          {days.map((d, di) => (
            <div key={d} style={{ display: "flex", gap: 2, alignItems: "center" }}>
              <span style={{ width: 36, fontSize: 10, color: DS.textTertiary }}>{d}</span>
              {heatData[di].map((v, hi) => (
                <div key={hi} style={{ width: 36, height: 20, borderRadius: 2, background: `rgba(59,130,246,${v / 10})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: v > 5 ? "#fff" : DS.textTertiary }}>{v}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Briefing */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Briefing Semanal</h3>
          <CITooltip id="vg_briefing" />
        </div>
        <p style={{ fontSize: 13, color: DS.textSecondary, lineHeight: 1.6, margin: 0 }}>
          Esta semana, <strong>@clinicavidaintegra</strong> teve o maior crescimento (+3 pontos). O setor manteve sentimento positivo em {avgSent}%. O formato Reels domina com 5 de 8 concorrentes usando como principal. Oportunidade: apenas 2 concorrentes usam Shopping no Instagram.
        </p>
      </div>

      {/* Lider */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Lider do Setor</h3>
          <CITooltip id="vg_lider" />
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: DS.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>{leader.score}</div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>{leader.name}</p>
            <p style={{ fontSize: 12, color: DS.textSecondary, margin: "2px 0 0" }}>{leader.handle} - {leader.niche}</p>
            <p style={{ fontSize: 12, color: DS.success, margin: "2px 0 0" }}>Eng Rate: {leader.ig.engRate}% | Google: {leader.google.nota}</p>
          </div>
        </div>
      </div>

      {/* Sentimento do setor */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Sentimento do Setor</h3>
          <CITooltip id="vg_sentimento_setor" />
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ textAlign: "center", flex: 1 }}><div style={{ fontSize: 20, fontWeight: 700, color: DS.success }}>62%</div><div style={{ fontSize: 11, color: DS.textSecondary }}>Positivo</div></div>
          <div style={{ textAlign: "center", flex: 1 }}><div style={{ fontSize: 20, fontWeight: 700, color: DS.textTertiary }}>24%</div><div style={{ fontSize: 11, color: DS.textSecondary }}>Neutro</div></div>
          <div style={{ textAlign: "center", flex: 1 }}><div style={{ fontSize: 20, fontWeight: 700, color: DS.error }}>14%</div><div style={{ fontSize: 11, color: DS.textSecondary }}>Negativo</div></div>
        </div>
      </div>

      {/* Gaps IA */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Gaps Identificados por IA</h3>
          <CITooltip id="vg_gap_ia" />
        </div>
        {[
          "Nenhum concorrente produz conteudo em video curto sobre saude mental",
          "Setor com baixa presenca no Google Meu Negocio (fotos atualizadas)",
          "Oportunidade em parcerias com influenciadores micro (5-20K seguidores)",
        ].map((gap, i) => (
          <div key={i} style={{ padding: "8px 0", borderBottom: i < 2 ? `1px solid ${DS.divider}` : "none", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: C.purple, fontSize: 14 }}>&#9733;</span>
            <p style={{ fontSize: 13, color: DS.textPrimary, margin: 0 }}>{gap}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================== */
/*  TAB: RANKING                                      */
/* ================================================== */
function RankingTab() {
  const [source, setSource] = useState<"Todos" | "Instagram" | "Google" | "Comercial">("Todos");

  const sorted = useMemo(() => {
    const arr = [...competitors];
    if (source === "Instagram") return arr.sort((a, b) => b.ig.engRate - a.ig.engRate);
    if (source === "Google") return arr.sort((a, b) => b.google.nota - a.google.nota);
    if (source === "Comercial") return arr.sort((a, b) => b.comercial.score - a.comercial.score);
    return arr.sort((a, b) => b.score - a.score);
  }, [source]);

  const columns: {label:string;tip?:string}[] = source === "Instagram"
    ? [{label:"#"},{label:"Handle"},{label:"Seguidores",tip:"col_ig_seguidores"},{label:"Cresc.",tip:"col_ig_cresc"},{label:"Eng Rate",tip:"col_ig_engrate"},{label:"Posts",tip:"col_ig_posts"},{label:"Curtidas",tip:"col_ig_curtidas"},{label:"Views",tip:"col_ig_views"},{label:"Coment.",tip:"col_ig_comentarios"},{label:"Med.Curt.",tip:"col_ig_media_curtidas"},{label:"Med.Com.",tip:"col_ig_media_comentarios"},{label:"Saves",tip:"col_ig_saves"},{label:"Formato",tip:"col_ig_formato"}]
    : source === "Google"
    ? [{label:"#"},{label:"Handle"},{label:"Nota",tip:"col_g_nota"},{label:"Avaliacoes",tip:"col_g_avaliacoes"},{label:"Aval/Sem",tip:"col_g_aval_semana"},{label:"Sentimento",tip:"col_g_sentimento"},{label:"Respondidas",tip:"col_g_respondidas"},{label:"Fotos",tip:"col_g_fotos"}]
    : source === "Comercial"
    ? [{label:"#"},{label:"Handle"},{label:"Score",tip:"col_c_score"},{label:"Link Bio",tip:"col_c_linkbio"},{label:"CTA",tip:"col_c_cta"},{label:"Shopping",tip:"col_c_shopping"},{label:"Anuncios",tip:"col_c_anuncios"},{label:"Ofertas",tip:"col_c_ofertas"},{label:"Funnel",tip:"col_c_funnel"}]
    : [{label:"#"},{label:"Handle"},{label:"Score",tip:"col_score"},{label:"Ameaca",tip:"col_ameaca"},{label:"Seguidores",tip:"col_seguidores"},{label:"Eng Rate",tip:"col_engrate"},{label:"Nota Google",tip:"col_nota_google"},{label:"Sentimento",tip:"col_sentimento"},{label:"Delta",tip:"col_delta"},{label:"Trend",tip:"col_trend"}];

  const kpis = source === "Instagram"
    ? [
        { label: "Media Eng Rate Setor", value: "3.1%", sub: "benchmark saude" },
        { label: "Mais Seguidores", value: "124K", sub: "@drajulianasaude" },
        { label: "Maior Cresc. Semana", value: "+2.8K", sub: "@clinicavidaintegra" },
        { label: "Melhor Formato", value: "Reels 63%", sub: "5 de 8 usam" },
      ]
    : source === "Google"
    ? [
        { label: "Media Nota Setor", value: "4.3", sub: "Google Reviews" },
        { label: "Melhor Avaliado", value: "4.8", sub: "@drajulianasaude" },
        { label: "Mais Avaliacoes", value: "342", sub: "@drajulianasaude" },
        { label: "Melhor Sentimento", value: "90%", sub: "@psicologa.ana" },
      ]
    : source === "Comercial"
    ? [
        { label: "Media Score Comercial", value: "72", sub: "no setor" },
        { label: "Mais Anuncios", value: "3", sub: "@clinicavidaintegra" },
        { label: "Funnels Detectados", value: "4", sub: "de 8 concorrentes" },
        { label: "Sem CTA", value: "2", sub: "concorrentes" },
      ]
    : [
        { label: "Media Score", value: "72", sub: "do setor" },
        { label: "Quem Subiu", value: "+4", sub: "@psicologa.ana" },
        { label: "Quem Caiu", value: "-2", sub: "@fisio.carlos" },
        { label: "Maior Engajamento", value: "5.1%", sub: "@nutri.marina" },
      ];

  const renderRow = (c: typeof competitors[0], i: number) => {
    const rowBg = i % 2 === 0 ? DS.bgTableRow : "#fff";
    const cellS: React.CSSProperties = { padding: "10px 8px", fontSize: 12, color: DS.textPrimary };
    if (source === "Instagram") {
      return (
        <tr key={c.handle} style={{ background: rowBg }}>
          <td style={cellS}>{i + 1}</td>
          <td style={{ ...cellS, fontWeight: 600 }}>{c.handle}</td>
          <td style={cellS}>{c.ig.seguidores}</td>
          <td style={{ ...cellS, color: c.ig.crescSemana.startsWith("-") ? DS.error : DS.success }}>{c.ig.crescSemana}</td>
          <td style={{ ...cellS, fontWeight: 700 }}>{c.ig.engRate}%</td>
          <td style={cellS}>{c.ig.totalPosts.toLocaleString()}</td>
          <td style={cellS}>{c.ig.curtidas}</td>
          <td style={cellS}>{c.ig.visualizacoes}</td>
          <td style={cellS}>{c.ig.comentarios}</td>
          <td style={cellS}>{c.ig.mediaCurtidas.toLocaleString()}</td>
          <td style={cellS}>{c.ig.mediaComentarios.toLocaleString()}</td>
          <td style={cellS}>{c.ig.saves.toLocaleString()}</td>
          <td style={cellS}>{c.ig.melhorFormato}</td>
        </tr>
      );
    }
    if (source === "Google") {
      return (
        <tr key={c.handle} style={{ background: rowBg }}>
          <td style={cellS}>{i + 1}</td>
          <td style={{ ...cellS, fontWeight: 600 }}>{c.handle}</td>
          <td style={{ ...cellS, fontWeight: 700 }}>{c.google.nota}</td>
          <td style={cellS}>{c.google.avaliacoes}</td>
          <td style={{ ...cellS, color: DS.success }}>+{c.google.avalSemana}</td>
          <td style={cellS}>{c.google.sentimento}%</td>
          <td style={cellS}>{c.google.respondidas}</td>
          <td style={cellS}>{c.google.fotos}</td>
        </tr>
      );
    }
    if (source === "Comercial") {
      return (
        <tr key={c.handle} style={{ background: rowBg }}>
          <td style={cellS}>{i + 1}</td>
          <td style={{ ...cellS, fontWeight: 600 }}>{c.handle}</td>
          <td style={{ ...cellS, fontWeight: 700 }}>{c.comercial.score}</td>
          <td style={cellS}>{c.comercial.linkBio ? "Sim" : "Nao"}</td>
          <td style={cellS}>{c.comercial.cta ? "Sim" : "Nao"}</td>
          <td style={cellS}>{c.comercial.shopping ? "Sim" : "Nao"}</td>
          <td style={cellS}>{c.comercial.anuncios}</td>
          <td style={cellS}>{c.comercial.ofertas}</td>
          <td style={cellS}>{c.comercial.funnel ? "Sim" : "Nao"}</td>
        </tr>
      );
    }
    return (
      <tr key={c.handle} style={{ background: rowBg }}>
        <td style={cellS}>{i + 1}</td>
        <td style={{ ...cellS, fontWeight: 600 }}>{c.handle}</td>
        <td style={{ ...cellS, fontWeight: 700 }}>{c.score}</td>
        <td style={cellS}>{c.threat}</td>
        <td style={cellS}>{c.ig.seguidores}</td>
        <td style={cellS}>{c.ig.engRate}%</td>
        <td style={cellS}>{c.google.nota}</td>
        <td style={cellS}>{c.google.sentimento}%</td>
        <td style={{ ...cellS, color: c.delta > 0 ? DS.success : c.delta < 0 ? DS.error : DS.textTertiary }}>{c.delta > 0 ? `+${c.delta}` : c.delta}</td>
        <td style={cellS}><Spark data={c.sparkline} w={50} h={16} /></td>
      </tr>
    );
  };

  const mainMetric = source === "Instagram"
    ? sorted.map(c => ({ name: c.name, val: c.ig.engRate }))
    : source === "Google"
    ? sorted.map(c => ({ name: c.name, val: c.google.nota }))
    : source === "Comercial"
    ? sorted.map(c => ({ name: c.name, val: c.comercial.score }))
    : sorted.map(c => ({ name: c.name, val: c.score }));

  const maxVal = Math.max(...mainMetric.map(m => m.val));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Filtros */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Filtrar por Fonte</h3>
          <CITooltip id="rk_filtros" />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {(["Todos", "Instagram", "Google", "Comercial"] as const).map(s => (
            <button key={s} onClick={() => setSource(s)}
              style={{ padding: "8px 16px", borderRadius: 6, border: `1px solid ${source === s ? DS.primary : DS.border}`, background: source === s ? DS.primary : "#fff", color: source === s ? "#fff" : DS.textPrimary, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>KPIs - {source}</h3>
          <CITooltip id="rk_kpis" />
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {kpis.map((k, i) => <KPI key={i} label={k.label} value={k.value} sub={k.sub} />)}
        </div>
      </div>

      {/* Table */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Ranking - {source}</h3>
          <CITooltip id="rk_tabela" />
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{columns.map(col => (
                <th key={col.label} style={{ padding: "8px", fontSize: 11, fontWeight: 600, color: DS.textTertiary, textAlign: "left", borderBottom: `2px solid ${DS.border}`, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>{col.label}{col.tip && <CITooltip id={col.tip}/>}</span>
                </th>
              ))}</tr>
            </thead>
            <tbody>{sorted.map((c, i) => renderRow(c, i))}</tbody>
          </table>
        </div>
      </div>

      {/* ══════ SEO SECTION — only when Google filter ══════ */}
      {source === "Google" && (<>
        {/* SEO KPIs */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:20 }}>
          {seoKpis.map((k,i) => {
            const sc = k.status==="ok"?DS.success:k.status==="warn"?DS.warning:DS.error;
            return (
              <div key={i} style={{ ...cardS, padding:18, position:"relative" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                  <p style={{ fontSize:10, fontWeight:700, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:.5, margin:0 }}>{k.label}</p>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:sc }}/>
                </div>
                <p style={{ fontSize:26, fontWeight:800, color:DS.textPrimary, margin:"0 0 4px" }}>{k.value}</p>
                {k.badge && <span style={{ fontSize:10, fontWeight:600, padding:"3px 10px", borderRadius:20, background:"#FEF3C7", color:"#D97706", border:"1px solid #FDE68A" }}>{k.badge}</span>}
                {k.delta && <span style={{ fontSize:11, fontWeight:600, color:k.up?DS.success:DS.error }}>{k.delta}</span>}
                {k.spark && <svg width="50" height="16" viewBox="0 0 50 16" style={{ position:"absolute", bottom:14, right:14 }}><polyline fill="none" stroke="#378ADD" strokeWidth="2" strokeLinejoin="round" points={k.spark.map((v,j)=>`${j*(50/(k.spark.length-1))},${16-((v-Math.min(...k.spark))/(Math.max(...k.spark)-Math.min(...k.spark)||1))*14}`).join(" ")}/></svg>}
              </div>
            );
          })}
        </div>

        {/* Share of Voice — Area Chart */}
        <div style={{ ...cardS, marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}><h3 style={{ fontSize:14, fontWeight:700, color:DS.textPrimary, margin:0 }}>Share of Voice</h3><CITooltip id="rk_barras"/></div>
            <div style={{ display:"flex", gap:14 }}>
              {sovLines.map(s => <span key={s.key} style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, color:DS.textSecondary }}><span style={{ width:14, height:3, borderRadius:2, background:s.color, display:"inline-block" }}/>{s.label}</span>)}
            </div>
          </div>
          <svg viewBox="0 0 800 200" style={{ width:"100%", height:200, display:"block" }}>
            {[0,25,50,75,100].map(v => { const y = 180-(v/100)*160; return <g key={v}><line x1="50" x2="780" y1={y} y2={y} stroke={DS.border} strokeWidth=".5" strokeDasharray="4,4"/><text x="44" y={y+4} textAnchor="end" fontSize="9" fill={DS.textTertiary}>{v}%</text></g>; })}
            {sovData.map((d,i) => <text key={i} x={60+i*(720/(sovData.length-1))} y={198} textAnchor="middle" fontSize="9" fill={DS.textTertiary}>{d.w}</text>)}
            {sovLines.map(s => {
              const pts = sovData.map((d,i) => ({ x:60+i*(720/(sovData.length-1)), y:180-((d as unknown as Record<string,number>)[s.key]/100)*160 }));
              const line = pts.map((p,i) => `${i===0?"M":"L"}${p.x},${p.y}`).join(" ");
              const area = `${line} L${pts[pts.length-1].x},180 L${pts[0].x},180 Z`;
              return <g key={s.key}><path d={area} fill={s.color} opacity={.08}/><path d={line} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round"/>{pts.map((p,i) => <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#fff" stroke={s.color} strokeWidth="2"/>)}</g>;
            })}
          </svg>
        </div>

        {/* ── Keywords do Setor — quem domina cada keyword ── */}
        <div style={{ ...cardS, marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:DS.textPrimary, margin:0 }}>Dominancia de Keywords no Setor</h3>
            <CITooltip id="rk_tabela"/>
          </div>
          <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 12px" }}>Quem ocupa as melhores posicoes em cada keyword estrategica</p>
          {seoKws.sort((a,b)=>b.vol-a.vol).slice(0,8).map(kw => {
            const maxPos = 30;
            const voceW = kw.pos > 0 ? Math.max(5, ((maxPos - kw.pos) / maxPos) * 100) : 0;
            const compW = kw.cPos > 0 ? Math.max(5, ((maxPos - kw.cPos) / maxPos) * 100) : 0;
            const voceC = kw.pos === 0 ? DS.textDisabled : kw.pos <= 3 ? DS.success : kw.pos <= 10 ? "#378ADD" : kw.pos <= 20 ? DS.warning : DS.error;
            const compC = kw.cPos === 0 ? DS.textDisabled : kw.cPos <= 3 ? DS.success : kw.cPos <= 10 ? "#378ADD" : kw.cPos <= 20 ? DS.warning : DS.error;
            return (
              <div key={kw.kw} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                  <span style={{ fontSize:12, fontWeight:600, color:DS.textPrimary }}>{kw.kw}</span>
                  <span style={{ fontSize:10, color:DS.textTertiary }}>{kw.vol.toLocaleString("pt-BR")} buscas/mes</span>
                </div>
                <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                  <span style={{ fontSize:9, color:"#378ADD", width:50, flexShrink:0, fontWeight:600 }}>Voce</span>
                  <div style={{ flex:1, height:14, background:DS.divider, borderRadius:3, overflow:"hidden" }}>
                    {kw.pos > 0 && <div style={{ height:"100%", width:`${voceW}%`, background:voceC, borderRadius:3, display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:4 }}>
                      <span style={{ fontSize:8, fontWeight:700, color:"#fff" }}>#{kw.pos}</span>
                    </div>}
                  </div>
                </div>
                <div style={{ display:"flex", gap:6, alignItems:"center", marginTop:2 }}>
                  <span style={{ fontSize:9, color:DS.error, width:50, flexShrink:0, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{kw.comp === "—" ? "—" : kw.comp.replace("@","")}</span>
                  <div style={{ flex:1, height:14, background:DS.divider, borderRadius:3, overflow:"hidden" }}>
                    {kw.cPos > 0 && <div style={{ height:"100%", width:`${compW}%`, background:compC, borderRadius:3, display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:4 }}>
                      <span style={{ fontSize:8, fontWeight:700, color:"#fff" }}>#{kw.cPos}</span>
                    </div>}
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ display:"flex", gap:10, marginTop:8, borderTop:`1px solid ${DS.divider}`, paddingTop:8 }}>
            {[{c:DS.success,l:"Pos 1-3"},{c:"#378ADD",l:"4-10"},{c:DS.warning,l:"11-20"},{c:DS.error,l:"21+"}].map(i => <span key={i.l} style={{ fontSize:10, color:DS.textTertiary, display:"flex", alignItems:"center", gap:3 }}><span style={{ width:8, height:8, borderRadius:2, background:i.c }}/>{i.l}</span>)}
          </div>
        </div>

        {/* ── Scatter do Setor + Gap Table lado a lado ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          {/* Scatter — Oportunidades de mercado */}
          <div style={cardS}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <h3 style={{ fontSize:14, fontWeight:700, color:DS.textPrimary, margin:0 }}>Mapa de Oportunidades do Setor</h3>
              <CITooltip id="rk_barras"/>
            </div>
            <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 10px" }}>Cada ponto = keyword nao explorada. Verde = facil de atacar.</p>
            <svg viewBox="0 0 400 260" style={{ width:"100%", height:220, display:"block" }}>
              <line x1="50" x2="380" y1="230" y2="230" stroke={DS.border}/><line x1="50" x2="50" y1="20" y2="230" stroke={DS.border}/>
              <text x="215" y="255" textAnchor="middle" fontSize="9" fill={DS.textTertiary}>Volume de Busca Mensal</text>
              <text x="14" y="130" textAnchor="middle" fontSize="9" fill={DS.textTertiary} transform="rotate(-90,14,130)">Dificuldade</text>
              {[0,20,40,60,80].map(v => { const y=230-(v/80)*210; return <g key={v}><line x1="50" x2="380" y1={y} y2={y} stroke={DS.divider} strokeWidth=".5"/><text x="44" y={y+4} textAnchor="end" fontSize="8" fill={DS.textDisabled}>{v}</text></g>; })}
              {/* Quick win zone */}
              <rect x="200" y={230-(40/80)*210} width="180" height={(40/80)*210} fill={DS.success} opacity={.06} rx="4"/>
              <line x1="200" x2="200" y1="20" y2="230" stroke={DS.success} strokeWidth="1" strokeDasharray="4,4" opacity={.3}/>
              <line x1="50" x2="380" y1={230-(40/80)*210} y2={230-(40/80)*210} stroke={DS.success} strokeWidth="1" strokeDasharray="4,4" opacity={.3}/>
              <text x="290" y={230-(40/80)*210-6} textAnchor="middle" fontSize="9" fill={DS.success} fontWeight="600">Quick Wins</text>
              {seoScatter.map((pt,i) => {
                const x = Math.min(50+(pt.vol/20000)*330, 378);
                const y = Math.max(230-(pt.dif/80)*210, 22);
                const isEasy = pt.dif < 40;
                const isNoOne = pt.comp === "ninguem";
                return <g key={i}>
                  <circle cx={x} cy={y} r={isNoOne?7:5} fill={isEasy?DS.success:"#CBD5E1"} stroke={isNoOne?"#059669":"#94A3B8"} strokeWidth={isNoOne?2.5:1.5} opacity={.85}/>
                  {isNoOne && <circle cx={x} cy={y} r={11} fill="none" stroke={DS.success} strokeWidth="1" strokeDasharray="2,2" opacity={.4}/>}
                </g>;
              })}
            </svg>
            <div style={{ display:"flex", gap:12, marginTop:8 }}>
              <span style={{ fontSize:10, color:DS.textTertiary, display:"flex", alignItems:"center", gap:4 }}><span style={{ width:8, height:8, borderRadius:"50%", background:DS.success }}/>Facil (dif.&lt;40)</span>
              <span style={{ fontSize:10, color:DS.textTertiary, display:"flex", alignItems:"center", gap:4 }}><span style={{ width:8, height:8, borderRadius:"50%", background:"#CBD5E1" }}/>Dificil (dif.&gt;40)</span>
              <span style={{ fontSize:10, color:DS.textTertiary, display:"flex", alignItems:"center", gap:4 }}><span style={{ width:12, height:12, borderRadius:"50%", border:`2px dashed ${DS.success}` }}/>Ninguem domina</span>
            </div>
          </div>

          {/* Gap Analysis — visao setor */}
          <div style={cardS}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <h3 style={{ fontSize:14, fontWeight:700, color:DS.textPrimary, margin:0 }}>Gap Analysis — Setor</h3>
              <CITooltip id="rk_historico"/>
            </div>
            <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 10px" }}>Keywords com maior volume onde voce nao esta no top 10</p>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
              <thead><tr style={{ borderBottom:`2px solid ${DS.border}` }}>
                {["Keyword","Lider","Pos.","Voce","Volume","Status"].map(h => <th key={h} style={{ padding:"6px 4px", textAlign:"left", fontWeight:600, color:DS.textTertiary, fontSize:10, textTransform:"uppercase" }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {seoKws.sort((a,b)=>b.vol-a.vol).map((k,i) => {
                  const isGap = k.pos === 0 || k.pos > 10;
                  const isWin = k.pos > 0 && k.pos <= 3;
                  const statusLabel = isGap ? "GAP" : isWin ? "LIDER" : "DISPUTA";
                  const statusColor = isGap ? DS.error : isWin ? DS.success : DS.warning;
                  const pc = k.pos===0?DS.textDisabled:k.pos<=3?DS.success:k.pos<=10?"#378ADD":k.pos<=20?DS.warning:DS.error;
                  return (<tr key={k.kw} style={{ background:i%2===0?DS.bgTableRow:"#fff" }}>
                    <td style={{ padding:"7px 4px", fontWeight:600, color:DS.textPrimary }}>{k.kw}</td>
                    <td style={{ padding:"7px 4px", color:DS.textSecondary, fontSize:10 }}>{k.comp}</td>
                    <td style={{ padding:"7px 4px", fontWeight:700, color:k.cPos<=3?DS.success:"#378ADD" }}>{k.cPos>0?`#${k.cPos}`:"—"}</td>
                    <td style={{ padding:"7px 4px", fontWeight:700, color:pc }}>{k.pos>0?`#${k.pos}`:"—"}</td>
                    <td style={{ padding:"7px 4px", fontWeight:600 }}>{k.vol.toLocaleString("pt-BR")}</td>
                    <td style={{ padding:"7px 4px" }}><span style={{ fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:12, background:`${statusColor}15`, color:statusColor, border:`1px solid ${statusColor}30` }}>{statusLabel}</span></td>
                  </tr>);
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>)}

      {/* Barras */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Comparativo em Barras</h3>
          <CITooltip id="rk_barras" />
        </div>
        {mainMetric.map((m, i) => (
          <Bar key={i} label={m.name} value={m.val} max={maxVal} color={i === 0 ? DS.accent : i === 1 ? DS.primaryLight : DS.textTertiary} />
        ))}
      </div>

      {/* Historico */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Historico de Posicoes</h3>
          <CITooltip id="rk_historico" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sorted.slice(0, 5).map(c => (
            <div key={c.handle} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 12, color: DS.textSecondary, width: 130, flexShrink: 0 }}>{c.name}</span>
              <Spark data={c.scoreHistory} w={200} h={24} color={DS.accent} />
            </div>
          ))}
        </div>
      </div>

      {/* Media setor */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Media do Setor</h3>
          <CITooltip id="rk_media" />
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 28, fontWeight: 700, color: DS.accent }}>72</div><div style={{ fontSize: 11, color: DS.textSecondary }}>Score Medio</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 28, fontWeight: 700, color: DS.success }}>3.7%</div><div style={{ fontSize: 11, color: DS.textSecondary }}>Eng Rate Medio</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 28, fontWeight: 700, color: C.purple }}>4.3</div><div style={{ fontSize: 11, color: DS.textSecondary }}>Nota Google Media</div></div>
        </div>
      </div>

      {/* Engajamento comparado */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Engajamento Comparado</h3>
          <CITooltip id="rk_engajamento" />
        </div>
        {[...competitors].sort((a, b) => b.ig.engRate - a.ig.engRate).map(c => (
          <Bar key={c.handle} label={`${c.name} (${c.ig.engRate}%)`} value={c.ig.engRate} max={6} color={c.ig.engRate > 4 ? DS.success : c.ig.engRate > 3 ? DS.accent : DS.warning} />
        ))}
      </div>
    </div>
  );
}

/* ================================================== */
/*  TAB: PERFIL                                       */
/* ================================================== */
function PerfilTab() {
  const [sel, setSel] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);
  const c = competitors[sel];

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setPickerOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = competitors.filter(comp =>
    comp.name.toLowerCase().includes(searchText.toLowerCase()) ||
    comp.handle.toLowerCase().includes(searchText.toLowerCase()) ||
    comp.niche.toLowerCase().includes(searchText.toLowerCase())
  );

  const initials = (name: string) => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const nicheColors: Record<string, string> = { "Medicina Integrativa": DS.primary, "Clinica Geral": DS.success, "Ortopedia": C.orange, "Nutricao Funcional": C.teal, "Dermatologia": C.purple, "Fisioterapia Esportiva": DS.warning, "Psicologia Clinica": "#DB2777", "Odontologia Estetica": DS.accent };

  const hashtags = ["#saudeintegral", "#medicinaintegrativa", "#bemestar", "#qualidadedevida", "#saude", "#nutricao", "#fitness", "#medicinanatural"];
  const formatDist = [
    { fmt: "Reels", pct: 45 },
    { fmt: "Carrossel", pct: 30 },
    { fmt: "Stories", pct: 15 },
    { fmt: "Foto", pct: 10 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Seletor Dropdown */}
      <div ref={pickerRef} style={{ position: "relative" }}>
        <button
          onClick={() => { setPickerOpen(v => !v); setSearchText(""); }}
          style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 18px 10px 12px",
            borderRadius: 10, border: `2px solid ${(nicheColors[c.niche] || DS.primary)}40`,
            background: `${(nicheColors[c.niche] || DS.primary)}06`, cursor: "pointer", width: "auto",
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: "50%", background: nicheColors[c.niche] || DS.primary,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{initials(c.name)}</span>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, lineHeight: 1.2 }}>{c.name}</div>
            <div style={{ fontSize: 11, color: DS.textTertiary }}>{c.handle} · {c.niche}</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DS.textTertiary} strokeWidth="2.5" style={{ marginLeft: 8, transition: "transform .2s", transform: pickerOpen ? "rotate(180deg)" : "" }}>
            <path d="m6 9 6 6 6-6"/>
          </svg>
          <CITooltip id="pf_seletor" />
        </button>

        {pickerOpen && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 9999,
            background: "#fff", border: `1px solid ${DS.border}`, borderRadius: 12,
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)", padding: 8, minWidth: 340, maxHeight: 400, overflow: "hidden",
            display: "flex", flexDirection: "column",
          }}>
            {/* Search */}
            <div style={{ padding: "4px 8px 8px", borderBottom: `1px solid ${DS.divider}` }}>
              <div style={{ position: "relative" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DS.textTertiary} strokeWidth="2" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input
                  type="text" placeholder="Buscar por nome, handle ou nicho..."
                  value={searchText} onChange={e => setSearchText(e.target.value)}
                  autoFocus
                  style={{
                    width: "100%", padding: "9px 12px 9px 32px", borderRadius: 8,
                    border: `1px solid ${DS.border}`, fontSize: 13, color: DS.textPrimary,
                    outline: "none", background: DS.bgTableRow, boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
            {/* List */}
            <div style={{ overflowY: "auto", maxHeight: 300, padding: 4 }}>
              {filtered.length === 0 && <div style={{ padding: 20, textAlign: "center", color: DS.textTertiary, fontSize: 13 }}>Nenhum resultado</div>}
              {filtered.map((comp, fi) => {
                const oi = competitors.indexOf(comp);
                const isActive = sel === oi;
                const color = nicheColors[comp.niche] || DS.primary;
                return (
                  <button key={comp.handle}
                    onClick={() => { setSel(oi); setPickerOpen(false); setSearchText(""); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, width: "100%",
                      padding: "8px 10px", borderRadius: 8, border: "none",
                      background: isActive ? `${color}10` : "transparent",
                      cursor: "pointer", textAlign: "left", transition: "background .1s",
                    }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget).style.background = DS.bgTableRow; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget).style.background = "transparent"; }}
                  >
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%", background: color,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{initials(comp.name)}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: DS.textPrimary }}>{comp.name}</div>
                      <div style={{ fontSize: 11, color: DS.textTertiary }}>{comp.handle} · {comp.niche}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color }}>{comp.score}</div>
                      <div style={{ fontSize: 9, color: DS.textTertiary }}>score</div>
                    </div>
                    {isActive && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* KPIs */}
      <div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>KPIs - {c.name}</h3>
          <CITooltip id="pf_kpis" />
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <KPI label="Score Geral" value={c.score} sub={`${c.delta > 0 ? "+" : ""}${c.delta} esta semana`} />
          <KPI label="Seguidores" value={c.ig.seguidores} sub={c.ig.crescSemana} />
          <KPI label="Eng Rate" value={`${c.ig.engRate}%`} sub="Instagram" color={c.ig.engRate > 4 ? DS.success : DS.accent} />
          <KPI label="Nota Google" value={c.google.nota} sub={`${c.google.avaliacoes} avaliacoes`} />
        </div>
      </div>

      {/* ══════ INSTAGRAM PROFILE MOCKUP ══════ */}
      <div style={{ display:"flex", gap:24 }}>
        {/* iPhone Frame */}
        <div style={{
          width:375, flexShrink:0,
          background:"#fff", borderRadius:40, border:"3px solid #1A1A1A",
          boxShadow:"0 8px 40px rgba(0,0,0,0.15), inset 0 0 0 2px #333",
          overflow:"hidden", position:"relative",
        }}>
          {/* Notch */}
          <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:150, height:28, background:"#1A1A1A", borderRadius:"0 0 20px 20px", zIndex:10 }}/>
          {/* Status bar */}
          <div style={{ height:50, background:"#fff", display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:"0 24px 6px", fontSize:11, fontWeight:600, color:"#1A1A1A" }}>
            <span>9:41</span>
            <div style={{ display:"flex", gap:4, alignItems:"center" }}>
              <svg width="14" height="10" viewBox="0 0 14 10"><rect x="0" y="6" width="2.5" height="4" rx="0.5" fill="#1A1A1A"/><rect x="3.5" y="4" width="2.5" height="6" rx="0.5" fill="#1A1A1A"/><rect x="7" y="2" width="2.5" height="8" rx="0.5" fill="#1A1A1A"/><rect x="10.5" y="0" width="2.5" height="10" rx="0.5" fill="#1A1A1A"/></svg>
              <svg width="16" height="10" viewBox="0 0 16 10"><rect x="0" y="0" width="14" height="10" rx="2" stroke="#1A1A1A" strokeWidth="1" fill="none"/><rect x="1.5" y="1.5" width="9" height="7" rx="1" fill="#1A1A1A"/><rect x="14.5" y="3" width="1.5" height="4" rx="0.5" fill="#1A1A1A"/></svg>
            </div>
          </div>

          {/* Scrollable content */}
          <div style={{ height:680, overflowY:"auto", background:"#fff" }}>
            {/* Profile header */}
            <div style={{ padding:"8px 16px 0" }}>
              {/* Top nav */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <span style={{ fontSize:16, fontWeight:700, color:"#1A1A1A" }}>{c.handle.replace("@","")}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                </div>
                <div style={{ display:"flex", gap:16 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </div>
              </div>

              {/* Avatar + Stats */}
              <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:12 }}>
                <div style={{
                  width:76, height:76, borderRadius:"50%",
                  background:`linear-gradient(135deg, ${nicheColors[c.niche]||DS.primary}, ${DS.accent})`,
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                  border:"3px solid #fff", boxShadow:"0 0 0 2px #E1306C",
                }}>
                  <span style={{ fontSize:24, fontWeight:700, color:"#fff" }}>{initials(c.name)}</span>
                </div>
                <div style={{ display:"flex", gap:0, flex:1, justifyContent:"space-around" }}>
                  {[
                    { n:c.ig.totalPosts.toLocaleString(), l:"posts" },
                    { n:c.ig.seguidores, l:"seguidores" },
                    { n:Math.round(parseInt(c.ig.seguidores)*0.15).toLocaleString()+"K", l:"seguindo" },
                  ].map(s => (
                    <div key={s.l} style={{ textAlign:"center" }}>
                      <div style={{ fontSize:15, fontWeight:700, color:"#1A1A1A" }}>{s.n}</div>
                      <div style={{ fontSize:11, color:"#666" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#1A1A1A", marginBottom:2 }}>{c.name}</div>
                <div style={{ fontSize:12, color:"#666", lineHeight:1.4 }}>{c.niche} | Saude Integrativa</div>
                <div style={{ fontSize:12, color:"#666", lineHeight:1.4 }}>📍 Sao Paulo, Brasil</div>
                <div style={{ fontSize:12, color:"#00376B", lineHeight:1.4, marginTop:2 }}>{c.ig.ultimoPost === "Hoje" ? "🔗 link na bio ativo" : ""}</div>
              </div>

              {/* Action buttons */}
              <div style={{ display:"flex", gap:6, marginBottom:14 }}>
                <div style={{ flex:1, background:"#0095F6", borderRadius:8, padding:"7px 0", textAlign:"center", fontSize:13, fontWeight:600, color:"#fff" }}>Seguir</div>
                <div style={{ flex:1, background:"#EFEFEF", borderRadius:8, padding:"7px 0", textAlign:"center", fontSize:13, fontWeight:600, color:"#1A1A1A" }}>Mensagem</div>
                <div style={{ width:32, background:"#EFEFEF", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              {/* Stories highlights */}
              <div style={{ display:"flex", gap:12, marginBottom:14, overflowX:"auto" }}>
                {["Destaques","Consultas","Equipe","Dicas","FAQ"].map((h,i) => (
                  <div key={h} style={{ textAlign:"center", flexShrink:0 }}>
                    <div style={{ width:58, height:58, borderRadius:"50%", border:"2px solid #DBDBDB", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:4, background:"#FAFAFA" }}>
                      <span style={{ fontSize:18 }}>{["⭐","🩺","👥","💡","❓"][i]}</span>
                    </div>
                    <div style={{ fontSize:10, color:"#1A1A1A" }}>{h}</div>
                  </div>
                ))}
              </div>

              {/* Tab icons (grid/reels/tagged) */}
              <div style={{ display:"flex", borderTop:"1px solid #EFEFEF" }}>
                {[
                  <svg key="grid" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
                  <svg key="reels" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M10 8l6 4-6 4V8z" fill="#999"/></svg>,
                  <svg key="tagged" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                ].map((icon,i) => (
                  <div key={i} style={{ flex:1, display:"flex", justifyContent:"center", padding:"10px 0", borderBottom:i===0?"2px solid #1A1A1A":"none" }}>{icon}</div>
                ))}
              </div>
            </div>

            {/* Post Grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
              {Array.from({length:18}).map((_,i) => {
                const types = ["reel","foto","carrossel","reel","foto","reel"];
                const type = types[i % types.length];
                const hue = (i * 37 + parseInt(c.ig.seguidores) * 7) % 360;
                const isReel = type === "reel";
                const likes = Math.round(c.ig.mediaCurtidas * (0.6 + Math.random() * 0.8));
                const comments = Math.round(c.ig.mediaComentarios * (0.5 + Math.random() * 1));
                return (
                  <div key={i} style={{
                    aspectRatio:"1", position:"relative", cursor:"pointer",
                    background:`linear-gradient(${135+i*20}deg, hsl(${hue},45%,75%), hsl(${(hue+40)%360},50%,60%))`,
                    overflow:"hidden",
                  }}>
                    {/* Type indicator */}
                    {isReel && <div style={{ position:"absolute", top:6, right:6, zIndex:2 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M10 8l6 4-6 4V8z"/><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="#fff" strokeWidth="1.5"/></svg>
                    </div>}
                    {type === "carrossel" && <div style={{ position:"absolute", top:6, right:6, zIndex:2 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="4" width="16" height="16" rx="2"/><rect x="6" y="2" width="16" height="16" rx="2"/></svg>
                    </div>}
                    {/* Hover overlay with metrics */}
                    <div style={{
                      position:"absolute", inset:0, background:"rgba(0,0,0,0.35)",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:16,
                      opacity:0, transition:"opacity .2s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = "1"}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = "0"}
                    >
                      <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        <span style={{ color:"#fff", fontSize:12, fontWeight:700 }}>{likes.toLocaleString()}</span>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        <span style={{ color:"#fff", fontSize:12, fontWeight:700 }}>{comments.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Home bar */}
          <div style={{ height:30, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:120, height:4, background:"#1A1A1A", borderRadius:2 }}/>
          </div>
        </div>

        {/* Side panel — Mini chart cards */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:12 }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:DS.textPrimary, margin:0 }}>Metricas do Perfil</h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
            {(() => {
              const seed = parseInt(c.ig.seguidores) || 100;
              const metrics = [
                { l:"Curtidas Totais", v:c.ig.curtidas, prev:Math.round(parseInt(String(c.ig.curtidas).replace(/[K.]/g,""))*0.92)+"K", color:"#E1306C",
                  spark:[68,72,71,75,78,80,85,88,91,90,94,100].map(p=>Math.round(p*(seed%5+1))) },
                { l:"Visualizacoes", v:c.ig.visualizacoes, prev:Math.round(parseFloat(String(c.ig.visualizacoes).replace("M",""))*0.89*10)/10+"M", color:"#833AB4",
                  spark:[60,65,62,68,72,70,75,80,78,84,90,100].map(p=>Math.round(p*(seed%7+1))) },
                { l:"Comentarios", v:c.ig.comentarios, prev:Math.round(parseFloat(String(c.ig.comentarios).replace("K",""))*0.91*10)/10+"K", color:"#F77737",
                  spark:[55,58,62,60,65,68,70,72,75,80,85,100].map(p=>Math.round(p*(seed%4+1))) },
                { l:"Media Curtidas", v:c.ig.mediaCurtidas.toLocaleString(), prev:Math.round(c.ig.mediaCurtidas*0.93).toLocaleString(), color:DS.error,
                  spark:[70,72,68,75,78,80,76,82,85,88,92,100].map(p=>Math.round(p*c.ig.mediaCurtidas/100)) },
                { l:"Media Comentarios", v:c.ig.mediaComentarios.toLocaleString(), prev:Math.round(c.ig.mediaComentarios*0.88).toLocaleString(), color:DS.warning,
                  spark:[60,65,58,62,70,72,68,75,80,78,85,100].map(p=>Math.round(p*c.ig.mediaComentarios/100)) },
                { l:"Saves", v:c.ig.saves.toLocaleString(), prev:Math.round(c.ig.saves*0.87).toLocaleString(), color:DS.success,
                  spark:[50,55,58,62,65,60,68,72,78,82,88,100].map(p=>Math.round(p*c.ig.saves/100)) },
                { l:"Shares", v:c.ig.shares.toLocaleString(), prev:Math.round(c.ig.shares*0.90).toLocaleString(), color:DS.accent,
                  spark:[65,68,62,70,72,75,78,80,82,85,90,100].map(p=>Math.round(p*c.ig.shares/100)) },
                { l:"Eng Rate", v:`${c.ig.engRate}%`, prev:`${(c.ig.engRate*0.94).toFixed(1)}%`, color:C.purple,
                  spark:[3.8,3.9,4.0,3.9,4.1,4.2,4.0,4.3,4.4,4.5,4.6,c.ig.engRate].map(v=>Math.round(v*20)) },
                { l:"Posts/Semana", v:String(c.ig.postsSemana), prev:String(Math.max(1,c.ig.postsSemana-1)), color:C.teal,
                  spark:[3,4,3,4,5,4,5,4,5,5,4,c.ig.postsSemana].map(v=>v*20) },
                { l:"Total de Posts", v:c.ig.totalPosts.toLocaleString(), prev:Math.round(c.ig.totalPosts*0.96).toLocaleString(), color:DS.primary,
                  spark:[70,73,76,78,80,82,84,87,90,93,96,100].map(p=>Math.round(p*c.ig.totalPosts/100)) },
              ];
              return metrics.map(m => {
                const maxS = Math.max(...m.spark);
                const minS = Math.min(...m.spark);
                const range = maxS - minS || 1;
                const pts = m.spark.map((v,i) => `${i*(60/(m.spark.length-1))},${28-((v-minS)/range)*24}`).join(" ");
                const areaPts = pts + ` 60,28 0,28`;
                const curVal = parseFloat(String(m.v).replace(/[^0-9.]/g,"")) || 0;
                const prevVal = parseFloat(String(m.prev).replace(/[^0-9.]/g,"")) || 0;
                const delta = prevVal > 0 ? Math.round(((curVal-prevVal)/prevVal)*100) : 0;
                const deltaUp = delta >= 0;
                return (
                  <div key={m.l} style={{ ...cardS, padding:14, position:"relative", overflow:"hidden" }}>
                    <p style={{ fontSize:9, fontWeight:700, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:.5, margin:"0 0 4px" }}>{m.l}</p>
                    <p style={{ fontSize:20, fontWeight:800, color:DS.textPrimary, margin:"0 0 2px", lineHeight:1 }}>{m.v}</p>
                    {/* Sparkline */}
                    <svg width="60" height="28" viewBox="0 0 60 28" style={{ position:"absolute", top:10, right:10 }}>
                      <polygon points={areaPts} fill={m.color} opacity={.1}/>
                      <polyline points={pts} fill="none" stroke={m.color} strokeWidth="1.5" strokeLinejoin="round"/>
                      <circle cx="60" cy={28-((m.spark[m.spark.length-1]-minS)/range)*24} r="2.5" fill={m.color}/>
                    </svg>
                    {/* Comparativo mes anterior */}
                    <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:6 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={deltaUp?DS.success:DS.error} strokeWidth="3">
                        <path d={deltaUp?"M12 19V5M5 12l7-7 7 7":"M12 5v14M5 12l7 7 7-7"}/>
                      </svg>
                      <span style={{ fontSize:10, fontWeight:700, color:deltaUp?DS.success:DS.error }}>{deltaUp?"+":""}{delta}%</span>
                      <span style={{ fontSize:9, color:DS.textTertiary }}>vs mes ant.</span>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
          {/* Analise IA */}
          <div style={{ ...cardS, background:`${nicheColors[c.niche]||DS.primary}08`, border:`1px solid ${nicheColors[c.niche]||DS.primary}20`, padding:16 }}>
            <p style={{ fontSize:12, fontWeight:600, color:nicheColors[c.niche]||DS.primary, margin:"0 0 6px" }}>Analise IA</p>
            <p style={{ fontSize:11, color:DS.textSecondary, margin:0, lineHeight:1.6 }}>
              {c.name} publica em media {c.ig.postsSemana}x/semana com foco em {c.ig.melhorFormato}.
              Taxa de engajamento de {c.ig.engRate}% esta {c.ig.engRate > 3.5 ? "acima" : "abaixo"} da media do setor (3.1%).
              {c.ig.saves > 1000 ? " Alto volume de saves indica conteudo educativo de valor." : ""}
              {c.comercial.linkBio ? " Link na bio ativo — possivel funil de conversao." : " Sem link na bio — oportunidade comercial perdida."}
            </p>
          </div>
        </div>
      </div>

      {/* Evolucao */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Evolucao do Score (30d)</h3>
          <CITooltip id="pf_evolucao" />
        </div>
        <Spark data={c.scoreHistory} w={500} h={80} color={DS.accent} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 10, color: DS.textTertiary }}>30 dias atras</span>
          <span style={{ fontSize: 10, color: DS.textTertiary }}>Hoje</span>
        </div>
      </div>

      {/* Calendario */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Calendario de Posts</h3>
          <CITooltip id="pf_calendario" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
          {Array.from({ length: 30 }, (_, i) => {
            const posted = Math.random() > 0.5;
            return <div key={i} style={{ height: 28, borderRadius: 3, background: posted ? DS.accent : DS.divider, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: posted ? "#fff" : DS.textTertiary }}>{i + 1}</div>;
          })}
        </div>
      </div>

      {/* Posts */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Ultimos Posts</h3>
          <CITooltip id="pf_posts" />
        </div>
        {[
          { tipo: "Reels", likes: 3200, comments: 180, data: "Hoje" },
          { tipo: "Carrossel", likes: 2100, comments: 95, data: "Ontem" },
          { tipo: "Foto", likes: 1400, comments: 42, data: "3 dias" },
        ].map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 2 ? `1px solid ${DS.divider}` : "none" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: DS.accent, background: "#EFF6FF", padding: "3px 8px", borderRadius: 4 }}>{p.tipo}</span>
            <span style={{ flex: 1, fontSize: 12, color: DS.textSecondary }}>{p.data}</span>
            <span style={{ fontSize: 12, color: DS.textPrimary }}>{p.likes.toLocaleString()} curtidas</span>
            <span style={{ fontSize: 12, color: DS.textSecondary }}>{p.comments} comentarios</span>
          </div>
        ))}
      </div>

      {/* Hashtags */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Hashtags Mais Usadas</h3>
          <CITooltip id="pf_hashtags" />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {hashtags.map(h => (
            <span key={h} style={{ padding: "4px 10px", borderRadius: 12, background: "#EFF6FF", fontSize: 12, color: DS.accent, fontWeight: 500 }}>{h}</span>
          ))}
        </div>
      </div>

      {/* Formatos */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Distribuicao de Formatos</h3>
          <CITooltip id="pf_formatos" />
        </div>
        {formatDist.map(f => (
          <Bar key={f.fmt} label={`${f.fmt} (${f.pct}%)`} value={f.pct} max={100} color={DS.accent} />
        ))}
      </div>

      {/* Reviews */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Reviews Google Recentes</h3>
          <CITooltip id="pf_reviews" />
        </div>
        {[
          { nota: 5, texto: "Excelente atendimento, muito atenciosa.", data: "2 dias" },
          { nota: 4, texto: "Bom profissional, mas demorou um pouco.", data: "5 dias" },
          { nota: 5, texto: "Recomendo! Resolveu meu problema.", data: "1 semana" },
        ].map((r, i) => (
          <div key={i} style={{ padding: "10px 0", borderBottom: i < 2 ? `1px solid ${DS.divider}` : "none" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: r.nota >= 4 ? DS.success : DS.warning }}>{r.nota}/5</span>
              <span style={{ fontSize: 11, color: DS.textTertiary }}>{r.data}</span>
            </div>
            <p style={{ fontSize: 12, color: DS.textSecondary, margin: 0 }}>{r.texto}</p>
          </div>
        ))}
      </div>

      {/* Nota Google */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Nota Google</h3>
          <CITooltip id="pf_nota" />
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: c.google.nota >= 4.5 ? DS.success : DS.warning }}>{c.google.nota}</div>
          <div>
            <p style={{ fontSize: 13, color: DS.textSecondary, margin: "0 0 4px" }}>{c.google.avaliacoes} avaliacoes totais</p>
            <p style={{ fontSize: 13, color: DS.success, margin: 0 }}>+{c.google.avalSemana} esta semana</p>
          </div>
        </div>
      </div>

      {/* Comparativo */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Comparativo com Voce</h3>
          <CITooltip id="pf_comparativo" />
        </div>
        {[
          { metric: "Score Geral", voce: 75, conc: c.score },
          { metric: "Eng Rate", voce: 3.5, conc: c.ig.engRate },
          { metric: "Nota Google", voce: 4.4, conc: c.google.nota },
          { metric: "Seguidores (K)", voce: 85, conc: parseInt(c.ig.seguidores.replace("K", "")) },
        ].map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: i < 3 ? `1px solid ${DS.divider}` : "none" }}>
            <span style={{ fontSize: 12, color: DS.textSecondary, width: 120 }}>{m.metric}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: m.voce > m.conc ? DS.success : DS.error, width: 60, textAlign: "right" }}>{m.voce}</span>
            <span style={{ fontSize: 11, color: DS.textTertiary }}>vs</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: m.conc > m.voce ? DS.success : DS.error, width: 60 }}>{m.conc}</span>
          </div>
        ))}
      </div>

      {/* Score detalhado */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Score Detalhado</h3>
          <CITooltip id="pf_score" />
        </div>
        {[
          { dim: "Presenca", val: Math.round(c.score * 0.95) },
          { dim: "Engajamento", val: Math.round(c.ig.engRate * 18) },
          { dim: "Comercial", val: c.comercial.score },
          { dim: "Reputacao", val: Math.round(c.google.nota * 20) },
        ].map(d => (
          <Bar key={d.dim} label={d.dim} value={d.val} max={100} color={DS.accent} />
        ))}
      </div>

      {/* Eng rate */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Taxa de Engajamento</h3>
          <CITooltip id="pf_engrate" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: c.ig.engRate > 4 ? DS.success : DS.accent }}>{c.ig.engRate}%</div>
          <div>
            <p style={{ fontSize: 12, color: DS.textSecondary, margin: 0 }}>Media do setor: 3.1%</p>
            <p style={{ fontSize: 12, color: c.ig.engRate > 3.1 ? DS.success : DS.error, margin: "4px 0 0" }}>
              {c.ig.engRate > 3.1 ? "Acima da media" : "Abaixo da media"}
            </p>
          </div>
        </div>
      </div>

      {/* Ameaca */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Nivel de Ameaca</h3>
          <CITooltip id="pf_ameaca" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: c.threat > 7 ? DS.error : c.threat > 5 ? DS.warning : DS.success, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 700 }}>{c.threat}</div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: DS.textPrimary, margin: 0 }}>
              {c.threat > 7 ? "Ameaca Alta" : c.threat > 5 ? "Ameaca Media" : "Ameaca Baixa"}
            </p>
            <p style={{ fontSize: 12, color: DS.textSecondary, margin: "4px 0 0" }}>Baseado em crescimento e sobreposicao</p>
          </div>
        </div>
      </div>

      {/* Google profile */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Perfil Google Completo</h3>
          <CITooltip id="pf_google" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { l: "Nota", v: c.google.nota },
            { l: "Avaliacoes", v: c.google.avaliacoes },
            { l: "Aval/Semana", v: `+${c.google.avalSemana}` },
            { l: "Sentimento", v: `${c.google.sentimento}%` },
            { l: "Respondidas", v: c.google.respondidas },
            { l: "Fotos", v: c.google.fotos },
          ].map((item, i) => (
            <div key={i} style={{ padding: 12, background: DS.bgTableRow, borderRadius: 3 }}>
              <p style={{ fontSize: 11, color: DS.textTertiary, margin: "0 0 2px" }}>{item.l}</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>{item.v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ SEO / Google — Detalhes do Perfil ══════ */}
      <div style={{ display:"flex", alignItems:"center", gap:10, margin:"24px 0 16px" }}>
        <div style={{ width:3, height:18, background:"#378ADD", borderRadius:2 }}/>
        <h3 style={{ fontSize:15, fontWeight:700, color:DS.textPrimary, margin:0 }}>SEO / Google — {c.name}</h3>
        <CITooltip id="pf_google"/>
      </div>

      {/* Keyword Ranking Bars */}
      <div style={{ ...cardS, marginBottom:16 }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:DS.textPrimary, margin:"0 0 14px" }}>Ranking de Keywords vs {c.handle}</h3>
        {seoKws.filter(k=>k.pos>0).sort((a,b)=>a.pos-b.pos).slice(0,8).map(kw => {
          const bW = Math.max(5,((30-kw.pos)/30)*100);
          const bC = kw.pos<=3?DS.success:kw.pos<=10?"#378ADD":kw.pos<=20?DS.warning:DS.error;
          return (<div key={kw.kw} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
            <span style={{ fontSize:11, color:DS.textSecondary, width:180, flexShrink:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{kw.kw}</span>
            <div style={{ flex:1, height:20, background:DS.divider, borderRadius:4, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${bW}%`, background:bC, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:6 }}>
                <span style={{ fontSize:10, fontWeight:700, color:"#fff" }}>#{kw.pos}</span>
              </div>
            </div>
          </div>);
        })}
        <div style={{ display:"flex", gap:10, marginTop:10 }}>
          {[{c:DS.success,l:"Pos 1-3"},{c:"#378ADD",l:"4-10"},{c:DS.warning,l:"11-20"},{c:DS.error,l:"21+"}].map(i => <span key={i.l} style={{ fontSize:10, color:DS.textTertiary, display:"flex", alignItems:"center", gap:3 }}><span style={{ width:8, height:8, borderRadius:2, background:i.c }}/>{i.l}</span>)}
        </div>
      </div>

      {/* Scatter + Keywords Table */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <div style={cardS}>
          <h3 style={{ fontSize:14, fontWeight:700, color:DS.textPrimary, margin:"0 0 14px" }}>Oportunidades de Conteudo</h3>
          <svg viewBox="0 0 400 260" style={{ width:"100%", height:220, display:"block" }}>
            <line x1="50" x2="380" y1="230" y2="230" stroke={DS.border}/><line x1="50" x2="50" y1="20" y2="230" stroke={DS.border}/>
            <text x="215" y="255" textAnchor="middle" fontSize="9" fill={DS.textTertiary}>Volume Busca</text>
            <rect x="200" y={230-(40/80)*210} width="180" height={(40/80)*210} fill={DS.success} opacity={.05} rx="4"/>
            <line x1="200" x2="200" y1="20" y2="230" stroke={DS.success} strokeWidth="1" strokeDasharray="4,4" opacity={.3}/>
            <line x1="50" x2="380" y1={230-(40/80)*210} y2={230-(40/80)*210} stroke={DS.success} strokeWidth="1" strokeDasharray="4,4" opacity={.3}/>
            <text x="290" y={230-(40/80)*210-6} textAnchor="middle" fontSize="9" fill={DS.success} fontWeight="600">Quick Wins</text>
            {seoScatter.map((pt,i) => {
              const x = Math.min(50+(pt.vol/20000)*330, 378);
              const y = Math.max(230-(pt.dif/80)*210, 22);
              return <circle key={i} cx={x} cy={y} r={5} fill={pt.dif<40?DS.success:"#CBD5E1"} stroke={pt.dif<40?"#059669":"#94A3B8"} strokeWidth="1.5" opacity={.85}/>;
            })}
          </svg>
        </div>
        <div style={cardS}>
          <h3 style={{ fontSize:14, fontWeight:700, color:DS.textPrimary, margin:"0 0 14px" }}>Gap Analysis — Keywords</h3>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
            <thead><tr style={{ borderBottom:`2px solid ${DS.border}` }}>
              {["Keyword","Voce","Concorrente","Volume","Acao"].map(h => <th key={h} style={{ padding:"6px 4px", textAlign:"left", fontWeight:600, color:DS.textTertiary, fontSize:10, textTransform:"uppercase" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {seoKws.sort((a,b)=>b.vol-a.vol).slice(0,8).map((k,i) => {
                const pc = k.pos===0?DS.textTertiary:k.pos<=3?DS.success:k.pos<=10?"#378ADD":k.pos<=20?DS.warning:DS.error;
                const ac = k.act==="Criar conteudo"?DS.success:k.act==="Otimizar pagina"?"#378ADD":k.act==="Construir links"?C.purple:DS.textTertiary;
                return (<tr key={k.kw} style={{ background:i%2===0?DS.bgTableRow:"#fff" }}>
                  <td style={{ padding:"7px 4px", fontWeight:600, color:DS.textPrimary, fontSize:11 }}>{k.kw}</td>
                  <td style={{ padding:"7px 4px", fontWeight:700, color:pc, fontSize:11 }}>{k.pos===0?"—":`#${k.pos}`}</td>
                  <td style={{ padding:"7px 4px", color:DS.textSecondary, fontSize:11 }}>{k.comp} #{k.cPos||"—"}</td>
                  <td style={{ padding:"7px 4px", fontWeight:600, fontSize:11 }}>{k.vol.toLocaleString("pt-BR")}</td>
                  <td style={{ padding:"7px 4px" }}><span style={{ fontSize:9, fontWeight:600, padding:"2px 8px", borderRadius:20, background:`${ac}15`, color:ac }}>{k.act}</span></td>
                </tr>);
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ================================================== */
/*  TAB: MAPA                                         */
/* ================================================== */
function MapaTab() {
  const nichos: Record<string, number> = {};
  competitors.forEach(c => { nichos[c.niche] = (nichos[c.niche] || 0) + 1; });
  const totalSegs = competitors.reduce((s, c) => s + parseInt(c.ig.seguidores.replace("K", "")) * 1000, 0);
  const avgScore = Math.round(competitors.reduce((s, c) => s + c.score, 0) / competitors.length);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* KPIs */}
      <div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Indicadores do Mapa</h3>
          <CITooltip id="mp_kpis" />
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <KPI label="Concorrentes" value={competitors.length} sub="monitorados" />
          <KPI label="Score Medio" value={avgScore} sub="do setor" />
          <KPI label="Total Seguidores" value={`${Math.round(totalSegs / 1000)}K`} sub="somados" />
          <KPI label="Nichos" value={Object.keys(nichos).length} sub="identificados" />
        </div>
      </div>

      {/* Bolhas */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Mapa de Bolhas</h3>
          <CITooltip id="mp_bolhas" />
        </div>
        <div style={{ position: "relative", height: 300, background: DS.bgTableRow, borderRadius: 6, overflow: "hidden" }}>
          {competitors.map(c => {
            const size = parseInt(c.ig.seguidores.replace("K", ""));
            const x = (c.score / 100) * 90 + 5;
            const y = 100 - (c.ig.engRate / 6) * 90;
            const colors = [DS.accent, C.purple, C.orange, C.teal, DS.success, DS.warning, DS.error, DS.primaryLight];
            const ci = competitors.indexOf(c);
            return (
              <div key={c.handle} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)", width: Math.max(30, size * 0.4), height: Math.max(30, size * 0.4), borderRadius: "50%", background: colors[ci % colors.length], opacity: 0.7, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 8, color: "#fff", fontWeight: 700, textAlign: "center" }}>{c.name.split(" ").pop()}</span>
              </div>
            );
          })}
          <span style={{ position: "absolute", bottom: 4, right: 8, fontSize: 9, color: DS.textTertiary }}>Score →</span>
          <span style={{ position: "absolute", top: 4, left: 8, fontSize: 9, color: DS.textTertiary }}>Eng Rate ↑</span>
        </div>
      </div>

      {/* Nichos */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Nichos Identificados</h3>
          <CITooltip id="mp_nichos" />
        </div>
        {Object.entries(nichos).map(([n, count]) => (
          <div key={n} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${DS.divider}` }}>
            <span style={{ fontSize: 13, color: DS.textPrimary }}>{n}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: DS.accent }}>{count}</span>
          </div>
        ))}
      </div>

      {/* Radar */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Grafico Radar - Top 3</h3>
          <CITooltip id="mp_radar" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {competitors.slice(0, 3).map(c => {
            const dims = [
              { d: "Presenca", v: Math.round(c.score * 0.95) },
              { d: "Engajamento", v: Math.round(c.ig.engRate * 18) },
              { d: "Comercial", v: c.comercial.score },
              { d: "Reputacao", v: Math.round(c.google.nota * 20) },
              { d: "Conteudo", v: Math.round(c.ig.postsSemana * 14) },
            ];
            return (
              <div key={c.handle}>
                <p style={{ fontSize: 12, fontWeight: 600, color: DS.textPrimary, margin: "0 0 6px" }}>{c.name}</p>
                {dims.map(dm => <Bar key={dm.d} label={dm.d} value={dm.v} max={100} color={DS.accent} />)}
              </div>
            );
          })}
        </div>
      </div>

      {/* Distribuicao */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Distribuicao por Score</h3>
          <CITooltip id="mp_distribuicao" />
        </div>
        {[
          { range: "85+", count: competitors.filter(c => c.score >= 85).length, color: DS.success },
          { range: "70-84", count: competitors.filter(c => c.score >= 70 && c.score < 85).length, color: DS.accent },
          { range: "50-69", count: competitors.filter(c => c.score >= 50 && c.score < 70).length, color: DS.warning },
          { range: "0-49", count: competitors.filter(c => c.score < 50).length, color: DS.error },
        ].map(b => (
          <Bar key={b.range} label={`Score ${b.range}`} value={b.count} max={competitors.length} color={b.color} />
        ))}
      </div>

      {/* Quadrante */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Quadrante Estrategico</h3>
          <CITooltip id="mp_quadrante" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { quad: "Lideres", desc: "Alto score + Alto engajamento", comps: competitors.filter(c => c.score >= 80 && c.ig.engRate >= 4), color: DS.success },
            { quad: "Desafiadores", desc: "Alto score + Baixo engajamento", comps: competitors.filter(c => c.score >= 75 && c.ig.engRate < 4), color: DS.accent },
            { quad: "Nicho", desc: "Baixo score + Alto engajamento", comps: competitors.filter(c => c.score < 75 && c.ig.engRate >= 4), color: C.purple },
            { quad: "Seguidores", desc: "Baixo score + Baixo engajamento", comps: competitors.filter(c => c.score < 75 && c.ig.engRate < 4), color: DS.textTertiary },
          ].map(q => (
            <div key={q.quad} style={{ padding: 14, background: DS.bgTableRow, borderRadius: 6, borderLeft: `3px solid ${q.color}` }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: q.color, margin: "0 0 4px" }}>{q.quad}</p>
              <p style={{ fontSize: 10, color: DS.textTertiary, margin: "0 0 6px" }}>{q.desc}</p>
              {q.comps.map(c => <p key={c.handle} style={{ fontSize: 11, color: DS.textSecondary, margin: "2px 0" }}>{c.name}</p>)}
              {q.comps.length === 0 && <p style={{ fontSize: 11, color: DS.textTertiary, margin: 0 }}>Nenhum</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Anuncios */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Deteccao de Anuncios</h3>
          <CITooltip id="mp_anuncios" />
        </div>
        {competitors.filter(c => c.comercial.anuncios > 0).map(c => (
          <div key={c.handle} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${DS.divider}` }}>
            <span style={{ fontSize: 12, color: DS.textPrimary }}>{c.name}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: DS.accent }}>{c.comercial.anuncios} anuncios ativos</span>
          </div>
        ))}
        {competitors.filter(c => c.comercial.anuncios === 0).length > 0 && (
          <p style={{ fontSize: 11, color: DS.textTertiary, margin: "8px 0 0" }}>{competitors.filter(c => c.comercial.anuncios === 0).length} concorrentes sem anuncios detectados</p>
        )}
      </div>

      {/* Nicho em disputa */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Nicho em Disputa</h3>
          <CITooltip id="mp_nicho_disputa" />
        </div>
        {Object.entries(nichos).sort((a, b) => b[1] - a[1]).map(([n, count]) => (
          <div key={n} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
              <span style={{ color: DS.textPrimary }}>{n}</span>
              <span style={{ color: count > 1 ? DS.error : DS.success, fontWeight: 600 }}>{count > 1 ? "Alta disputa" : "Baixa disputa"}</span>
            </div>
            <div style={{ height: 6, background: DS.divider, borderRadius: 3 }}>
              <div style={{ height: 6, borderRadius: 3, background: count > 1 ? DS.error : DS.success, width: `${(count / competitors.length) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================== */
/*  TAB: VOZ DO MERCADO                               */
/* ================================================== */
function VozTab() {
  const totalMencoes = 1842;
  const totalReclamacoes = 127;
  const totalElogios = 489;
  const avgSent = Math.round(competitors.reduce((s, c) => s + c.google.sentimento, 0) / competitors.length);

  const sentEvo = [72, 74, 73, 75, 76, 77, 78, avgSent];
  const googleEvo = [4.0, 4.1, 4.1, 4.2, 4.2, 4.3];

  const words = [
    { word: "atendimento", size: 24 }, { word: "profissional", size: 20 }, { word: "recomendo", size: 18 },
    { word: "demora", size: 16 }, { word: "excelente", size: 22 }, { word: "caro", size: 14 },
    { word: "educado", size: 15 }, { word: "resultado", size: 19 }, { word: "ambiente", size: 13 },
    { word: "confianca", size: 17 }, { word: "pontualidade", size: 12 }, { word: "humanizado", size: 16 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* KPIs */}
      <div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Indicadores de Voz</h3>
          <CITooltip id="vz_kpis" />
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <KPI label="Total Mencoes" value={totalMencoes.toLocaleString()} sub="ultimas 4 semanas" />
          <KPI label="Sentimento Medio" value={`${avgSent}%`} sub="positivo" color={DS.success} />
          <KPI label="Reclamacoes" value={totalReclamacoes} sub="identificadas" color={DS.error} />
          <KPI label="Elogios" value={totalElogios} sub="identificados" color={DS.success} />
        </div>
      </div>

      {/* Sentimento barras */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Sentimento por Concorrente</h3>
          <CITooltip id="vz_sentimento_barras" />
        </div>
        {competitors.map(c => (
          <Bar key={c.handle} label={c.name} value={c.google.sentimento} max={100} color={c.google.sentimento > 80 ? DS.success : c.google.sentimento > 65 ? DS.accent : DS.warning} />
        ))}
      </div>

      {/* Evolucao sentimento */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Evolucao do Sentimento</h3>
          <CITooltip id="vz_evolucao" />
        </div>
        <Spark data={sentEvo} w={400} h={60} color={DS.success} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 10, color: DS.textTertiary }}>8 semanas atras</span>
          <span style={{ fontSize: 10, color: DS.textTertiary }}>Hoje</span>
        </div>
      </div>

      {/* Nuvem */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Nuvem de Palavras</h3>
          <CITooltip id="vz_nuvem" />
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", padding: 16 }}>
          {words.map(w => (
            <span key={w.word} style={{ fontSize: w.size, fontWeight: 600, color: w.size > 18 ? DS.accent : w.size > 14 ? DS.textPrimary : DS.textTertiary }}>{w.word}</span>
          ))}
        </div>
      </div>

      {/* Perguntas */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Perguntas Frequentes</h3>
          <CITooltip id="vz_perguntas" />
        </div>
        {[
          "Qual o valor da consulta?",
          "Atendem por convenio?",
          "Quanto tempo demora o retorno?",
          "Fazem atendimento online?",
          "Tem estacionamento?",
        ].map((p, i) => (
          <div key={i} style={{ padding: "8px 0", borderBottom: i < 4 ? `1px solid ${DS.divider}` : "none" }}>
            <p style={{ fontSize: 13, color: DS.textPrimary, margin: 0 }}>{p}</p>
          </div>
        ))}
      </div>

      {/* Reclamacoes */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Principais Reclamacoes</h3>
          <CITooltip id="vz_reclamacoes" />
        </div>
        {[
          { tema: "Tempo de espera", count: 34, pct: 27 },
          { tema: "Preco elevado", count: 28, pct: 22 },
          { tema: "Dificuldade de agendamento", count: 22, pct: 17 },
          { tema: "Falta de retorno", count: 18, pct: 14 },
          { tema: "Atendimento frio", count: 15, pct: 12 },
        ].map((r, i) => (
          <Bar key={i} label={`${r.tema} (${r.count})`} value={r.pct} max={30} color={DS.error} />
        ))}
      </div>

      {/* Elogios */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Principais Elogios</h3>
          <CITooltip id="vz_elogios" />
        </div>
        {[
          { tema: "Atendimento humanizado", count: 142, pct: 29 },
          { tema: "Profissionalismo", count: 98, pct: 20 },
          { tema: "Resultados rapidos", count: 87, pct: 18 },
          { tema: "Ambiente agradavel", count: 72, pct: 15 },
          { tema: "Pontualidade", count: 56, pct: 11 },
        ].map((e, i) => (
          <Bar key={i} label={`${e.tema} (${e.count})`} value={e.pct} max={30} color={DS.success} />
        ))}
      </div>

      {/* Google evo */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Evolucao Notas Google (6m)</h3>
          <CITooltip id="vz_google_evo" />
        </div>
        <Spark data={googleEvo} w={400} h={60} color={C.purple} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 10, color: DS.textTertiary }}>6 meses atras</span>
          <span style={{ fontSize: 10, color: DS.textTertiary }}>Hoje ({googleEvo[googleEvo.length - 1]})</span>
        </div>
      </div>

      {/* Melhor avaliado */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Melhor Avaliado</h3>
          <CITooltip id="vz_melhor" />
        </div>
        {(() => {
          const best = [...competitors].sort((a, b) => b.google.nota - a.google.nota)[0];
          return (
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: DS.success, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16 }}>{best.google.nota}</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>{best.name}</p>
                <p style={{ fontSize: 12, color: DS.textSecondary, margin: "2px 0 0" }}>{best.google.avaliacoes} avaliacoes | Sentimento: {best.google.sentimento}%</p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Pior avaliado */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Pior Avaliado</h3>
          <CITooltip id="vz_pior" />
        </div>
        {(() => {
          const worst = [...competitors].sort((a, b) => a.google.nota - b.google.nota)[0];
          return (
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: DS.error, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16 }}>{worst.google.nota}</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>{worst.name}</p>
                <p style={{ fontSize: 12, color: DS.textSecondary, margin: "2px 0 0" }}>Principais queixas: tempo de espera, preco</p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Temas em alta */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Temas em Alta</h3>
          <CITooltip id="vz_tema" />
        </div>
        {[
          { tema: "Telemedicina", trend: "+45%", dir: "up" },
          { tema: "Medicina preventiva", trend: "+32%", dir: "up" },
          { tema: "Saude mental", trend: "+28%", dir: "up" },
          { tema: "Tratamento natural", trend: "+15%", dir: "up" },
        ].map((t, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? `1px solid ${DS.divider}` : "none" }}>
            <span style={{ fontSize: 13, color: DS.textPrimary }}>{t.tema}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: DS.success }}>{t.trend}</span>
          </div>
        ))}
      </div>

      {/* Total reclamacoes */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Total de Reclamacoes (4 semanas)</h3>
          <CITooltip id="vz_total_reclamacoes" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: DS.error }}>{totalReclamacoes}</div>
          <div>
            <p style={{ fontSize: 12, color: DS.textSecondary, margin: 0 }}>Media: {Math.round(totalReclamacoes / 4)} por semana</p>
            <p style={{ fontSize: 12, color: DS.warning, margin: "4px 0 0" }}>Tendencia: estavel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================== */
/*  TAB: ALERTAS                                      */
/* ================================================== */
function AlertasTab() {
  const [filter, setFilter] = useState<"Todos" | "Critico" | "Oportunidade" | "Info">("Todos");

  const alerts = [
    { tipo: "Critico", msg: "@clinicavidaintegra subiu 3 pontos em 1 semana", conc: "@clinicavidaintegra", data: "Hoje", fonte: "Score" },
    { tipo: "Critico", msg: "@psicologa.ana cresceu +4 pontos - maior alta do setor", conc: "@psicologa.ana", data: "Hoje", fonte: "Score" },
    { tipo: "Oportunidade", msg: "Apenas 2 concorrentes usam Shopping no Instagram", conc: "Setor", data: "Ontem", fonte: "Comercial" },
    { tipo: "Oportunidade", msg: "@fisio.carlos sem CTA no perfil - chance de conversao", conc: "@fisio.carlos", data: "Ontem", fonte: "Comercial" },
    { tipo: "Info", msg: "@drajulianasaude postou 5 vezes esta semana", conc: "@drajulianasaude", data: "Hoje", fonte: "Instagram" },
    { tipo: "Critico", msg: "@fisio.carlos caiu 2 pontos de score", conc: "@fisio.carlos", data: "2 dias", fonte: "Score" },
    { tipo: "Oportunidade", msg: "Nenhum concorrente faz Lives educativas", conc: "Setor", data: "3 dias", fonte: "Conteudo" },
    { tipo: "Info", msg: "@nutri.marina atingiu 89K seguidores", conc: "@nutri.marina", data: "3 dias", fonte: "Instagram" },
    { tipo: "Oportunidade", msg: "Baixa presenca em Google Fotos no setor", conc: "Setor", data: "4 dias", fonte: "Google" },
    { tipo: "Critico", msg: "@odonto.rafael recebeu 3 reviews negativos seguidos", conc: "@odonto.rafael", data: "5 dias", fonte: "Google" },
  ];

  const filtered = filter === "Todos" ? alerts : alerts.filter(a => a.tipo === filter);
  const criticos = alerts.filter(a => a.tipo === "Critico").length;
  const oportunidades = alerts.filter(a => a.tipo === "Oportunidade").length;

  const volumeData = [3, 2, 4, 1, 3, 2, 5, 3, 2, 4, 3, 1, 2, 3];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* KPIs */}
      <div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Indicadores de Alertas</h3>
          <CITooltip id="al_kpis" />
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <KPI label="Total Alertas" value={alerts.length} sub="ativos" />
          <KPI label="Criticos" value={criticos} sub="atencao imediata" color={DS.error} />
          <KPI label="Oportunidades" value={oportunidades} sub="detectadas" color={DS.success} />
          <KPI label="Resolvidos" value={5} sub="esta semana" />
        </div>
      </div>

      {/* Filtros */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Filtrar Alertas</h3>
          <CITooltip id="al_filtros" />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {(["Todos", "Critico", "Oportunidade", "Info"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${filter === f ? DS.primary : DS.border}`, background: filter === f ? DS.primary : "#fff", color: filter === f ? "#fff" : DS.textPrimary, fontWeight: 600, fontSize: 11, cursor: "pointer" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Volume */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Volume de Alertas (14 dias)</h3>
          <CITooltip id="al_volume" />
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80 }}>
          {volumeData.map((v, i) => (
            <div key={i} style={{ flex: 1, height: `${(v / 5) * 100}%`, background: DS.accent, borderRadius: "3px 3px 0 0", minHeight: 4 }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 9, color: DS.textTertiary }}>14 dias atras</span>
          <span style={{ fontSize: 9, color: DS.textTertiary }}>Hoje</span>
        </div>
      </div>

      {/* Feed */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Feed de Alertas</h3>
          <CITooltip id="al_feed" />
        </div>
        {filtered.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i < filtered.length - 1 ? `1px solid ${DS.divider}` : "none" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 4, flexShrink: 0, background: a.tipo === "Critico" ? DS.error : a.tipo === "Oportunidade" ? DS.success : DS.accent }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: DS.textPrimary, margin: 0 }}>{a.msg}</p>
              <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 10, color: DS.textTertiary }}>{a.data}</span>
                <span style={{ fontSize: 10, color: DS.textTertiary }}>{a.fonte}</span>
                <span style={{ fontSize: 10, color: DS.textTertiary }}>{a.conc}</span>
              </div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: a.tipo === "Critico" ? "#FEF2F2" : a.tipo === "Oportunidade" ? "#F0FDF4" : "#EFF6FF", color: a.tipo === "Critico" ? DS.error : a.tipo === "Oportunidade" ? DS.success : DS.accent }}>{a.tipo}</span>
          </div>
        ))}
      </div>

      {/* Config */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Configuracoes de Alerta</h3>
          <CITooltip id="al_config" />
        </div>
        {[
          { setting: "Alerta quando score muda mais de 3 pontos", active: true },
          { setting: "Alerta quando concorrente posta mais de 5x/semana", active: true },
          { setting: "Alerta quando nota Google cai abaixo de 4.0", active: true },
          { setting: "Alerta quando novo anuncio detectado", active: false },
          { setting: "Resumo diario por email", active: false },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${DS.divider}` : "none" }}>
            <span style={{ fontSize: 12, color: DS.textPrimary }}>{s.setting}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: s.active ? DS.success : DS.textTertiary }}>{s.active ? "Ativo" : "Inativo"}</span>
          </div>
        ))}
      </div>

      {/* Criticos */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Alertas Criticos</h3>
          <CITooltip id="al_criticos" />
        </div>
        {alerts.filter(a => a.tipo === "Critico").map((a, i) => (
          <div key={i} style={{ padding: "10px 12px", background: "#FEF2F2", borderRadius: 6, marginBottom: 8, borderLeft: `3px solid ${DS.error}` }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: DS.error, margin: 0 }}>{a.msg}</p>
            <p style={{ fontSize: 11, color: DS.textSecondary, margin: "4px 0 0" }}>{a.data} - {a.fonte}</p>
          </div>
        ))}
      </div>

      {/* Oportunidades */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Oportunidades Detectadas</h3>
          <CITooltip id="al_oportunidades" />
        </div>
        {alerts.filter(a => a.tipo === "Oportunidade").map((a, i) => (
          <div key={i} style={{ padding: "10px 12px", background: "#F0FDF4", borderRadius: 6, marginBottom: 8, borderLeft: `3px solid ${DS.success}` }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: DS.success, margin: 0 }}>{a.msg}</p>
            <p style={{ fontSize: 11, color: DS.textSecondary, margin: "4px 0 0" }}>{a.data} - {a.fonte}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================== */
/*  TAB: BRIEFING                                     */
/* ================================================== */
function BriefingTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* KPIs */}
      <div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Indicadores do Briefing</h3>
          <CITooltip id="br_kpis" />
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <KPI label="Movimentos" value={12} sub="registrados esta semana" />
          <KPI label="Oportunidades" value={4} sub="identificadas" color={DS.success} />
          <KPI label="Pontos Atencao" value={3} sub="a monitorar" color={DS.warning} />
          <KPI label="Acoes Sugeridas" value={6} sub="pela IA" />
        </div>
      </div>

      {/* Movimentos */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Movimentos da Semana</h3>
          <CITooltip id="br_movimento" />
        </div>
        {[
          { mov: "@clinicavidaintegra lancou campanha de anuncios (3 ativos)", impacto: "Alto" },
          { mov: "@psicologa.ana cresceu 4 pontos de score em 7 dias", impacto: "Alto" },
          { mov: "@drajulianasaude postou 5 Reels em 1 semana", impacto: "Medio" },
          { mov: "@nutri.marina atingiu 89K seguidores", impacto: "Medio" },
          { mov: "@dermato.renata ativou Shopping no Instagram", impacto: "Alto" },
          { mov: "@odonto.rafael recebeu reviews negativos consecutivos", impacto: "Baixo" },
        ].map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 5 ? `1px solid ${DS.divider}` : "none" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: m.impacto === "Alto" ? DS.error : m.impacto === "Medio" ? DS.warning : DS.textTertiary, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: DS.textPrimary, margin: 0, flex: 1 }}>{m.mov}</p>
            <span style={{ fontSize: 10, fontWeight: 600, color: m.impacto === "Alto" ? DS.error : m.impacto === "Medio" ? DS.warning : DS.textTertiary }}>{m.impacto}</span>
          </div>
        ))}
      </div>

      {/* Oportunidades */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Oportunidades da Semana</h3>
          <CITooltip id="br_oportunidade" />
        </div>
        {[
          "Apenas 2 concorrentes usam Shopping - ative o seu agora",
          "Ninguem esta fazendo Lives - seja o primeiro do setor",
          "@fisio.carlos sem CTA - voce pode converter mais",
          "Setor com baixa presenca em Google Fotos - atualize o seu",
        ].map((o, i) => (
          <div key={i} style={{ padding: "10px 12px", background: "#F0FDF4", borderRadius: 6, marginBottom: 8, borderLeft: `3px solid ${DS.success}` }}>
            <p style={{ fontSize: 13, color: DS.success, margin: 0, fontWeight: 500 }}>{o}</p>
          </div>
        ))}
      </div>

      {/* Destaque */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Destaque da Semana</h3>
          <CITooltip id="br_destaque" />
        </div>
        <div style={{ padding: 16, background: "#EFF6FF", borderRadius: 8, borderLeft: `4px solid ${DS.accent}` }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: DS.primary, margin: "0 0 8px" }}>@clinicavidaintegra: Maior crescimento</p>
          <p style={{ fontSize: 13, color: DS.textSecondary, lineHeight: 1.6, margin: 0 }}>
            Subiu 3 pontos de score, lancou 3 anuncios simultaneos e ativou Shopping no Instagram. Movimento mais agressivo do setor esta semana.
          </p>
        </div>
      </div>

      {/* Atencao */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Pontos de Atencao</h3>
          <CITooltip id="br_atencao" />
        </div>
        {[
          "@psicologa.ana em trajetoria de crescimento acelerado (+4 pontos)",
          "@fisio.carlos em queda consistente (-2 pontos) - pode abrir espaco",
          "@odonto.rafael com reviews negativos - oportunidade de captacao",
        ].map((a, i) => (
          <div key={i} style={{ padding: "10px 12px", background: "#FFFBEB", borderRadius: 6, marginBottom: 8, borderLeft: `3px solid ${DS.warning}` }}>
            <p style={{ fontSize: 13, color: DS.warning, margin: 0, fontWeight: 500 }}>{a}</p>
          </div>
        ))}
      </div>

      {/* Acoes */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Acoes Sugeridas</h3>
          <CITooltip id="br_acoes" />
        </div>
        {[
          { acao: "Ativar Shopping no Instagram", prioridade: "Alta", prazo: "Esta semana" },
          { acao: "Produzir 1 Live educativa", prioridade: "Alta", prazo: "Proxima semana" },
          { acao: "Atualizar fotos no Google Meu Negocio", prioridade: "Media", prazo: "Esta semana" },
          { acao: "Criar campanha de reviews positivos", prioridade: "Media", prazo: "Proxima semana" },
          { acao: "Aumentar frequencia de Reels para 4/semana", prioridade: "Alta", prazo: "Imediato" },
          { acao: "Responder 100% dos reviews Google", prioridade: "Media", prazo: "Continuo" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 5 ? `1px solid ${DS.divider}` : "none" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: a.prioridade === "Alta" ? DS.error : DS.warning, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: DS.textPrimary, margin: 0, flex: 1 }}>{a.acao}</p>
            <span style={{ fontSize: 10, color: DS.textTertiary }}>{a.prazo}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: a.prioridade === "Alta" ? DS.error : DS.warning }}>{a.prioridade}</span>
          </div>
        ))}
      </div>

      {/* Historico */}
      <div style={cardS}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>Historico de Briefings</h3>
          <CITooltip id="br_historico" />
        </div>
        {[
          { semana: "Semana 14 (atual)", destaque: "Crescimento @clinicavidaintegra", status: "Ativo" },
          { semana: "Semana 13", destaque: "Lancamento Shopping @dermato.renata", status: "Concluido" },
          { semana: "Semana 12", destaque: "Pico de engajamento @nutri.marina", status: "Concluido" },
          { semana: "Semana 11", destaque: "Queda @fisio.carlos iniciou", status: "Concluido" },
        ].map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? `1px solid ${DS.divider}` : "none" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: i === 0 ? DS.accent : DS.textSecondary, width: 130 }}>{b.semana}</span>
            <span style={{ fontSize: 12, color: DS.textPrimary, flex: 1 }}>{b.destaque}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: i === 0 ? DS.accent : DS.success }}>{b.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================== */
/*  MAIN COMPONENT                                    */
/* ================================================== */
const TABS = ["Visao Geral", "Ranking", "Perfil", "Mapa", "Voz", "Alertas", "Briefing"] as const;
type TabName = typeof TABS[number];

export default function ConcorrentesDash() {
  const [tab, setTab] = useState<TabName>("Visao Geral");

  return (
    <div style={{ minHeight: "100vh", background: "#F0F2F5", padding: 24, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: DS.primary, margin: "0 0 4px" }}>Analise de Concorrentes</h1>
        <p style={{ fontSize: 13, color: DS.textSecondary, margin: 0 }}>{competitors.length} concorrentes monitorados | Atualizado em tempo real</p>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#fff", borderRadius: 8, padding: 4, boxShadow: DS.cardShadow }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: "10px 18px", borderRadius: 6, border: "none", background: tab === t ? DS.primary : "transparent", color: tab === t ? "#fff" : DS.textSecondary, fontWeight: 600, fontSize: 13, cursor: "pointer", flex: 1, transition: "all 0.2s" }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "Visao Geral" && <VisaoGeralTab />}
      {tab === "Ranking" && <RankingTab />}
      {tab === "Perfil" && <PerfilTab />}
      {tab === "Mapa" && <MapaTab />}
      {tab === "Voz" && <VozTab />}
      {tab === "Alertas" && <AlertasTab />}
      {tab === "Briefing" && <BriefingTab />}
    </div>
  );
}
