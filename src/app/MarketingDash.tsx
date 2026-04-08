"use client";
import React, { useState } from "react";

/* ───────── Design System ───────── */
const DS = {
  primary: "#1B4266", primaryLight: "#2D6293", accent: "#3B82F6",
  success: "#10B981", error: "#EF4444", warning: "#F59E0B",
  bgPage: "#EBF3F6", bgCard: "#FFFFFF", bgTableRow: "#F8F9FA",
  textPrimary: "#1A1A1A", textDefault: "#323232", textSecondary: "#666666",
  textTertiary: "#999999", textDisabled: "#CCCCCC",
  border: "#E5E7EB", divider: "#F2F2F2",
  cardRadius: 3, cardShadow: "0 4px 4px rgba(0,0,0,0.25)",
};
const COLORS: Record<string, string> = {
  blue: "#1B4266", purple: "#7C3AED", pink: "#DB2777", orange: "#EA580C",
  red: "#EF4444", green: "#10B981", yellow: "#F59E0B", teal: "#0F6E56",
};

const cardStyle: React.CSSProperties = {
  background: DS.bgCard, borderRadius: DS.cardRadius,
  boxShadow: DS.cardShadow, padding: 24,
};
const dividerStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 12, margin: "32px 0 20px",
};

/* ───────── Types ───────── */
type Tab = "pago" | "organico";
type Network = "instagram" | "tiktok" | "youtube" | "facebook";

/* ───────── Paid Traffic Data ───────── */
const PAID_KPIS = [
  { label: "Investimento", value: "R$ 4.800", delta: "+12%", color: DS.accent },
  { label: "ROAS Medio", value: "3.2x", delta: "+0.4", color: DS.success },
  { label: "Conversoes", value: "48 leads", delta: "+18%", color: COLORS.purple },
  { label: "CPA Medio", value: "R$ 100", delta: "-8%", color: DS.warning },
];

const HEALTH_INDICATORS = [
  { label: "Freq Anuncio", value: 2.1, max: 4, color: DS.success },
  { label: "Quality Score", value: 8, max: 10, color: DS.success },
  { label: "Budget Pace", value: 72, max: 100, color: DS.warning },
  { label: "Bounce Rate", value: 38, max: 100, color: DS.error },
];

const FUNNEL_STEPS = [
  { label: "Impressoes", value: "124.500", pct: 100 },
  { label: "Cliques", value: "6.225", pct: 60 },
  { label: "Landing Page", value: "4.980", pct: 48 },
  { label: "Lead", value: "48", pct: 28 },
  { label: "Assinatura", value: "12", pct: 14 },
];

const CAMPAIGNS = [
  { name: "LinkedIn Medicos", status: "Ativo", spend: "R$ 2.100", impressions: "58.200", clicks: "2.910", ctr: "5.0%", conversions: 22, roas: "3.8x" },
  { name: "Google Search Saude", status: "Ativo", spend: "R$ 1.600", impressions: "42.300", clicks: "2.115", ctr: "5.0%", conversions: 16, roas: "3.1x" },
  { name: "Meta Retargeting", status: "Pausado", spend: "R$ 1.100", impressions: "24.000", clicks: "1.200", ctr: "5.0%", conversions: 10, roas: "2.7x" },
];

const ADS = [
  { name: "Video Depoimento Dr. Silva", type: "Video", status: "Ativo", cpm: "R$ 18,50", cpc: "R$ 1,42", roas: "4.1x" },
  { name: "Carousel Funcionalidades", type: "Carousel", status: "Ativo", cpm: "R$ 22,10", cpc: "R$ 1,88", roas: "3.5x" },
  { name: "Banner Teste Gratis", type: "Imagem", status: "Ativo", cpm: "R$ 15,30", cpc: "R$ 1,12", roas: "3.2x" },
  { name: "Story Caso Clinica ABC", type: "Story", status: "Pausado", cpm: "R$ 19,80", cpc: "R$ 1,65", roas: "2.8x" },
  { name: "Lead Ad Agenda Demo", type: "Lead Ad", status: "Ativo", cpm: "R$ 24,00", cpc: "R$ 2,10", roas: "2.4x" },
];

const EVOLUTION_DATA = [
  { month: "Nov", impressions: 82000, clicks: 3200 },
  { month: "Dez", impressions: 95000, clicks: 3800 },
  { month: "Jan", impressions: 104000, clicks: 4500 },
  { month: "Fev", impressions: 112000, clicks: 5100 },
  { month: "Mar", impressions: 124500, clicks: 6225 },
];

const BUDGET_PACE = [
  { name: "LinkedIn Medicos", used: 78, total: "R$ 2.700" },
  { name: "Google Search Saude", used: 64, total: "R$ 2.500" },
  { name: "Meta Retargeting", used: 55, total: "R$ 2.000" },
];

const HEATMAP_DATA: number[][] = Array.from({ length: 7 }, (_, d) =>
  Array.from({ length: 24 }, (_, h) => {
    if (h < 6 || h > 22) return 0;
    if (d >= 5) return Math.random() * 0.4;
    if (h >= 9 && h <= 12) return 0.6 + Math.random() * 0.4;
    if (h >= 14 && h <= 17) return 0.5 + Math.random() * 0.3;
    return 0.1 + Math.random() * 0.3;
  })
);
const DAYS_LABELS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

const AUDIENCE_SEGMENTS = [
  { name: "Lookalike Medicos", impressions: "72.000", ctr: "5.8%", conversions: 32, cpa: "R$ 88" },
  { name: "Interesses Saude", impressions: "52.500", ctr: "4.2%", conversions: 16, cpa: "R$ 118" },
];

/* ───────── Organic Traffic Data ───────── */
const ORGANIC_KPIS = [
  { label: "Sessoes Organicas", value: "2.840", delta: "+22%", color: DS.success },
  { label: "Posicao Media", value: "8.2", delta: "-1.3", color: DS.accent },
  { label: "CTR Organico", value: "4.1%", delta: "+0.6%", color: COLORS.purple },
  { label: "Impressoes GSC", value: "48.500", delta: "+15%", color: DS.warning },
];

const TOP_KEYWORDS = [
  { keyword: "software gestao clinica", position: 3, impressions: "8.200", clicks: "580", ctr: "7.1%" },
  { keyword: "prontuario eletronico", position: 5, impressions: "6.800", clicks: "410", ctr: "6.0%" },
  { keyword: "agenda medica online", position: 7, impressions: "5.400", clicks: "290", ctr: "5.4%" },
  { keyword: "sistema para consultorio", position: 11, impressions: "4.100", clicks: "180", ctr: "4.4%" },
  { keyword: "telemedicina plataforma", position: 14, impressions: "3.200", clicks: "120", ctr: "3.8%" },
];

const SESSIONS_BY_CHANNEL = [
  { month: "Out", pago: 1200, organico: 1800, direto: 600, social: 400, email: 200 },
  { month: "Nov", pago: 1400, organico: 2000, direto: 650, social: 450, email: 220 },
  { month: "Dez", pago: 1100, organico: 1900, direto: 580, social: 380, email: 190 },
  { month: "Jan", pago: 1500, organico: 2200, direto: 700, social: 500, email: 250 },
  { month: "Fev", pago: 1650, organico: 2500, direto: 740, social: 520, email: 270 },
  { month: "Mar", pago: 1800, organico: 2840, direto: 800, social: 580, email: 300 },
];

const ORGANIC_EVOLUTION = [
  { month: "Out", impressions: 32000, clicks: 1200 },
  { month: "Nov", impressions: 36000, clicks: 1400 },
  { month: "Dez", impressions: 34000, clicks: 1350 },
  { month: "Jan", impressions: 40000, clicks: 1650 },
  { month: "Fev", impressions: 44000, clicks: 1900 },
  { month: "Mar", impressions: 48500, clicks: 2200 },
];

const NEW_USERS_CHANNEL = [
  { channel: "Organico", value: 1420 },
  { channel: "Pago", value: 980 },
  { channel: "Direto", value: 520 },
  { channel: "Social", value: 340 },
  { channel: "Email", value: 180 },
];

const PAID_VS_ORGANIC = [
  { month: "Dez", pago: 28, organico: 18 },
  { month: "Jan", pago: 34, organico: 22 },
  { month: "Fev", pago: 40, organico: 28 },
  { month: "Mar", pago: 48, organico: 36 },
];

/* ───────── Social Network Data ───────── */
interface SocialKpi { label: string; value: string; delta: string }
interface TopPost { title: string; type: string; reach: string; engagement: string; saves: string }
interface StoryStep { label: string; pct: number }
interface ReachOrigin { label: string; pct: number }
interface FollowerWeek { week: string; novos: number; unfollows: number }
interface ContentBar { label: string; pct: number }

interface SocialData {
  kpis: SocialKpi[];
  retention: number[];
  shareByType: ContentBar[];
  stories: StoryStep[];
  reachOrigin: ReachOrigin[];
  followers: FollowerWeek[];
  sentiment: { positivo: number; neutro: number; negativo: number };
  ageRange: { range: string; pct: number }[];
  gender: { label: string; pct: number }[];
  topPosts: TopPost[];
}

const SOCIAL_DATA: Record<Network, SocialData> = {
  instagram: {
    kpis: [
      { label: "Share Rate", value: "3.2%", delta: "+0.5%" },
      { label: "Save Rate", value: "5.8%", delta: "+1.1%" },
      { label: "Hook Score", value: "68%", delta: "+4%" },
      { label: "Replay Rate", value: "12%", delta: "+2%" },
      { label: "Virality Score", value: "2.4x", delta: "+0.3" },
    ],
    retention: [100, 82, 65, 52, 44, 38, 34, 30, 28, 26],
    shareByType: [
      { label: "Reels", pct: 42 },
      { label: "Carousel", pct: 28 },
      { label: "Imagem", pct: 18 },
      { label: "Story", pct: 12 },
    ],
    stories: [
      { label: "Story 1", pct: 100 },
      { label: "Story 2", pct: 78 },
      { label: "Story 3", pct: 58 },
      { label: "Story 4", pct: 42 },
      { label: "Story 5", pct: 28 },
    ],
    reachOrigin: [
      { label: "Seguidores", pct: 45 },
      { label: "Explore", pct: 28 },
      { label: "Hashtags", pct: 15 },
      { label: "Compartilhamentos", pct: 12 },
    ],
    followers: [
      { week: "Sem 1", novos: 120, unfollows: 18 },
      { week: "Sem 2", novos: 145, unfollows: 22 },
      { week: "Sem 3", novos: 98, unfollows: 15 },
      { week: "Sem 4", novos: 168, unfollows: 20 },
    ],
    sentiment: { positivo: 68, neutro: 24, negativo: 8 },
    ageRange: [
      { range: "18-24", pct: 8 },
      { range: "25-34", pct: 32 },
      { range: "35-44", pct: 38 },
      { range: "45-54", pct: 16 },
      { range: "55+", pct: 6 },
    ],
    gender: [
      { label: "Masculino", pct: 52 },
      { label: "Feminino", pct: 44 },
      { label: "Outro", pct: 4 },
    ],
    topPosts: [
      { title: "Depoimento Dr. Silva", type: "Reel", reach: "12.400", engagement: "8.2%", saves: "320" },
      { title: "5 Dicas Gestao Clinica", type: "Carousel", reach: "9.800", engagement: "6.5%", saves: "280" },
      { title: "Tour pelo Sistema", type: "Reel", reach: "8.200", engagement: "5.8%", saves: "195" },
    ],
  },
  tiktok: {
    kpis: [
      { label: "Views Medios", value: "18.500", delta: "+25%" },
      { label: "Completion Rate", value: "42%", delta: "+5%" },
      { label: "Share Rate", value: "4.8%", delta: "+0.8%" },
      { label: "Comment Rate", value: "2.1%", delta: "+0.3%" },
      { label: "FYP Rate", value: "62%", delta: "+8%" },
    ],
    retention: [100, 78, 58, 42, 35, 28, 22, 18, 15, 12],
    shareByType: [
      { label: "Tutorial", pct: 38 },
      { label: "Tendencia", pct: 28 },
      { label: "Bastidores", pct: 20 },
      { label: "Depoimento", pct: 14 },
    ],
    stories: [
      { label: "Clip 1", pct: 100 },
      { label: "Clip 2", pct: 72 },
      { label: "Clip 3", pct: 48 },
      { label: "Clip 4", pct: 32 },
      { label: "Clip 5", pct: 18 },
    ],
    reachOrigin: [
      { label: "For You", pct: 62 },
      { label: "Seguidores", pct: 22 },
      { label: "Busca", pct: 10 },
      { label: "Sons", pct: 6 },
    ],
    followers: [
      { week: "Sem 1", novos: 340, unfollows: 45 },
      { week: "Sem 2", novos: 420, unfollows: 52 },
      { week: "Sem 3", novos: 280, unfollows: 38 },
      { week: "Sem 4", novos: 510, unfollows: 60 },
    ],
    sentiment: { positivo: 72, neutro: 20, negativo: 8 },
    ageRange: [
      { range: "18-24", pct: 22 },
      { range: "25-34", pct: 38 },
      { range: "35-44", pct: 28 },
      { range: "45-54", pct: 9 },
      { range: "55+", pct: 3 },
    ],
    gender: [
      { label: "Masculino", pct: 48 },
      { label: "Feminino", pct: 48 },
      { label: "Outro", pct: 4 },
    ],
    topPosts: [
      { title: "Medico Reage ao Sistema", type: "Video", reach: "42.000", engagement: "9.2%", saves: "1.200" },
      { title: "Hack Prontuario Rapido", type: "Video", reach: "28.500", engagement: "7.8%", saves: "890" },
      { title: "Um Dia na Clinica Digital", type: "Video", reach: "22.100", engagement: "6.4%", saves: "650" },
    ],
  },
  youtube: {
    kpis: [
      { label: "Views Medios", value: "4.200", delta: "+18%" },
      { label: "Watch Time (min)", value: "8.400", delta: "+22%" },
      { label: "CTR Thumbnail", value: "6.8%", delta: "+0.9%" },
      { label: "Like Rate", value: "4.2%", delta: "+0.5%" },
      { label: "Sub Growth", value: "+180", delta: "+15%" },
    ],
    retention: [100, 88, 75, 62, 55, 48, 42, 38, 35, 32],
    shareByType: [
      { label: "Tutorial", pct: 35 },
      { label: "Webinar", pct: 25 },
      { label: "Shorts", pct: 22 },
      { label: "Entrevista", pct: 18 },
    ],
    stories: [
      { label: "Intro", pct: 100 },
      { label: "Min 2", pct: 82 },
      { label: "Min 5", pct: 62 },
      { label: "Min 8", pct: 48 },
      { label: "CTA Final", pct: 35 },
    ],
    reachOrigin: [
      { label: "Busca YT", pct: 38 },
      { label: "Sugeridos", pct: 32 },
      { label: "External", pct: 18 },
      { label: "Browse", pct: 12 },
    ],
    followers: [
      { week: "Sem 1", novos: 42, unfollows: 5 },
      { week: "Sem 2", novos: 55, unfollows: 8 },
      { week: "Sem 3", novos: 38, unfollows: 4 },
      { week: "Sem 4", novos: 65, unfollows: 7 },
    ],
    sentiment: { positivo: 78, neutro: 18, negativo: 4 },
    ageRange: [
      { range: "18-24", pct: 5 },
      { range: "25-34", pct: 28 },
      { range: "35-44", pct: 42 },
      { range: "45-54", pct: 18 },
      { range: "55+", pct: 7 },
    ],
    gender: [
      { label: "Masculino", pct: 58 },
      { label: "Feminino", pct: 38 },
      { label: "Outro", pct: 4 },
    ],
    topPosts: [
      { title: "Como Digitalizar sua Clinica", type: "Video", reach: "8.400", engagement: "5.2%", saves: "420" },
      { title: "Webinar Gestao Eficiente", type: "Live", reach: "5.200", engagement: "7.8%", saves: "310" },
      { title: "Shorts: Dica Rapida Agenda", type: "Short", reach: "12.800", engagement: "4.5%", saves: "580" },
    ],
  },
  facebook: {
    kpis: [
      { label: "Alcance Pagina", value: "8.600", delta: "+10%" },
      { label: "Engajamento", value: "3.4%", delta: "+0.4%" },
      { label: "Link Clicks", value: "620", delta: "+12%" },
      { label: "Mensagens", value: "85", delta: "+18%" },
      { label: "Compartilhamentos", value: "142", delta: "+22%" },
    ],
    retention: [100, 85, 70, 58, 48, 40, 35, 30, 28, 25],
    shareByType: [
      { label: "Video", pct: 35 },
      { label: "Link Post", pct: 28 },
      { label: "Imagem", pct: 22 },
      { label: "Evento", pct: 15 },
    ],
    stories: [
      { label: "Story 1", pct: 100 },
      { label: "Story 2", pct: 72 },
      { label: "Story 3", pct: 52 },
      { label: "Story 4", pct: 38 },
      { label: "Story 5", pct: 22 },
    ],
    reachOrigin: [
      { label: "Feed", pct: 48 },
      { label: "Grupos", pct: 25 },
      { label: "Compartilhamentos", pct: 18 },
      { label: "Busca", pct: 9 },
    ],
    followers: [
      { week: "Sem 1", novos: 65, unfollows: 12 },
      { week: "Sem 2", novos: 78, unfollows: 15 },
      { week: "Sem 3", novos: 52, unfollows: 10 },
      { week: "Sem 4", novos: 88, unfollows: 14 },
    ],
    sentiment: { positivo: 62, neutro: 28, negativo: 10 },
    ageRange: [
      { range: "18-24", pct: 4 },
      { range: "25-34", pct: 22 },
      { range: "35-44", pct: 38 },
      { range: "45-54", pct: 24 },
      { range: "55+", pct: 12 },
    ],
    gender: [
      { label: "Masculino", pct: 55 },
      { label: "Feminino", pct: 42 },
      { label: "Outro", pct: 3 },
    ],
    topPosts: [
      { title: "Grupo Medicos Digitais", type: "Link", reach: "4.800", engagement: "6.2%", saves: "120" },
      { title: "Live Q&A com Especialista", type: "Live", reach: "3.200", engagement: "8.5%", saves: "95" },
      { title: "Infografico Telemedicina", type: "Imagem", reach: "5.600", engagement: "4.8%", saves: "180" },
    ],
  },
};

/* ───────── Helper: Color from heat value ───────── */
function heatColor(v: number): string {
  if (v < 0.15) return "#EBF3F6";
  if (v < 0.35) return "#BAE6FD";
  if (v < 0.55) return "#60A5FA";
  if (v < 0.75) return "#3B82F6";
  return "#1B4266";
}

/* ───────── Small Components ───────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={dividerStyle}>
      <div style={{ width: 4, height: 20, background: DS.primary, borderRadius: 2 }} />
      <span style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary }}>{children}</span>
    </div>
  );
}

function KpiCard({ label, value, delta, color }: { label: string; value: string; delta: string; color: string }) {
  const isPositive = delta.startsWith("+") || delta.startsWith("-");
  const deltaColor = delta.startsWith("-") && !label.toLowerCase().includes("cpa") && !label.toLowerCase().includes("posicao")
    ? DS.error
    : delta.startsWith("+") ? DS.success : DS.textTertiary;
  return (
    <div style={{ ...cardStyle, flex: "1 1 200px", minWidth: 180 }}>
      <div style={{ fontSize: 12, color: DS.textSecondary, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: DS.textPrimary }}>{value}</div>
      {isPositive && (
        <div style={{ fontSize: 13, color: deltaColor, marginTop: 4 }}>{delta} vs mes anterior</div>
      )}
      <div style={{ width: "100%", height: 3, background: color, borderRadius: 2, marginTop: 8, opacity: 0.6 }} />
    </div>
  );
}

function StatusDot({ color }: { color: string }) {
  return <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: color }} />;
}

/* ───────── SVG Line Chart Helper ───────── */
function SvgLineChart({
  data, xKey, lines, width = 520, height = 200,
}: {
  data: Record<string, unknown>[];
  xKey: string;
  lines: { key: string; color: string; label: string }[];
  width?: number;
  height?: number;
}) {
  const pad = { t: 20, r: 20, b: 30, l: 50 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const allVals = lines.flatMap(l => data.map(d => d[l.key] as number));
  const maxVal = Math.max(...allVals) * 1.1;

  const x = (i: number) => pad.l + (i / (data.length - 1)) * w;
  const y = (v: number) => pad.t + h - (v / maxVal) * h;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto" }}>
      {/* grid */}
      {[0, 0.25, 0.5, 0.75, 1].map(p => {
        const yy = pad.t + h - p * h;
        return (
          <g key={p}>
            <line x1={pad.l} y1={yy} x2={width - pad.r} y2={yy} stroke={DS.divider} strokeWidth={1} />
            <text x={pad.l - 6} y={yy + 4} textAnchor="end" fontSize={9} fill={DS.textTertiary}>
              {Math.round(maxVal * p).toLocaleString("pt-BR")}
            </text>
          </g>
        );
      })}
      {/* x labels */}
      {data.map((d, i) => (
        <text key={i} x={x(i)} y={height - 6} textAnchor="middle" fontSize={10} fill={DS.textSecondary}>
          {d[xKey] as string}
        </text>
      ))}
      {/* lines */}
      {lines.map(l => {
        const pts = data.map((d, i) => `${x(i)},${y(d[l.key] as number)}`).join(" ");
        return (
          <g key={l.key}>
            <polyline points={pts} fill="none" stroke={l.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            {data.map((d, i) => (
              <circle key={i} cx={x(i)} cy={y(d[l.key] as number)} r={3.5} fill={l.color} />
            ))}
          </g>
        );
      })}
      {/* legend */}
      {lines.map((l, i) => (
        <g key={l.key} transform={`translate(${pad.l + i * 120}, 12)`}>
          <rect width={10} height={10} rx={2} fill={l.color} />
          <text x={14} y={9} fontSize={10} fill={DS.textSecondary}>{l.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ───────── SVG Area Chart (Retention) ───────── */
function RetentionChart({ data }: { data: number[] }) {
  const w = 400, h = 160, padL = 40, padB = 20, padT = 10;
  const cw = w - padL - 10;
  const ch = h - padT - padB;
  const x = (i: number) => padL + (i / (data.length - 1)) * cw;
  const y = (v: number) => padT + ch - (v / 100) * ch;
  const pts = data.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const areaPath = `M${x(0)},${y(data[0])} ${data.map((v, i) => `L${x(i)},${y(v)}`).join(" ")} L${x(data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={DS.accent} stopOpacity={0.3} />
          <stop offset="100%" stopColor={DS.accent} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={w - 10} y2={y(v)} stroke={DS.divider} strokeWidth={1} />
          <text x={padL - 4} y={y(v) + 3} textAnchor="end" fontSize={9} fill={DS.textTertiary}>{v}%</text>
        </g>
      ))}
      <path d={areaPath} fill="url(#retGrad)" />
      <polyline points={pts} fill="none" stroke={DS.accent} strokeWidth={2} />
      {data.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={3} fill={DS.accent} />
      ))}
    </svg>
  );
}

/* ───────── Horizontal Bar ───────── */
function HBar({ label, pct, color, maxPct = 100 }: { label: string; pct: number; color: string; maxPct?: number }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: DS.textDefault, marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: 8, background: DS.divider, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${(pct / maxPct) * 100}%`, height: "100%", background: color, borderRadius: 4 }} />
      </div>
    </div>
  );
}

/* ───────── Stacked Bar Chart ───────── */
function StackedBarChart({
  data, keys, colors, xKey, height = 200,
}: {
  data: Record<string, unknown>[];
  keys: string[];
  colors: string[];
  xKey: string;
  height?: number;
}) {
  const maxTotal = Math.max(...data.map(d => keys.reduce((s, k) => s + (d[k] as number), 0)));
  const barW = 40;
  const gap = 20;
  const totalW = data.length * (barW + gap);
  const padL = 50;

  return (
    <div style={{ overflowX: "auto" }}>
      <svg viewBox={`0 0 ${padL + totalW + 20} ${height + 40}`} style={{ width: "100%", height: "auto", minWidth: 300 }}>
        {[0, 0.25, 0.5, 0.75, 1].map(p => {
          const yy = 10 + (1 - p) * height;
          return (
            <g key={p}>
              <line x1={padL} y1={yy} x2={padL + totalW} y2={yy} stroke={DS.divider} />
              <text x={padL - 6} y={yy + 4} textAnchor="end" fontSize={9} fill={DS.textTertiary}>
                {Math.round(maxTotal * p).toLocaleString("pt-BR")}
              </text>
            </g>
          );
        })}
        {data.map((d, di) => {
          let cumY = 0;
          const bx = padL + di * (barW + gap);
          return (
            <g key={di}>
              {keys.map((k, ki) => {
                const val = d[k] as number;
                const bh = (val / maxTotal) * height;
                const by = 10 + height - cumY - bh;
                cumY += bh;
                return <rect key={k} x={bx} y={by} width={barW} height={bh} fill={colors[ki]} rx={1} />;
              })}
              <text x={bx + barW / 2} y={height + 24} textAnchor="middle" fontSize={10} fill={DS.textSecondary}>
                {d[xKey] as string}
              </text>
            </g>
          );
        })}
        {/* legend */}
        {keys.map((k, i) => (
          <g key={k} transform={`translate(${padL + i * 80}, ${height + 36})`}>
            <rect width={8} height={8} rx={2} fill={colors[i]} />
            <text x={12} y={8} fontSize={9} fill={DS.textSecondary}>{k}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ───────── Side-by-Side Bars ───────── */
function SideBySideBars({
  data, key1, key2, xKey, color1, color2, label1, label2,
}: {
  data: Record<string, unknown>[];
  key1: string; key2: string; xKey: string;
  color1: string; color2: string; label1: string; label2: string;
}) {
  const maxVal = Math.max(...data.flatMap(d => [d[key1] as number, d[key2] as number])) * 1.15;
  const barW = 20;
  const groupGap = 30;
  const padL = 40;
  const h = 160;
  const totalW = data.length * (barW * 2 + 8 + groupGap);

  return (
    <svg viewBox={`0 0 ${padL + totalW + 20} ${h + 40}`} style={{ width: "100%", height: "auto" }}>
      {data.map((d, i) => {
        const gx = padL + i * (barW * 2 + 8 + groupGap);
        const v1 = d[key1] as number;
        const v2 = d[key2] as number;
        const h1 = (v1 / maxVal) * h;
        const h2 = (v2 / maxVal) * h;
        return (
          <g key={i}>
            <rect x={gx} y={10 + h - h1} width={barW} height={h1} fill={color1} rx={2} />
            <rect x={gx + barW + 4} y={10 + h - h2} width={barW} height={h2} fill={color2} rx={2} />
            <text x={gx + barW + 2} y={h + 24} textAnchor="middle" fontSize={10} fill={DS.textSecondary}>
              {d[xKey] as string}
            </text>
          </g>
        );
      })}
      <g transform={`translate(${padL}, ${h + 36})`}>
        <rect width={8} height={8} rx={2} fill={color1} />
        <text x={12} y={8} fontSize={9} fill={DS.textSecondary}>{label1}</text>
        <rect x={80} width={8} height={8} rx={2} fill={color2} />
        <text x={92} y={8} fontSize={9} fill={DS.textSecondary}>{label2}</text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SOCIAL NETWORK SECTION COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function SocialSection({ network }: { network: Network }) {
  const d = SOCIAL_DATA[network];
  const networkLabels: Record<Network, string> = {
    instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube", facebook: "Facebook",
  };
  const networkColors: Record<Network, string> = {
    instagram: COLORS.pink, tiktok: COLORS.teal, youtube: COLORS.red, facebook: COLORS.blue,
  };
  const nc = networkColors[network];

  return (
    <div>
      <SectionTitle>{networkLabels[network]} - Metricas Detalhadas</SectionTitle>

      {/* Social KPIs */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        {d.kpis.map(k => (
          <div key={k.label} style={{ ...cardStyle, flex: "1 1 150px", minWidth: 140 }}>
            <div style={{ fontSize: 11, color: DS.textSecondary, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: DS.textPrimary }}>{k.value}</div>
            <div style={{ fontSize: 12, color: DS.success, marginTop: 2 }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Row: Retention + Share by Type */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, color: DS.textPrimary, marginBottom: 12 }}>Curva de Retencao de Video</div>
          <RetentionChart data={d.retention} />
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, color: DS.textPrimary, marginBottom: 12 }}>Share Rate por Tipo de Conteudo</div>
          {d.shareByType.map((s, i) => (
            <HBar key={s.label} label={s.label} pct={s.pct} color={[nc, COLORS.purple, COLORS.orange, COLORS.teal][i % 4]} />
          ))}
        </div>
      </div>

      {/* Row: Stories Funnel + Reach Origin */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, color: DS.textPrimary, marginBottom: 12 }}>
            {network === "youtube" ? "Retencao por Momento" : "Stories Funnel"}
          </div>
          {d.stories.map((s, i) => (
            <div key={s.label} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: DS.textSecondary, marginBottom: 2 }}>
                <span>{s.label}</span><span>{s.pct}%</span>
              </div>
              <div style={{ height: 20, background: DS.divider, borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  width: `${s.pct}%`, height: "100%", borderRadius: 4,
                  background: `linear-gradient(90deg, ${nc}, ${nc}88)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, color: "#fff", fontWeight: 600,
                }}>{s.pct}%</div>
              </div>
            </div>
          ))}
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, color: DS.textPrimary, marginBottom: 12 }}>Origem do Alcance</div>
          {d.reachOrigin.map((r, i) => (
            <HBar key={r.label} label={r.label} pct={r.pct} color={[nc, COLORS.purple, COLORS.orange, COLORS.yellow][i % 4]} />
          ))}
        </div>
      </div>

      {/* Row: Follower Growth + Sentiment */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, color: DS.textPrimary, marginBottom: 12 }}>Crescimento de Seguidores</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "space-around" }}>
            {d.followers.map(f => {
              const maxF = Math.max(...d.followers.map(ff => Math.max(ff.novos, ff.unfollows)));
              return (
                <div key={f.week} style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 80, justifyContent: "center" }}>
                    <div style={{ width: 14, height: `${(f.novos / maxF) * 100}%`, background: DS.success, borderRadius: "2px 2px 0 0" }} />
                    <div style={{ width: 14, height: `${(f.unfollows / maxF) * 100}%`, background: DS.error, borderRadius: "2px 2px 0 0" }} />
                  </div>
                  <div style={{ fontSize: 10, color: DS.textTertiary, marginTop: 4 }}>{f.week}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8, fontSize: 11, color: DS.textSecondary }}>
            <span><span style={{ display: "inline-block", width: 8, height: 8, background: DS.success, borderRadius: 2, marginRight: 4 }} />Novos</span>
            <span><span style={{ display: "inline-block", width: 8, height: 8, background: DS.error, borderRadius: 2, marginRight: 4 }} />Unfollows</span>
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, color: DS.textPrimary, marginBottom: 12 }}>Analise de Sentimento</div>
          {[
            { label: "Positivo", val: d.sentiment.positivo, color: DS.success },
            { label: "Neutro", val: d.sentiment.neutro, color: DS.warning },
            { label: "Negativo", val: d.sentiment.negativo, color: DS.error },
          ].map(s => (
            <HBar key={s.label} label={s.label} pct={s.val} color={s.color} />
          ))}
        </div>
      </div>

      {/* Row: Age + Gender */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, color: DS.textPrimary, marginBottom: 12 }}>Faixa Etaria</div>
          {d.ageRange.map((a, i) => (
            <HBar key={a.range} label={a.range} pct={a.pct} color={[DS.accent, COLORS.purple, nc, COLORS.orange, COLORS.teal][i % 5]} />
          ))}
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, color: DS.textPrimary, marginBottom: 12 }}>Genero</div>
          {d.gender.map((g, i) => (
            <HBar key={g.label} label={g.label} pct={g.pct} color={[DS.accent, COLORS.pink, COLORS.purple][i]} />
          ))}
        </div>
      </div>

      {/* Top Posts */}
      <div style={cardStyle}>
        <div style={{ fontSize: 14, fontWeight: 600, color: DS.textPrimary, marginBottom: 12 }}>Top Posts</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${DS.border}` }}>
              {["Post", "Tipo", "Alcance", "Engajamento", "Saves"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: DS.textSecondary, fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.topPosts.map((p, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? DS.bgTableRow : DS.bgCard, borderBottom: `1px solid ${DS.divider}` }}>
                <td style={{ padding: "10px 12px", fontWeight: 500, color: DS.textPrimary }}>{p.title}</td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ background: `${nc}20`, color: nc, padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{p.type}</span>
                </td>
                <td style={{ padding: "10px 12px", color: DS.textDefault }}>{p.reach}</td>
                <td style={{ padding: "10px 12px", color: DS.textDefault }}>{p.engagement}</td>
                <td style={{ padding: "10px 12px", color: DS.textDefault }}>{p.saves}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function MarketingDash() {
  const [tab, setTab] = useState<Tab>("pago");
  const [network, setNetwork] = useState<Network>("instagram");

  const NETWORKS: { key: Network; label: string; icon: string }[] = [
    { key: "instagram", label: "Instagram", icon: "IG" },
    { key: "tiktok", label: "TikTok", icon: "TT" },
    { key: "youtube", label: "YouTube", icon: "YT" },
    { key: "facebook", label: "Facebook", icon: "FB" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: DS.textDefault }}>
      {/* ───── Header ───── */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: DS.textPrimary, margin: 0 }}>
          Marketing &middot; Auton Health
        </h1>
        <p style={{ fontSize: 14, color: DS.textSecondary, margin: "4px 0 0" }}>
          Dashboard de performance de marketing digital &mdash; healthtech B2B para medicos
        </p>
      </div>

      {/* ───── Tab Switcher ───── */}
      <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: `2px solid ${DS.border}` }}>
        {([
          { key: "pago" as Tab, label: "Trafego Pago" },
          { key: "organico" as Tab, label: "Trafego Organico" },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: tab === t.key ? 700 : 500,
              color: tab === t.key ? DS.primary : DS.textSecondary,
              background: "transparent",
              border: "none",
              borderBottom: tab === t.key ? `3px solid ${DS.primary}` : "3px solid transparent",
              cursor: "pointer",
              marginBottom: -2,
              transition: "all 0.2s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ───── Network Selector ───── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {NETWORKS.map(n => (
          <button
            key={n.key}
            onClick={() => setNetwork(n.key)}
            style={{
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: network === n.key ? 600 : 400,
              color: network === n.key ? "#fff" : DS.textSecondary,
              background: network === n.key ? DS.primary : DS.bgCard,
              border: `1px solid ${network === n.key ? DS.primary : DS.border}`,
              borderRadius: 20,
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: network === n.key ? DS.cardShadow : "none",
            }}
          >
            <span style={{ marginRight: 6, fontWeight: 700 }}>{n.icon}</span>{n.label}
          </button>
        ))}
      </div>

      {/* ═══════════ TAB: TRAFEGO PAGO ═══════════ */}
      {tab === "pago" && (
        <div>
          {/* KPI Cards */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
            {PAID_KPIS.map(k => <KpiCard key={k.label} {...k} />)}
          </div>

          {/* Health Score */}
          <SectionTitle>Health Score</SectionTitle>
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {HEALTH_INDICATORS.map(h => (
                <div key={h.label}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <StatusDot color={h.color} />
                    <span style={{ fontSize: 13, color: DS.textDefault }}>{h.label}</span>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: DS.textPrimary }}>
                    {h.label === "Budget Pace" || h.label === "Bounce Rate" ? `${h.value}%` : h.value}
                  </div>
                  <div style={{ height: 6, background: DS.divider, borderRadius: 3, marginTop: 6, overflow: "hidden" }}>
                    <div style={{ width: `${(h.value / h.max) * 100}%`, height: "100%", background: h.color, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Funnel */}
          <SectionTitle>Funil de Conversao</SectionTitle>
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            {FUNNEL_STEPS.map((s, i) => (
              <div key={s.label} style={{ marginBottom: i < FUNNEL_STEPS.length - 1 ? 12 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: DS.textDefault, marginBottom: 4 }}>
                  <span style={{ fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontWeight: 600 }}>{s.value}</span>
                </div>
                <div style={{ height: 28, background: DS.divider, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    width: `${s.pct}%`, height: "100%", borderRadius: 4,
                    background: `linear-gradient(90deg, ${DS.primary}, ${DS.primaryLight})`,
                    display: "flex", alignItems: "center", paddingLeft: 10,
                    fontSize: 11, color: "#fff", fontWeight: 600,
                  }}>
                    {s.pct}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Campaigns Table */}
          <SectionTitle>Campanhas</SectionTitle>
          <div style={{ ...cardStyle, marginBottom: 24, padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${DS.border}` }}>
                  {["Campanha", "Status", "Gasto", "Impressoes", "Cliques", "CTR", "Conversoes", "ROAS"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: DS.textSecondary, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAMPAIGNS.map((c, i) => (
                  <tr key={c.name} style={{ background: i % 2 === 0 ? DS.bgTableRow : DS.bgCard, borderBottom: `1px solid ${DS.divider}` }}>
                    <td style={{ padding: "12px 16px", fontWeight: 500, color: DS.textPrimary }}>{c.name}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        display: "inline-block", padding: "2px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600,
                        background: c.status === "Ativo" ? `${DS.success}20` : `${DS.warning}20`,
                        color: c.status === "Ativo" ? DS.success : DS.warning,
                      }}>{c.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>{c.spend}</td>
                    <td style={{ padding: "12px 16px" }}>{c.impressions}</td>
                    <td style={{ padding: "12px 16px" }}>{c.clicks}</td>
                    <td style={{ padding: "12px 16px" }}>{c.ctr}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 600 }}>{c.conversions}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: DS.success }}>{c.roas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ads List */}
          <SectionTitle>Anuncios</SectionTitle>
          <div style={{ ...cardStyle, marginBottom: 24, padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${DS.border}` }}>
                  {["Anuncio", "Tipo", "Status", "CPM", "CPC", "ROAS"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: DS.textSecondary, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ADS.map((a, i) => (
                  <tr key={a.name} style={{ background: i % 2 === 0 ? DS.bgTableRow : DS.bgCard, borderBottom: `1px solid ${DS.divider}` }}>
                    <td style={{ padding: "12px 16px", fontWeight: 500, color: DS.textPrimary }}>{a.name}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ background: `${DS.accent}20`, color: DS.accent, padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{a.type}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        padding: "2px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600,
                        background: a.status === "Ativo" ? `${DS.success}20` : `${DS.warning}20`,
                        color: a.status === "Ativo" ? DS.success : DS.warning,
                      }}>{a.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>{a.cpm}</td>
                    <td style={{ padding: "12px 16px" }}>{a.cpc}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: DS.success }}>{a.roas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Evolution Chart */}
          <SectionTitle>Evolucao (Impressoes e Cliques)</SectionTitle>
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            <SvgLineChart
              data={EVOLUTION_DATA as unknown as Record<string, unknown>[]}
              xKey="month"
              lines={[
                { key: "impressions", color: DS.primary, label: "Impressoes" },
                { key: "clicks", color: DS.accent, label: "Cliques" },
              ]}
            />
          </div>

          {/* Budget Pace */}
          <SectionTitle>Budget Pace</SectionTitle>
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            {BUDGET_PACE.map(b => (
              <div key={b.name} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: DS.textDefault, marginBottom: 4 }}>
                  <span style={{ fontWeight: 500 }}>{b.name}</span>
                  <span style={{ color: DS.textSecondary }}>{b.used}% de {b.total}</span>
                </div>
                <div style={{ height: 12, background: DS.divider, borderRadius: 6, overflow: "hidden" }}>
                  <div style={{
                    width: `${b.used}%`, height: "100%", borderRadius: 6,
                    background: b.used > 80 ? DS.error : b.used > 60 ? DS.warning : DS.success,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Heatmap */}
          <SectionTitle>Heatmap de Performance (Dia x Hora)</SectionTitle>
          <div style={{ ...cardStyle, marginBottom: 24, overflowX: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: `60px repeat(24, 1fr)`, gap: 2 }}>
              {/* header row */}
              <div />
              {Array.from({ length: 24 }, (_, h) => (
                <div key={h} style={{ fontSize: 9, color: DS.textTertiary, textAlign: "center", padding: "2px 0" }}>{h}h</div>
              ))}
              {/* data rows */}
              {HEATMAP_DATA.map((row, d) => (
                <React.Fragment key={d}>
                  <div style={{ fontSize: 11, color: DS.textSecondary, display: "flex", alignItems: "center" }}>{DAYS_LABELS[d]}</div>
                  {row.map((v, h) => (
                    <div key={h} style={{
                      width: "100%", aspectRatio: "1", background: heatColor(v),
                      borderRadius: 2, minWidth: 14, minHeight: 14,
                    }} />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Engagement by Audience */}
          <SectionTitle>Engajamento por Audiencia</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            {AUDIENCE_SEGMENTS.map(a => (
              <div key={a.name} style={cardStyle}>
                <div style={{ fontSize: 15, fontWeight: 600, color: DS.textPrimary, marginBottom: 12 }}>{a.name}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { l: "Impressoes", v: a.impressions },
                    { l: "CTR", v: a.ctr },
                    { l: "Conversoes", v: String(a.conversions) },
                    { l: "CPA", v: a.cpa },
                  ].map(m => (
                    <div key={m.l}>
                      <div style={{ fontSize: 11, color: DS.textTertiary, textTransform: "uppercase" }}>{m.l}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: DS.textPrimary }}>{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Social Section for selected network */}
          <SocialSection network={network} />
        </div>
      )}

      {/* ═══════════ TAB: TRAFEGO ORGANICO ═══════════ */}
      {tab === "organico" && (
        <div>
          {/* Organic KPIs */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
            {ORGANIC_KPIS.map(k => <KpiCard key={k.label} {...k} />)}
          </div>

          {/* Top Keywords */}
          <SectionTitle>Top Keywords</SectionTitle>
          <div style={{ ...cardStyle, marginBottom: 24, padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${DS.border}` }}>
                  {["Keyword", "Posicao", "Impressoes", "Cliques", "CTR"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: DS.textSecondary, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOP_KEYWORDS.map((k, i) => (
                  <tr key={k.keyword} style={{ background: i % 2 === 0 ? DS.bgTableRow : DS.bgCard, borderBottom: `1px solid ${DS.divider}` }}>
                    <td style={{ padding: "12px 16px", fontWeight: 500, color: DS.textPrimary }}>{k.keyword}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 28, height: 28, borderRadius: "50%",
                        background: k.position <= 5 ? `${DS.success}20` : k.position <= 10 ? `${DS.warning}20` : `${DS.error}20`,
                        color: k.position <= 5 ? DS.success : k.position <= 10 ? DS.warning : DS.error,
                        fontSize: 12, fontWeight: 700,
                      }}>{k.position}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>{k.impressions}</td>
                    <td style={{ padding: "12px 16px" }}>{k.clicks}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 600 }}>{k.ctr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sessions by Channel */}
          <SectionTitle>Sessoes por Canal (6 meses)</SectionTitle>
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            <StackedBarChart
              data={SESSIONS_BY_CHANNEL as unknown as Record<string, unknown>[]}
              keys={["pago", "organico", "direto", "social", "email"]}
              colors={[DS.accent, DS.success, COLORS.purple, COLORS.pink, COLORS.orange]}
              xKey="month"
            />
          </div>

          {/* Organic Evolution */}
          <SectionTitle>Evolucao Organica (Impressoes e Cliques)</SectionTitle>
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            <SvgLineChart
              data={ORGANIC_EVOLUTION as unknown as Record<string, unknown>[]}
              xKey="month"
              lines={[
                { key: "impressions", color: DS.success, label: "Impressoes" },
                { key: "clicks", color: DS.accent, label: "Cliques" },
              ]}
            />
          </div>

          {/* New Users by Channel */}
          <SectionTitle>Novos Usuarios por Canal</SectionTitle>
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            {NEW_USERS_CHANNEL.map((c, i) => {
              const maxV = Math.max(...NEW_USERS_CHANNEL.map(x => x.value));
              return (
                <div key={c.channel} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: DS.textDefault, marginBottom: 4 }}>
                    <span>{c.channel}</span>
                    <span style={{ fontWeight: 600 }}>{c.value.toLocaleString("pt-BR")}</span>
                  </div>
                  <div style={{ height: 10, background: DS.divider, borderRadius: 5, overflow: "hidden" }}>
                    <div style={{
                      width: `${(c.value / maxV) * 100}%`, height: "100%", borderRadius: 5,
                      background: [DS.success, DS.accent, COLORS.purple, COLORS.pink, COLORS.orange][i],
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paid vs Organic Conversions */}
          <SectionTitle>Conversoes: Pago vs Organico</SectionTitle>
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            <SideBySideBars
              data={PAID_VS_ORGANIC as unknown as Record<string, unknown>[]}
              key1="pago" key2="organico" xKey="month"
              color1={DS.accent} color2={DS.success}
              label1="Pago" label2="Organico"
            />
          </div>

          {/* Social Section for selected network */}
          <SocialSection network={network} />
        </div>
      )}
    </div>
  );
}
