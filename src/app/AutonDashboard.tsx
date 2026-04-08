"use client";
import React, { useState, useRef } from "react";
import MarketingDash from "./MarketingDash";

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */

function fmtK(v: number): string {
  if (Math.abs(v) >= 1000) return `R$ ${(v / 1000).toFixed(1)}k`;
  return `R$ ${v.toFixed(0)}`;
}

function fmtPct(v: number): string {
  return `${(v * 100).toFixed(1)}%`;
}

function fmtX(v: number): string {
  return `${v.toFixed(1)}x`;
}

/* ═══════════════════════════════════════════════
   DESIGN SYSTEM TOKENS
   ═══════════════════════════════════════════════ */

const DS = {
  primary: "#1B4266",
  primaryLight: "#2D6293",
  accent: "#3B82F6",
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  bgPage: "#EBF3F6",
  bgCard: "#FFFFFF",
  bgTableRow: "#F8F9FA",
  textPrimary: "#1A1A1A",
  textDefault: "#323232",
  textSecondary: "#666666",
  textTertiary: "#999999",
  textDisabled: "#CCCCCC",
  border: "#E5E7EB",
  divider: "#F2F2F2",
  cardRadius: 3,
  cardShadow: "0 4px 4px rgba(0,0,0,0.25)",
  cardPadding: 20,
  gridGap: 24,
};

const COLORS = {
  blue: DS.primary,
  purple: "#7C3AED",
  pink: "#DB2777",
  orange: "#EA580C",
  red: DS.error,
  green: DS.success,
  yellow: DS.warning,
};

const C = {
  purple: "#7C3AED",
  orange: "#EA580C",
  teal: "#0F6E56",
};

/* ═══════════════════════════════════════════════
   DATA — KPIs
   ═══════════════════════════════════════════════ */

const kpiCards = [
  { label: "Compras Realizadas", value: 98, pct: 100, color: COLORS.blue, sub: "total do ciclo", icon: "cart" as const },
  { label: "Acesso Liberado", value: 98, pct: 100, color: COLORS.purple, sub: "100% liberado", icon: "key" as const },
  { label: "Login Realizado", value: 15, pct: 15, color: COLORS.pink, sub: "drop critico", icon: "login" as const, alert: true },
  { label: "Onboarding Inicial", value: 13, pct: 13, color: COLORS.orange, sub: "13% do total", icon: "rocket" as const },
  { label: "1a Consulta", value: 0, pct: 0, color: COLORS.red, sub: "nenhuma finalizada", icon: "heart" as const, alert: true },
];

/* ═══════════════════════════════════════════════
   DATA — Funnel
   ═══════════════════════════════════════════════ */

const funnelSteps = [
  { label: "Compra realizada", value: 98, pct: 100, color: COLORS.blue, w: 100 },
  { label: "Acesso liberado", value: 98, pct: 100, color: COLORS.purple, w: 94 },
  { label: "Login realizado", value: 15, pct: 15, color: COLORS.pink, w: 78 },
  { label: "Onboarding inicial", value: 13, pct: 13, color: COLORS.orange, w: 62 },
  { label: "1a Consulta", value: 0, pct: 0, color: COLORS.red, w: 46 },
];

const drops = [
  { text: "100% · acesso automatico", type: "ok" as const },
  { text: "83 nao fizeram login · -85%", type: "crit" as const },
  { text: "2 nao completaram · -13%", type: "warn" as const },
  { text: "nenhuma finalizada · -100%", type: "crit" as const },
];

const dropColors = {
  ok: { text: DS.success, bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)" },
  warn: { text: DS.warning, bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)" },
  crit: { text: DS.error, bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.25)" },
};

/* ═══════════════════════════════════════════════
   DATA — Insights
   ═══════════════════════════════════════════════ */

const insights = [
  { tipo: "alerta" as const, titulo: "Gargalo critico — Acesso → Login (-85%)", descricao: "83 usuarios receberam acesso mas nunca fizeram login. Provavel causa: nenhum redirecionamento automatico apos liberacao.", acao: "Deep link no WhatsApp de ativacao + reengajamento em 24h" },
  { tipo: "alerta" as const, titulo: "Zero consultas finalizadas", descricao: "13 medicos iniciaram o onboarding mas nenhuma consulta foi concluida. Investigar se o fluxo quebra no meio.", acao: "Verificar barreiras tecnicas e de agendamento" },
  { tipo: "positivo" as const, titulo: "Login → Onboarding esta saudavel (87%)", descricao: "Quem faz login, quase sempre completa o onboarding inicial. O problema esta antes.", acao: "Focar esforcos em fazer o usuario logar pela primeira vez" },
];

/* ═══════════════════════════════════════════════
   DATA — Rankings
   ═══════════════════════════════════════════════ */

const onboardingDoneVisible = [
  { name: "Igor gay", email: "igor.vboas@gmail.com", score: 4, steps: [COLORS.blue, COLORS.purple, COLORS.pink, COLORS.orange, DS.border], scoreColor: COLORS.green, date: "13/10/25", initials: "IG" },
  { name: "Apogeu Nexus LTDA", email: "felipe.porto1@triacompany.com.br", score: 3, steps: [COLORS.blue, COLORS.purple, COLORS.pink, DS.border, DS.border], scoreColor: COLORS.orange, date: "25/03/26", initials: "AN" },
  { name: "IGOR CAMPOS VILAS BOAS", email: "igor.aluraaulas@gmail.com", score: 3, steps: [COLORS.blue, COLORS.purple, COLORS.pink, DS.border, DS.border], scoreColor: COLORS.orange, date: "25/03/26", initials: "IC" },
];

const allOnboardingDone = [
  ...onboardingDoneVisible,
  { name: "Dr. Marcos Almeida", email: "marcos.almeida@med.com", score: 4, steps: [COLORS.blue, COLORS.purple, COLORS.pink, COLORS.orange, DS.border], scoreColor: COLORS.green, date: "24/03/26", initials: "MA" },
  { name: "Dra. Camila Rocha", email: "camila.rocha@clinica.com", score: 3, steps: [COLORS.blue, COLORS.purple, COLORS.pink, DS.border, DS.border], scoreColor: COLORS.orange, date: "23/03/26", initials: "CR" },
  { name: "Dr. Lucas Ferreira", email: "lucas.ferreira@saude.com", score: 3, steps: [COLORS.blue, COLORS.purple, COLORS.pink, DS.border, DS.border], scoreColor: COLORS.orange, date: "22/03/26", initials: "LF" },
  { name: "Dra. Beatriz Lima", email: "beatriz.lima@hospital.com", score: 4, steps: [COLORS.blue, COLORS.purple, COLORS.pink, COLORS.orange, DS.border], scoreColor: COLORS.green, date: "21/03/26", initials: "BL" },
  { name: "Dr. Rafael Santos", email: "rafael.santos@med.com", score: 3, steps: [COLORS.blue, COLORS.purple, COLORS.pink, DS.border, DS.border], scoreColor: COLORS.orange, date: "20/03/26", initials: "RS" },
  { name: "Dra. Ana Costa", email: "ana.costa@clinica.com", score: 2, steps: [COLORS.blue, COLORS.purple, DS.border, DS.border, DS.border], scoreColor: COLORS.orange, date: "19/03/26", initials: "AC" },
  { name: "Dr. Pedro Nunes", email: "pedro.nunes@hospital.com", score: 3, steps: [COLORS.blue, COLORS.purple, COLORS.pink, DS.border, DS.border], scoreColor: COLORS.orange, date: "18/03/26", initials: "PN" },
  { name: "Dra. Julia Martins", email: "julia.martins@saude.com", score: 4, steps: [COLORS.blue, COLORS.purple, COLORS.pink, COLORS.orange, DS.border], scoreColor: COLORS.green, date: "17/03/26", initials: "JM" },
  { name: "Dr. Thiago Barbosa", email: "thiago.barbosa@med.com", score: 2, steps: [COLORS.blue, COLORS.purple, DS.border, DS.border, DS.border], scoreColor: COLORS.orange, date: "16/03/26", initials: "TB" },
  { name: "Dra. Fernanda Souza", email: "fernanda.souza@clinica.com", score: 3, steps: [COLORS.blue, COLORS.purple, COLORS.pink, DS.border, DS.border], scoreColor: COLORS.orange, date: "15/03/26", initials: "FS" },
  { name: "Dr. Gabriel Oliveira", email: "gabriel.oliveira@hospital.com", score: 3, steps: [COLORS.blue, COLORS.purple, COLORS.pink, DS.border, DS.border], scoreColor: COLORS.orange, date: "14/03/26", initials: "GO" },
];

const onboardingDelayedVisible = [
  { name: "Felipe Porto", email: "igorvboas.alura@gmail.com", score: 2, delay: "+1 dia parado", severity: "crit" as const, initials: "FP" },
  { name: "deoliveirasells", email: "deoliveirasells@gmail.com", score: 2, delay: "+0 dias", severity: "crit" as const, initials: "DO" },
  { name: "Usuario #47", email: "sem login ha 5 dias", score: 1, delay: "+5 dias", severity: "warn" as const, initials: "47" },
  { name: "Usuario #23", email: "sem login ha 7 dias", score: 1, delay: "+7 dias", severity: "warn" as const, initials: "23" },
];

const allOnboardingDelayed = [
  ...onboardingDelayedVisible,
  { name: "Dr. Henrique Dias", email: "sem login ha 3 dias", score: 1, delay: "+3 dias", severity: "warn" as const, initials: "HD" },
  { name: "Dra. Leticia Moura", email: "sem login ha 8 dias", score: 1, delay: "+8 dias", severity: "crit" as const, initials: "LM" },
  { name: "Dr. Vinicius Ramos", email: "sem login ha 4 dias", score: 1, delay: "+4 dias", severity: "warn" as const, initials: "VR" },
  { name: "Usuario #12", email: "sem login ha 10 dias", score: 1, delay: "+10 dias", severity: "crit" as const, initials: "12" },
  { name: "Usuario #58", email: "sem login ha 6 dias", score: 1, delay: "+6 dias", severity: "warn" as const, initials: "58" },
  { name: "Usuario #91", email: "sem login ha 12 dias", score: 1, delay: "+12 dias", severity: "crit" as const, initials: "91" },
  { name: "Dr. Bruno Teixeira", email: "sem login ha 9 dias", score: 1, delay: "+9 dias", severity: "crit" as const, initials: "BT" },
  { name: "Dra. Patricia Gomes", email: "sem login ha 2 dias", score: 2, delay: "+2 dias", severity: "warn" as const, initials: "PG" },
];

/* ═══════════════════════════════════════════════
   DATA — Charts originais
   ═══════════════════════════════════════════════ */

const barChartData = [2, 3, 1, 5, 4, 1, 3, 5, 3, 1, 4, 5, 3, 4];
const barChartLabels = ["13/03","14/03","15/03","16/03","17/03","18/03","19/03","20/03","21/03","22/03","23/03","24/03","25/03","26/03"];
const barChartDays = ["Sex","Sab","Dom","Seg","Ter","Qua","Qui","Sex","Sab","Dom","Seg","Ter","Qua","Qui"];

const donutData = [
  { label: "Em andamento", value: 7, color: DS.primary },
  { label: "Aguardando", value: 4, color: DS.warning },
  { label: "Cancelada", value: 2, color: DS.error },
  { label: "Finalizada", value: 0, color: DS.success },
];

const avgTimeData = [
  { label: "Cadastro", value: 8, color: COLORS.blue },
  { label: "Verificacao", value: 3, color: COLORS.purple },
  { label: "Login", value: 5, color: COLORS.pink },
  { label: "Onboarding", value: 24, color: COLORS.orange },
  { label: "1a Consulta", value: 38, color: COLORS.red },
];

/* ═══════════════════════════════════════════════
   DATA — Followup WhatsApp
   ═══════════════════════════════════════════════ */

const wppFollowupData = [
  { msg: "Inicial",  enviadas: 98, clicou: 47 },
  { msg: "1h",       enviadas: 83, clicou: 18 },
  { msg: "4h",       enviadas: 80, clicou: 14 },
  { msg: "Dia 1",    enviadas: 78, clicou: 11 },
  { msg: "Dia 2",    enviadas: 75, clicou:  9 },
  { msg: "Dia 3",    enviadas: 72, clicou:  7 },
  { msg: "Dia 4",    enviadas: 70, clicou:  6 },
  { msg: "Dia 5",    enviadas: 68, clicou:  5 },
  { msg: "Dia 6",    enviadas: 65, clicou:  4 },
  { msg: "Dia 7",    enviadas: 62, clicou:  3 },
];

/* ═══════════════════════════════════════════════
   DATA — Followup Email
   ═══════════════════════════════════════════════ */

const emailFollowupData = [
  { msg: "Inicial", enviados: 98, abertos: 61, clicou: 28 },
  { msg: "1h",      enviados: 83, abertos: 40, clicou: 14 },
  { msg: "4h",      enviados: 80, abertos: 36, clicou: 11 },
  { msg: "Dia 1",   enviados: 78, abertos: 30, clicou:  8 },
  { msg: "Dia 2",   enviados: 75, abertos: 26, clicou:  6 },
  { msg: "Dia 3",   enviados: 72, abertos: 21, clicou:  5 },
  { msg: "Dia 4",   enviados: 70, abertos: 18, clicou:  4 },
  { msg: "Dia 5",   enviados: 68, abertos: 15, clicou:  3 },
  { msg: "Dia 6",   enviados: 65, abertos: 13, clicou:  2 },
  { msg: "Dia 7",   enviados: 62, abertos: 10, clicou:  2 },
];

/* ═══════════════════════════════════════════════
   DATA — Calls de Onboarding
   ═══════════════════════════════════════════════ */

const callKpis = [
  { label: "Agendamentos", value: "13" as string, sub: "de 15 que fizeram login", color: COLORS.blue },
  { label: "Calls Realizadas", value: "9" as string, sub: "69% dos agendamentos", color: DS.success },
  { label: "No-show", value: "4" as string, sub: "31% de ausencia", color: DS.error },
  { label: "Tempo Login → Call", value: "2,4d", sub: "media em dias", color: COLORS.purple },
];

/* ═══════════════════════════════════════════════
   DATA — Cohort por semana
   ═══════════════════════════════════════════════ */

const cohortData = [
  { semana: "Sem 1", login: 80, onboarding: 60, consulta: 20 },
  { semana: "Sem 2", login: 72, onboarding: 55, consulta: 15 },
  { semana: "Sem 3", login: 65, onboarding: 48, consulta: 10 },
  { semana: "Sem 4", login: 58, onboarding: 40, consulta:  5 },
  { semana: "Sem 5", login: 50, onboarding: 32, consulta:  2 },
  { semana: "Sem 6", login: 42, onboarding: 22, consulta:  0 },
];

/* ═══════════════════════════════════════════════
   TOOLTIP INFO
   ═══════════════════════════════════════════════ */

const tooltipInfo: Record<string, { o_que_e: string; como_obter: string }> = {
  insights: {
    o_que_e: "Analise automatica do funil que identifica onde os usuarios estao travando e sugere acoes concretas para melhorar cada etapa. Verde = positivo, vermelho = problema critico.",
    como_obter: "Gerado automaticamente comparando as taxas de conversao entre etapas. Quando uma queda e maior que 30%, o sistema gera um alerta com sugestao de acao.",
  },
  onboarding_realizado: {
    o_que_e: "Lista dos medicos que completaram as primeiras etapas do sistema (criaram conta, logaram, fizeram o tour inicial). Quanto mais etapas concluidas, maior o score de 0 a 5.",
    como_obter: "Supabase: usuarios com onboarding_at preenchido, ordenados pelo numero de etapas completadas.",
  },
  onboarding_atrasado: {
    o_que_e: "Usuarios que compraram mas pararam em alguma etapa — nao logaram, nao completaram o tour, etc. O badge mostra ha quantos dias estao parados.",
    como_obter: "Supabase: usuarios sem login_at ou sem onboarding_at, com calculo de dias desde a compra.",
  },
  kpis: {
    o_que_e: "Contadores do funil principal: compras, acessos liberados, logins, onboardings e primeiras consultas realizadas no ciclo atual.",
    como_obter: "Supabase: tabela users com campos status, login_at, onboarding_at, first_consult_at. Contar registros por etapa.",
  },
  funil: {
    o_que_e: "Visualizacao do drop-off entre cada etapa do onboarding. Mostra onde os usuarios param de avançar.",
    como_obter: "Supabase: COUNT de usuarios por etapa (compra, acesso, login, onboarding, consulta). Calcular percentual em relacao ao total de compras.",
  },
  grafico01: {
    o_que_e: "Numero de consultas realizadas por dia nos ultimos 14 dias.",
    como_obter: "Supabase: COUNT de consultas agrupadas por DATE(created_at). Filtrar pelos ultimos 14 dias.",
  },
  grafico02: {
    o_que_e: "Distribuicao das consultas pelos status: em andamento, aguardando, cancelada e finalizada.",
    como_obter: "Supabase: COUNT de consultas agrupadas pelo campo status. Um registro por consulta com status atualizado.",
  },
  grafico03: {
    o_que_e: "Tempo medio que os usuarios passam em cada etapa do onboarding, em minutos.",
    como_obter: "Supabase: AVG da diferenca entre timestamps de entrada e saida de cada etapa (cadastro_at, verificacao_at, login_at, onboarding_at, consulta_at).",
  },
  callKpis: {
    o_que_e: "Metricas das calls de onboarding: quantas foram agendadas, realizadas, quantos nao compareceram e o tempo medio entre o login e o agendamento.",
    como_obter: "Supabase ou GoHighLevel: tabela calls com campos scheduled_at, completed_at, status (realizada/no-show). JOIN com users pelo login_at para calcular tempo.",
  },
  noshow: {
    o_que_e: "Percentual de profissionais que agendaram a call de onboarding mas nao compareceram.",
    como_obter: "Supabase: COUNT de calls com status = 'no-show' dividido pelo total de agendamentos. Campo status atualizado via webhook do Google Calendar ou GoHighLevel.",
  },
  tempoLoginCall: {
    o_que_e: "Media de dias entre o primeiro login e o agendamento da call por semana de compra. Indica se o followup esta convertendo rapido o suficiente.",
    como_obter: "Supabase: AVG(DATE(scheduled_at) - DATE(login_at)) agrupado por semana de compra (DATE_TRUNC('week', purchase_at)).",
  },
  wppFunil: {
    o_que_e: "Para cada mensagem do fluxo de followup no WhatsApp: quantas foram enviadas e quantas geraram clique na mensagem rapida.",
    como_obter: "n8n ou GoHighLevel: logar cada disparo na tabela followup_events com campos canal, mensagem, evento (enviado/clicado), user_id, created_at. Agrupar por mensagem e evento.",
  },
  emailFunil: {
    o_que_e: "Para cada email do fluxo de followup: quantos foram enviados, abertos e tiveram o link clicado.",
    como_obter: "Provedor de email (SendGrid, Resend, etc.): usar webhooks de delivered, open e click. Salvar eventos na tabela followup_events com canal = 'email'. Agrupar por mensagem.",
  },
  cohort: {
    o_que_e: "Agrupa usuarios pela semana em que fizeram a compra e mostra que percentual atingiu login, onboarding e 1a consulta. Revela se usuarios mais antigos convertem melhor ou pior.",
    como_obter: "Supabase: GROUP BY DATE_TRUNC('week', purchase_at). Para cada grupo calcular COUNT de login_at, onboarding_at, first_consult_at dividido pelo total do grupo.",
  },
};

/* ═══════════════════════════════════════════════
   COMPONENTE — OBInfoTooltip
   ═══════════════════════════════════════════════ */

function OBInfoTooltip({ id }: { id: string }) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const info = tooltipInfo[id];
  if (!info) return null;

  const TIP_W = 300;

  const show = () => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const goLeft = r.right + TIP_W + 8 > window.innerWidth;
    setPos({
      top: r.bottom + 8,
      left: goLeft ? Math.max(8, r.right - TIP_W) : r.left,
    });
  };

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button
        ref={btnRef}
        onMouseEnter={show}
        onMouseLeave={() => setPos(null)}
        onClick={() => pos ? setPos(null) : show()}
        style={{
          width: 18, height: 18, borderRadius: "50%",
          background: pos ? DS.primary : DS.bgTableRow,
          border: `1px solid ${pos ? DS.primary : DS.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", flexShrink: 0, transition: "all 0.15s",
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, color: pos ? "#fff" : DS.textTertiary, lineHeight: 1 }}>i</span>
      </button>

      {pos && (
        <div style={{
          position: "fixed", top: pos.top, left: pos.left, zIndex: 999999,
          width: TIP_W, background: "#1A1A1A", borderRadius: 10,
          padding: 16, boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          pointerEvents: "none",
        }}>
          <div style={{ marginBottom: 10 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 4px" }}>O que e</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.5 }}>{info.o_que_e}</p>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: DS.success, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 4px" }}>Como obter</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.5 }}>{info.como_obter}</p>
          </div>
          <div style={{ position: "absolute", top: -5, left: 6, width: 10, height: 10, background: DS.textPrimary, transform: "rotate(45deg)", borderRadius: 1 }} />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════ */

const kpiIcons: Record<string, React.ReactNode> = {
  cart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>,
  key: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78Zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  login: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>,
  rocket: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>,
  heart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
};

/* ═══════════════════════════════════════════════
   SHARED STYLES
   ═══════════════════════════════════════════════ */

const card: React.CSSProperties = {
  background: DS.bgCard,
  borderRadius: DS.cardRadius,
  boxShadow: DS.cardShadow,
  padding: 24,
  overflow: "hidden",
};

const sectionTitle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: DS.primary,
  margin: 0,
};

const sectionDivider: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  margin: "36px 0 20px",
};

/* ═══════════════════════════════════════════════
   ONBOARDING DASH
   ═══════════════════════════════════════════════ */

function OnboardingDash() {
  const [insightsOpen, setInsightsOpen] = useState(true);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredDonut, setHoveredDonut] = useState<number | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalSearch, setModalSearch] = useState("");
  const [hoveredWpp, setHoveredWpp] = useState<number | null>(null);
  const [hoveredEmail, setHoveredEmail] = useState<number | null>(null);
  const [hoveredCohort, setHoveredCohort] = useState<number | null>(null);

  const maxBar = Math.max(...barChartData, 1);
  const maxTime = Math.max(...avgTimeData.map(d => d.value));
  const donutTotal = donutData.reduce((s, d) => s + d.value, 0) || 1;
  const maxWpp = Math.max(...wppFollowupData.map(d => d.enviadas));
  const maxEmail = Math.max(...emailFollowupData.map(d => d.enviados));

  return (
    <div style={{ minHeight: "100vh", background: DS.bgPage, fontFamily: "'Inter', system-ui, sans-serif", padding: "44px 64px 64px" }}>
      <div>

        {/* HEADER */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 600, color: DS.textPrimary, margin: 0, lineHeight: 1.2 }}>
              Onboarding · Acompanhamento Medicos
            </h1>
            <p style={{ fontSize: 12, color: DS.textTertiary, margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>
              Funil completo de ativacao — 98 usuarios no ciclo atual
            </p>
          </div>
        </header>

        <main>

          {/* KPIs */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: DS.textSecondary, textTransform: "uppercase", letterSpacing: 0.5, margin: 0 }}>Resumo do ciclo</p>
            <OBInfoTooltip id="kpis" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20, marginBottom: 28 }}>
            {kpiCards.map((kpi) => {
              const pctColor = kpi.pct >= 80 ? DS.success : kpi.pct >= 30 ? DS.warning : DS.error;
              return (
                <div key={kpi.label} style={{ ...card, padding: 24, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: DS.textTertiary, textTransform: "uppercase", letterSpacing: 0.5, margin: 0 }}>{kpi.label}</p>
                    <div style={{ color: kpi.color, opacity: 0.6 }}>{kpiIcons[kpi.icon]}</div>
                  </div>
                  <p style={{ fontSize: 28, fontWeight: 700, color: DS.textPrimary, margin: 0, lineHeight: 1.2 }}>{kpi.value}</p>
                  <div style={{ marginTop: 12 }}>
                    <div style={{ height: 6, background: DS.divider, borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: pctColor, borderRadius: 3, width: `${Math.max(kpi.pct, 1)}%`, transition: "width 1s" }} />
                    </div>
                    <p style={{ fontSize: 11, marginTop: 4, margin: "4px 0 0", color: kpi.alert ? DS.error : DS.textSecondary, fontWeight: kpi.alert ? 600 : 400 }}>
                      {kpi.pct}% · {kpi.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FUNNEL + RANKINGS */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, marginBottom: 28 }}>

            {/* FUNNEL */}
            <div style={{ ...card }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.primary} strokeWidth="1.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                <h3 style={{ ...sectionTitle }}>Funil de Onboarding</h3>
                <span style={{ fontSize: 12, color: DS.textTertiary, fontWeight: 500 }}>Drop-off entre cada etapa</span>
                <OBInfoTooltip id="funil" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                {funnelSteps.map((step, i) => {
                  const isCritical = step.value === 0;
                  return (
                    <div key={step.label} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <div
                          style={{ width: `${step.w}%`, display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 8, padding: "14px 16px", background: "transparent", border: isCritical ? `2px dashed ${DS.border}` : `1px solid ${DS.border}`, transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s", cursor: "default" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = DS.bgTableRow; (e.currentTarget as HTMLDivElement).style.borderColor = DS.primaryLight; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(27,66,102,0.1)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; (e.currentTarget as HTMLDivElement).style.borderColor = DS.border; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", background: step.color }}>{String(i + 1).padStart(2, "0")}</span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: step.color }}>{step.label}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 24, fontWeight: 800, color: DS.textPrimary }}>{step.value}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, padding: "2px 8px", borderRadius: 4, color: step.color, background: `${step.color}12` }}>{step.pct}%</span>
                          </div>
                        </div>
                      </div>
                      {i < drops.length && (
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", width: `${Math.max((step.w + (funnelSteps[i + 1]?.w || step.w)) / 2, 50)}%` }}>
                          <div style={{ flex: 1, height: 1, background: `${step.color}25` }} />
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, whiteSpace: "nowrap", color: dropColors[drops[i].type].text, background: dropColors[drops[i].type].bg, border: `1px solid ${dropColors[drops[i].type].border}` }}>
                            {drops[i].type === "ok" ? "✓ " : drops[i].type === "crit" ? "⚠ " : "↓ "}{drops[i].text}
                          </span>
                          <div style={{ flex: 1, height: 1, background: `${(funnelSteps[i + 1]?.color || step.color)}25` }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* INSIGHTS */}
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${DS.border}` }}>
                <div onClick={() => setInsightsOpen(v => !v)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "6px 0" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.primary} strokeWidth="1.5"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><path d="M9 21h6"/></svg>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: DS.textPrimary, margin: 0 }}>Insights do Funil</h3><OBInfoTooltip id="insights" />
                  <span style={{ fontSize: 12, color: DS.textTertiary }}>{insights.length} alertas</span>
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, background: DS.bgTableRow, border: `1px solid ${DS.border}`, borderRadius: 6, padding: "4px 10px" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: DS.textTertiary, textTransform: "uppercase", letterSpacing: 0.5 }}>{insightsOpen ? "Recolher" : "Expandir"}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DS.primary} strokeWidth="2.5" style={{ transition: "transform 0.3s", transform: insightsOpen ? "rotate(180deg)" : "" }}><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
                {insightsOpen && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 }}>
                    {insights.map((ins, i) => {
                      const isPositive = ins.tipo === "positivo";
                      const accentColor = isPositive ? DS.success : DS.error;
                      return (
                        <div key={i} style={{ borderRadius: 8, padding: 14, border: `1px solid ${accentColor}30`, background: `${accentColor}06` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: accentColor }} />
                            <span style={{ fontSize: 11, fontWeight: 600, color: accentColor, textTransform: "uppercase" }}>{ins.tipo}</span>
                          </div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: DS.textPrimary, margin: "0 0 4px", lineHeight: 1.4 }}>{ins.titulo}</p>
                          <p style={{ fontSize: 12, color: DS.textSecondary, margin: "0 0 6px", lineHeight: 1.5 }}>{ins.descricao}</p>
                          <p style={{ fontSize: 11, color: DS.textTertiary, margin: 0, fontStyle: "italic" }}>→ {ins.acao}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* RANKINGS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Onboarding Realizado */}
              <div style={{ ...card, flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.success} strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                    <h3 style={{ ...sectionTitle, fontSize: 14 }}>Onboarding Realizado</h3><OBInfoTooltip id="onboarding_realizado" />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: `${DS.success}12`, color: DS.success, border: `1px solid ${DS.success}30` }}>✓ 13 ativos</span>
                </div>
                <p style={{ fontSize: 11, color: DS.textTertiary, margin: "0 0 8px" }}>Medicos que completaram o onboarding inicial</p>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12, padding: "0 8px" }}>
                  {[{ color: COLORS.blue, label: "Compra" }, { color: COLORS.purple, label: "Acesso" }, { color: COLORS.pink, label: "Login" }, { color: COLORS.orange, label: "Onboarding" }, { color: COLORS.red, label: "1a Consulta" }].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: DS.textSecondary }}>{s.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, overflow: "auto" }}>
                  {onboardingDoneVisible.map((u, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < onboardingDoneVisible.length - 1 ? `1px solid ${DS.divider}` : "none" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, width: 24, textAlign: "center", color: i === 0 ? DS.warning : DS.textTertiary }}>{i + 1}°</span>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: DS.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{u.initials}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: DS.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</div>
                        <div style={{ fontSize: 11, color: DS.textTertiary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                      </div>
                      <div style={{ display: "flex", gap: 4 }}>
                        {u.steps.map((c, si) => <span key={si} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: u.scoreColor, fontVariantNumeric: "tabular-nums" }}>{u.score}/5</span>
                      <span style={{ fontSize: 12, color: DS.textTertiary }}>{u.date}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${DS.border}`, textAlign: "center" }}>
                  <button onClick={() => { setModalType("done"); setModalSearch(""); }} style={{ fontSize: 13, fontWeight: 600, color: DS.primary, background: `${DS.primary}10`, border: `1px solid ${DS.primary}30`, borderRadius: 6, padding: "8px 16px", cursor: "pointer" }}>
                    Ver todos os 13 medicos
                  </button>
                </div>
              </div>

              {/* Onboarding Atrasado */}
              <div style={{ ...card, flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.error} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                    <h3 style={{ ...sectionTitle, fontSize: 14, color: DS.primary }}>Onboarding Atrasado</h3><OBInfoTooltip id="onboarding_atrasado" />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: `${DS.error}12`, color: DS.error, border: `1px solid ${DS.error}30` }}>⚠ 85 parados</span>
                </div>
                <p style={{ fontSize: 11, color: DS.textTertiary, margin: "0 0 12px" }}>Usuarios travados no funil sem avancar</p>
                <div style={{ flex: 1, overflow: "auto" }}>
                  {onboardingDelayedVisible.map((u, i) => {
                    const isCrit = u.severity === "crit";
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < onboardingDelayedVisible.length - 1 ? `1px solid ${DS.divider}` : "none" }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: isCrit ? DS.error : DS.warning, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{u.initials}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: DS.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</div>
                          <div style={{ fontSize: 11, color: DS.textTertiary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: DS.error, fontVariantNumeric: "tabular-nums" }}>{u.score}/5</span>
                        <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: isCrit ? `${DS.error}10` : `${DS.warning}10`, color: isCrit ? DS.error : DS.warning, border: `1px solid ${isCrit ? DS.error : DS.warning}30` }}>{u.delay}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${DS.border}`, textAlign: "center" }}>
                  <button onClick={() => { setModalType("delayed"); setModalSearch(""); }} style={{ fontSize: 13, fontWeight: 600, color: DS.error, background: `${DS.error}10`, border: `1px solid ${DS.error}30`, borderRadius: 6, padding: "8px 16px", cursor: "pointer" }}>
                    Ver todos os 85 usuarios
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CHARTS ORIGINAIS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>

            {/* Chart 1 */}
            <div style={{ ...card, display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 4 }}><span style={{ fontSize: 11, fontWeight: 600, color: DS.textTertiary, textTransform: "uppercase", letterSpacing: 0.5 }}>Grafico 01</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <h3 style={{ ...sectionTitle, fontSize: 14 }}>Total de Consultas Realizadas</h3>
                <OBInfoTooltip id="grafico01" />
              </div>
              <p style={{ fontSize: 11, color: DS.textTertiary, margin: "0 0 16px" }}>Evolucao diaria dos ultimos 14 dias</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 3, flex: 1, marginTop: "auto" }}>
                {barChartData.map((v, i) => {
                  const h = Math.max((v / maxBar) * 100, 6);
                  const isHovered = hoveredBar === i;
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: 220, cursor: "default", position: "relative" }}
                      onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                      {isHovered && (
                        <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", zIndex: 20, background: DS.bgCard, border: `1px solid ${DS.border}`, borderRadius: 6, padding: "2px 8px", boxShadow: DS.cardShadow, whiteSpace: "nowrap" }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: DS.textPrimary }}>{v}</span>
                        </div>
                      )}
                      <div style={{ width: "100%", borderRadius: "3px 3px 0 0", height: `${h}%`, background: v === 0 ? DS.divider : isHovered ? DS.primary : DS.primaryLight, border: v === 0 ? `1px solid ${DS.border}` : "none", transition: "all 0.2s" }} />
                      <span style={{ fontSize: 10, padding: "3px 0 0", color: isHovered ? DS.textPrimary : DS.textTertiary, fontWeight: isHovered ? 600 : 400 }}>{barChartDays[i]}</span>
                      <span style={{ fontSize: 9, color: DS.textDisabled }}>{barChartLabels[i]?.slice(0, 5)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart 2 */}
            <div style={{ ...card, display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 4 }}><span style={{ fontSize: 11, fontWeight: 600, color: DS.textTertiary, textTransform: "uppercase", letterSpacing: 0.5 }}>Grafico 02</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <h3 style={{ ...sectionTitle, fontSize: 14 }}>Status da Consulta</h3>
                <OBInfoTooltip id="grafico02" />
              </div>
              <p style={{ fontSize: 11, color: DS.textTertiary, margin: "0 0 20px" }}>Distribuicao por situacao atual</p>
              <div style={{ display: "flex", alignItems: "center", gap: 24, flex: 1 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <svg width="160" height="160" viewBox="0 0 160 160" onMouseLeave={() => setHoveredDonut(null)}>
                    <circle cx="80" cy="80" r="60" fill="none" stroke={DS.divider} strokeWidth="14" />
                    {(() => {
                      const r = 60, svgCx = 80, svgCy = 80, circ = 2 * Math.PI * r;
                      let acc = 0;
                      return donutData.map((d, i) => {
                        if (d.value === 0) return null;
                        const gap = 4;
                        const segAngle = (d.value / donutTotal) * circ;
                        const dash = Math.max(segAngle - gap, 0);
                        const offset = acc + gap / 2;
                        const isHovered = hoveredDonut === i;
                        acc += segAngle;
                        return (
                          <circle key={i} cx={svgCx} cy={svgCy} r={r} fill="none" stroke={d.color} strokeWidth={isHovered ? 18 : 14} strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset} strokeLinecap="round" transform={`rotate(-90 ${svgCx} ${svgCy})`} style={{ transition: "stroke-width 0.2s, filter 0.2s", cursor: "pointer", filter: isHovered ? `drop-shadow(0 0 6px ${d.color}60)` : "none" }} onMouseEnter={() => setHoveredDonut(i)} />
                        );
                      });
                    })()}
                    {hoveredDonut !== null && donutData[hoveredDonut].value > 0 ? (
                      <>
                        <text x="80" y="72" textAnchor="middle" fill={donutData[hoveredDonut].color} fontSize="26" fontWeight="800">{donutData[hoveredDonut].value}</text>
                        <text x="80" y="92" textAnchor="middle" fill={DS.textTertiary} fontSize="10">{donutData[hoveredDonut].label}</text>
                      </>
                    ) : (
                      <>
                        <text x="80" y="74" textAnchor="middle" fill={DS.textPrimary} fontSize="28" fontWeight="800">{donutTotal}</text>
                        <text x="80" y="94" textAnchor="middle" fill={DS.textTertiary} fontSize="11">consultas</text>
                      </>
                    )}
                  </svg>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  {donutData.map((d, i) => {
                    const pct = donutTotal > 0 ? Math.round((d.value / donutTotal) * 100) : 0;
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 6, border: `1px solid ${DS.border}`, cursor: "default", transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = DS.bgTableRow; (e.currentTarget as HTMLDivElement).style.borderColor = d.color; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 2px 8px ${d.color}20`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; (e.currentTarget as HTMLDivElement).style.borderColor = DS.border; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                        <span style={{ width: 12, height: 12, borderRadius: 3, background: d.color, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: DS.textDefault }}>{d.label}</div>
                          <div style={{ fontSize: 11, color: DS.textTertiary }}>{pct}% do total</div>
                        </div>
                        <span style={{ fontSize: 18, fontWeight: 700, color: d.color, fontVariantNumeric: "tabular-nums" }}>{d.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Chart 3 */}
            <div style={{ ...card, display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 4 }}><span style={{ fontSize: 11, fontWeight: 600, color: DS.textTertiary, textTransform: "uppercase", letterSpacing: 0.5 }}>Grafico 03</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <h3 style={{ ...sectionTitle, fontSize: 14 }}>Tempo Medio de Consulta</h3>
                <OBInfoTooltip id="grafico03" />
              </div>
              <p style={{ fontSize: 11, color: DS.textTertiary, margin: "0 0 12px" }}>Por etapa do onboarding (em minutos)</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 16 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: DS.primary, lineHeight: 1, letterSpacing: -1 }}>24</span>
                <span style={{ fontSize: 14, color: DS.textTertiary, marginBottom: 4 }}>min/media geral</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, justifyContent: "center" }}>
                {avgTimeData.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: DS.textTertiary, width: 80, textAlign: "right", flexShrink: 0, fontWeight: 500 }}>{d.label}</span>
                    <div style={{ flex: 1, height: 32, background: DS.bgTableRow, borderRadius: DS.cardRadius, overflow: "hidden", border: `1px solid ${DS.border}` }}>
                      <div style={{ height: "100%", borderRadius: DS.cardRadius, width: `${(d.value / maxTime) * 100}%`, background: `linear-gradient(90deg, ${d.color}, ${d.color}80)`, transition: "width 0.6s" }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: DS.textPrimary, width: 50, fontVariantNumeric: "tabular-nums" }}>{d.value} min</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CALLS DE ONBOARDING */}
          <div style={sectionDivider}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.primary} strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l1.88-1.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: DS.textPrimary, margin: 0 }}>Calls de Onboarding</h2>
            <OBInfoTooltip id="callKpis" />
            <div style={{ flex: 1, height: 1, background: DS.border }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 28 }}>
            {callKpis.map((kpi) => (
              <div key={kpi.label} style={{ ...card, padding: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: DS.textTertiary, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 8px" }}>{kpi.label}</p>
                <p style={{ fontSize: 32, fontWeight: 700, color: kpi.color, margin: "0 0 4px", lineHeight: 1 }}>{kpi.value}</p>
                <p style={{ fontSize: 11, color: DS.textSecondary, margin: 0 }}>{kpi.sub}</p>
              </div>
            ))}
          </div>

          {/* No-show donut + tempo medio */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, marginBottom: 28 }}>
            <div style={{ ...card, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <h3 style={{ ...sectionTitle, fontSize: 14 }}>No-show vs Realizadas</h3>
                <OBInfoTooltip id="noshow" />
              </div>
              <p style={{ fontSize: 11, color: DS.textTertiary, margin: "0 0 20px" }}>Presenca nas calls de onboarding</p>
              <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1 }}>
                <svg width="120" height="120" viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
                  <circle cx="60" cy="60" r="48" fill="none" stroke={DS.divider} strokeWidth="12" />
                  <circle cx="60" cy="60" r="48" fill="none" stroke={DS.success} strokeWidth="12"
                    strokeDasharray={`${(9 / 13) * 2 * Math.PI * 48} ${2 * Math.PI * 48}`}
                    strokeDashoffset={0} strokeLinecap="round"
                    transform="rotate(-90 60 60)" />
                  <circle cx="60" cy="60" r="48" fill="none" stroke={DS.error} strokeWidth="12"
                    strokeDasharray={`${(4 / 13) * 2 * Math.PI * 48 - 4} ${2 * Math.PI * 48}`}
                    strokeDashoffset={-(9 / 13) * 2 * Math.PI * 48 - 2} strokeLinecap="round"
                    transform="rotate(-90 60 60)" />
                  <text x="60" y="56" textAnchor="middle" fill={DS.textPrimary} fontSize="20" fontWeight="800">69%</text>
                  <text x="60" y="72" textAnchor="middle" fill={DS.textTertiary} fontSize="9">presenca</text>
                </svg>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[{ label: "Realizadas", value: 9, color: DS.success, pct: "69%" }, { label: "No-show", value: 4, color: DS.error, pct: "31%" }].map(item => (
                    <div key={item.label}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: item.color }} />
                        <span style={{ fontSize: 12, color: DS.textSecondary }}>{item.label}</span>
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: item.color }}>{item.value} <span style={{ fontSize: 12, fontWeight: 500, color: DS.textTertiary }}>{item.pct}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ ...card, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <h3 style={{ ...sectionTitle, fontSize: 14 }}>Tempo Medio Login → Agendamento</h3>
                <OBInfoTooltip id="tempoLoginCall" />
              </div>
              <p style={{ fontSize: 11, color: DS.textTertiary, margin: "0 0 20px" }}>Media de dias por semana de compra</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flex: 1 }}>
                {[{ s: "Sem 1", d: 1.2 }, { s: "Sem 2", d: 1.8 }, { s: "Sem 3", d: 2.4 }, { s: "Sem 4", d: 3.1 }, { s: "Sem 5", d: 4.0 }, { s: "Sem 6", d: 4.8 }].map((item, i) => {
                  const maxD = 5;
                  const h = Math.round((item.d / maxD) * 100);
                  const color = item.d <= 2 ? DS.success : item.d <= 3.5 ? DS.warning : DS.error;
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: 160 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 4 }}>{item.d}d</span>
                      <div style={{ width: "100%", borderRadius: "3px 3px 0 0", height: `${h}%`, background: color, opacity: 0.85 }} />
                      <span style={{ fontSize: 11, color: DS.textTertiary, marginTop: 4 }}>{item.s}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FUNIL FOLLOWUP WHATSAPP */}
          <div style={sectionDivider}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: DS.textPrimary, margin: 0 }}>Funil de Followup — WhatsApp</h2>
            <OBInfoTooltip id="wppFunil" />
            <div style={{ flex: 1, height: 1, background: DS.border }} />
          </div>

          <div style={{ ...card, marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
              {[{ color: "#1B4266", label: "Mensagens enviadas" }, { color: "#10B981", label: "Clicou na msg rapida" }].map(l => (
                <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: DS.textSecondary }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />{l.label}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {wppFollowupData.map((row, i) => {
                const pctEnv = Math.round((row.enviadas / maxWpp) * 100);
                const pctClick = Math.round((row.clicou / row.enviadas) * 100);
                const isHov = hoveredWpp === i;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 8px", borderRadius: 6, background: isHov ? DS.bgTableRow : "transparent", transition: "background 0.15s", cursor: "default" }}
                    onMouseEnter={() => setHoveredWpp(i)} onMouseLeave={() => setHoveredWpp(null)}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: DS.textTertiary, width: 44, textAlign: "right", flexShrink: 0 }}>{row.msg}</span>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                      <div style={{ height: 16, background: DS.bgTableRow, borderRadius: 3, overflow: "hidden", border: `1px solid ${DS.border}` }}>
                        <div style={{ height: "100%", width: `${pctEnv}%`, background: DS.primary, borderRadius: 3, transition: "width 0.4s" }} />
                      </div>
                      <div style={{ height: 12, background: DS.bgTableRow, borderRadius: 3, overflow: "hidden", border: `1px solid ${DS.border}` }}>
                        <div style={{ height: "100%", width: `${Math.round((row.clicou / maxWpp) * 100)}%`, background: DS.success, borderRadius: 3, transition: "width 0.4s" }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 16, width: 160, flexShrink: 0 }}>
                      <span style={{ fontSize: 12, color: DS.textSecondary, width: 60 }}>{row.enviadas} env.</span>
                      <span style={{ fontSize: 12, color: DS.success, fontWeight: 600, width: 60 }}>{row.clicou} cli. <span style={{ fontSize: 11, color: DS.textTertiary, fontWeight: 400 }}>({pctClick}%)</span></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FUNIL FOLLOWUP EMAIL */}
          <div style={sectionDivider}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.primary} strokeWidth="1.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: DS.textPrimary, margin: 0 }}>Funil de Followup — Email</h2>
            <OBInfoTooltip id="emailFunil" />
            <div style={{ flex: 1, height: 1, background: DS.border }} />
          </div>

          <div style={{ ...card, marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
              {[{ color: DS.primary, label: "Enviados" }, { color: "#7C3AED", label: "Abertos" }, { color: "#DB2777", label: "Clicou no link" }].map(l => (
                <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: DS.textSecondary }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />{l.label}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {emailFollowupData.map((row, i) => {
                const pctAberto = Math.round((row.abertos / row.enviados) * 100);
                const pctClick = row.abertos > 0 ? Math.round((row.clicou / row.abertos) * 100) : 0;
                const isHov = hoveredEmail === i;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 8px", borderRadius: 6, background: isHov ? DS.bgTableRow : "transparent", transition: "background 0.15s", cursor: "default" }}
                    onMouseEnter={() => setHoveredEmail(i)} onMouseLeave={() => setHoveredEmail(null)}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: DS.textTertiary, width: 44, textAlign: "right", flexShrink: 0 }}>{row.msg}</span>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                      <div style={{ height: 12, background: DS.bgTableRow, borderRadius: 3, overflow: "hidden", border: `1px solid ${DS.border}` }}>
                        <div style={{ height: "100%", width: `${Math.round((row.enviados / maxEmail) * 100)}%`, background: DS.primary, borderRadius: 3 }} />
                      </div>
                      <div style={{ height: 12, background: DS.bgTableRow, borderRadius: 3, overflow: "hidden", border: `1px solid ${DS.border}` }}>
                        <div style={{ height: "100%", width: `${Math.round((row.abertos / maxEmail) * 100)}%`, background: "#7C3AED", borderRadius: 3 }} />
                      </div>
                      <div style={{ height: 12, background: DS.bgTableRow, borderRadius: 3, overflow: "hidden", border: `1px solid ${DS.border}` }}>
                        <div style={{ height: "100%", width: `${Math.round((row.clicou / maxEmail) * 100)}%`, background: "#DB2777", borderRadius: 3 }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, width: 240, flexShrink: 0 }}>
                      <span style={{ fontSize: 11, color: DS.textSecondary, width: 60 }}>{row.enviados} env.</span>
                      <span style={{ fontSize: 11, color: "#7C3AED", width: 80 }}>{row.abertos} ab. <span style={{ color: DS.textTertiary }}>({pctAberto}%)</span></span>
                      <span style={{ fontSize: 11, color: "#DB2777", fontWeight: 600 }}>{row.clicou} cli. <span style={{ color: DS.textTertiary, fontWeight: 400 }}>({pctClick}%)</span></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COHORT POR SEMANA */}
          <div style={sectionDivider}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.primary} strokeWidth="1.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: DS.textPrimary, margin: 0 }}>Cohort de Conversao por Semana de Compra</h2>
            <OBInfoTooltip id="cohort" />
            <div style={{ flex: 1, height: 1, background: DS.border }} />
          </div>

          <div style={{ ...card, marginBottom: 28 }}>
            <p style={{ fontSize: 11, color: DS.textTertiary, margin: "0 0 20px" }}>Porcentagem de usuarios que atingiram cada etapa, agrupados pela semana em que realizaram a compra</p>
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              {[{ color: COLORS.blue, label: "Login (%)" }, { color: COLORS.purple, label: "Onboarding (%)" }, { color: DS.success, label: "1a Consulta (%)" }].map(l => (
                <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: DS.textSecondary }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />{l.label}
                </span>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
              {cohortData.map((row, i) => {
                const isHov = hoveredCohort === i;
                return (
                  <div key={i} style={{ borderRadius: 8, border: `1px solid ${isHov ? DS.primaryLight : DS.border}`, padding: 16, background: isHov ? DS.bgTableRow : "transparent", transition: "all 0.15s", cursor: "default" }}
                    onMouseEnter={() => setHoveredCohort(i)} onMouseLeave={() => setHoveredCohort(null)}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: DS.primary, margin: "0 0 12px" }}>{row.semana}</p>
                    {[
                      { label: "Login", value: row.login, color: COLORS.blue },
                      { label: "Onboard.", value: row.onboarding, color: COLORS.purple },
                      { label: "Consulta", value: row.consulta, color: DS.success },
                    ].map(item => (
                      <div key={item.label} style={{ marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ fontSize: 10, color: DS.textTertiary }}>{item.label}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: item.color }}>{item.value}%</span>
                        </div>
                        <div style={{ height: 6, background: DS.divider, borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${item.value}%`, background: item.color, borderRadius: 3, opacity: 0.85 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      </div>

      {/* MODAL */}
      {modalType && (() => {
        const isDone = modalType === "done";
        const allData: Array<{ name: string; email: string; score: number; initials: string; steps?: string[]; scoreColor?: string; date?: string; delay?: string; severity?: string }> = isDone ? allOnboardingDone : allOnboardingDelayed;
        const filtered = allData.filter(u => u.name.toLowerCase().includes(modalSearch.toLowerCase()) || u.email.toLowerCase().includes(modalSearch.toLowerCase()));
        const accentColor = isDone ? DS.primary : DS.error;

        return (
          <div onClick={() => setModalType(null)} style={{ position: "fixed", inset: 0, zIndex: 100000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }} />
            <div onClick={e => e.stopPropagation()} style={{ position: "relative", width: "100%", maxWidth: 640, maxHeight: "80vh", display: "flex", flexDirection: "column", background: DS.bgCard, borderRadius: DS.cardRadius, boxShadow: "0 24px 80px rgba(0,0,0,0.2)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${DS.border}` }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 600, color: DS.textPrimary, margin: 0 }}>{isDone ? "Onboarding Realizado" : "Onboarding Atrasado"}</h2>
                  <p style={{ fontSize: 12, color: DS.textTertiary, margin: 0 }}>{filtered.length} de {allData.length} {isDone ? "medicos" : "usuarios"}</p>
                </div>
                <button onClick={() => setModalType(null)} style={{ background: DS.bgTableRow, border: `1px solid ${DS.border}`, borderRadius: DS.cardRadius, padding: 8, cursor: "pointer", display: "flex", alignItems: "center", color: DS.textTertiary }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
              <div style={{ padding: "12px 20px", borderBottom: `1px solid ${DS.divider}` }}>
                <div style={{ position: "relative" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.textTertiary} strokeWidth="2" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <input type="text" placeholder="Buscar por nome ou email..." value={modalSearch} onChange={e => setModalSearch(e.target.value)}
                    style={{ width: "100%", background: DS.bgTableRow, border: `1px solid ${DS.border}`, borderRadius: 6, paddingLeft: 36, paddingRight: 12, paddingTop: 10, paddingBottom: 10, fontSize: 13, color: DS.textPrimary, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "8px 20px" }}>
                {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: DS.textTertiary, fontSize: 13 }}>Nenhum resultado encontrado</div>}
                {filtered.map((u, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderRadius: DS.cardRadius, borderBottom: `1px solid ${DS.divider}` }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: DS.textTertiary, width: 24, textAlign: "center" }}>{i + 1}</span>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: accentColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{u.initials}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: DS.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</div>
                      <div style={{ fontSize: 11, color: DS.textTertiary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                    </div>
                    {isDone && u.steps ? (
                      <>
                        <div style={{ display: "flex", gap: 4 }}>
                          {u.steps.map((c: string, si: number) => <span key={si} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: u.scoreColor, fontVariantNumeric: "tabular-nums" }}>{u.score}/5</span>
                        <span style={{ fontSize: 12, color: DS.textTertiary }}>{u.date}</span>
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: 14, fontWeight: 700, color: DS.error, fontVariantNumeric: "tabular-nums" }}>{u.score}/5</span>
                        {u.delay && (
                          <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: u.severity === "crit" ? `${DS.error}10` : `${DS.warning}10`, color: u.severity === "crit" ? DS.error : DS.warning, border: `1px solid ${u.severity === "crit" ? DS.error : DS.warning}30` }}>{u.delay}</span>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

/* ═══════════════════════ DRE DASHBOARD ═══════════════════════ */

const PLANOS = {
  essencial:    { qtd: 8, preco: 997  },
  professional: { qtd: 3, preco: 1497 },
  clinica:      { qtd: 1, preco: 2997 },
  enterprise:   { qtd: 0, preco: 5997 },
};
const totalClientes = Object.values(PLANOS).reduce((s,p) => s+p.qtd, 0);
const mrr           = Object.values(PLANOS).reduce((s,p) => s+p.qtd*p.preco, 0);
const arpu          = mrr / totalClientes;
const newMrr        = 3 * arpu;
const expansionMrr  = 0;
const churnedMrr    = 997;
const churnRate     = churnedMrr / mrr;
const receitaBruta  = mrr;
const iss           = receitaBruta * 0.05;
const pis           = receitaBruta * 0.0065;
const cofins        = receitaBruta * 0.03;
const taxaGateway   = receitaBruta * (0.60*0.0099 + 0.30*0.0299 + 0.10*(3.50/receitaBruta));
const inadimplencia = receitaBruta * 0.02;
const totalDed      = iss+pis+cofins+taxaGateway+inadimplencia;
const receitaLiq    = receitaBruta - totalDed;
const cogsia        = (420+80)*5.10;
const cogsSupabase  = 500;
const cogsVercel    = 300;
const cogsWpp       = 250;
const cogsOutros    = 150;
const cogsSupporte  = 8000*0.20;
const totalCogs     = cogsia+cogsSupabase+cogsVercel+cogsWpp+cogsOutros+cogsSupporte;
const lucroBruto    = receitaLiq - totalCogs;
const margemBruta   = lucroBruto / receitaLiq;
const opexPD        = 8000*0.80;
const opexSM        = 4000;
const opexGA        = 6000;
const opexMkt       = 2800;
const opexParceiros = receitaBruta*0.05;
const opexTools     = 750+300+400;
const opexContabil  = 600+500;
const opexDepreciac = 200;
const totalOpex     = opexPD+opexSM+opexGA+opexMkt+opexParceiros+opexTools+opexContabil+opexDepreciac;
const ebitda        = lucroBruto - totalOpex;
const margemEbitda  = ebitda / receitaLiq;
const ebit          = ebitda - opexDepreciac;
const recFinanc     = 150;
const lair          = ebit + recFinanc;
const irpj          = receitaBruta*0.32*0.15;
const csll          = receitaBruta*0.32*0.09;
const totalIr       = irpj+csll;
const lucroLiq      = lair - totalIr;
const margemLiq     = lucroLiq / receitaLiq;
const arr           = mrr * 12;
const cac           = (opexSM+opexMkt) / 3;
const ltv           = arpu / churnRate;
const ltvCac        = ltv / cac;
const payback       = cac / (arpu*margemBruta);
const burnRate      = lucroLiq < 0 ? -lucroLiq : 0;
const runway        = burnRate > 0 ? 45000/burnRate : 99;
const nrr           = (mrr+expansionMrr-churnedMrr) / mrr;
const ruleOf40      = (newMrr/mrr) + margemEbitda;

const historico12 = [
  { mes:"Mai/25", mrr:4800,  essencial:3800, professional:700,  clinica:300,  enterprise:0, tributos:408,  gateway:130, cogs:1100, opex:19800 },
  { mes:"Jun/25", mrr:5900,  essencial:4600, professional:900,  clinica:400,  enterprise:0, tributos:502,  gateway:158, cogs:1280, opex:19900 },
  { mes:"Jul/25", mrr:6500,  essencial:5000, professional:1100, clinica:400,  enterprise:0, tributos:553,  gateway:175, cogs:1400, opex:20100 },
  { mes:"Ago/25", mrr:6900,  essencial:5200, professional:1200, clinica:500,  enterprise:0, tributos:587,  gateway:185, cogs:1480, opex:20200 },
  { mes:"Set/25", mrr:7200,  essencial:5400, professional:1300, clinica:500,  enterprise:0, tributos:612,  gateway:194, cogs:1540, opex:20300 },
  { mes:"Out/25", mrr:7600,  essencial:5700, professional:1400, clinica:500,  enterprise:0, tributos:646,  gateway:204, cogs:1620, opex:20400 },
  { mes:"Nov/25", mrr:7952,  essencial:5970, professional:1491, clinica:491,  enterprise:0, tributos:676,  gateway:213, cogs:1690, opex:20500 },
  { mes:"Dez/25", mrr:9443,  essencial:6960, professional:1491, clinica:992,  enterprise:0, tributos:803,  gateway:253, cogs:1980, opex:20600 },
  { mes:"Jan/26", mrr:10940, essencial:7976, professional:1497, clinica:1467, enterprise:0, tributos:930,  gateway:293, cogs:2270, opex:20700 },
  { mes:"Fev/26", mrr:12430, essencial:8970, professional:1497, clinica:1963, enterprise:0, tributos:1057, gateway:334, cogs:2540, opex:20800 },
  { mes:"Mar/26", mrr:13921, essencial:8970, professional:2994, clinica:1957, enterprise:0, tributos:1183, gateway:374, cogs:2830, opex:20900 },
  { mes:"Abr/26", mrr,       essencial:7976, professional:4491, clinica:2997, enterprise:0, tributos:Math.round((iss+pis+cofins)), gateway:Math.round(taxaGateway+inadimplencia), cogs:Math.round(totalCogs), opex:Math.round(totalOpex) },
];

const projecao12m = (() => {
  const out: Array<{ mes: string; mrr: number; receitaLiq: number; lucroBruto: number; opex: number; ebitda: number }> = [];
  let cur = mrr;
  const meses = ["Mai","Jun","Jul","Ago","Set","Out","Nov","Dez","Jan","Fev","Mar","Abr"];
  const anos  = ["26","26","26","26","26","26","26","26","27","27","27","27"];
  for (let i=0;i<12;i++){
    cur = cur*(1+0.10-0.02);
    const rl=cur*0.884, cg=cur*0.18, lb=rl-cg, op=totalOpex*(1+i*0.03), eb=lb-op;
    out.push({ mes:`${meses[i]}/${anos[i]}`, mrr:cur, receitaLiq:rl, lucroBruto:lb, opex:op, ebitda:eb });
  }
  return out;
})();

const mrrFaltando      = Math.max(0, totalOpex + totalCogs - lucroBruto);
const clientesFaltando = Math.ceil(mrrFaltando / arpu);
const bevenMes         = (() => {
  const meses = ["Mai/26","Jun/26","Jul/26","Ago/26","Set/26","Out/26","Nov/26","Dez/26","Jan/27","Fev/27","Mar/27","Abr/27"];
  for (let i=0; i<projecao12m.length; i++) {
    if (projecao12m[i].ebitda >= 0) return meses[i];
  }
  return ">Abr/27";
})();
const bevenStatus      = mrrFaltando === 0 ? "ok" : mrrFaltando < 5000 ? "warn" : "crit";

const DR_TOOLTIPS: Record<string, { o_que_e: string; como_obter: string }> = {
  mrr_kpi:      { o_que_e:"Monthly Recurring Revenue — soma de todas as assinaturas mensais ativas.", como_obter:"SELECT SUM(p.price_brl) FROM subscriptions s JOIN plans p ON p.id=s.plan_id WHERE s.status='active'" },
  arr_kpi:      { o_que_e:"Annual Recurring Revenue = MRR x 12.", como_obter:"Calculado: ARR = MRR x 12." },
  arpu_kpi:     { o_que_e:"Average Revenue Per User = MRR / clientes ativos.", como_obter:"SELECT SUM(p.price_brl)/COUNT(DISTINCT s.user_id) FROM subscriptions s JOIN plans p ON p.id=s.plan_id WHERE s.status='active'" },
  churn_kpi:    { o_que_e:"% do MRR perdido por cancelamentos no mes.", como_obter:"SELECT SUM(mrr_value)/mrr_inicio FROM payment_events WHERE type='churn'" },
  nrr_kpi:      { o_que_e:"Net Revenue Retention — acima de 100% significa que a base cresce sozinha.", como_obter:"(MRR_inicio + Expansion - Churn) / MRR_inicio" },
  cac_kpi:      { o_que_e:"Custo de Aquisicao de Cliente = total S&M / novos clientes no mes.", como_obter:"SUM(costs WHERE category IN ('marketing','personnel_sm')) / COUNT(new clients)" },
  ltv_kpi:      { o_que_e:"Lifetime Value = ARPU / Churn Rate.", como_obter:"LTV = ARPU / Churn_Rate" },
  ltvcac_kpi:   { o_que_e:"LTV/CAC indica quantas vezes o valor de vida supera o custo de aquisicao. Meta: >3x.", como_obter:"LTV / CAC" },
  payback_kpi:  { o_que_e:"Meses para recuperar o CAC com a margem por cliente.", como_obter:"Payback = CAC / (ARPU x Margem_Bruta)" },
  rule40_kpi:   { o_que_e:"Rule of 40 = Crescimento MRR% + Margem EBITDA%.", como_obter:"Crescimento = (MRR_atual - MRR_anterior) / MRR_anterior + Margem EBITDA" },
  burn_kpi:     { o_que_e:"Burn Rate = saida liquida de caixa/mes quando ha prejuizo.", como_obter:"Burn = -Lucro_Liquido se negativo. Runway = saldo_caixa / burn_rate" },
  mrr_historico:{ o_que_e:"Evolucao do MRR nos ultimos 12 meses.", como_obter:"SELECT DATE_TRUNC('month',started_at) AS mes, SUM(p.price_brl) AS mrr FROM subscriptions s JOIN plans p ON p.id=s.plan_id WHERE s.status='active' GROUP BY 1" },
  mix_planos:   { o_que_e:"Participacao de cada plano na receita total.", como_obter:"SELECT p.name, COUNT(*), SUM(p.price_brl) FROM subscriptions s JOIN plans p ON p.id=s.plan_id WHERE s.status='active' GROUP BY p.name" },
  custos:       { o_que_e:"Participacao de cada categoria de custo sobre a Receita Bruta.", como_obter:"SELECT category, SUM(brl_amount) FROM costs WHERE competence_month=:mes GROUP BY category" },
  dre:          { o_que_e:"Demonstrativo de Resultado do Exercicio.", como_obter:"Consolidado via tabelas subscriptions, payment_events, costs e headcount" },
  kpi_rb:       { o_que_e:"Receita Bruta = MRR total antes de qualquer deducao.", como_obter:"SELECT SUM(p.price_brl) FROM subscriptions" },
  kpi_rl:       { o_que_e:"Receita Liquida = Bruta - tributos - gateway - inadimplencia.", como_obter:"Receita_Bruta - deducoes" },
  kpi_lb:       { o_que_e:"Lucro Bruto = Receita Liquida - COGS.", como_obter:"Receita_Liquida - COGS" },
  kpi_ebitda:   { o_que_e:"EBITDA = Lucro Bruto - OPEX.", como_obter:"Lucro_Bruto - OPEX" },
  kpi_ll:       { o_que_e:"Lucro Liquido = resultado final apos todos os custos e impostos.", como_obter:"LAIR - (Receita_Bruta x 32% x 24%)" },
  projecao:     { o_que_e:"Projecao do MRR e resultado para 12 meses.", como_obter:"MRR_n = MRR_(n-1) x (1 + crescimento - churn)" },
  breakeven_kpi:{ o_que_e:"Break-even e o ponto onde EBITDA = 0.", como_obter:"MRR faltando = totalOpex + totalCogs - lucroBruto" },
  metricas_saas:{ o_que_e:"Painel com os numeros-chave de um negocio SaaS — quanto entra de receita, quantos clientes tem, quanto tempo levam para se pagar, e se o negocio e saudavel.", como_obter:"Calculado automaticamente a partir das assinaturas ativas e dos custos cadastrados." },
  projecao_mrr_chart:{ o_que_e:"Grafico de barras mostrando como o MRR deve crescer nos proximos 12 meses de acordo com o cenario escolhido.", como_obter:"MRR_proximo = MRR_atual x (1 + crescimento - churn). Repetido 12x." },
  detalhe_projecao:{ o_que_e:"Tabela mes a mes com o detalhamento: MRR, Receita Liquida, COGS, Lucro Bruto, OPEX e EBITDA.", como_obter:"Cada coluna derivada do MRR projetado aplicando as margens atuais." },
};

function DRInfoTooltip({ id }: { id: string }) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const info = DR_TOOLTIPS[id];
  if (!info) return null;
  const TIP_W = 320;
  const show = () => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const goLeft = r.right + TIP_W + 8 > window.innerWidth;
    setPos({ top: r.bottom + 8, left: goLeft ? Math.max(8, r.right - TIP_W) : r.left });
  };
  return (
    <div style={{ position:"relative", display:"inline-flex", flexShrink:0 }}>
      <button ref={btnRef} onMouseEnter={show} onMouseLeave={() => setPos(null)} onClick={() => pos ? setPos(null) : show()}
        style={{ width:18, height:18, borderRadius:"50%", background:pos?DS.primary:DS.bgTableRow, border:`1px solid ${pos?DS.primary:DS.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0, transition:"all 0.15s" }}>
        <span style={{ fontSize:10, fontWeight:700, color:pos?"#fff":DS.textTertiary, lineHeight:1 }}>i</span>
      </button>
      {pos && (
        <div style={{ position:"fixed", top:pos.top, left:pos.left, zIndex:999999, width:TIP_W, background:"#1A1A1A", borderRadius:10, padding:16, boxShadow:"0 12px 40px rgba(0,0,0,0.35)", pointerEvents:"none" }}>
          <p style={{ fontSize:11, fontWeight:700, color:"#fff", textTransform:"uppercase", letterSpacing:0.6, margin:"0 0 6px" }}>O que e</p>
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.85)", margin:"0 0 12px", lineHeight:1.6 }}>{info.o_que_e}</p>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.12)", paddingTop:12 }}>
            <p style={{ fontSize:11, fontWeight:700, color:"#10B981", textTransform:"uppercase", letterSpacing:0.6, margin:"0 0 6px" }}>Como obter</p>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.75)", margin:0, lineHeight:1.6, fontFamily:"monospace", wordBreak:"break-word" }}>{info.como_obter}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* DRLineChart */
type LineSeries = { key: string; label: string; color: string };
type LineDataPoint = Record<string, number | string>;

function DRLineChart({ series, data, height = 220 }: { series: LineSeries[]; data: LineDataPoint[]; height?: number }) {
  const [hov, setHov] = useState<number | null>(null);
  const PAD = { top: 32, right: 16, bottom: 40, left: 52 };
  const W = 800;
  const H = height;
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const allVals = series.flatMap(s => data.map(d => Number(d[s.key]) || 0));
  const maxVal  = Math.max(...allVals, 1);
  const xPos = (i: number) => PAD.left + (i / (data.length - 1)) * innerW;
  const yPos = (v: number) => PAD.top + innerH - (v / maxVal) * innerH;
  const yTicks = 4;
  const yStep  = maxVal / yTicks;

  return (
    <div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:16, marginBottom:10 }}>
        {series.map(s => (
          <span key={s.key} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:DS.textSecondary }}>
            <span style={{ width:24, height:3, background:s.color, borderRadius:2, display:"inline-block" }} />{s.label}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height, display:"block", overflow:"visible" }} onMouseLeave={() => setHov(null)}>
        {Array.from({ length: yTicks + 1 }, (_, i) => {
          const v = i * yStep;
          const y = yPos(v);
          return (
            <g key={i}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke={DS.border} strokeWidth="0.5" strokeDasharray="4,4" />
              <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill={DS.textTertiary}>
                {v >= 1000 ? `R$${(v/1000).toFixed(0)}k` : `R$${v.toFixed(0)}`}
              </text>
            </g>
          );
        })}
        {data.map((d, i) => (
          <text key={i} x={xPos(i)} y={H - 6} textAnchor="middle" fontSize="9" fill={DS.textTertiary}>{String(d.mes)}</text>
        ))}
        {series.map(s => {
          const pts = data.map((d, i) => ({ x: xPos(i), y: yPos(Number(d[s.key]) || 0), v: Number(d[s.key]) || 0 }));
          const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
          return (
            <g key={s.key}>
              <path d={pathD} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              {pts.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="5" fill={DS.bgCard} stroke={s.color} strokeWidth="2" style={{ cursor:"pointer" }} onMouseEnter={() => setHov(i)} />
                  <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="9" fontWeight="600" fill={s.color}>
                    {p.v >= 1000 ? `R$${(p.v/1000).toFixed(1)}k` : `R$${p.v}`}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
        {hov !== null && <line x1={xPos(hov)} x2={xPos(hov)} y1={PAD.top} y2={H - PAD.bottom} stroke={DS.border} strokeWidth="1" strokeDasharray="3,3" />}
      </svg>
    </div>
  );
}

const dr_card: React.CSSProperties = { background:DS.bgCard, borderRadius:DS.cardRadius, boxShadow:DS.cardShadow, padding:24, overflow:"hidden" };
const dr_sT: React.CSSProperties   = { fontSize:16, fontWeight:600, color:DS.primary, margin:0 };
const dr_secDiv: React.CSSProperties = { display:"flex", alignItems:"center", gap:12, margin:"32px 0 20px" };

function DRSaasCard({ label, value, meta, status, tooltipId }: { label:string; value:string; meta:string; status:string; tooltipId:string }) {
  const sc = status==="ok" ? DS.success : status==="warn" ? DS.warning : DS.error;
  return (
    <div style={{ ...dr_card, padding:16 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
        <p style={{ fontSize:11, fontWeight:600, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:0.5, margin:0 }}>{label}</p>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <DRInfoTooltip id={tooltipId} />
          <span style={{ width:8, height:8, borderRadius:"50%", background:sc }} />
        </div>
      </div>
      <p style={{ fontSize:22, fontWeight:700, color:DS.textPrimary, margin:"0 0 4px" }}>{value}</p>
      <p style={{ fontSize:11, color:DS.textTertiary, margin:0 }}>Meta: {meta}</p>
    </div>
  );
}

function DRDreRow({ label, value, pct, highlight, indent, isNeg, isBold }: {
  label:string; value:number; pct?:number;
  highlight?:"primary"|"success"|"error"|"warning"|"teal";
  indent?:number; isNeg?:boolean; isBold?:boolean;
}) {
  const bgMap: Record<string,string> = { primary:DS.primary, success:DS.success, error:DS.error, warning:DS.warning, teal:"#0F6E56" };
  const bg = highlight ? bgMap[highlight] : "transparent";
  const tc = highlight ? "#fff" : isNeg && value<0 ? DS.error : DS.textPrimary;
  const av = Math.abs(value);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 12px", background:highlight?bg:"transparent", borderRadius:highlight?4:0, borderBottom:highlight?"none":`1px solid ${DS.divider}`, marginBottom:highlight?2:0 }}>
      <div style={{ flex:1, paddingLeft:(indent||0)*16 }}>
        <span style={{ fontSize:13, fontWeight:(isBold||highlight)?600:400, color:tc }}>{label}</span>
      </div>
      <span style={{ fontSize:14, fontWeight:(isBold||highlight)?700:500, color:tc, fontVariantNumeric:"tabular-nums", minWidth:110, textAlign:"right" }}>
        {isNeg && value<0 ? `-${fmtK(av)}` : value<0 ? `(${fmtK(av)})` : fmtK(value)}
      </span>
      {pct!==undefined && (
        <span style={{ fontSize:11, fontWeight:500, color:tc, opacity:highlight?0.85:0.7, minWidth:48, textAlign:"right" }}>{fmtPct(pct)}</span>
      )}
    </div>
  );
}

/* ═══════════════════════ DRE MAIN ═══════════════════════ */

function DreDash() {
  const [saasOpen,   setSaasOpen]   = useState(true);
  const [activeTab,  setActiveTab]  = useState("dre");
  const [cenario,    setCenario]    = useState("base");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const maxProj  = Math.max(...projecao12m.map(p => p.mrr));
  const cMult    = cenario==="conservador" ? 0.6 : cenario==="otimista" ? 1.5 : 1;
  const cCor     = cenario==="conservador" ? DS.warning : cenario==="otimista" ? DS.success : DS.primary;

  return (
    <div style={{ minHeight:"100vh", background:DS.bgPage, fontFamily:"'Inter', system-ui, sans-serif", padding:"44px 64px 64px" }}>
      <header style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
        <div>
          <h1 style={{ fontSize:28, fontWeight:600, color:DS.textPrimary, margin:0, lineHeight:1.2 }}>DRE · Auton Health</h1>
          <p style={{ fontSize:12, color:DS.textTertiary, margin:0, textTransform:"uppercase", letterSpacing:1 }}>Abril / 2026 · Lucro Presumido · Dados Estimados</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {(["dre","projecao"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ fontSize:13, fontWeight:600, padding:"8px 18px", borderRadius:6, cursor:"pointer", border:`1px solid ${activeTab===tab?DS.primary:DS.border}`, background:activeTab===tab?DS.primary:DS.bgCard, color:activeTab===tab?"#fff":DS.textSecondary, transition:"all 0.15s" }}>
              {tab==="dre" ? "DRE + Metricas SaaS" : "Projecao 12M"}
            </button>
          ))}
        </div>
      </header>

      {activeTab==="dre" && (
        <>
          {/* METRICAS SAAS */}
          <div style={{ ...dr_card, marginBottom:28, padding:0, overflow:"visible" }}>
            <div onClick={() => setSaasOpen(v => !v)} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", padding:"16px 24px", borderBottom:saasOpen?`1px solid ${DS.border}`:"none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.primary} strokeWidth="1.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              <h3 style={{ ...dr_sT }}>Metricas SaaS</h3><DRInfoTooltip id="metricas_saas" />
              <span style={{ fontSize:12, color:DS.textTertiary }}>Abril 2026 · {totalClientes} assinantes</span>
              <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:4, background:DS.bgTableRow, border:`1px solid ${DS.border}`, borderRadius:6, padding:"4px 10px" }}>
                <span style={{ fontSize:11, fontWeight:600, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:0.5 }}>{saasOpen?"Recolher":"Expandir"}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DS.primary} strokeWidth="2.5" style={{ transition:"transform 0.3s", transform:saasOpen?"rotate(180deg)":"" }}><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            {saasOpen && (
              <div style={{ padding:"20px 24px 24px" }}>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:16 }}>
                  <DRSaasCard label="MRR" value={fmtK(mrr)} meta={`ARR ${fmtK(arr)}`} status="ok" tooltipId="mrr_kpi" />
                  <DRSaasCard label="ARR" value={fmtK(arr)} meta="MRR x 12" status="ok" tooltipId="arr_kpi" />
                  <DRSaasCard label="Ticket Medio" value={fmtK(arpu)} meta=">R$ 1.2k" status="ok" tooltipId="arpu_kpi" />
                  <DRSaasCard label="Churn Rate" value={fmtPct(churnRate)} meta="<2% ao mes" status={churnRate<=0.02?"ok":"crit"} tooltipId="churn_kpi" />
                  <DRSaasCard label="NRR" value={fmtPct(nrr)} meta=">100%" status={nrr>=1?"ok":nrr>=0.9?"warn":"crit"} tooltipId="nrr_kpi" />
                  <DRSaasCard label="Clientes" value={String(totalClientes)} meta=">20 ate break-even" status={totalClientes>=20?"ok":"warn"} tooltipId="mrr_kpi" />
                  <DRSaasCard label="CAC" value={fmtK(cac)} meta="<R$ 3k" status={cac<3000?"ok":cac<5000?"warn":"crit"} tooltipId="cac_kpi" />
                  <DRSaasCard label="LTV" value={fmtK(ltv)} meta=">R$ 9k" status={ltv>9000?"ok":ltv>5000?"warn":"crit"} tooltipId="ltv_kpi" />
                  <DRSaasCard label="LTV/CAC" value={fmtX(ltvCac)} meta=">3x" status={ltvCac>=3?"ok":ltvCac>=2?"warn":"crit"} tooltipId="ltvcac_kpi" />
                  <DRSaasCard label="Payback" value={`${payback.toFixed(1)}m`} meta="<12 meses" status={payback<12?"ok":payback<18?"warn":"crit"} tooltipId="payback_kpi" />
                  <DRSaasCard label="Rule of 40" value={fmtPct(ruleOf40)} meta=">40%" status={ruleOf40>=0.40?"ok":ruleOf40>=0.20?"warn":"crit"} tooltipId="rule40_kpi" />
                  <DRSaasCard label="Burn / Runway" value={burnRate>0?`${fmtK(burnRate)}/m`:"Positivo"} meta={`Runway: ${runway>90?"90m+":runway.toFixed(0)+"m"}`} status={burnRate===0?"ok":burnRate<3000?"warn":"crit"} tooltipId="burn_kpi" />
                  <DRSaasCard label="Margem Bruta" value={fmtPct(margemBruta)} meta=">70%" status={margemBruta>=0.70?"ok":margemBruta>=0.60?"warn":"crit"} tooltipId="kpi_lb" />
                  <DRSaasCard label="Margem EBITDA" value={fmtPct(margemEbitda)} meta=">20%" status={margemEbitda>=0.20?"ok":margemEbitda>=0?"warn":"crit"} tooltipId="kpi_ebitda" />
                  <DRSaasCard label="Margem Liquida" value={fmtPct(margemLiq)} meta=">15%" status={margemLiq>=0.15?"ok":margemLiq>=0?"warn":"crit"} tooltipId="kpi_ll" />
                  <DRSaasCard label="Receita Liquida" value={fmtK(receitaLiq)} meta={`${fmtPct(receitaLiq/receitaBruta)} da bruta`} status="ok" tooltipId="kpi_rl" />
                  {/* Break-even */}
                  <div style={{ ...dr_card, padding:16, position:"relative" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                      <p style={{ fontSize:11, fontWeight:600, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:0.5, margin:0 }}>Break-even</p>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <DRInfoTooltip id="breakeven_kpi" />
                        <span style={{ width:8, height:8, borderRadius:"50%", background:bevenStatus==="ok"?DS.success:bevenStatus==="warn"?DS.warning:DS.error }} />
                      </div>
                    </div>
                    <p style={{ fontSize:20, fontWeight:700, color:bevenStatus==="ok"?DS.success:bevenStatus==="warn"?DS.warning:DS.error, margin:"0 0 6px", lineHeight:1 }}>{bevenMes}</p>
                    <div style={{ borderTop:`1px solid ${DS.divider}`, paddingTop:6, display:"flex", flexDirection:"column", gap:3 }}>
                      <p style={{ fontSize:11, color:DS.textTertiary, margin:0 }}>Clientes: <strong style={{ color:DS.textPrimary }}>{mrrFaltando===0?"Atingido":`+${clientesFaltando}`}</strong></p>
                      <p style={{ fontSize:11, color:DS.textTertiary, margin:0 }}>MRR: <strong style={{ color:DS.textPrimary }}>{mrrFaltando===0?"R$ 0":fmtK(mrrFaltando)}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MRR 12 MESES */}
          <div style={{ ...dr_card, marginBottom:24 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <h3 style={{ ...dr_sT, fontSize:14 }}>Evolucao do MRR</h3>
              <DRInfoTooltip id="mrr_historico" />
              <span style={{ fontSize:12, color:DS.textTertiary, marginLeft:4 }}>Ultimos 12 meses</span>
            </div>
            <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 16px" }}>Mai/25 → Abr/26</p>
            <DRLineChart series={[{ key:"mrr", label:"MRR Total", color:DS.primary }]} data={historico12} height={220} />
          </div>

          {/* MIX PLANOS + CUSTOS */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:28 }}>
            <div style={{ ...dr_card }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <h3 style={{ ...dr_sT, fontSize:14 }}>Mix de Receita por Plano</h3>
                <DRInfoTooltip id="mix_planos" />
              </div>
              <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 16px" }}>Evolucao por plano — 12 meses</p>
              <DRLineChart series={[
                { key:"essencial", label:"Essencial", color:COLORS.blue },
                { key:"professional", label:"Professional", color:COLORS.purple },
                { key:"clinica", label:"Clinica", color:COLORS.orange },
              ]} data={historico12} height={200} />
            </div>
            <div style={{ ...dr_card }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <h3 style={{ ...dr_sT, fontSize:14 }}>Composicao dos Custos</h3>
                <DRInfoTooltip id="custos" />
              </div>
              <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 16px" }}>Evolucao por categoria — 12 meses</p>
              <DRLineChart series={[
                { key:"tributos", label:"Tributos", color:COLORS.red },
                { key:"gateway", label:"Gateway + Inadimp.", color:COLORS.pink },
                { key:"cogs", label:"COGS", color:COLORS.orange },
              ]} data={historico12} height={200} />
            </div>
          </div>

          {/* DRE */}
          <div style={dr_secDiv}>
            <h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>DRE — Abril 2026</h2>
            <DRInfoTooltip id="dre" />
            <div style={{ flex:1, height:1, background:DS.border }} />
          </div>

          {/* KPIs DRE */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:20, marginBottom:24 }}>
            {[
              { label:"Receita Bruta",  value:receitaBruta, sub:`MRR · ${totalClientes} assinantes`, color:COLORS.blue, pct:1, alert:false, tid:"kpi_rb" },
              { label:"Receita Liquida",value:receitaLiq,   sub:`${fmtPct(receitaLiq/receitaBruta)} da bruta`, color:COLORS.purple, pct:receitaLiq/receitaBruta, alert:false, tid:"kpi_rl" },
              { label:"Lucro Bruto",    value:lucroBruto,   sub:`Margem ${fmtPct(margemBruta)}`, color:margemBruta>=0.70?DS.success:DS.warning, pct:margemBruta, alert:margemBruta<0.70, tid:"kpi_lb" },
              { label:"EBITDA",         value:ebitda,       sub:`Margem ${fmtPct(margemEbitda)}`, color:ebitda>=0?DS.success:DS.error, pct:Math.abs(margemEbitda), alert:ebitda<0, tid:"kpi_ebitda" },
              { label:"Lucro Liquido",  value:lucroLiq,     sub:`Margem ${fmtPct(margemLiq)}`, color:lucroLiq>=0?DS.success:DS.error, pct:Math.abs(margemLiq), alert:lucroLiq<0, tid:"kpi_ll" },
            ].map(k => (
              <div key={k.label} style={{ ...dr_card, padding:20 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                  <p style={{ fontSize:11, fontWeight:600, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:0.5, margin:0 }}>{k.label}</p>
                  <DRInfoTooltip id={k.tid} />
                </div>
                <p style={{ fontSize:24, fontWeight:700, color:DS.textPrimary, margin:0, lineHeight:1.2 }}>{fmtK(k.value)}</p>
                <div style={{ margin:"8px 0 0" }}>
                  <div style={{ height:5, background:DS.divider, borderRadius:3, overflow:"hidden" }}>
                    <div style={{ height:"100%", background:k.color, borderRadius:3, width:`${Math.max(Math.abs(k.pct)*100,1)}%` }} />
                  </div>
                </div>
                <p style={{ fontSize:11, margin:"5px 0 0", color:k.alert?DS.error:DS.textSecondary, fontWeight:k.alert?600:400 }}>{k.sub}</p>
              </div>
            ))}
          </div>

          {/* DRE COMPLETO */}
          <div style={{ ...dr_card }}>
            <DRDreRow label="Receita Bruta (MRR)" value={receitaBruta} pct={1} highlight="primary" isBold />
            <DRDreRow label="ISS (5%)" value={-iss} pct={iss/receitaLiq} indent={1} isNeg />
            <DRDreRow label="PIS (0,65%)" value={-pis} pct={pis/receitaLiq} indent={1} isNeg />
            <DRDreRow label="COFINS (3%)" value={-cofins} pct={cofins/receitaLiq} indent={1} isNeg />
            <DRDreRow label="Taxa gateway Asaas" value={-taxaGateway} pct={taxaGateway/receitaLiq} indent={1} isNeg />
            <DRDreRow label="Inadimplencia (2%)" value={-inadimplencia} pct={inadimplencia/receitaLiq} indent={1} isNeg />
            <div style={{ marginBottom:4 }} />
            <DRDreRow label="RECEITA LIQUIDA" value={receitaLiq} pct={1} highlight="teal" isBold />
            <div style={{ marginTop:4 }} />
            <DRDreRow label="IA — Azure OpenAI + Whisper" value={-cogsia} pct={cogsia/receitaLiq} indent={1} isNeg />
            <DRDreRow label="Supabase + Infra cloud" value={-(cogsSupabase+cogsVercel+cogsOutros)} pct={(cogsSupabase+cogsVercel+cogsOutros)/receitaLiq} indent={1} isNeg />
            <DRDreRow label="Evolution API / WhatsApp" value={-cogsWpp} pct={cogsWpp/receitaLiq} indent={1} isNeg />
            <DRDreRow label="Suporte tecnico (20% P&D)" value={-cogsSupporte} pct={cogsSupporte/receitaLiq} indent={1} isNeg />
            <div style={{ marginBottom:4 }} />
            <DRDreRow label="LUCRO BRUTO" value={lucroBruto} pct={margemBruta} highlight={margemBruta>=0.70?"success":"warning"} isBold />
            <div style={{ marginTop:4 }} />
            <DRDreRow label="P&D (80% pessoal produto)" value={-opexPD} pct={opexPD/receitaLiq} indent={1} isNeg />
            <DRDreRow label="S&M — CS + Marketing" value={-opexSM} pct={opexSM/receitaLiq} indent={1} isNeg />
            <DRDreRow label="G&A — Pro-labore + admin" value={-opexGA} pct={opexGA/receitaLiq} indent={1} isNeg />
            <DRDreRow label="Trafego pago + conteudo" value={-opexMkt} pct={opexMkt/receitaLiq} indent={1} isNeg />
            <DRDreRow label="Ferramentas + contabilidade" value={-(opexTools+opexContabil)} pct={(opexTools+opexContabil)/receitaLiq} indent={1} isNeg />
            <DRDreRow label="Comissoes parceiros (5%)" value={-opexParceiros} pct={opexParceiros/receitaLiq} indent={1} isNeg />
            <DRDreRow label="Depreciacao" value={-opexDepreciac} pct={opexDepreciac/receitaLiq} indent={1} isNeg />
            <div style={{ marginBottom:4 }} />
            <DRDreRow label="EBITDA" value={ebitda} pct={margemEbitda} highlight={ebitda>=0?"success":"error"} isBold />
            <DRDreRow label="Resultado financeiro" value={recFinanc} pct={recFinanc/receitaLiq} indent={1} />
            <DRDreRow label="LAIR" value={lair} pct={lair/receitaLiq} isBold />
            <DRDreRow label="IRPJ + CSLL (LP)" value={-totalIr} pct={totalIr/receitaLiq} indent={1} isNeg />
            <div style={{ marginBottom:4 }} />
            <DRDreRow label="LUCRO LIQUIDO" value={lucroLiq} pct={margemLiq} highlight={lucroLiq>=0?"success":"error"} isBold />
          </div>
        </>
      )}

      {/* ABA PROJECAO 12M */}
      {activeTab==="projecao" && (
        <>
          <div style={{ display:"flex", gap:12, marginBottom:28 }}>
            {(["conservador","base","otimista"] as const).map(c => (
              <button key={c} onClick={() => setCenario(c)} style={{ fontSize:13, fontWeight:600, padding:"8px 20px", borderRadius:6, cursor:"pointer", border:`1px solid ${cenario===c?cCor:DS.border}`, background:cenario===c?cCor:DS.bgCard, color:cenario===c?"#fff":DS.textSecondary, transition:"all 0.15s" }}>
                {c==="conservador" ? "Conservador (5% / Churn 3%)" : c==="base" ? "Base (10% / Churn 2%)" : "Otimista (20% / Churn 1%)"}
              </button>
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:28 }}>
            {[
              { label:"MRR Projetado (Abr/27)", value:fmtK(projecao12m[11].mrr*cMult), sub:"Cenario selecionado" },
              { label:"ARR Projetado (Abr/27)", value:fmtK(projecao12m[11].mrr*cMult*12), sub:"MRR x 12" },
              { label:"EBITDA Projetado (Abr/27)", value:fmtK(projecao12m[11].ebitda*cMult), sub:"Cenario selecionado" },
              { label:"Break-even previsto", value:cenario==="conservador"?"Set/26":cenario==="base"?"Jun/26":"Mai/26", sub:"Mes de EBITDA positivo" },
            ].map(k => (
              <div key={k.label} style={{ ...dr_card, padding:20 }}>
                <p style={{ fontSize:11, fontWeight:600, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:0.5, margin:"0 0 6px" }}>{k.label}</p>
                <p style={{ fontSize:24, fontWeight:700, color:cCor, margin:0 }}>{k.value}</p>
                <p style={{ fontSize:11, margin:"5px 0 0", color:DS.textSecondary }}>{k.sub}</p>
              </div>
            ))}
          </div>

          <div style={{ ...dr_card, marginBottom:24 }}>
            <h3 style={{ ...dr_sT, fontSize:14, marginBottom:4 }}>Projecao MRR — 12 meses</h3><DRInfoTooltip id="projecao_mrr_chart" />
            <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 20px" }}>Mai/26 → Abr/27 · Cenario {cenario}</p>
            <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:200 }}>
              {projecao12m.map((p, i) => {
                const projMrr = p.mrr * cMult;
                const h = maxProj > 0 ? (projMrr/(maxProj*cMult))*100 : 0;
                const isHov = hoveredBar === i+10;
                return (
                  <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", height:"100%", position:"relative", cursor:"default" }}
                    onMouseEnter={() => setHoveredBar(i+10)} onMouseLeave={() => setHoveredBar(null)}>
                    {isHov && (
                      <div style={{ position:"absolute", top:-28, left:"50%", transform:"translateX(-50%)", zIndex:20, background:DS.textPrimary, color:"#fff", borderRadius:4, padding:"2px 8px", whiteSpace:"nowrap", fontSize:11, fontWeight:600 }}>
                        {fmtK(projMrr)}
                      </div>
                    )}
                    <div style={{ width:"100%", borderRadius:"3px 3px 0 0", height:`${h}%`, background:isHov?DS.primary:cCor, opacity:0.85, transition:"all 0.2s" }} />
                    <span style={{ fontSize:9, color:DS.textTertiary, marginTop:4 }}>{p.mes}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ ...dr_card }}>
            <h3 style={{ ...dr_sT, fontSize:14, marginBottom:16 }}>Detalhe da Projecao</h3><DRInfoTooltip id="detalhe_projecao" />
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                <thead>
                  <tr>
                    {["Mes","MRR","Rec. Liq.","COGS","Lucro Bruto","OPEX","EBITDA"].map(h => (
                      <th key={h} style={{ background:DS.primary, color:"#fff", padding:"8px 12px", textAlign:h==="Mes"?"left":"right", fontWeight:600, fontSize:11 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projecao12m.map((p, i) => {
                    const cogs = p.receitaLiq*cMult - p.lucroBruto*cMult;
                    const isPos = p.ebitda*cMult >= 0;
                    return (
                      <tr key={i} style={{ background:i%2===0?DS.bgTableRow:DS.bgCard }}>
                        <td style={{ padding:"8px 12px", fontWeight:600, color:DS.textPrimary }}>{p.mes}</td>
                        <td style={{ padding:"8px 12px", textAlign:"right", color:DS.primary, fontWeight:600 }}>{fmtK(p.mrr*cMult)}</td>
                        <td style={{ padding:"8px 12px", textAlign:"right" }}>{fmtK(p.receitaLiq*cMult)}</td>
                        <td style={{ padding:"8px 12px", textAlign:"right", color:DS.error }}>({fmtK(cogs>0?cogs:0)})</td>
                        <td style={{ padding:"8px 12px", textAlign:"right" }}>{fmtK(p.lucroBruto*cMult)}</td>
                        <td style={{ padding:"8px 12px", textAlign:"right", color:DS.error }}>({fmtK(p.opex*cMult)})</td>
                        <td style={{ padding:"8px 12px", textAlign:"right", fontWeight:700, color:isPos?DS.success:DS.error }}>
                          {isPos?fmtK(p.ebitda*cMult):`(${fmtK(-p.ebitda*cMult)})`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════ ANALYTICS DASHBOARD ═══════════════════════ */

const AN_TIPS: Record<string, { o: string; c: string }> = {
  cac:        { o:"Custo de Aquisicao de Cliente.", c:"SUM(S&M costs) / COUNT(new clients)" },
  ttfv:       { o:"Time to First Value — tempo do cadastro ate a primeira consulta completa.", c:"AVG(first_consult_at - created_at)" },
  activation: { o:"Percentual de novos usuarios que completam onboarding + 1a consulta em 7 dias.", c:"COUNT(activated_in_7d) / COUNT(new_users)" },
  daumau:     { o:"Stickiness = DAU/MAU. Mede engajamento diario vs mensal.", c:"COUNT(DISTINCT daily_users) / COUNT(DISTINCT monthly_users)" },
  consult:    { o:"Media de consultas por usuario ativo no mes.", c:"COUNT(consultations) / COUNT(active_users)" },
  breadth:    { o:"Numero medio de features distintas usadas por usuario.", c:"AVG(distinct_features_used)" },
  nps:        { o:"Net Promoter Score: promotores (9-10) - detratores (0-6).", c:"Survey data via Typeform/email" },
  d7:         { o:"Retencao D7 — % de usuarios que retornam 7 dias apos ativacao.", c:"COUNT(returned_d7) / COUNT(activated)" },
  d30:        { o:"Retencao D30 — % que retornam 30 dias apos ativacao.", c:"COUNT(returned_d30) / COUNT(activated)" },
  d90:        { o:"Retencao D90 — % que retornam 90 dias apos ativacao.", c:"COUNT(returned_d90) / COUNT(activated)" },
  nrr:        { o:"Net Revenue Retention.", c:"(MRR + Expansion - Churn) / MRR" },
  tsr:        { o:"Task Success Rate — % de fluxos concluidos sem erro.", c:"COUNT(completed_flows) / COUNT(started_flows)" },
  csat:       { o:"Customer Satisfaction Score pos-consulta.", c:"Survey 1-5 apos cada consulta" },
  apitime:    { o:"Tempo de resposta P95 da API.", c:"P95(api_response_time)" },
  uptime:     { o:"Disponibilidade do sistema nos ultimos 30 dias.", c:"uptime_minutes / total_minutes" },
  tokencost:  { o:"Custo medio de tokens por consulta.", c:"SUM(token_cost) / COUNT(consultations)" },
  quickratio: { o:"Quick Ratio = (New MRR + Expansion) / (Churn + Contraction).", c:"(new_mrr + expansion) / (churned + contraction)" },
  churn:      { o:"MRR Churn Rate mensal.", c:"SUM(churned_mrr) / MRR_inicio" },
  churnscore: { o:"Score preditivo de churn (0-100) baseado em engajamento.", c:"Modelo preditivo com features: login_freq, consultas/sem, features_usadas, tempo_sessao" },
  upsell:     { o:"Oportunidades de upgrade identificadas por comportamento.", c:"Usuarios proximos do limite do plano ou pedindo features do plano superior" },
  referral:   { o:"Pipeline de indicacoes via promotores NPS >= 9.", c:"COUNT(nps >= 9 AND not_referred_yet)" },
  churn_involuntario: { o:"% do churn causado por falha de pagamento (involuntario).", c:"COUNT(churn WHERE reason='payment_failed') / COUNT(churn)" },
  mrr_at_risk: { o:"MRR total de clientes com churn score acima de 50.", c:"SUM(mrr) WHERE churn_score > 50" },
  gross_churn_trend: { o:"Gross Churn Rate mensal — % do MRR perdido sem considerar expansao.", c:"SUM(churned_mrr) / MRR_inicio GROUP BY month" },
  net_churn_trend: { o:"Net Churn Rate — churn liquido de expansao. Negativo = base cresce.", c:"(churned_mrr - expansion_mrr) / MRR_inicio GROUP BY month" },
  mrr_waterfall: { o:"Decomposicao do MRR: Inicio + Novo + Expansao - Contracao - Churn = Final.", c:"SELECT type, SUM(delta_mrr) FROM mrr_movements GROUP BY type" },
  churn_decomp: { o:"Decomposicao do churn por tipo (voluntario vs involuntario), plano e tenure.", c:"SELECT reason_type, plan, tenure_bucket, COUNT(*) FROM churns GROUP BY 1,2,3" },
  churn_reasons: { o:"Categorias auto-classificadas e manuais de motivos de churn.", c:"SELECT reason_category, COUNT(*) FROM churn_events GROUP BY 1 ORDER BY 2 DESC" },
  time_to_churn: { o:"Distribuicao de quando os clientes cancelam em relacao ao signup.", c:"SELECT FLOOR(DATEDIFF(churned_at, created_at)/30) AS month_bucket, COUNT(*) FROM churns GROUP BY 1" },
  dunning: { o:"Metricas de recuperacao de pagamentos falhos (dunning).", c:"SELECT retry_attempt, COUNT(CASE WHEN recovered THEN 1 END)/COUNT(*) FROM payment_retries GROUP BY 1" },
  cohort_heatmap: { o:"Heatmap de retencao por cohort de signup. Linhas = mes de signup, colunas = meses desde signup.", c:"SELECT signup_month, months_since, COUNT(active)/COUNT(total) FROM user_retention GROUP BY 1,2" },
  churn_model: { o:"Features mais preditivas do modelo de churn scoring, com importancia relativa.", c:"Modelo XGBoost treinado com features de engajamento. SHAP values para importancia." },
  gross_retention: { o:"Gross Revenue Retention — MRR retido sem considerar expansao.", c:"(MRR_inicio - churned_mrr) / MRR_inicio" },
  logo_retention: { o:"Logo Retention — % de clientes (logos) retidos no periodo.", c:"(clientes_inicio - churned_logos) / clientes_inicio" },
  health_score_avg: { o:"Media do health score (0-100) de toda a base ativa.", c:"AVG(health_score) WHERE status='active'" },
  expansion_mrr: { o:"MRR ganho de upgrades e expansao de clientes existentes.", c:"SUM(delta_mrr) WHERE type='expansion'" },
  contraction_mrr: { o:"MRR perdido de downgrades de clientes existentes.", c:"SUM(ABS(delta_mrr)) WHERE type='contraction'" },
  reactivation: { o:"Clientes inativos que retornaram com assinatura ativa.", c:"COUNT(*) WHERE type='reactivation' AND month=current" },
  health_dist: { o:"Distribuicao dos clientes por faixa de health score.", c:"SELECT FLOOR(health_score/20)*20 AS bucket, COUNT(*) FROM customers WHERE active GROUP BY 1" },
  health_segment: { o:"Health score medio por plano e tenure.", c:"SELECT plan, AVG(health_score) FROM customers WHERE active GROUP BY plan" },
  lifecycle: { o:"Distribuicao dos clientes por estagio do ciclo de vida.", c:"Regras: Onboarding(<30d), Growing(engagement up), Mature(stable >6m), At Risk(score<50), Churning(score>60 AND declining)" },
  engagement_trend: { o:"Score de engajamento medio da base por semana (logins + consultas + features).", c:"AVG(login_score*0.3 + consult_score*0.5 + feature_score*0.2) GROUP BY week" },
  reactivation_metrics: { o:"Win-back: tentativas de reativacao de ex-clientes e taxa de sucesso.", c:"SELECT channel, COUNT(CASE WHEN reactivated THEN 1 END)/COUNT(*) FROM win_back_campaigns GROUP BY channel" },
  retention_drivers: { o:"Comportamentos mais correlacionados com retencao D90+.", c:"Pearson correlation entre cada feature e retained_d90. Dados de cohorts Nov/25-Mar/26." },
  aquisicao: { o:"Metricas de quanto custa e quanto tempo leva para transformar um visitante em cliente ativo. CAC e o custo, TTFV e o tempo, Ativacao e a taxa de quem realmente comeca a usar.", c:"Combinacao de dados de marketing (gastos), Supabase (datas de cadastro e primeira consulta) e pagamentos." },
  engajamento: { o:"Mostra o quanto os medicos estao realmente usando o sistema no dia a dia — frequencia de acesso, numero de consultas feitas e quantas funcionalidades diferentes usam.", c:"Supabase: COUNT logins, consultas e features_usadas por usuario por periodo." },
  ux: { o:"Indicadores de qualidade da experiencia do usuario — se os fluxos funcionam sem erro, quanto tempo leva para fazer uma consulta, e se os medicos estao satisfeitos.", c:"Mixpanel/Hotjar para fluxos, timer de sessao para tempo, survey pos-consulta para CSAT." },
  cohort_retencao: { o:"Mostra quantos medicos voltam a usar o sistema depois de 7, 30 e 90 dias. Se a curva sobe ao longo dos meses, significa que estamos melhorando a experiencia inicial.", c:"Supabase: para cada cohort (mes de cadastro), verificar quem logou em D7, D30, D90." },
  alertas_inteligentes: { o:"Avisos automaticos quando um usuario apresenta sinais de que pode cancelar — como parar de logar, reduzir consultas ou dar NPS baixo. Cada alerta sugere uma acao especifica.", c:"Calculado pelo modelo de churn score combinado com regras de negocio (ex: >7 dias sem login)." },
  padroes_prechurn: { o:"Padroes tipicos que aparecem nas semanas antes de um usuario cancelar. Conhecer esses sinais permite agir antes que seja tarde.", c:"Analise retrospectiva de usuarios que cancelaram: quais comportamentos mudaram 1, 2 e 4 semanas antes." },
  resumo_areas: { o:"Visao consolidada das 4 areas de atuacao — cada card mostra as metricas-chave e um indicador de saude (verde = ok, amarelo = atencao, vermelho = critico).", c:"Agregacao das metricas de cada departamento com semaforo baseado em metas." },
  suporte_acoes: { o:"Gatilhos automaticos que disparam acoes do time de suporte quando o sistema detecta problemas tecnicos — bugs, lentidao ou quedas de servico.", c:"Monitoramento de error_rate, uptime, response_time + alertas configurados no Grafana/Sentry." },
  cs_acoes: { o:"Acoes do time de Sucesso do Cliente para manter os medicos engajados — desde tutoriais personalizados ate ligacoes proativas quando o uso cai.", c:"Health score + regras de engajamento (login_freq, consultas/sem, features_usadas)." },
  comercial_acoes: { o:"Acoes comerciais automaticas baseadas no comportamento do usuario — como pedir indicacao quando atinge 20 consultas ou oferecer upgrade quando chega no limite do plano.", c:"Triggers baseados em COUNT(consultas), usage vs plan_limit, NPS score." },
  produto_acoes: { o:"Sinais que indicam onde o produto precisa melhorar — funcionalidades pouco usadas, etapas onde usuarios desistem, e pedidos recorrentes de novas features.", c:"Mixpanel: feature_adoption, funnel_dropoff. Intercom/Zendesk: feature_requests agrupados." },
  efetividade: { o:"Resultado real das intervencoes feitas — de cada 100 usuarios que receberam uma ligacao, WhatsApp ou email, quantos continuaram como clientes.", c:"Supabase: JOIN entre followup_events e subscription_status 30 dias depois da intervencao." },
  fila_intervencao: { o:"Lista priorizada dos 5 usuarios que mais precisam de atencao agora — ordenados pelo impacto (LTV do cliente x urgencia x chance de retencao).", c:"Score = (LTV * urgencia * prob_retencao). LTV do plano, urgencia do churn_score, prob do modelo." },
  nrr_trend: { o:"Evolucao mensal da NRR (Net Revenue Retention) — se esta acima de 100%, a receita cresce mesmo sem novos clientes. Abaixo de 100% = base encolhendo.", c:"SELECT (mrr_inicio + expansion - contraction - churn) / mrr_inicio GROUP BY month." },
  expansion_contraction: { o:"Comparacao visual do dinheiro ganho (upgrades) vs perdido (downgrades + cancelamentos) em cada mes. Ideal: barras verdes maiores que vermelhas.", c:"SELECT type, SUM(ABS(delta_mrr)) FROM mrr_movements GROUP BY month, type." },
  health_dist_detail: { o:"Quantos clientes estao em cada faixa de saude — de 0 (critico, vai cancelar) a 100 (excelente, promotor). Objetivo: mover todos para acima de 60.", c:"Health score calculado: 30% login_freq + 50% consultas/sem + 20% features_usadas." },
  correlacoes_retencao: { o:"Mostra quais comportamentos na primeira semana sao os melhores preditores de retencao a longo prazo. Ex: quem usa 3+ features na semana 1 tem 68% de chance de ficar 90 dias.", c:"Correlacao de Pearson entre comportamentos S1 e retencao D90 por cohort." },
  cac_ltv_canal: { o:"Compara o custo para adquirir um cliente (CAC) vs o valor total esperado desse cliente (LTV) em cada canal de marketing. Indicacao tem o melhor retorno (57x).", c:"CAC = gastos_canal / novos_clientes_canal. LTV = ARPU / churn_rate por segmento de canal." },
  qualidade_cohorts: { o:"Mostra se os novos clientes de cada mes estao ativando melhor ou pior. Tendencia subindo = onboarding esta melhorando. Caindo = algo piorou na experiencia inicial.", c:"COUNT(activated_d7) / COUNT(new_users) GROUP BY signup_month." },
  crescimento_expansao: { o:"Oportunidades de crescer a receita com clientes existentes — medicos prontos para fazer upgrade de plano ou que podem indicar colegas.", c:"Filtrar usuarios por: uso > 80% do limite, NPS >= 9, consultas acima da media." },
  performance_agentes: { o:"Velocidade e taxa de erro de cada camada do sistema de IA — Analise (interpreta dados), Diagnostico (gera diagnostico) e Solucoes (sugere tratamento).", c:"Logs de API: P50/P95 response_time, error_count/total_requests por camada de agente." },
  metricas_saas: { o:"Painel com os numeros-chave de um negocio SaaS — quanto entra de receita, quantos clientes tem, quanto tempo levam para se pagar, e se o negocio e saudavel. Voce pode recolher esse bloco clicando em 'Recolher'.", c:"Calculado automaticamente a partir das assinaturas ativas no Supabase e dos custos cadastrados." },
  projecao_mrr: { o:"Grafico de barras mostrando como o MRR deve crescer nos proximos 12 meses, de acordo com o cenario escolhido (conservador, base ou otimista).", c:"Formula: MRR_proximo = MRR_atual x (1 + taxa_crescimento - taxa_churn). Repetido 12x." },
  detalhe_projecao: { o:"Tabela com o detalhamento mes a mes: quanto entra (MRR), quanto sobra depois de impostos (Rec. Liquida), quanto custa operar (COGS + OPEX), e o resultado final (EBITDA).", c:"Cada coluna e derivada do MRR projetado aplicando as margens percentuais atuais." },
  cohort_d7d30d90: { o:"Grafico de linha que mostra a evolucao da retencao ao longo dos meses. Cada linha (D7, D30, D90) indica quantos usuarios voltaram apos 7, 30 e 90 dias. Subindo = melhorando.", c:"COUNT(logou_em_D7) / COUNT(novos_no_mes) para cada cohort mensal." },
  churn_rate_chart: { o:"Grafico mostrando como a taxa de cancelamento tem evoluido nos ultimos 6 meses. Gross = cancelamentos brutos, Net = descontando upgrades. A linha pontilhada em 2% e a meta saudavel.", c:"SUM(mrr_cancelado) / MRR_inicio_do_mes. Net = (cancelado - expansion) / MRR_inicio." },
  churn_por_tipo: { o:"Divide os cancelamentos em dois tipos: Voluntario (o cliente escolheu sair) e Involuntario (o cartao falhou). Se involuntario e alto, o problema e de cobranca, nao de produto.", c:"SELECT reason_type, COUNT(*) FROM churn_events GROUP BY reason_type." },
  churn_por_tenure: { o:"Mostra em qual fase da vida como cliente os cancelamentos acontecem. Se o pico e nos primeiros meses, o onboarding precisa melhorar.", c:"SELECT FLOOR(tenure_days/90) AS bucket, churn_rate FROM users GROUP BY 1." },
  nrr_trend_chart: { o:"Grafico mensal da NRR — quando esta abaixo de 100%, a empresa esta encolhendo mesmo sem contar novos clientes.", c:"(MRR_inicio + expansion - contraction - churn) / MRR_inicio por mes." },
  expansion_chart: { o:"Barras empilhadas mostrando de onde vem a perda de receita: verde = upgrades, amarelo = downgrades, vermelho = cancelamentos. Ideal: mais verde que vermelho.", c:"SELECT type, SUM(delta_mrr) FROM mrr_movements WHERE month=:mes GROUP BY type." },
  health_histogram: { o:"Histograma que mostra quantos clientes estao em cada faixa de saude (0 a 100). Quanto mais clientes nas faixas verdes (>60), melhor a situacao da base.", c:"SELECT FLOOR(health_score/20)*20 AS faixa, COUNT(*) FROM customers GROUP BY 1." },
  cac_ltv_tabela: { o:"Tabela que compara quanto custa trazer um cliente por cada canal vs quanto ele vale ao longo da vida. Indicacao e o melhor canal (57x de retorno).", c:"CAC = gastos_por_canal / novos_clientes. LTV = ticket_medio / churn_rate." },
  qualidade_cohorts_chart: { o:"Barras horizontais mostrando se cada novo grupo de clientes esta ativando melhor. Tendencia subindo = onboarding melhorando.", c:"COUNT(ativou_em_7d) / COUNT(novos) GROUP BY mes_de_cadastro." },
  oportunidades_upgrade: { o:"Lista de medicos que estao usando muito o plano atual e poderiam se beneficiar de um plano superior. Mostra o motivo e quanto de receita extra cada upgrade geraria.", c:"Filtrar por: consultas > 80% do limite OU pediu feature do plano superior OU NPS >= 9." },
  pipeline_indicacoes: { o:"Medicos com NPS 9 ou 10 que ainda nao foram convidados a indicar colegas. Cada indicacao pode gerar de R$ 997 a R$ 5.997 em nova receita.", c:"SELECT * FROM users WHERE nps >= 9 AND referral_sent = false." },
  financeiro_visao: { o:"Resumo dos numeros financeiros mais importantes: quanto entra (MRR), quanto perde (churn), quanto sobra (EBITDA), e quanto tempo o caixa aguenta (runway).", c:"Consolidado de subscriptions, costs e payment_events do Supabase." },
  produto_visao: { o:"Metricas de como os medicos estao usando o produto: quantos sao ativos, com que frequencia usam, e se estao satisfeitos (NPS, CSAT).", c:"Supabase: login_events, consultations, survey_responses." },
  funil_visao: { o:"Visao resumida do funil de onboarding: de cada 98 compras, quantas se converteram em cada etapa ate a primeira consulta. Identifica onde os usuarios travam.", c:"COUNT por etapa: compra, acesso, login, onboarding, consulta." },
  alertas_visao: { o:"Os 5 problemas mais urgentes que precisam de atencao agora. Clique em 'Ver →' para ir direto ao painel com os detalhes.", c:"Gerado comparando metricas atuais vs metas. Alerta vermelho = >50% abaixo da meta." },
};

function ANInfoTooltip({ id }: { id: string }) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const ref = useRef<HTMLButtonElement>(null);
  const info = AN_TIPS[id];
  if (!info) return null;
  const show = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ top:r.bottom+8, left:r.right+320>window.innerWidth?Math.max(8,r.right-320):r.left });
  };
  return (
    <div style={{ position:"relative", display:"inline-flex", flexShrink:0 }}>
      <button ref={ref} onMouseEnter={show} onMouseLeave={() => setPos(null)} onClick={() => pos?setPos(null):show()}
        style={{ width:18, height:18, borderRadius:"50%", background:pos?DS.primary:DS.bgTableRow, border:`1px solid ${pos?DS.primary:DS.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all .15s" }}>
        <span style={{ fontSize:10, fontWeight:600, color:pos?"#fff":DS.textTertiary, lineHeight:1 }}>i</span>
      </button>
      {pos && (
        <div style={{ position:"fixed", top:pos.top, left:pos.left, zIndex:99999, width:300, background:"#1A1A1A", borderRadius:10, padding:14, boxShadow:"0 12px 40px rgba(0,0,0,.35)", pointerEvents:"none" }}>
          <p style={{ fontSize:11, fontWeight:600, color:"#fff", textTransform:"uppercase", letterSpacing:.6, margin:"0 0 5px" }}>O que e</p>
          <p style={{ fontSize:12, color:"rgba(255,255,255,.85)", margin:"0 0 12px", lineHeight:1.6 }}>{info.o}</p>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.12)", paddingTop:10 }}>
            <p style={{ fontSize:11, fontWeight:600, color:DS.success, textTransform:"uppercase", letterSpacing:.6, margin:"0 0 5px" }}>Como obter</p>
            <p style={{ fontSize:11, color:"rgba(255,255,255,.75)", margin:0, lineHeight:1.6, fontFamily:"monospace", wordBreak:"break-word" }}>{info.c}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const an_card: React.CSSProperties = { background:DS.bgCard, borderRadius:DS.cardRadius, boxShadow:DS.cardShadow, padding:20 };
const an_sT: React.CSSProperties   = { fontSize:14, fontWeight:600, color:DS.primary, margin:0 };
const an_secDiv: React.CSSProperties = { display:"flex", alignItems:"center", gap:12, margin:"32px 0 20px" };

function MC({ label, value, meta, status, sub, tid }: { label:string; value:string; meta:string; status:string; sub?:string; tid:string }) {
  const sc = status==="ok"?DS.success:status==="warn"?DS.warning:status==="crit"?DS.error:DS.textTertiary;
  const vc = status==="crit"?DS.error:DS.textPrimary;
  return (
    <div style={{ ...an_card, padding:16 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
        <p style={{ fontSize:11, fontWeight:600, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:.5, margin:0 }}>{label}</p>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <ANInfoTooltip id={tid} />
          {status!=="neutral" && <span style={{ width:8, height:8, borderRadius:"50%", background:sc }} />}
        </div>
      </div>
      <p style={{ fontSize:22, fontWeight:700, color:vc, margin:"0 0 3px", lineHeight:1.1 }}>{value}</p>
      {sub && <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 2px" }}>{sub}</p>}
      <p style={{ fontSize:11, color:DS.textTertiary, margin:0 }}>Meta: {meta}</p>
    </div>
  );
}

function ANLineChart({ series, data, height=180 }: { series:{key:string;label:string;color:string}[]; data:Record<string,number|string>[]; height?:number }) {
  const [hov, setHov] = useState(-1);
  const PAD = {t:28,r:12,b:36,l:44};
  const W=760, H=height, iW=W-PAD.l-PAD.r, iH=H-PAD.t-PAD.b;
  const allV = series.flatMap(s => data.map(d => Number(d[s.key])||0));
  const maxV = Math.max(...allV, 1);
  const xP = (i:number) => PAD.l+(i/(data.length-1))*iW;
  const yP = (v:number) => PAD.t+iH-(v/maxV)*iH;
  const ticks = [0,.25,.5,.75,1].map(f=>f*maxV);
  return (
    <div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:14, marginBottom:10 }}>
        {series.map(s => (
          <span key={s.key} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:DS.textSecondary }}>
            <span style={{ width:22, height:3, background:s.color, borderRadius:2, display:"inline-block" }} />{s.label}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height, display:"block", overflow:"visible" }} onMouseLeave={() => setHov(-1)}>
        {ticks.map((v,i) => (
          <g key={i}>
            <line x1={PAD.l} x2={W-PAD.r} y1={yP(v)} y2={yP(v)} stroke={DS.border} strokeWidth=".5" strokeDasharray="3,4"/>
            <text x={PAD.l-5} y={yP(v)+4} textAnchor="end" fontSize="9" fill={DS.textTertiary}>{(v*100).toFixed(0)}%</text>
          </g>
        ))}
        {data.map((d,i) => <text key={i} x={xP(i)} y={H-4} textAnchor="middle" fontSize="9" fill={DS.textTertiary}>{String(d.mes)}</text>)}
        {series.map(s => {
          const pts = data.map((d,i) => ({ x:xP(i), y:yP(Number(d[s.key])||0), v:Number(d[s.key])||0 }));
          const pathD = pts.map((p,i) => `${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ");
          return (
            <g key={s.key}>
              <path d={pathD} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
              {pts.map((p,i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="5" fill={DS.bgCard} stroke={s.color} strokeWidth="2" style={{ cursor:"pointer" }} onMouseEnter={()=>setHov(i)}/>
                  <text x={p.x} y={p.y-10} textAnchor="middle" fontSize="9" fontWeight="600" fill={s.color}>{(p.v*100).toFixed(0)}%</text>
                </g>
              ))}
            </g>
          );
        })}
        {hov>=0 && <line x1={xP(hov)} x2={xP(hov)} y1={PAD.t} y2={H-PAD.b} stroke={DS.border} strokeWidth="1" strokeDasharray="3,3"/>}
      </svg>
    </div>
  );
}

const an_cohortData = [
  {mes:"Nov/25",d7:0.62,d30:0.44,d90:0.29},
  {mes:"Dez/25",d7:0.65,d30:0.47,d90:0.32},
  {mes:"Jan/26",d7:0.68,d30:0.50,d90:0.34},
  {mes:"Fev/26",d7:0.71,d30:0.52,d90:0.36},
  {mes:"Mar/26",d7:0.74,d30:0.55,d90:0.38},
];

const INTERVENTIONS = [
  {id:"i1",ini:"FM",name:"Dr. Felipe Motta",plan:"Essencial",ltv:"R$ 19.8k",score:82,cor:DS.error,risk:"Alto risco",esp:"Medico Funcional",tempo:"8 meses",causa:"Abandonou analise de exames 3x apos erro de timeout no agente de metabolismo. Ultima sessao ha 9 dias.",canal:"Ligacao + WhatsApp",msg:"Dr. Motta, a instabilidade no agente de metabolismo ja foi corrigida. Posso agendar 15 min para mostrar o diagnostico do caso que voce estava trabalhando?"},
  {id:"i2",ini:"CA",name:"Dra. Camila Assuncao",plan:"Essencial",ltv:"R$ 19.8k",score:71,cor:DS.error,risk:"Alto risco",esp:"Nutrologa",tempo:"5 meses",causa:"Login caiu 70% em 2 semanas. Nunca usou base de conhecimento nem plano terapeutico — so anamnese basica.",canal:"WhatsApp + Email",msg:"Dra. Camila, voce ainda nao explorou o modulo de plano terapeutico — onde a maioria dos nutricionistas encontra o maior valor. Posso te enviar um caso real resolvido com esse modulo?"},
  {id:"i3",ini:"RL",name:"Dr. Roberto Lima",plan:"Professional",ltv:"R$ 29.7k",score:64,cor:DS.error,risk:"Alto risco",esp:"Psiquiatra Integrativo",tempo:"11 meses",causa:"Consultas cairam de 12/semana para 4/semana em 3 semanas. Coincide com lancamento de concorrente.",canal:"Ligacao prioritaria",msg:"Dr. Roberto, tenho novidades do modulo de neuroinflamacao e eixo HPA — lancadas esta semana para sua especialidade. Posso apresentar?"},
  {id:"i4",ini:"AF",name:"Dra. Ana Figueiredo",plan:"Essencial",ltv:"R$ 19.8k",score:48,cor:DS.warning,risk:"Medio risco",esp:"Endocrinologista",tempo:"3 meses",causa:"Nunca gerou diagnostico completo — todas as 6 consultas ficaram na anamnese. Sem aha moment.",canal:"Email + Call",msg:"Dra. Ana, posso te acompanhar em uma consulta ao vivo para voce ver o diagnostico de causa raiz funcionando na sua especialidade?"},
  {id:"i5",ini:"LP",name:"Dr. Lucas Pereira",plan:"Clinica",ltv:"R$ 59.4k",score:41,cor:DS.warning,risk:"Medio risco",esp:"Clinica Medica",tempo:"14 meses",causa:"Nao expandiu para os outros 2 slots do plano Clinica. Crescimento estagnado ha 3 meses.",canal:"Email de expansao",msg:"Dr. Lucas, seu plano Clinica permite 3 profissionais mas voce usa 1. Muitos clientes adicionam um residente para ampliar capacidade. Quer explorar?"},
];

/* ═══════════════════════════════════════════════
   DATA — Churn & Retention (novas constantes)
   ═══════════════════════════════════════════════ */

const churnTrendData = [
  { mes:"Nov/25", gross:0.038, net:0.028 },
  { mes:"Dez/25", gross:0.042, net:0.032 },
  { mes:"Jan/26", gross:0.048, net:0.035 },
  { mes:"Fev/26", gross:0.052, net:0.040 },
  { mes:"Mar/26", gross:0.058, net:0.048 },
  { mes:"Abr/26", gross:0.064, net:0.054 },
];

const mrrWaterfallData = [
  { label:"MRR Inicio", value:14464, type:"total" as const },
  { label:"Novo MRR", value:3891, type:"positive" as const },
  { label:"Expansao", value:0, type:"positive" as const },
  { label:"Contracao", value:-891, type:"negative" as const },
  { label:"Churn", value:-997, type:"negative" as const },
  { label:"MRR Final", value:16467, type:"total" as const },
];

const churnDecomposition = {
  byType: [
    { label:"Voluntario", value:69, color:DS.error },
    { label:"Involuntario (pagamento)", value:31, color:DS.warning },
  ],
  byPlan: [
    { label:"Essencial", churned:1, total:8, rate:12.5 },
    { label:"Professional", churned:0, total:3, rate:0 },
    { label:"Clinica", churned:0, total:1, rate:0 },
  ],
  byTenure: [
    { label:"0-3 meses", churned:0, total:3, rate:0 },
    { label:"3-6 meses", churned:1, total:4, rate:25 },
    { label:"6-12 meses", churned:0, total:3, rate:0 },
    { label:">12 meses", churned:0, total:2, rate:0 },
  ],
};

const churnReasons = [
  { reason:"Falha de pagamento", pct:31, color:DS.warning },
  { reason:"Sem valor percebido", pct:23, color:DS.error },
  { reason:"Concorrente", pct:15, color:C.purple },
  { reason:"Feature gap", pct:12, color:C.orange },
  { reason:"Orcamento", pct:10, color:DS.primary },
  { reason:"Outros", pct:9, color:DS.textTertiary },
];

const timeToChurnDist = [
  { month:"Mes 1", pct:8, color:`${DS.warning}90` },
  { month:"Mes 2", pct:15, color:`${DS.warning}` },
  { month:"Mes 3", pct:28, color:DS.error },
  { month:"Mes 4-6", pct:22, color:`${DS.error}CC` },
  { month:"Mes 7-12", pct:18, color:`${DS.error}99` },
  { month:">12m", pct:9, color:`${DS.error}66` },
];

const dunningStats = {
  totalFailed: 4, recovered: 2, recoveryRate: 0.50, mrrRecovered: 1994, mrrLost: 997,
  retries: [
    { attempt:"1a tentativa", rate:35 },
    { attempt:"2a tentativa", rate:15 },
    { attempt:"3a tentativa", rate:5 },
  ],
};

const churnCohortHeatmap = [
  { cohort:"Out/25", m1:100, m2:92, m3:85, m4:78, m5:74, m6:71 },
  { cohort:"Nov/25", m1:100, m2:90, m3:82, m4:76, m5:72, m6:null },
  { cohort:"Dez/25", m1:100, m2:88, m3:80, m4:75, m5:null, m6:null },
  { cohort:"Jan/26", m1:100, m2:91, m3:83, m4:null, m5:null, m6:null },
  { cohort:"Fev/26", m1:100, m2:89, m3:null, m4:null, m5:null, m6:null },
  { cohort:"Mar/26", m1:100, m2:null, m3:null, m4:null, m5:null, m6:null },
];

const churnModelFeatures = [
  { feature:"Dias sem login", importance:28, direction:"↑", threshold:">7 dias" },
  { feature:"Consultas/semana (queda)", importance:22, direction:"↓", threshold:"<2/sem" },
  { feature:"Features usadas", importance:18, direction:"↓", threshold:"<2 features" },
  { feature:"Tempo medio sessao", importance:14, direction:"↓", threshold:"<5 min" },
  { feature:"Tickets suporte abertos", importance:10, direction:"↑", threshold:">3 abertos" },
  { feature:"NPS score", importance:8, direction:"↓", threshold:"<6 (detrator)" },
];

const nrrTrendData = [
  { mes:"Nov/25", nrr:0.97, expansion:200, contraction:340, churnVal:580 },
  { mes:"Dez/25", nrr:0.96, expansion:150, contraction:400, churnVal:620 },
  { mes:"Jan/26", nrr:0.95, expansion:100, contraction:520, churnVal:750 },
  { mes:"Fev/26", nrr:0.94, expansion:50, contraction:680, churnVal:830 },
  { mes:"Mar/26", nrr:0.94, expansion:0, contraction:780, churnVal:920 },
  { mes:"Abr/26", nrr:0.936, expansion:0, contraction:891, churnVal:997 },
];

const healthScoreDistribution = [
  { bucket:"0-20", count:1, label:"Critico", color:DS.error },
  { bucket:"21-40", count:2, label:"Risco", color:DS.warning },
  { bucket:"41-60", count:3, label:"Atencao", color:"#F59E0B" },
  { bucket:"61-80", count:4, label:"Saudavel", color:DS.success },
  { bucket:"81-100", count:2, label:"Excelente", color:DS.primary },
];

const healthBySegment = {
  byPlan: [
    { segment:"Essencial", avg:54, color:DS.warning },
    { segment:"Professional", avg:68, color:DS.success },
    { segment:"Clinica", avg:78, color:DS.primary },
  ],
  byTenure: [
    { segment:"0-3 meses", avg:48, color:DS.error },
    { segment:"3-6 meses", avg:58, color:DS.warning },
    { segment:"6-12 meses", avg:72, color:DS.success },
    { segment:">12 meses", avg:80, color:DS.primary },
  ],
};

const lifecycleStages = [
  { stage:"Onboarding", count:3, pct:25, color:DS.primary },
  { stage:"Growing", count:2, pct:17, color:DS.success },
  { stage:"Mature", count:3, pct:25, color:C.teal },
  { stage:"At Risk", count:3, pct:25, color:DS.warning },
  { stage:"Churning", count:1, pct:8, color:DS.error },
];

const engagementTrendData = [
  { mes:"S1 Mar", score:0.58 },
  { mes:"S2 Mar", score:0.56 },
  { mes:"S3 Mar", score:0.60 },
  { mes:"S4 Mar", score:0.62 },
  { mes:"S1 Abr", score:0.59 },
];

const reactivationData = {
  attempts: 5, successes: 1, successRate: 0.20, mrrReactivated: 997, avgDays: 34,
  byChannel: [
    { channel:"Email", attempts:3, successes:0, rate:0 },
    { channel:"WhatsApp", attempts:1, successes:1, rate:1.0 },
    { channel:"Ligacao", attempts:1, successes:0, rate:0 },
  ],
};

const retentionDrivers = [
  { driver:"Consultas completas/sem", correlation:0.82, color:DS.success },
  { driver:"Features distintas usadas", correlation:0.71, color:DS.success },
  { driver:"Diagnostico gerado", correlation:0.68, color:DS.primary },
  { driver:"Tempo de sessao >10min", correlation:0.61, color:DS.primary },
  { driver:"Onboarding em <7d", correlation:0.55, color:C.purple },
  { driver:"NPS >= 8", correlation:0.48, color:C.teal },
];

function AnalyticsDash() {
  const [tab, setTab] = useState("produto");
  const [churnOpen, setChurnOpen] = useState(true);
  const [taskStatus, setTaskStatus] = useState<Record<string,string>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string,boolean>>({});
  const [subIntervencao, setSubIntervencao] = useState("visao_geral");

  const statusLabel: Record<string,string> = { pendente:"Pendente", em_andamento:"Em andamento", resolvido:"Retido ✓", churnou:"Churnou ✗" };
  const statusColor: Record<string,string> = { pendente:DS.textTertiary, em_andamento:DS.warning, resolvido:DS.success, churnou:DS.error };

  const handleClickup = (id: string) => {
    setLoadingMap(p => ({ ...p, [id]:true }));
    setTimeout(() => {
      setLoadingMap(p => ({ ...p, [id]:false }));
      setTaskStatus(p => ({ ...p, [id]:"em_andamento" }));
    }, 1200);
  };

  const TABS = [
    {id:"produto",label:"Produto & Engajamento"},
    {id:"churn",label:"Churn & Retencao"},
    {id:"intervencao",label:"Intervencao Proativa"},
    {id:"retencao",label:"Retencao & Crescimento"},
    {id:"tecnico",label:"Performance Tecnica"},
  ];

  return (
    <div style={{ minHeight:"100vh", background:DS.bgPage, fontFamily:"'Inter',system-ui,sans-serif", padding:"44px 64px 64px" }}>
      <header style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
        <div>
          <h1 style={{ fontSize:28, fontWeight:600, color:DS.textPrimary, margin:0 }}>Product Analytics · Auton Health</h1>
          <p style={{ fontSize:12, color:DS.textTertiary, margin:0, textTransform:"uppercase", letterSpacing:1 }}>Abril 2026 · Dados Estimados · Healthtech B2B</p>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ fontSize:12, fontWeight:600, padding:"7px 14px", borderRadius:6, cursor:"pointer", border:`1px solid ${tab===t.id?DS.primary:DS.border}`, background:tab===t.id?DS.primary:DS.bgCard, color:tab===t.id?"#fff":DS.textSecondary, transition:"all .15s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* PRODUTO */}
      {tab==="produto" && (
        <>
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Aquisicao e Ativacao</h2><ANInfoTooltip id="aquisicao"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:28 }}>
            <MC label="CAC" value="R$ 2.3k" meta="<R$ 3k" status="ok" sub="Total S&M / novos clientes" tid="cac"/>
            <MC label="Time to First Value" value="31h" meta="<48h" status="ok" sub="Cadastro → 1a consulta" tid="ttfv"/>
            <MC label="Taxa de Ativacao" value="54%" meta=">60% em 7d" status="warn" sub="Onboarding + 1a consulta" tid="activation"/>
            <MC label="Conversao Trial" value="38%" meta=">40%" status="warn" sub="Usuarios que assinam" tid="cac"/>
          </div>
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Engajamento</h2><ANInfoTooltip id="engajamento"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:28 }}>
            <MC label="DAU/MAU Stickiness" value="23%" meta=">20%" status="ok" sub="Uso diario / mensal" tid="daumau"/>
            <MC label="Consultas / Usuario" value="6.2/mes" meta=">8/mes" status="warn" sub="2 consultas por semana" tid="consult"/>
            <MC label="Breadth of Use" value="2.8" meta=">3 features" status="warn" sub="Features distintas" tid="breadth"/>
            <MC label="NPS" value="52" meta=">50" status="ok" sub="Promotores - Detratores" tid="nps"/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:28 }}>
            <div style={{ ...an_card }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}><h3 style={an_sT}>Feature Adoption x Retencao D90</h3><ANInfoTooltip id="breadth"/></div>
              {[
                {f:"Anamnese inteligente",a:0.89,r:0.68,cor:DS.success},
                {f:"Analise de exames",a:0.72,r:0.61,cor:DS.primary},
                {f:"Base de conhecimento",a:0.58,r:0.54,cor:C.purple},
                {f:"Teleconsulta",a:0.41,r:0.48,cor:C.orange},
                {f:"Plano terapeutico",a:0.35,r:0.45,cor:C.teal},
              ].map(item => (
                <div key={item.f} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ width:10, height:10, borderRadius:2, background:item.cor, flexShrink:0 }}/>
                      <span style={{ fontSize:13, fontWeight:600, color:DS.textDefault }}>{item.f}</span>
                    </div>
                    <span style={{ fontSize:11, color:DS.textTertiary }}>Adocao <strong style={{ color:item.cor }}>{fmtPct(item.a)}</strong> · D90 <strong style={{ color:DS.success }}>{fmtPct(item.r)}</strong></span>
                  </div>
                  <div style={{ height:20, background:DS.bgTableRow, borderRadius:3, overflow:"hidden", border:`1px solid ${DS.border}` }}>
                    <div style={{ height:"100%", width:`${item.a*100}%`, background:item.cor, opacity:.85 }}/>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...an_card }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}><h3 style={an_sT}>Funil de Consulta — Drop-off por Etapa</h3><ANInfoTooltip id="tsr"/></div>
              {[
                {n:1,l:"Consulta iniciada",w:100,p:"100%",cor:C.teal,drop:"8%",dc:DS.success},
                {n:2,l:"Anamnese completa",w:92,p:"92%",cor:C.teal,drop:"12%",dc:DS.warning},
                {n:3,l:"Exames inseridos",w:81,p:"81%",cor:DS.warning,drop:"22%",dc:DS.error},
                {n:4,l:"Diagnostico gerado",w:63,p:"63%",cor:DS.warning,drop:"8%",dc:DS.warning},
                {n:5,l:"Solucao entregue",w:58,p:"58%",cor:DS.error,drop:"",dc:DS.textTertiary},
              ].map(item => (
                <div key={item.n} style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:2 }}>
                  <div style={{ width:`${Math.max(item.w,55)}%`, display:"flex", alignItems:"center", justifyContent:"space-between", borderRadius:6, padding:"9px 12px", border:`1px solid ${DS.border}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ width:22, height:22, borderRadius:4, background:item.cor, color:"#fff", fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>{item.n}</span>
                      <span style={{ fontSize:13, fontWeight:600, color:item.cor }}>{item.l}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:18, fontWeight:700, color:DS.textPrimary }}>{item.w}</span>
                      <span style={{ fontSize:11, fontWeight:600, padding:"2px 6px", borderRadius:3, color:item.cor, background:`${item.cor}15` }}>{item.p}</span>
                    </div>
                  </div>
                  {item.drop && <div style={{ fontSize:10, fontWeight:600, color:item.dc, margin:"2px 0" }}>↓ {item.drop} drop</div>}
                </div>
              ))}
              <div style={{ marginTop:10, padding:"8px 10px", background:`${DS.error}08`, borderRadius:6, border:`1px solid ${DS.error}20` }}>
                <p style={{ fontSize:12, color:DS.error, fontWeight:600, margin:0 }}>⚠ Maior gargalo: insercao de exames — 22% de abandono</p>
              </div>
            </div>
          </div>
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Retencao por Cohort</h2><ANInfoTooltip id="cohort_retencao"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:24, marginBottom:28 }}>
            <div style={{ ...an_card }}>
              <h3 style={{ ...an_sT, marginBottom:4 }}>D7 / D30 / D90 — evolucao por cohort</h3><ANInfoTooltip id="cohort_d7d30d90"/>
              <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 16px" }}>Nov/25 → Mar/26</p>
              <ANLineChart series={[{key:"d7",label:"D7 (meta >70%)",color:DS.primary},{key:"d30",label:"D30 (meta >50%)",color:C.purple},{key:"d90",label:"D90 (meta >35%)",color:C.orange}]} data={an_cohortData} height={200}/>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <MC label="Retencao D7" value="74%" meta=">70%" status="ok" sub="Cohort Mar/26" tid="d7"/>
              <MC label="Retencao D30" value="55%" meta=">50%" status="ok" sub="Cohort Fev/26" tid="d30"/>
              <MC label="Retencao D90" value="36%" meta=">35%" status="ok" sub="Cohort Jan/26" tid="d90"/>
              <MC label="NRR" value="93.6%" meta=">100%" status="warn" sub="Net Revenue Retention" tid="nrr"/>
            </div>
          </div>
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Experiencia do Usuario</h2><ANInfoTooltip id="ux"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            <MC label="Task Success Rate" value="87%" meta=">90%" status="warn" sub="Fluxos sem erro" tid="tsr"/>
            <MC label="Time on Task" value="6.4min" meta="<8min" status="ok" sub="Consulta completa" tid="tsr"/>
            <MC label="CSAT" value="4.1/5" meta=">4.2" status="warn" sub="Pos-consulta" tid="csat"/>
            <MC label="Error Rate" value="0.8%" meta="<1%" status="ok" sub="Sessoes com erro critico" tid="apitime"/>
          </div>
        </>
      )}

      {/* CHURN */}
      {tab==="churn" && (
        <>
          {/* KPIs — 6 cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:12 }}>
            <MC label="MRR Churn Rate" value="6.4%" meta="<2%/mes" status="crit" sub="Acima do limite saudavel" tid="churn"/>
            <MC label="Churn involuntario" value="31%" meta="<15%" status="crit" sub="Falhas de pagamento" tid="churn_involuntario"/>
            <MC label="MRR perdido" value="R$ 997" meta="Reduzir 50%" status="warn" sub="1 cancelamento Essencial" tid="churn"/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:28 }}>
            <MC label="Tempo medio churn" value="47d" meta=">90d" status="crit" sub="Problema de engajamento" tid="churn"/>
            <MC label="NRR" value="93.6%" meta=">100%" status="warn" sub="Net Revenue Retention" tid="nrr"/>
            <MC label="MRR em Risco" value="R$ 3.5k" meta="<R$ 1k" status="crit" sub="Usuarios com score >50" tid="mrr_at_risk"/>
          </div>

          {/* Churn Rate Trend */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Tendencia de Churn</h2><ANInfoTooltip id="gross_churn_trend"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:24, marginBottom:28 }}>
            <div style={{ ...an_card }}>
              <h3 style={{ ...an_sT, marginBottom:4 }}>Churn Rate — Ultimos 6 meses</h3><ANInfoTooltip id="churn_rate_chart"/>
              <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 16px" }}>Gross vs Net · Linha vermelha = meta 2%</p>
              <ANLineChart series={[{key:"gross",label:"Gross Churn",color:DS.error},{key:"net",label:"Net Churn",color:DS.warning}]} data={churnTrendData} height={200}/>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <MC label="Gross Churn" value="6.4%" meta="<2%/mes" status="crit" sub="Abr/26" tid="gross_churn_trend"/>
              <MC label="Net Churn" value="5.4%" meta="<1%/mes" status="crit" sub="Sem expansao" tid="net_churn_trend"/>
              <div style={{ ...an_card, padding:14, border:`1px solid ${DS.error}20`, background:`${DS.error}04` }}>
                <p style={{ fontSize:12, color:DS.error, fontWeight:600, margin:0, lineHeight:1.5 }}>⚠ Churn acelerando: +68% em 6 meses. Tendencia precisa ser revertida antes de Jun/26.</p>
              </div>
            </div>
          </div>

          {/* MRR Waterfall */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>MRR Movement — Abril 2026</h2><ANInfoTooltip id="mrr_waterfall"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ ...an_card, marginBottom:28 }}>
            <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:200, padding:"0 20px" }}>
              {mrrWaterfallData.map((bar,i) => {
                const maxW = 16467;
                const absVal = Math.abs(bar.value);
                const h = Math.max((absVal / maxW) * 100, 8);
                const bgColor = bar.type==="total"?DS.primary:bar.type==="positive"?DS.success:DS.error;
                return (
                  <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", height:"100%" }}>
                    <span style={{ fontSize:11, fontWeight:700, color:bgColor, marginBottom:4 }}>{bar.type==="negative"?`-${fmtK(absVal)}`:fmtK(bar.value)}</span>
                    <div style={{ width:"80%", borderRadius:"3px 3px 0 0", height:`${h}%`, background:bgColor, opacity:bar.value===0?0.3:0.85 }}/>
                    <span style={{ fontSize:10, color:DS.textTertiary, marginTop:6, textAlign:"center", lineHeight:1.2 }}>{bar.label}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop:16, padding:"10px 16px", background:DS.bgTableRow, borderRadius:6, display:"flex", justifyContent:"space-between", fontSize:12 }}>
              <span style={{ color:DS.textSecondary }}>Inicio: <strong style={{ color:DS.primary }}>R$ 14.5k</strong></span>
              <span style={{ color:DS.success }}>+Novo: <strong>R$ 3.9k</strong></span>
              <span style={{ color:DS.error }}>-Contracao: <strong>R$ 891</strong></span>
              <span style={{ color:DS.error }}>-Churn: <strong>R$ 997</strong></span>
              <span style={{ color:DS.textSecondary }}>Final: <strong style={{ color:DS.primary }}>R$ 16.5k</strong></span>
            </div>
          </div>

          {/* Churn Decomposition */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Decomposicao do Churn</h2><ANInfoTooltip id="churn_decomp"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:28 }}>
            {/* Por tipo */}
            <div style={{ ...an_card }}>
              <h3 style={{ ...an_sT, marginBottom:16 }}>Por Tipo</h3><ANInfoTooltip id="churn_por_tipo"/>
              {churnDecomposition.byType.map((item,i) => (
                <div key={i} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:DS.textDefault }}>{item.label}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:item.color }}>{item.value}%</span>
                  </div>
                  <div style={{ height:20, background:DS.bgTableRow, borderRadius:3, overflow:"hidden", border:`1px solid ${DS.border}` }}>
                    <div style={{ height:"100%", width:`${item.value}%`, background:item.color, opacity:.85, borderRadius:3 }}/>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:16, borderTop:`1px solid ${DS.divider}`, paddingTop:12 }}>
                <p style={{ fontSize:13, fontWeight:600, color:DS.textPrimary, margin:"0 0 8px" }}>Por Plano</p>
                {churnDecomposition.byPlan.map((p,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${DS.divider}` }}>
                    <span style={{ fontSize:12, color:DS.textSecondary }}>{p.label}</span>
                    <span style={{ fontSize:12, color:p.churned>0?DS.error:DS.success, fontWeight:600 }}>{p.churned}/{p.total} ({p.rate}%)</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Por tenure */}
            <div style={{ ...an_card }}>
              <h3 style={{ ...an_sT, marginBottom:16 }}>Por Tenure (tempo como cliente)</h3><ANInfoTooltip id="churn_por_tenure"/>
              {churnDecomposition.byTenure.map((t,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:`1px solid ${DS.divider}` }}>
                  <span style={{ fontSize:12, color:DS.textSecondary, width:80, flexShrink:0 }}>{t.label}</span>
                  <div style={{ flex:1, height:16, background:DS.bgTableRow, borderRadius:3, overflow:"hidden", border:`1px solid ${DS.border}` }}>
                    <div style={{ height:"100%", width:`${t.rate}%`, background:t.rate>0?DS.error:DS.success, borderRadius:3, opacity:.85, minWidth:t.rate>0?4:0 }}/>
                  </div>
                  <span style={{ fontSize:12, fontWeight:600, color:t.rate>0?DS.error:DS.success, width:60, textAlign:"right" }}>{t.rate}%</span>
                  <span style={{ fontSize:11, color:DS.textTertiary, width:50 }}>{t.churned}/{t.total}</span>
                </div>
              ))}
              <div style={{ marginTop:16, padding:"10px 14px", background:`${DS.warning}08`, borderRadius:6, border:`1px solid ${DS.warning}20` }}>
                <p style={{ fontSize:12, color:DS.warning, fontWeight:600, margin:0 }}>Pico de churn no bucket 3-6 meses — validar onboarding e first value</p>
              </div>
            </div>
          </div>

          {/* Motivos de Churn */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Motivos de Churn</h2><ANInfoTooltip id="churn_reasons"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ ...an_card, marginBottom:28 }}>
            {churnReasons.map((r,i) => (
              <div key={i} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:13, fontWeight:600, color:DS.textDefault }}>{r.reason}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:r.color }}>{r.pct}%</span>
                </div>
                <div style={{ height:16, background:DS.bgTableRow, borderRadius:3, overflow:"hidden", border:`1px solid ${DS.border}` }}>
                  <div style={{ height:"100%", width:`${r.pct}%`, background:r.color, borderRadius:3, opacity:.85 }}/>
                </div>
              </div>
            ))}
          </div>

          {/* Time-to-Churn + Dunning */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:28 }}>
            <div style={{ ...an_card }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <h3 style={an_sT}>Time-to-Churn</h3><ANInfoTooltip id="time_to_churn"/>
              </div>
              <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 16px" }}>Em que momento os clientes cancelam</p>
              <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:140 }}>
                {timeToChurnDist.map((b,i) => {
                  const h = Math.max((b.pct/28)*100, 8);
                  return (
                    <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", height:"100%" }}>
                      <span style={{ fontSize:11, fontWeight:700, color:DS.textPrimary, marginBottom:4 }}>{b.pct}%</span>
                      <div style={{ width:"80%", borderRadius:"3px 3px 0 0", height:`${h}%`, background:b.color }}/>
                      <span style={{ fontSize:10, color:DS.textTertiary, marginTop:4, textAlign:"center" }}>{b.month}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop:12, padding:"8px 10px", background:`${DS.error}08`, borderRadius:6, border:`1px solid ${DS.error}20` }}>
                <p style={{ fontSize:11, color:DS.error, fontWeight:600, margin:0 }}>Pico no Mes 3 (28%) — janela critica para intervencao</p>
              </div>
            </div>
            <div style={{ ...an_card }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <h3 style={an_sT}>Dunning — Recuperacao de Pagamentos</h3><ANInfoTooltip id="dunning"/>
              </div>
              <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 16px" }}>Tentativas de cobranca automatica</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
                {[
                  {l:"Total falhas",v:String(dunningStats.totalFailed),c:DS.error},
                  {l:"Recuperados",v:String(dunningStats.recovered),c:DS.success},
                  {l:"Taxa recuperacao",v:fmtPct(dunningStats.recoveryRate),c:DS.success},
                ].map((k,i) => (
                  <div key={i} style={{ textAlign:"center", padding:10, background:DS.bgTableRow, borderRadius:6, border:`1px solid ${DS.border}` }}>
                    <p style={{ fontSize:10, color:DS.textTertiary, textTransform:"uppercase", margin:"0 0 4px" }}>{k.l}</p>
                    <p style={{ fontSize:18, fontWeight:700, color:k.c, margin:0 }}>{k.v}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize:12, fontWeight:600, color:DS.textSecondary, margin:"0 0 8px" }}>Taxa por tentativa</p>
              {dunningStats.retries.map((r,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                  <span style={{ fontSize:12, color:DS.textTertiary, width:90, flexShrink:0 }}>{r.attempt}</span>
                  <div style={{ flex:1, height:14, background:DS.bgTableRow, borderRadius:3, overflow:"hidden", border:`1px solid ${DS.border}` }}>
                    <div style={{ height:"100%", width:`${r.rate}%`, background:r.rate>20?DS.success:r.rate>10?DS.warning:DS.error, borderRadius:3 }}/>
                  </div>
                  <span style={{ fontSize:12, fontWeight:600, color:DS.textPrimary, width:30, textAlign:"right" }}>{r.rate}%</span>
                </div>
              ))}
              <div style={{ marginTop:12, display:"flex", justifyContent:"space-between", fontSize:11, color:DS.textTertiary }}>
                <span>MRR recuperado: <strong style={{ color:DS.success }}>R$ {dunningStats.mrrRecovered.toLocaleString("pt-BR")}</strong></span>
                <span>MRR perdido: <strong style={{ color:DS.error }}>R$ {dunningStats.mrrLost.toLocaleString("pt-BR")}</strong></span>
              </div>
            </div>
          </div>

          {/* Cohort Heatmap */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Cohort Heatmap — Retencao por Mes de Signup</h2><ANInfoTooltip id="cohort_heatmap"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ ...an_card, marginBottom:28 }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr>
                  <th style={{ padding:"8px 12px", textAlign:"left", fontWeight:600, color:DS.textTertiary, fontSize:11 }}>Cohort</th>
                  {["Mes 1","Mes 2","Mes 3","Mes 4","Mes 5","Mes 6"].map(h => (
                    <th key={h} style={{ padding:"8px 12px", textAlign:"center", fontWeight:600, color:DS.textTertiary, fontSize:11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {churnCohortHeatmap.map((row,i) => (
                  <tr key={i}>
                    <td style={{ padding:"8px 12px", fontWeight:600, color:DS.textPrimary }}>{row.cohort}</td>
                    {[row.m1,row.m2,row.m3,row.m4,row.m5,row.m6].map((val,j) => {
                      if (val===null) return <td key={j} style={{ padding:"8px 12px", textAlign:"center", background:DS.bgTableRow, color:DS.textDisabled }}>—</td>;
                      const bg = val>=80?`${DS.success}25`:val>=60?`${DS.warning}25`:`${DS.error}25`;
                      const tc = val>=80?DS.success:val>=60?DS.warning:DS.error;
                      return <td key={j} style={{ padding:"8px 12px", textAlign:"center", background:bg, fontWeight:600, color:tc, borderRadius:2 }}>{val}%</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sinais Comportamentais */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Sinais Comportamentais — Feature Importance do Modelo</h2><ANInfoTooltip id="churn_model"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ ...an_card, marginBottom:28 }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr>
                  {["Feature","Importancia","Direcao","Threshold Critico"].map((h,i) => (
                    <th key={h} style={{ padding:"9px 12px", textAlign:i===0?"left":"center", fontWeight:600, color:DS.textTertiary, fontSize:11, borderBottom:`2px solid ${DS.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {churnModelFeatures.map((f,i) => (
                  <tr key={i} style={{ background:i%2===0?DS.bgTableRow:DS.bgCard }}>
                    <td style={{ padding:"9px 12px", fontWeight:600, color:DS.textPrimary }}>{f.feature}</td>
                    <td style={{ padding:"9px 12px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ flex:1, height:14, background:DS.divider, borderRadius:3, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${f.importance*3.5}%`, background:f.importance>20?DS.error:f.importance>12?DS.warning:DS.primary, borderRadius:3 }}/>
                        </div>
                        <span style={{ fontSize:12, fontWeight:700, color:DS.textPrimary, width:30, textAlign:"right" }}>{f.importance}%</span>
                      </div>
                    </td>
                    <td style={{ padding:"9px 12px", textAlign:"center", fontSize:16 }}>{f.direction}</td>
                    <td style={{ padding:"9px 12px", textAlign:"center" }}>
                      <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, background:`${DS.error}12`, color:DS.error, border:`1px solid ${DS.error}30` }}>{f.threshold}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Churn Score — movido para o final */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Churn Score — Usuarios em Risco</h2><ANInfoTooltip id="churnscore"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ ...an_card, marginBottom:28, padding:0 }}>
            <div onClick={() => setChurnOpen(v => !v)} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", padding:"16px 24px", borderBottom:churnOpen?`1px solid ${DS.border}`:"none" }}>
              <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                {[{l:"Alto risco",c:DS.error,n:3},{l:"Medio risco",c:DS.warning,n:2},{l:"Baixo risco",c:DS.success,n:7}].map(s => (
                  <div key={s.l} style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 12px", borderRadius:6, background:`${s.c}10`, border:`1px solid ${s.c}30` }}>
                    <span style={{ width:8, height:8, borderRadius:"50%", background:s.c }}/><span style={{ fontSize:12, fontWeight:600, color:s.c }}>{s.n} {s.l}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:4, background:DS.bgTableRow, border:`1px solid ${DS.border}`, borderRadius:6, padding:"4px 10px" }}>
                <span style={{ fontSize:11, fontWeight:600, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:.5 }}>{churnOpen?"Recolher":"Expandir"}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DS.primary} strokeWidth="2.5" style={{ transition:"transform .3s", transform:churnOpen?"rotate(180deg)":"" }}><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            {churnOpen && (
              <div style={{ padding:"4px 24px 20px" }}>
                {[
                  {ini:"FM",name:"Dr. Felipe Motta",plan:"Essencial",score:82,cor:DS.error,days:9,cw:0},
                  {ini:"CA",name:"Dra. Camila Assuncao",plan:"Essencial",score:71,cor:DS.error,days:6,cw:1},
                  {ini:"RL",name:"Dr. Roberto Lima",plan:"Professional",score:64,cor:DS.error,days:5,cw:1},
                  {ini:"AF",name:"Dra. Ana Figueiredo",plan:"Essencial",score:48,cor:DS.warning,days:3,cw:2},
                  {ini:"LP",name:"Dr. Lucas Pereira",plan:"Clinica",score:41,cor:DS.warning,days:4,cw:2},
                  {ini:"MC",name:"Dra. Marina Costa",plan:"Professional",score:18,cor:DS.success,days:0,cw:6},
                ].map((u,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:`1px solid ${DS.divider}` }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:u.cor, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ fontSize:12, fontWeight:600, color:"#fff" }}>{u.ini}</span>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:DS.textPrimary }}>{u.name}</div>
                      <div style={{ fontSize:11, color:DS.textTertiary }}>{u.plan} · {u.days}d sem login · {u.cw} consultas/sem</div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <div style={{ fontSize:16, fontWeight:700, color:u.cor }}>{u.score}</div>
                      <div style={{ fontSize:10, color:u.cor, fontWeight:600 }}>{u.score>=60?"Alto":u.score>=30?"Medio":"Baixo"}</div>
                    </div>
                    <div style={{ width:60, height:5, background:DS.divider, borderRadius:3, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${u.score}%`, background:u.cor, borderRadius:3 }}/>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Alertas Inteligentes Ativos */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Alertas Inteligentes Ativos</h2><ANInfoTooltip id="alertas_inteligentes"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          {[
            {c:DS.error,  u:"Dr. Felipe Motta",    m:"9 dias sem login · Churn score 82",       a:"Ligacao CS hoje"},
            {c:DS.error,  u:"Dra. Camila Assuncao",m:"Abandonou fluxo 3x em 7 dias",            a:"WhatsApp automatico"},
            {c:DS.warning,u:"Dr. Roberto Lima",    m:"Consultas cairam 60% vs semana anterior", a:"Email com case de sucesso"},
            {c:DS.warning,u:"Dra. Ana Figueiredo", m:"Nenhuma feature core em 5 dias",          a:"Push notification"},
            {c:DS.warning,u:"Dr. Lucas Pereira",   m:"Score 41 — inatividade crescente",        a:"Email de reengajamento"},
          ].map((item,i) => (
            <div key={i} style={{ ...an_card, padding:14, display:"flex", alignItems:"center", gap:16, border:`1px solid ${item.c}20`, background:`${item.c}04`, marginBottom:12 }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:item.c, flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <span style={{ fontSize:13, fontWeight:600, color:DS.textPrimary }}>{item.u}</span>
                <span style={{ fontSize:12, color:DS.textSecondary, marginLeft:10 }}>{item.m}</span>
              </div>
              <span style={{ fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:20, background:`${item.c}12`, color:item.c, border:`1px solid ${item.c}30`, flexShrink:0 }}>{item.a}</span>
            </div>
          ))}

          {/* Padroes Comportamentais Pre-Churn */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Padroes Comportamentais Pre-Churn</h2><ANInfoTooltip id="padroes_prechurn"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {[
              {s:"Semana -4",c:DS.warning,itens:["Login frequency cai >30%","Consultas/semana <2","Sessoes <2 minutos"]},
              {s:"Semana -2",c:C.orange,  itens:["Para features secundarias","Nenhuma consulta nova","Acessa FAQ / suporte"]},
              {s:"Semana -1",c:DS.error,  itens:["Zero logins","Acessa configuracoes de conta","Abandono no mobile"]},
            ].map((w,i) => (
              <div key={i} style={{ ...an_card, border:`1px solid ${w.c}20`, background:`${w.c}04` }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:w.c }}/><p style={{ fontSize:13, fontWeight:700, color:w.c, margin:0 }}>{w.s} antes do churn</p>
                </div>
                {w.itens.map((item,j) => (
                  <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:8 }}>
                    <span style={{ fontSize:10, color:w.c, marginTop:2, flexShrink:0 }}>▸</span>
                    <span style={{ fontSize:12, color:DS.textSecondary, lineHeight:1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* INTERVENCAO PROATIVA */}
      {tab==="intervencao" && (
        <>
          {/* SUB-MENU */}
          <div style={{ display:"flex", gap:8, marginBottom:24, flexWrap:"wrap" }}>
            {[
              {id:"visao_geral",label:"Visao Geral",icon:"◈",cor:DS.primary},
              {id:"suporte",label:"Suporte Tecnico",icon:"🔧",cor:DS.error},
              {id:"cs",label:"Sucesso do Cliente",icon:"👥",cor:DS.success},
              {id:"comercial",label:"Comercial",icon:"💰",cor:C.purple},
              {id:"produto",label:"Melhoria de Produto",icon:"💡",cor:DS.primary},
            ].map(s => (
              <button key={s.id} onClick={() => setSubIntervencao(s.id)}
                style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:600, padding:"8px 16px", borderRadius:6, cursor:"pointer", border:`1px solid ${subIntervencao===s.id?s.cor:DS.border}`, background:subIntervencao===s.id?s.cor:DS.bgCard, color:subIntervencao===s.id?"#fff":DS.textSecondary, transition:"all .15s" }}>
                <span style={{ fontSize:14 }}>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>

          {/* ═══ VISAO GERAL ═══ */}
          {subIntervencao==="visao_geral" && (<>
            {/* KPIs gerais */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:28 }}>
              {[
                {l:"Intervencoes pendentes",v:"5",s:"Aguardando acao do CS",c:DS.error},
                {l:"Em andamento",v:"3",s:"CS trabalhando agora",c:DS.warning},
                {l:"Taxa de retencao",v:"68%",s:"Apos intervencao (30 dias)",c:DS.success},
                {l:"MRR salvo este mes",v:"R$ 4.5k",s:"Intervencoes resolvidas",c:DS.success},
              ].map((k,i) => (
                <div key={i} style={{ ...an_card, padding:20 }}>
                  <p style={{ fontSize:11, fontWeight:600, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:.5, margin:"0 0 6px" }}>{k.l}</p>
                  <p style={{ fontSize:24, fontWeight:700, color:k.c, margin:"0 0 3px" }}>{k.v}</p>
                  <p style={{ fontSize:11, color:DS.textTertiary, margin:0 }}>{k.s}</p>
                </div>
              ))}
            </div>

            {/* Resumo por area */}
            <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Resumo por Area</h2><ANInfoTooltip id="resumo_areas"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20, marginBottom:28 }}>
              {[
                {id:"suporte",title:"Suporte Tecnico",cor:DS.error,icon:"🔧",
                  kpis:[{l:"Tickets abertos",v:"3"},{l:"Tempo medio",v:"4.2h"},{l:"Error rate",v:"0.8%"},{l:"Uptime",v:"99.92%"}],
                  saude:92,saudeLabel:"Saudavel",saudeCor:DS.success},
                {id:"cs",title:"Sucesso do Cliente",cor:DS.success,icon:"👥",
                  kpis:[{l:"Usuarios em risco",v:"5"},{l:"Health score",v:"62"},{l:"Calls agendadas",v:"3"},{l:"Taxa reativacao",v:"20%"}],
                  saude:58,saudeLabel:"Atencao",saudeCor:DS.warning},
                {id:"comercial",title:"Comercial",cor:C.purple,icon:"💰",
                  kpis:[{l:"Pipeline upsell",v:"R$ 8k"},{l:"Pipeline referral",v:"R$ 5.9k"},{l:"Conversao upgrade",v:"0%"},{l:"NPS promotores",v:"3"}],
                  saude:45,saudeLabel:"Critico",saudeCor:DS.error},
                {id:"produto",title:"Melhoria de Produto",cor:DS.primary,icon:"💡",
                  kpis:[{l:"Feature requests",v:"7"},{l:"Drop-off exames",v:"22%"},{l:"Adoption media",v:"54%"},{l:"CSAT",v:"4.1/5"}],
                  saude:64,saudeLabel:"Atencao",saudeCor:DS.warning},
              ].map((area,i) => (
                <div key={i} style={{ ...an_card, padding:0, border:`1px solid ${area.cor}20` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 20px", borderBottom:`1px solid ${DS.divider}`, background:`${area.cor}04` }}>
                    <span style={{ fontSize:18 }}>{area.icon}</span>
                    <h3 style={{ fontSize:14, fontWeight:700, color:area.cor, margin:0, flex:1 }}>{area.title}</h3>
                    <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, background:`${area.saudeCor}12`, color:area.saudeCor, border:`1px solid ${area.saudeCor}30` }}>{area.saudeLabel}</span>
                  </div>
                  <div style={{ padding:"14px 20px" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:14 }}>
                      {area.kpis.map((kpi,j) => (
                        <div key={j} style={{ textAlign:"center" }}>
                          <p style={{ fontSize:10, color:DS.textTertiary, textTransform:"uppercase", margin:"0 0 2px", letterSpacing:.3 }}>{kpi.l}</p>
                          <p style={{ fontSize:16, fontWeight:700, color:DS.textPrimary, margin:0 }}>{kpi.v}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ height:5, background:DS.divider, borderRadius:3, overflow:"hidden", marginBottom:12 }}>
                      <div style={{ height:"100%", width:`${area.saude}%`, background:area.saudeCor, borderRadius:3 }}/>
                    </div>
                    <button onClick={() => setSubIntervencao(area.id)}
                      style={{ width:"100%", fontSize:12, fontWeight:600, padding:"8px 0", borderRadius:6, border:`1px solid ${area.cor}30`, background:`${area.cor}08`, color:area.cor, cursor:"pointer" }}>
                      Ver acoes →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>)}

          {/* ═══ SUPORTE TECNICO ═══ */}
          {subIntervencao==="suporte" && (<>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:28 }}>
              {[
                {l:"Tickets abertos",v:"3",s:"2 criticos, 1 medio",c:DS.error},
                {l:"Tempo medio resolucao",v:"4.2h",s:"Meta: <6h",c:DS.success},
                {l:"Error rate atual",v:"0.8%",s:"Meta: <1%",c:DS.success},
                {l:"Uptime 30d",v:"99.92%",s:"Meta: 99.9%",c:DS.success},
              ].map((k,i) => (
                <div key={i} style={{ ...an_card, padding:20 }}>
                  <p style={{ fontSize:11, fontWeight:600, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:.5, margin:"0 0 6px" }}>{k.l}</p>
                  <p style={{ fontSize:24, fontWeight:700, color:k.c, margin:"0 0 3px" }}>{k.v}</p>
                  <p style={{ fontSize:11, color:DS.textTertiary, margin:0 }}>{k.s}</p>
                </div>
              ))}
            </div>
            <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Gatilhos e Acoes — Suporte Tecnico</h2><ANInfoTooltip id="suporte_acoes"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
            <div style={{ ...an_card, padding:0, border:`1px solid ${DS.error}20`, marginBottom:28 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 20px", borderBottom:`1px solid ${DS.divider}`, background:`${DS.error}04` }}>
                <span style={{ fontSize:16 }}>🔧</span>
                <h3 style={{ fontSize:14, fontWeight:700, color:DS.error, margin:0 }}>Suporte Tecnico</h3><ANInfoTooltip id="suporte_acoes"/>
                <span style={{ fontSize:11, color:DS.textTertiary, marginLeft:"auto" }}>Correcoes de bugs e erros</span>
              </div>
              <div style={{ padding:"12px 20px" }}>
                {[
                  {trigger:"Error rate >2% na camada ADS|S",acao:"Investigar timeout no agente de solucoes. Escalar para P&D se persistir >24h.",prioridade:"Critica",cor:DS.error,responsavel:"Time P&D"},
                  {trigger:"Usuario reporta erro 3x na mesma feature",acao:"Criar ticket automatico com logs da sessao. Notificar dev on-call via Slack.",prioridade:"Alta",cor:DS.warning,responsavel:"Suporte L2"},
                  {trigger:"Consulta travada >5min sem resposta do agente",acao:"Kill automatico + retry. Se recorrente, desabilitar agente e alertar P&D.",prioridade:"Alta",cor:DS.warning,responsavel:"Infra + P&D"},
                  {trigger:"Uptime cai abaixo de 99.5%",acao:"Ativar pagina de status. Notificar todos os clientes ativos via email. Postmortem em 48h.",prioridade:"Critica",cor:DS.error,responsavel:"SRE / Infra"},
                  {trigger:"Falha de integracao WhatsApp (Evolution API)",acao:"Verificar status do servidor. Fallback para email se downtime >30min.",prioridade:"Media",cor:DS.primary,responsavel:"Suporte L1"},
                ].map((item,i) => (
                  <div key={i} style={{ padding:"10px 0", borderBottom:`1px solid ${DS.divider}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{ fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:12, background:`${item.cor}12`, color:item.cor, border:`1px solid ${item.cor}30` }}>{item.prioridade}</span>
                      <span style={{ fontSize:11, color:DS.textTertiary }}>{item.responsavel}</span>
                    </div>
                    <p style={{ fontSize:12, fontWeight:600, color:DS.textPrimary, margin:"0 0 3px" }}>Gatilho: {item.trigger}</p>
                    <p style={{ fontSize:11, color:DS.textSecondary, margin:0, lineHeight:1.5 }}>→ {item.acao}</p>
                  </div>
                ))}
              </div>
            </div>
          </>)}

          {/* ═══ SUCESSO DO CLIENTE ═══ */}
          {subIntervencao==="cs" && (<>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:28 }}>
              {[
                {l:"Usuarios em risco",v:"5",s:"Score >40",c:DS.error},
                {l:"Health score medio",v:"62",s:"Meta: >70",c:DS.warning},
                {l:"Calls CS agendadas",v:"3",s:"Esta semana",c:DS.primary},
                {l:"Taxa reativacao",v:"20%",s:"1 de 5 tentativas",c:DS.warning},
              ].map((k,i) => (
                <div key={i} style={{ ...an_card, padding:20 }}>
                  <p style={{ fontSize:11, fontWeight:600, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:.5, margin:"0 0 6px" }}>{k.l}</p>
                  <p style={{ fontSize:24, fontWeight:700, color:k.c, margin:"0 0 3px" }}>{k.v}</p>
                  <p style={{ fontSize:11, color:DS.textTertiary, margin:0 }}>{k.s}</p>
                </div>
              ))}
            </div>
            <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Gatilhos e Acoes — Sucesso do Cliente</h2><ANInfoTooltip id="cs_acoes"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
            <div style={{ ...an_card, padding:0, border:`1px solid ${DS.success}20`, marginBottom:28 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 20px", borderBottom:`1px solid ${DS.divider}`, background:`${DS.success}04` }}>
                <span style={{ fontSize:16 }}>👥</span>
                <h3 style={{ fontSize:14, fontWeight:700, color:DS.success, margin:0 }}>Sucesso do Cliente</h3><ANInfoTooltip id="cs_acoes"/>
                <span style={{ fontSize:11, color:DS.textTertiary, marginLeft:"auto" }}>Engajamento e incentivo ao uso</span>
              </div>
              <div style={{ padding:"12px 20px" }}>
                {[
                  {trigger:"Login mas 0 consultas em 7 dias",acao:"Enviar video tutorial personalizado por especialidade. Oferecer call de 15min com CS.",prioridade:"Alta",cor:DS.warning,responsavel:"CS"},
                  {trigger:"Usou apenas 1 feature em 14 dias",acao:"Email com case de sucesso mostrando 3 features mais usadas da mesma especialidade.",prioridade:"Media",cor:DS.primary,responsavel:"CS + Marketing"},
                  {trigger:"Consultas/semana caiu >40% vs media",acao:"WhatsApp pessoal do CS perguntando se precisa de ajuda. Agendar call se sem resposta em 48h.",prioridade:"Alta",cor:DS.warning,responsavel:"CS dedicado"},
                  {trigger:"NPS <= 6 (detrator)",acao:"Ligacao do CS em ate 24h. Entender dor, resolver e agendar followup em 7 dias.",prioridade:"Critica",cor:DS.error,responsavel:"CS Lead"},
                  {trigger:"Completou 10 consultas (milestone)",acao:"Email de parabens + badge. Pedir review no Google/indicacao com incentivo.",prioridade:"Baixa",cor:DS.success,responsavel:"Automacao"},
                  {trigger:"30 dias sem usar Base de Conhecimento",acao:"Push notification com artigo relevante para a especialidade do medico.",prioridade:"Baixa",cor:DS.success,responsavel:"Automacao"},
                ].map((item,i) => (
                  <div key={i} style={{ padding:"10px 0", borderBottom:`1px solid ${DS.divider}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{ fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:12, background:`${item.cor}12`, color:item.cor, border:`1px solid ${item.cor}30` }}>{item.prioridade}</span>
                      <span style={{ fontSize:11, color:DS.textTertiary }}>{item.responsavel}</span>
                    </div>
                    <p style={{ fontSize:12, fontWeight:600, color:DS.textPrimary, margin:"0 0 3px" }}>Gatilho: {item.trigger}</p>
                    <p style={{ fontSize:11, color:DS.textSecondary, margin:0, lineHeight:1.5 }}>→ {item.acao}</p>
                  </div>
                ))}
              </div>
            </div>
          </>)}

          {/* ═══ COMERCIAL ═══ */}
          {subIntervencao==="comercial" && (<>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:28 }}>
              {[
                {l:"Pipeline upsell",v:"R$ 8k",s:"4 candidatos a upgrade",c:DS.success},
                {l:"Pipeline indicacao",v:"R$ 5.9k",s:"3 promotores NPS >=9",c:C.purple},
                {l:"Conversao upgrade",v:"0%",s:"Nenhuma conversao no mes",c:DS.error},
                {l:"NPS promotores",v:"3",s:"Nao acionados ainda",c:DS.warning},
              ].map((k,i) => (
                <div key={i} style={{ ...an_card, padding:20 }}>
                  <p style={{ fontSize:11, fontWeight:600, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:.5, margin:"0 0 6px" }}>{k.l}</p>
                  <p style={{ fontSize:24, fontWeight:700, color:k.c, margin:"0 0 3px" }}>{k.v}</p>
                  <p style={{ fontSize:11, color:DS.textTertiary, margin:0 }}>{k.s}</p>
                </div>
              ))}
            </div>
            <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Gatilhos e Acoes — Comercial</h2><ANInfoTooltip id="comercial_acoes"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
            <div style={{ ...an_card, padding:0, border:`1px solid ${C.purple}20`, marginBottom:28 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 20px", borderBottom:`1px solid ${DS.divider}`, background:`${C.purple}04` }}>
                <span style={{ fontSize:16 }}>💰</span>
                <h3 style={{ fontSize:14, fontWeight:700, color:C.purple, margin:0 }}>Comercial</h3><ANInfoTooltip id="comercial_acoes"/>
                <span style={{ fontSize:11, color:DS.textTertiary, marginLeft:"auto" }}>Acoes de expansao e indicacao</span>
              </div>
              <div style={{ padding:"12px 20px" }}>
                {[
                  {trigger:">=20 consultas em 30 dias",acao:"Ligar parabenizando e pedir indicacao: 'Voce conhece algum colega que se beneficiaria?' Oferecer 1 mes gratis para indicado.",prioridade:"Alta",cor:DS.warning,responsavel:"Closer"},
                  {trigger:"Atingiu 80% do limite do plano",acao:"Email + WhatsApp mostrando uso vs limite. Apresentar plano superior com trial de 7 dias.",prioridade:"Alta",cor:DS.warning,responsavel:"Closer"},
                  {trigger:"NPS 9-10 + >3 meses ativo",acao:"Email do CEO agradecendo + programa de indicacao com bonus mutuo (R$ 200 credito).",prioridade:"Media",cor:DS.primary,responsavel:"Growth"},
                  {trigger:"Mencionou colega/clinica em consulta",acao:"CS registra no CRM. Closer entra em contato em 48h com oferta personalizada.",prioridade:"Alta",cor:DS.warning,responsavel:"CS → Closer"},
                  {trigger:"Plano Essencial + uso diario por 60 dias",acao:"Call de valor: mostrar ROI individual + apresentar Professional com desconto de migracao.",prioridade:"Media",cor:DS.primary,responsavel:"Closer"},
                  {trigger:"Renovacao em 30 dias + churn score <30",acao:"Email de renovacao antecipada com desconto anual (15% off). Lock-in de 12 meses.",prioridade:"Media",cor:DS.primary,responsavel:"Closer + CS"},
                ].map((item,i) => (
                  <div key={i} style={{ padding:"10px 0", borderBottom:`1px solid ${DS.divider}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{ fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:12, background:`${item.cor}12`, color:item.cor, border:`1px solid ${item.cor}30` }}>{item.prioridade}</span>
                      <span style={{ fontSize:11, color:DS.textTertiary }}>{item.responsavel}</span>
                    </div>
                    <p style={{ fontSize:12, fontWeight:600, color:DS.textPrimary, margin:"0 0 3px" }}>Gatilho: {item.trigger}</p>
                    <p style={{ fontSize:11, color:DS.textSecondary, margin:0, lineHeight:1.5 }}>→ {item.acao}</p>
                  </div>
                ))}
              </div>
            </div>
          </>)}

          {/* ═══ MELHORIA DE PRODUTO ═══ */}
          {subIntervencao==="produto" && (<>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:28 }}>
              {[
                {l:"Feature requests",v:"7",s:"3 repetidos por >3 usuarios",c:DS.warning},
                {l:"Drop-off exames",v:"22%",s:"Maior gargalo do funil",c:DS.error},
                {l:"Adoption media",v:"54%",s:"Meta: >60%",c:DS.warning},
                {l:"CSAT",v:"4.1/5",s:"Meta: >4.2",c:DS.warning},
              ].map((k,i) => (
                <div key={i} style={{ ...an_card, padding:20 }}>
                  <p style={{ fontSize:11, fontWeight:600, color:DS.textTertiary, textTransform:"uppercase", letterSpacing:.5, margin:"0 0 6px" }}>{k.l}</p>
                  <p style={{ fontSize:24, fontWeight:700, color:k.c, margin:"0 0 3px" }}>{k.v}</p>
                  <p style={{ fontSize:11, color:DS.textTertiary, margin:0 }}>{k.s}</p>
                </div>
              ))}
            </div>
            <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Gatilhos e Acoes — Melhoria de Produto</h2><ANInfoTooltip id="produto_acoes"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
            <div style={{ ...an_card, padding:0, border:`1px solid ${DS.primary}20`, marginBottom:28 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 20px", borderBottom:`1px solid ${DS.divider}`, background:`${DS.primary}04` }}>
                <span style={{ fontSize:16 }}>💡</span>
                <h3 style={{ fontSize:14, fontWeight:700, color:DS.primary, margin:0 }}>Melhoria de Produto</h3><ANInfoTooltip id="produto_acoes"/>
                <span style={{ fontSize:11, color:DS.textTertiary, marginLeft:"auto" }}>Novas features e otimizacoes</span>
              </div>
              <div style={{ padding:"12px 20px" }}>
                {[
                  {trigger:"Drop-off >20% na etapa de exames",acao:"Priorizar OCR automatico de exames (upload foto → dados estruturados). Reduzir input manual.",prioridade:"Critica",cor:DS.error,responsavel:"P&D / PM"},
                  {trigger:"3+ usuarios pedem mesma feature em 30 dias",acao:"Criar card no backlog com prioridade alta. Validar com 5 usuarios antes de desenvolver.",prioridade:"Alta",cor:DS.warning,responsavel:"PM"},
                  {trigger:"Tempo medio sessao <5min (engagement baixo)",acao:"Investigar UX: gravar sessoes com Hotjar. Redesenhar fluxo critico identificado.",prioridade:"Media",cor:DS.primary,responsavel:"Design + P&D"},
                  {trigger:"Feature adoption <30% apos 60 dias do lancamento",acao:"Revisar onboarding da feature. Adicionar tooltip contextual + video walkthrough.",prioridade:"Media",cor:DS.primary,responsavel:"PM + Design"},
                  {trigger:"Error rate >1% em agente especifico",acao:"Retreinar modelo com dados recentes. A/B test com fallback para modelo anterior.",prioridade:"Alta",cor:DS.warning,responsavel:"ML Engineering"},
                  {trigger:"CSAT <4.0 em tipo especifico de consulta",acao:"Entrevistar 5 usuarios. Mapear gaps entre expectativa e entrega. Sprint dedicada de correcao.",prioridade:"Alta",cor:DS.warning,responsavel:"PM + CS"},
                ].map((item,i) => (
                  <div key={i} style={{ padding:"10px 0", borderBottom:`1px solid ${DS.divider}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{ fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:12, background:`${item.cor}12`, color:item.cor, border:`1px solid ${item.cor}30` }}>{item.prioridade}</span>
                      <span style={{ fontSize:11, color:DS.textTertiary }}>{item.responsavel}</span>
                    </div>
                    <p style={{ fontSize:12, fontWeight:600, color:DS.textPrimary, margin:"0 0 3px" }}>Gatilho: {item.trigger}</p>
                    <p style={{ fontSize:11, color:DS.textSecondary, margin:0, lineHeight:1.5 }}>→ {item.acao}</p>
                  </div>
                ))}
              </div>
            </div>
          </>)}

          {/* ═══ EFETIVIDADE (visao geral only) ═══ */}
          {subIntervencao==="visao_geral" && (<>
            <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Efetividade das Intervencoes</h2><ANInfoTooltip id="efetividade"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:28 }}>
              {[
                {tipo:"Ligacao CS",taxa:.75,total:12,retidos:9,cor:DS.primary},
                {tipo:"WhatsApp automatico",taxa:.61,total:28,retidos:17,cor:C.teal},
                {tipo:"Email de reengaj.",taxa:.51,total:35,retidos:18,cor:C.purple},
              ].map((r,i) => (
                <div key={i} style={{ ...an_card, padding:20 }}>
                  <p style={{ fontSize:13, fontWeight:600, color:DS.textPrimary, margin:"0 0 10px" }}>{r.tipo}</p>
                  <div style={{ display:"flex", alignItems:"flex-end", gap:8, marginBottom:8 }}>
                    <span style={{ fontSize:28, fontWeight:700, color:r.cor }}>{fmtPct(r.taxa)}</span>
                    <span style={{ fontSize:12, color:DS.textTertiary, marginBottom:4 }}>retencao</span>
                  </div>
                  <div style={{ height:6, background:DS.divider, borderRadius:3, overflow:"hidden", marginBottom:8 }}>
                    <div style={{ height:"100%", width:`${r.taxa*100}%`, background:r.cor, borderRadius:3 }}/>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:DS.textTertiary }}>
                    <span>{r.retidos} retidos</span><span>{r.total-r.retidos} churnou</span><span>{r.total} total</span>
                  </div>
                </div>
              ))}
            </div>
          </>)}

          {/* ═══ FILA DE INTERVENCAO — SEMPRE NO FINAL ═══ */}
          <div style={an_secDiv}>
            <h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Fila de Intervencao — Priorizada por Impacto</h2>
            <ANInfoTooltip id="fila_intervencao"/>
            <span style={{ fontSize:12, color:DS.textTertiary }}>LTV x Urgencia x Probabilidade de retencao</span>
            <div style={{ flex:1, height:1, background:DS.border }}/>
          </div>
          {INTERVENTIONS.map((item, idx) => {
            const cur = taskStatus[item.id] || "pendente";
            const load = loadingMap[item.id] || false;
            const sl = statusLabel[cur] || "Pendente";
            const sc = statusColor[cur] || DS.textTertiary;
            return (
              <div key={item.id} style={{ ...an_card, padding:0, marginBottom:16, border:`1px solid ${item.cor}20` }}>
                <div style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 20px", borderBottom:`1px solid ${DS.divider}`, background:`${item.cor}04` }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:item.cor, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{item.ini}</span>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                      <span style={{ fontSize:14, fontWeight:700, color:DS.textPrimary }}>{item.name}</span>
                      <span style={{ fontSize:11, padding:"2px 8px", borderRadius:20, background:`${item.cor}12`, color:item.cor, fontWeight:600 }}>{item.risk}</span>
                    </div>
                    <div style={{ fontSize:12, color:DS.textTertiary, marginTop:2 }}>{item.esp} · {item.plan} · LTV {item.ltv} · Cliente ha {item.tempo}</div>
                  </div>
                  <span style={{ fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:20, background:`${sc}10`, color:sc, border:`1px solid ${sc}25` }}>{sl}</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
                  <div style={{ padding:"14px 20px", borderRight:`1px solid ${DS.divider}` }}>
                    <p style={{ fontSize:11, fontWeight:700, color:DS.error, textTransform:"uppercase", letterSpacing:.5, margin:"0 0 8px" }}>⚠ Causa raiz identificada</p>
                    <p style={{ fontSize:13, color:DS.textSecondary, margin:0, lineHeight:1.6 }}>{item.causa}</p>
                  </div>
                  <div style={{ padding:"14px 20px" }}>
                    <p style={{ fontSize:11, fontWeight:700, color:C.purple, textTransform:"uppercase", letterSpacing:.5, margin:"0 0 8px" }}>✦ Abordagem sugerida pela IA</p>
                    <p style={{ fontSize:12, color:DS.textSecondary, margin:0, lineHeight:1.6, fontStyle:"italic" }}>&ldquo;{item.msg}&rdquo;</p>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 20px", borderTop:`1px solid ${DS.divider}`, background:DS.bgTableRow, flexWrap:"wrap" }}>
                  <button onClick={() => handleClickup(item.id)} disabled={load||cur==="resolvido"||cur==="churnou"}
                    style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:6, border:`1px solid ${DS.primary}`, background:DS.primary, color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer", opacity:(load||cur==="resolvido"||cur==="churnou")?.5:1 }}>
                    {load ? "Criando task..." : "✓ Criar task no ClickUp"}
                  </button>
                  {(["em_andamento","resolvido","churnou"] as const).map(s => (
                    <button key={s} onClick={() => setTaskStatus(p => ({ ...p, [item.id]:s }))}
                      style={{ padding:"7px 12px", borderRadius:6, border:`1px solid ${statusColor[s]}`, background:"transparent", color:statusColor[s], fontSize:12, fontWeight:600, cursor:"pointer" }}>
                      {s==="em_andamento"?"▶ Em andamento":s==="resolvido"?"✓ Retido":"✗ Churnou"}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* RETENCAO & CRESCIMENTO */}
      {tab==="retencao" && (
        <>
          {/* KPIs — 8 cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:12 }}>
            <MC label="NRR" value="93.6%" meta=">100%" status="warn" sub="Net Revenue Retention" tid="nrr"/>
            <MC label="Gross Retention" value="93.6%" meta=">95%" status="warn" sub="MRR retido sem expansao" tid="gross_retention"/>
            <MC label="Logo Retention" value="91.7%" meta=">90%" status="ok" sub="11/12 clientes retidos" tid="logo_retention"/>
            <MC label="Health Score Medio" value="62/100" meta=">70" status="warn" sub="Base ativa" tid="health_score_avg"/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:28 }}>
            <MC label="Expansion MRR" value="R$ 0" meta=">R$ 1k" status="crit" sub="Nenhum upgrade no mes" tid="expansion_mrr"/>
            <MC label="Contraction MRR" value="R$ 891" meta="<R$ 500" status="warn" sub="Downgrades" tid="contraction_mrr"/>
            <MC label="Reactivations" value="0" meta=">1/mes" status="crit" sub="Nenhuma reativacao" tid="reactivation"/>
            <MC label="CSAT Medio" value="4.2/5" meta=">4.0" status="ok" sub="Pos-consulta" tid="csat"/>
          </div>

          {/* NRR Trend + Expansion vs Contraction */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>NRR e Movimentacao de Receita</h2><ANInfoTooltip id="gross_retention"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:28 }}>
            <div style={{ ...an_card }}>
              <h3 style={{ ...an_sT, marginBottom:4 }}>NRR Trend — 6 meses</h3><ANInfoTooltip id="nrr_trend_chart"/>
              <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 16px" }}>Meta: acima de 100% (linha de referencia)</p>
              <ANLineChart series={[{key:"nrr",label:"NRR",color:DS.primary}]} data={nrrTrendData} height={200}/>
            </div>
            <div style={{ ...an_card }}>
              <h3 style={{ ...an_sT, marginBottom:4 }}>Expansion vs Contraction vs Churn</h3><ANInfoTooltip id="expansion_chart"/>
              <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 16px" }}>Decomposicao mensal do MRR perdido/ganho</p>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {nrrTrendData.map((row,i) => {
                  const maxVal = Math.max(...nrrTrendData.map(r => r.contraction + r.churnVal));
                  const total = row.expansion + row.contraction + row.churnVal;
                  return (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontSize:11, color:DS.textTertiary, width:50, textAlign:"right", flexShrink:0 }}>{row.mes}</span>
                      <div style={{ flex:1, display:"flex", height:18, borderRadius:3, overflow:"hidden", border:`1px solid ${DS.border}` }}>
                        {row.expansion>0 && <div style={{ width:`${(row.expansion/maxVal)*100}%`, background:DS.success, height:"100%" }}/>}
                        <div style={{ width:`${(row.contraction/maxVal)*100}%`, background:DS.warning, height:"100%" }}/>
                        <div style={{ width:`${(row.churnVal/maxVal)*100}%`, background:DS.error, height:"100%" }}/>
                      </div>
                      <span style={{ fontSize:11, color:DS.textTertiary, width:60, flexShrink:0 }}>R$ {(total/1000).toFixed(1)}k</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display:"flex", gap:16, marginTop:12 }}>
                {[{c:DS.success,l:"Expansion"},{c:DS.warning,l:"Contraction"},{c:DS.error,l:"Churn"}].map(item => (
                  <span key={item.l} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:DS.textSecondary }}>
                    <span style={{ width:10, height:10, borderRadius:2, background:item.c }}/>{item.l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Health Score Distribution + Health by Segment */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Saude da Base</h2><ANInfoTooltip id="health_dist"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:28 }}>
            <div style={{ ...an_card }}>
              <h3 style={{ ...an_sT, marginBottom:4 }}>Distribuicao de Health Score</h3><ANInfoTooltip id="health_histogram"/>
              <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 16px" }}>12 clientes ativos por faixa</p>
              <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:140 }}>
                {healthScoreDistribution.map((b,i) => {
                  const maxC = Math.max(...healthScoreDistribution.map(x => x.count));
                  const h = Math.max((b.count/maxC)*100, 10);
                  return (
                    <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", height:"100%" }}>
                      <span style={{ fontSize:13, fontWeight:700, color:b.color, marginBottom:4 }}>{b.count}</span>
                      <div style={{ width:"80%", borderRadius:"3px 3px 0 0", height:`${h}%`, background:b.color, opacity:.85 }}/>
                      <span style={{ fontSize:10, color:DS.textTertiary, marginTop:6, textAlign:"center", lineHeight:1.2 }}>{b.bucket}</span>
                      <span style={{ fontSize:9, color:b.color, fontWeight:600 }}>{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ ...an_card }}>
              <h3 style={{ ...an_sT, marginBottom:4 }}>Health Score por Segmento</h3>
              <ANInfoTooltip id="health_segment"/>
              <p style={{ fontSize:12, fontWeight:600, color:DS.textSecondary, margin:"12px 0 8px" }}>Por Plano</p>
              {healthBySegment.byPlan.map((s,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <span style={{ fontSize:12, color:DS.textTertiary, width:80, flexShrink:0 }}>{s.segment}</span>
                  <div style={{ flex:1, height:18, background:DS.bgTableRow, borderRadius:3, overflow:"hidden", border:`1px solid ${DS.border}` }}>
                    <div style={{ height:"100%", width:`${s.avg}%`, background:s.color, borderRadius:3, opacity:.85 }}/>
                  </div>
                  <span style={{ fontSize:12, fontWeight:700, color:s.color, width:30, textAlign:"right" }}>{s.avg}</span>
                </div>
              ))}
              <p style={{ fontSize:12, fontWeight:600, color:DS.textSecondary, margin:"16px 0 8px" }}>Por Tenure</p>
              {healthBySegment.byTenure.map((s,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <span style={{ fontSize:12, color:DS.textTertiary, width:80, flexShrink:0 }}>{s.segment}</span>
                  <div style={{ flex:1, height:18, background:DS.bgTableRow, borderRadius:3, overflow:"hidden", border:`1px solid ${DS.border}` }}>
                    <div style={{ height:"100%", width:`${s.avg}%`, background:s.color, borderRadius:3, opacity:.85 }}/>
                  </div>
                  <span style={{ fontSize:12, fontWeight:700, color:s.color, width:30, textAlign:"right" }}>{s.avg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Lifecycle Stage */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Customer Lifecycle</h2><ANInfoTooltip id="lifecycle"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ ...an_card, marginBottom:28 }}>
            <div style={{ display:"flex", height:40, borderRadius:6, overflow:"hidden", marginBottom:12 }}>
              {lifecycleStages.map((s,i) => (
                <div key={i} style={{ width:`${s.pct}%`, background:s.color, display:"flex", alignItems:"center", justifyContent:"center", minWidth:40 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:"#fff" }}>{s.pct}%</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
              {lifecycleStages.map((s,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ width:10, height:10, borderRadius:2, background:s.color, flexShrink:0 }}/>
                  <span style={{ fontSize:12, color:DS.textSecondary }}>{s.stage}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:s.color }}>{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Trend + Reactivation */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:28 }}>
            <div style={{ ...an_card }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <h3 style={an_sT}>Engagement Score Semanal</h3><ANInfoTooltip id="engagement_trend"/>
              </div>
              <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 16px" }}>Score composto (logins + consultas + features)</p>
              <ANLineChart series={[{key:"score",label:"Engagement",color:DS.primary}]} data={engagementTrendData} height={160}/>
            </div>
            <div style={{ ...an_card }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <h3 style={an_sT}>Reativacao (Win-back)</h3><ANInfoTooltip id="reactivation_metrics"/>
              </div>
              <p style={{ fontSize:11, color:DS.textTertiary, margin:"0 0 12px" }}>Tentativas de recuperar ex-clientes</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:14 }}>
                {[
                  {l:"Tentativas",v:String(reactivationData.attempts),c:DS.primary},
                  {l:"Reativados",v:String(reactivationData.successes),c:reactivationData.successes>0?DS.success:DS.error},
                  {l:"Taxa",v:fmtPct(reactivationData.successRate),c:reactivationData.successRate>0.3?DS.success:DS.warning},
                ].map((k,i) => (
                  <div key={i} style={{ textAlign:"center", padding:10, background:DS.bgTableRow, borderRadius:6, border:`1px solid ${DS.border}` }}>
                    <p style={{ fontSize:10, color:DS.textTertiary, textTransform:"uppercase", margin:"0 0 4px" }}>{k.l}</p>
                    <p style={{ fontSize:18, fontWeight:700, color:k.c, margin:0 }}>{k.v}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize:12, fontWeight:600, color:DS.textSecondary, margin:"0 0 8px" }}>Por Canal</p>
              {reactivationData.byChannel.map((ch,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${DS.divider}` }}>
                  <span style={{ fontSize:12, color:DS.textSecondary }}>{ch.channel}</span>
                  <span style={{ fontSize:12, color:DS.textTertiary }}>{ch.attempts} tent.</span>
                  <span style={{ fontSize:12, fontWeight:600, color:ch.rate>0?DS.success:DS.error }}>{ch.successes} OK ({Math.round(ch.rate*100)}%)</span>
                </div>
              ))}
              <div style={{ marginTop:10, fontSize:11, color:DS.textTertiary }}>MRR reativado: <strong style={{ color:DS.success }}>R$ {reactivationData.mrrReactivated.toLocaleString("pt-BR")}</strong> · Tempo medio: <strong>{reactivationData.avgDays}d</strong></div>
            </div>
          </div>

          {/* Retention Drivers */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Retention Drivers — Correlacao com D90+</h2><ANInfoTooltip id="retention_drivers"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ ...an_card, marginBottom:28 }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr>
                  {["Comportamento","Correlacao com Retencao D90","Impacto"].map((h,i) => (
                    <th key={h} style={{ padding:"9px 12px", textAlign:i===0?"left":"center", fontWeight:600, color:DS.textTertiary, fontSize:11, borderBottom:`2px solid ${DS.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {retentionDrivers.map((d,i) => (
                  <tr key={i} style={{ background:i%2===0?DS.bgTableRow:DS.bgCard }}>
                    <td style={{ padding:"9px 12px", fontWeight:600, color:DS.textPrimary }}>{d.driver}</td>
                    <td style={{ padding:"9px 12px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ flex:1, height:14, background:DS.divider, borderRadius:3, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${d.correlation*100}%`, background:d.color, borderRadius:3 }}/>
                        </div>
                        <span style={{ fontSize:12, fontWeight:700, color:d.color, width:40, textAlign:"right" }}>{d.correlation.toFixed(2)}</span>
                      </div>
                    </td>
                    <td style={{ padding:"9px 12px", textAlign:"center" }}>
                      <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, background:d.correlation>0.65?`${DS.success}12`:d.correlation>0.50?`${DS.primary}12`:`${C.teal}12`, color:d.correlation>0.65?DS.success:d.correlation>0.50?DS.primary:C.teal }}>
                        {d.correlation>0.65?"Alto":d.correlation>0.50?"Medio":"Baixo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Correlacoes de Retencao */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>O que Prediz Retencao — Correlacoes</h2><ANInfoTooltip id="correlacoes_retencao"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:28 }}>
            {[
              {t:"Features usadas na Semana 1",c:DS.primary,itens:[{l:"≥ 3 features",v:"D90: 68%",d:"+33pp vs media",ok:true},{l:"2 features",v:"D90: 42%",d:"+7pp vs media",ok:true},{l:"1 feature",v:"D90: 21%",d:"-14pp vs media",ok:false}]},
              {t:"Consultas na Semana 1",c:C.teal,itens:[{l:"≥ 5 consultas",v:"D90: 71%",d:"+36pp vs media",ok:true},{l:"2-4 consultas",v:"D90: 48%",d:"+13pp vs media",ok:true},{l:"0-1 consultas",v:"D90: 18%",d:"-17pp vs media",ok:false}]},
              {t:"Plano x Retencao D90",c:C.purple,itens:[{l:"Clinica",v:"D90: 71%",d:"melhor plano",ok:true},{l:"Professional",v:"D90: 58%",d:"+23pp vs Ess.",ok:true},{l:"Essencial",v:"D90: 35%",d:"baseline",ok:false}]},
            ].map((b,i) => (
              <div key={i} style={{ ...an_card }}>
                <p style={{ fontSize:13, fontWeight:700, color:b.c, margin:"0 0 14px", borderBottom:`2px solid ${b.c}`, paddingBottom:8 }}>{b.t}</p>
                {b.itens.map((item,j,a) => (
                  <div key={j} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:j<a.length-1?`1px solid ${DS.divider}`:"none" }}>
                    <span style={{ fontSize:12, color:DS.textSecondary }}>{item.l}</span>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:13, fontWeight:700, color:item.ok?DS.success:DS.error }}>{item.v}</div>
                      <div style={{ fontSize:11, color:DS.textTertiary }}>{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* CAC x LTV por Canal + Qualidade Cohorts */}
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>CAC por Canal x LTV e Qualidade dos Cohorts</h2><ANInfoTooltip id="cac_ltv_canal"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:28 }}>
            <div style={{ ...an_card }}>
              <h3 style={{ ...an_sT, marginBottom:20 }}>CAC x LTV por Canal</h3><ANInfoTooltip id="cac_ltv_tabela"/>
              {[
                {c:"Indicacao",cac:400,ltv:23100,ratio:57.8,cor:DS.success},
                {c:"Instagram Organico",cac:800,ltv:19800,ratio:24.8,cor:DS.success},
                {c:"LinkedIn",cac:1800,ltv:21000,ratio:11.7,cor:DS.success},
                {c:"Meta Ads",cac:2300,ltv:16500,ratio:7.2,cor:DS.warning},
                {c:"Google Ads",cac:3100,ltv:14200,ratio:4.6,cor:DS.error},
              ].map((item,i,a) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"8px 0", borderBottom:i<a.length-1?`1px solid ${DS.divider}`:"none" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:DS.textPrimary }}>{item.c}</div>
                    <div style={{ fontSize:11, color:DS.textTertiary }}>CAC: R$ {item.cac.toLocaleString("pt-BR")} · LTV: R$ {(item.ltv/1000).toFixed(1)}k</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:14, fontWeight:700, color:item.cor }}>{item.ratio.toFixed(1)}x</div>
                    <div style={{ fontSize:10, color:DS.textTertiary }}>LTV/CAC</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...an_card }}>
              <h3 style={{ ...an_sT, marginBottom:20 }}>Qualidade dos Cohorts — Ativacao D7</h3><ANInfoTooltip id="qualidade_cohorts_chart"/>
              {[
                {mes:"Nov/25",pct:62,cor:DS.error,obs:"Abaixo da meta"},
                {mes:"Dez/25",pct:65,cor:DS.error,obs:"Abaixo da meta"},
                {mes:"Jan/26",pct:68,cor:DS.warning,obs:"Melhorando"},
                {mes:"Fev/26",pct:71,cor:DS.warning,obs:"Proximo da meta"},
                {mes:"Mar/26",pct:74,cor:DS.success,obs:"Acima da meta"},
                {mes:"Abr/26",pct:76,cor:DS.success,obs:"Melhor cohort"},
              ].map((item,i,a) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:i<a.length-1?`1px solid ${DS.divider}`:"none" }}>
                  <span style={{ fontSize:12, fontWeight:600, color:DS.textSecondary, width:44, flexShrink:0 }}>{item.mes}</span>
                  <div style={{ flex:1, height:20, background:DS.bgTableRow, borderRadius:3, overflow:"hidden", border:`1px solid ${DS.border}` }}>
                    <div style={{ height:"100%", width:`${item.pct}%`, background:item.cor, borderRadius:3, opacity:.85 }}/>
                  </div>
                  <span style={{ fontSize:13, fontWeight:700, color:item.cor, width:36, textAlign:"right", flexShrink:0 }}>{item.pct}%</span>
                  <span style={{ fontSize:10, color:DS.textTertiary, width:110, flexShrink:0 }}>{item.obs}</span>
                </div>
              ))}
              <div style={{ marginTop:12, fontSize:11, fontWeight:600, color:DS.success }}>↑ Tendencia positiva — cada cohort ativando melhor</div>
            </div>
          </div>

          {/* Crescimento & Expansao — conteudo existente */}
          <div style={an_secDiv}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.success} strokeWidth="1.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            <h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Crescimento & Expansao</h2><ANInfoTooltip id="crescimento_expansao"/>
            <div style={{ flex:1, height:1, background:DS.border }}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:20 }}>
            <MC label="Oportunidades de upgrade" value="4" meta="Candidatos por comportamento" status="ok" sub="" tid="upsell"/>
            <MC label="MRR potencial upsell" value="R$ 8.0k" meta="Se todos converterem" status="ok" sub="" tid="upsell"/>
            <MC label="Promotores NPS >=9" value="3" meta="Candidatos a indicacao" status="ok" sub="" tid="referral"/>
            <MC label="Pipeline de indicacao" value="R$ 5.9k" meta="MRR potencial via referral" status="ok" sub="" tid="referral"/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:28 }}>
            <div style={{ ...an_card }}>
              <h3 style={{ ...an_sT, color:DS.success, marginBottom:20 }}>Oportunidades de Upgrade</h3><ANInfoTooltip id="oportunidades_upgrade"/>
              {[
                {ini:"IC",name:"IGOR CAMPOS",motivo:"28/30 consultas usadas",de:"Essencial",para:"Professional",mrr:500,cor:DS.success},
                {ini:"MA",name:"Dr. Marcos Almeida",motivo:"Pediu analise avancada 4x",de:"Essencial",para:"Professional",mrr:500,cor:DS.success},
                {ini:"BL",name:"Dra. Beatriz Lima",motivo:"Mencionou 2 colegas de clinica",de:"Professional",para:"Clinica",mrr:1500,cor:C.teal},
                {ini:"PN",name:"Dr. Pedro Nunes",motivo:"NPS 10 + uso diario por 60 dias",de:"Essencial",para:"Professional",mrr:500,cor:DS.success},
              ].map((u,i,a) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom:i<a.length-1?`1px solid ${DS.divider}`:"none" }}>
                  <div style={{ width:34, height:34, borderRadius:"50%", background:u.cor, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:11, fontWeight:600, color:"#fff" }}>{u.ini}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:DS.textPrimary }}>{u.name}</div>
                    <div style={{ fontSize:11, color:DS.textTertiary }}>{u.motivo}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:11, color:DS.textTertiary }}>{u.de} → <strong style={{ color:u.cor }}>{u.para}</strong></div>
                    <div style={{ fontSize:13, fontWeight:700, color:u.cor }}>+R$ {u.mrr}/mes</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...an_card }}>
              <h3 style={{ ...an_sT, color:C.purple, marginBottom:20 }}>Pipeline de Indicacoes (NPS &gt;= 9)</h3><ANInfoTooltip id="pipeline_indicacoes"/>
              {[
                {ini:"IG",name:"Igor Gay",esp:"Medico Funcional",nps:10},
                {ini:"JM",name:"Dra. Julia Martins",esp:"Nutrologa",nps:10},
                {ini:"BL",name:"Dra. Beatriz Lima",esp:"Endocrinologista",nps:9},
              ].map((u,i,a) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom:i<a.length-1?`1px solid ${DS.divider}`:"none" }}>
                  <div style={{ width:34, height:34, borderRadius:"50%", background:C.purple, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:11, fontWeight:600, color:"#fff" }}>{u.ini}</span>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:DS.textPrimary }}>{u.name}</div>
                    <div style={{ fontSize:11, color:DS.textTertiary }}>{u.esp} · NPS {u.nps}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:C.purple }}>R$ 997–5.997</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* PERFORMANCE TECNICA */}
      {tab==="tecnico" && (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:28 }}>
            <MC label="API Response P95" value="2.1s" meta="<3s" status="ok" sub="Cadeia de agentes IA" tid="apitime"/>
            <MC label="Uptime" value="99.92%" meta="99.9%" status="ok" sub="Ultimos 30 dias" tid="uptime"/>
            <MC label="Custo / Consulta" value="$0.09" meta="<$0.15" status="ok" sub="Tokens OpenAI/Whisper" tid="tokencost"/>
            <MC label="Quick Ratio" value="2.1x" meta=">4x" status="crit" sub="(New+Exp)/(Churn+Contr)" tid="quickratio"/>
          </div>
          <div style={an_secDiv}><h2 style={{ fontSize:18, fontWeight:600, color:DS.textPrimary, margin:0 }}>Performance por Camada de Agente</h2><ANInfoTooltip id="performance_agentes"/><div style={{ flex:1, height:1, background:DS.border }}/></div>
          <div style={{ ...an_card }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr>{["Camada","Agentes","P50","P95","Error rate","Tokens/call","Status"].map((h,i) => (
                  <th key={h} style={{ background:DS.primary, color:"#fff", padding:"9px 12px", textAlign:i===0?"left":"right", fontWeight:600, fontSize:11 }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {[
                  {cam:"Analise (ADS|A)",ag:"58",p50:"420ms",p95:"1.2s",err:"0.4%",tok:"1.8k",st:"ok"},
                  {cam:"Diagnostico (ADS|D)",ag:"61",p50:"680ms",p95:"2.1s",err:"0.9%",tok:"2.4k",st:"ok"},
                  {cam:"Solucoes (ADS|S)",ag:"48",p50:"540ms",p95:"1.8s",err:"2.3%",tok:"3.1k",st:"warn"},
                ].map((r,i) => {
                  const sc = r.st==="ok"?DS.success:DS.warning;
                  return (
                    <tr key={i} style={{ background:i%2===0?DS.bgTableRow:DS.bgCard }}>
                      <td style={{ padding:"9px 12px", fontWeight:600, color:DS.textPrimary }}>{r.cam}</td>
                      {[r.ag,r.p50,r.p95].map((v,j) => <td key={j} style={{ padding:"9px 12px", textAlign:"right", color:DS.textSecondary }}>{v}</td>)}
                      <td style={{ padding:"9px 12px", textAlign:"right", fontWeight:600, color:r.st==="warn"?DS.warning:DS.success }}>{r.err}</td>
                      <td style={{ padding:"9px 12px", textAlign:"right", color:DS.textSecondary }}>{r.tok}</td>
                      <td style={{ padding:"9px 12px", textAlign:"right" }}>
                        <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, background:`${sc}12`, color:sc, border:`1px solid ${sc}30` }}>
                          {r.st==="ok"?"Saudavel":"Atencao"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════ UNIFIED APP ═══════════════════════ */

export default function AutonDashboard() {
  const [section, setSection] = React.useState("overview");

  const NAV = [
    { id:"overview", label:"Visao Geral", icon:"◈", sub:"KPIs executivos" },
    { id:"onboarding", label:"Onboarding", icon:"↗", sub:"Ativacao & funil" },
    { id:"dre", label:"DRE & Financas", icon:"$", sub:"Receita & SaaS" },
    { id:"analytics", label:"Product Analytics", icon:"⬡", sub:"Produto & Churn" },
    { id:"marketing", label:"Marketing", icon:"◎", sub:"Pago & Organico" },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#EBF3F6", fontFamily:"'Inter',system-ui,sans-serif" }}>
      {/* SIDEBAR */}
      <aside style={{ width:220, flexShrink:0, background:"#1B4266", display:"flex", flexDirection:"column", position:"sticky", top:0, height:"100vh", zIndex:100 }}>
        <div style={{ padding:"24px 20px 20px", borderBottom:"1px solid rgba(255,255,255,.12)" }}>
          <p style={{ fontSize:16, fontWeight:700, color:"#fff", margin:0 }}>Auton Health</p>
          <p style={{ fontSize:11, color:"rgba(255,255,255,.45)", margin:"3px 0 0", textTransform:"uppercase", letterSpacing:1 }}>Tria Company</p>
        </div>
        <nav style={{ flex:1, padding:"16px 10px" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setSection(n.id)}
              style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"10px 12px", borderRadius:6, border:"none", background:section===n.id?"rgba(255,255,255,.15)":"transparent", cursor:"pointer", marginBottom:4, textAlign:"left", transition:"background .15s" }}>
              <span style={{ fontSize:14, color:section===n.id?"#fff":"rgba(255,255,255,.55)", flexShrink:0 }}>{n.icon}</span>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:section===n.id?600:400, color:section===n.id?"#fff":"rgba(255,255,255,.7)", lineHeight:1.3 }}>{n.label}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", marginTop:1 }}>{n.sub}</div>
              </div>
              {section===n.id && <div style={{ marginLeft:"auto", width:3, height:18, background:"#fff", borderRadius:2, flexShrink:0 }}/>}
            </button>
          ))}
        </nav>
        <div style={{ padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,.12)" }}>
          <p style={{ fontSize:11, color:"rgba(255,255,255,.35)", margin:0 }}>Abril 2026 · Dados estimados</p>
        </div>
      </aside>

      {/* CONTENT */}
      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
        {/* GLOBAL KPI BAR */}
        <div style={{ background:"#FFFFFF", borderBottom:"1px solid #E5E7EB", padding:"10px 40px", display:"flex", alignItems:"center", gap:28, flexWrap:"wrap", position:"sticky", top:0, zIndex:10, boxShadow:"0 2px 8px rgba(0,0,0,.05)" }}>
          {[
            { label:"MRR", value:"R$ 15.5k", delta:"+12%", ok:true },
            { label:"Clientes", value:"12", delta:"+1", ok:true },
            { label:"Churn", value:"6.4%", delta:"+1.2pp", ok:false },
            { label:"Ativacao", value:"54%", delta:"-3pp", ok:false },
            { label:"NPS", value:"52", delta:"+4", ok:true },
            { label:"Break-even", value:">Abr/27", delta:"", ok:false },
            { label:"Uptime", value:"99.92%", delta:"", ok:true },
            { label:"D30 Ret.", value:"55%", delta:"+3pp", ok:true },
          ].map((k,i) => (
            <div key={i} style={{ display:"flex", flexDirection:"column", gap:1 }}>
              <span style={{ fontSize:10, fontWeight:600, color:"#999999", textTransform:"uppercase", letterSpacing:.5 }}>{k.label}</span>
              <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                <span style={{ fontSize:14, fontWeight:700, color:"#1A1A1A" }}>{k.value}</span>
                {k.delta && <span style={{ fontSize:10, fontWeight:600, color:k.ok?"#10B981":"#EF4444" }}>{k.delta}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* PAGE */}
        <div style={{ flex:1, overflowY:"auto" }}>

          {/* VISAO GERAL */}
          {section==="overview" && (
            <div style={{ padding:"36px 40px 64px" }}>
              <h1 style={{ fontSize:24, fontWeight:600, color:"#1A1A1A", margin:"0 0 4px" }}>Visao Geral</h1>
              <p style={{ fontSize:12, color:"#999999", margin:"0 0 32px", textTransform:"uppercase", letterSpacing:.5 }}>Dashboard executivo · Abril 2026</p>

              <div style={{ display:"flex", alignItems:"center", gap:10, margin:"0 0 14px" }}>
                <div style={{ width:3, height:18, background:"#1B4266", borderRadius:2 }}/>
                <h2 style={{ fontSize:15, fontWeight:600, color:"#1A1A1A", margin:0 }}>Financeiro & SaaS</h2><ANInfoTooltip id="financeiro_visao"/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 }}>
                {[
                  { l:"MRR",v:"R$ 15.5k",s:"ARR: R$ 185.6k",c:"#10B981" },
                  { l:"Churn Rate",v:"6.4%",s:"Meta: <2%/mes",c:"#EF4444" },
                  { l:"NRR",v:"93.6%",s:"Meta: >100%",c:"#F59E0B" },
                  { l:"Break-even",v:">Abr/27",s:"Faltam +16 clientes",c:"#EF4444" },
                  { l:"Margem Bruta",v:"60.6%",s:"Meta: >70%",c:"#F59E0B" },
                  { l:"EBITDA",v:"-R$ 4.8k",s:"Margem: -106%",c:"#EF4444" },
                  { l:"LTV/CAC",v:"8.8x",s:"Meta: >3x",c:"#10B981" },
                  { l:"Runway",v:"3 meses",s:"Burn R$ 15.7k/mes",c:"#EF4444" },
                ].map((k,i) => (
                  <div key={i} style={{ background:"#FFFFFF", borderRadius:3, boxShadow:"0 4px 4px rgba(0,0,0,.25)", padding:16 }}>
                    <p style={{ fontSize:11, fontWeight:600, color:"#999999", textTransform:"uppercase", letterSpacing:.5, margin:"0 0 5px" }}>{k.l}</p>
                    <p style={{ fontSize:20, fontWeight:700, color:k.c, margin:"0 0 3px" }}>{k.v}</p>
                    <p style={{ fontSize:11, color:"#999999", margin:0 }}>{k.s}</p>
                  </div>
                ))}
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:10, margin:"0 0 14px" }}>
                <div style={{ width:3, height:18, background:"#7C3AED", borderRadius:2 }}/>
                <h2 style={{ fontSize:15, fontWeight:600, color:"#1A1A1A", margin:0 }}>Produto & Usuarios</h2><ANInfoTooltip id="produto_visao"/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 }}>
                {[
                  { l:"Clientes ativos",v:"12",s:"Meta: 20 p/ break-even",c:"#F59E0B" },
                  { l:"Taxa de ativacao",v:"54%",s:"Meta: >60%",c:"#F59E0B" },
                  { l:"Retencao D30",v:"55%",s:"Meta: >50%",c:"#10B981" },
                  { l:"NPS",v:"52",s:"Meta: >50",c:"#10B981" },
                  { l:"DAU/MAU",v:"23%",s:"Meta: >20%",c:"#10B981" },
                  { l:"Consultas/usuario",v:"6.2/mes",s:"Meta: >8/mes",c:"#F59E0B" },
                  { l:"Task Success",v:"87%",s:"Meta: >90%",c:"#F59E0B" },
                  { l:"CSAT",v:"4.1/5",s:"Meta: >4.2",c:"#F59E0B" },
                ].map((k,i) => (
                  <div key={i} style={{ background:"#FFFFFF", borderRadius:3, boxShadow:"0 4px 4px rgba(0,0,0,.25)", padding:16 }}>
                    <p style={{ fontSize:11, fontWeight:600, color:"#999999", textTransform:"uppercase", letterSpacing:.5, margin:"0 0 5px" }}>{k.l}</p>
                    <p style={{ fontSize:20, fontWeight:700, color:k.c, margin:"0 0 3px" }}>{k.v}</p>
                    <p style={{ fontSize:11, color:"#999999", margin:0 }}>{k.s}</p>
                  </div>
                ))}
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:10, margin:"0 0 14px" }}>
                <div style={{ width:3, height:18, background:"#0F6E56", borderRadius:2 }}/>
                <h2 style={{ fontSize:15, fontWeight:600, color:"#1A1A1A", margin:0 }}>Funil de Onboarding</h2><ANInfoTooltip id="funil_visao"/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14, marginBottom:28 }}>
                {[
                  { l:"Compras",v:"98",s:"Total",c:"#1B4266" },
                  { l:"Acessos",v:"92",s:"94% das compras",c:"#1B4266" },
                  { l:"Logins",v:"14",s:"15% tiveram login",c:"#F59E0B" },
                  { l:"Onboardings",v:"13",s:"93% dos logins",c:"#10B981" },
                  { l:"1a Consulta",v:"0",s:"0% completaram",c:"#EF4444" },
                ].map((k,i) => (
                  <div key={i} style={{ background:"#FFFFFF", borderRadius:3, boxShadow:"0 4px 4px rgba(0,0,0,.25)", padding:16 }}>
                    <p style={{ fontSize:11, fontWeight:600, color:"#999999", textTransform:"uppercase", letterSpacing:.5, margin:"0 0 5px" }}>{k.l}</p>
                    <p style={{ fontSize:20, fontWeight:700, color:k.c, margin:"0 0 3px" }}>{k.v}</p>
                    <p style={{ fontSize:11, color:"#999999", margin:0 }}>{k.s}</p>
                  </div>
                ))}
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:10, margin:"0 0 14px" }}>
                <div style={{ width:3, height:18, background:"#EF4444", borderRadius:2 }}/>
                <h2 style={{ fontSize:15, fontWeight:600, color:"#1A1A1A", margin:0 }}>Alertas Criticos</h2><ANInfoTooltip id="alertas_visao"/>
              </div>
              {[
                { c:"#EF4444", m:"Runway de 3 meses — burn rate R$ 15.7k/mes com caixa estimado de R$ 45k", dest:"dre" },
                { c:"#EF4444", m:"Churn rate 6.4% — 3x acima da meta. 3 usuarios com score de churn >60", dest:"analytics" },
                { c:"#EF4444", m:"Zero consultas finalizadas — 13 medicos sem nenhuma consulta concluida", dest:"onboarding" },
                { c:"#F59E0B", m:"Break-even previsto para apos Abr/27 — faltam +16 clientes no mix atual", dest:"dre" },
                { c:"#F59E0B", m:"Taxa de ativacao 54% — gargalo critico na etapa de login (apenas 15%)", dest:"onboarding" },
              ].map((item,i) => (
                <div key={i} style={{ background:"#FFFFFF", borderRadius:3, boxShadow:"0 2px 4px rgba(0,0,0,.1)", padding:"12px 16px", display:"flex", alignItems:"center", gap:14, borderLeft:`3px solid ${item.c}`, marginBottom:10 }}>
                  <span style={{ fontSize:13, color:"#666666", flex:1, lineHeight:1.5 }}>{item.m}</span>
                  <button onClick={() => setSection(item.dest)}
                    style={{ fontSize:11, fontWeight:600, padding:"4px 14px", borderRadius:20, background:`${item.c}12`, color:item.c, border:`1px solid ${item.c}30`, cursor:"pointer", flexShrink:0 }}>
                    Ver →
                  </button>
                </div>
              ))}
            </div>
          )}

          {section==="onboarding" && <OnboardingDash />}
          {section==="dre" && <DreDash />}
          {section==="analytics" && <AnalyticsDash />}
          {section==="marketing" && <MarketingDash />}
        </div>
      </div>
    </div>
  );
}
