"use client";
import React, { useState } from "react";

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
};

const C = { purple: "#7C3AED", orange: "#EA580C", teal: "#0F6E56" };

const cardBase: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: 3,
  boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
  padding: 24,
};

type SubTab =
  | "visao_geral"
  | "ranking"
  | "perfil_individual"
  | "mapa_mercado"
  | "voz_audiencia"
  | "alertas"
  | "briefing";

const subTabs: { key: SubTab; label: string }[] = [
  { key: "visao_geral", label: "Visao Geral" },
  { key: "ranking", label: "Ranking" },
  { key: "perfil_individual", label: "Perfil Individual" },
  { key: "mapa_mercado", label: "Mapa de Mercado" },
  { key: "voz_audiencia", label: "Voz da Audiencia" },
  { key: "alertas", label: "Alertas" },
  { key: "briefing", label: "Briefing" },
];

const competitors = [
  { pos: 1, handle: "@drajulianasaude", name: "Dra. Juliana Saude", score: 87, delta: +2, presence: 90, engagement: 88, commercial: 83 },
  { pos: 2, handle: "@drmarcosfuncional", name: "Dr. Marcos Funcional", score: 82, delta: -1, presence: 85, engagement: 80, commercial: 81 },
  { pos: 3, handle: "@clinicavidaintegra", name: "Clinica Vida Integra", score: 78, delta: +3, presence: 82, engagement: 72, commercial: 80 },
  { pos: 4, handle: "@nutridrapaula", name: "Dra. Paula Nutri", score: 74, delta: 0, presence: 78, engagement: 75, commercial: 69 },
  { pos: 5, handle: "@saudeintegrativabr", name: "Saude Integrativa BR", score: 71, delta: -2, presence: 75, engagement: 68, commercial: 70 },
  { pos: 6, handle: "@drlucasortomol", name: "Dr. Lucas Ortomolecular", score: 65, delta: +1, presence: 68, engagement: 62, commercial: 65 },
  { pos: 7, handle: "@equilibrioclinica", name: "Equilibrio Clinica", score: 58, delta: -3, presence: 60, engagement: 55, commercial: 59 },
  { pos: 8, handle: "@bemestarsaude", name: "Bem Estar Saude", score: 52, delta: +1, presence: 55, engagement: 48, commercial: 53 },
];

const alerts = [
  { type: "crit", text: "@drajulianasaude lancou curso online de medicina integrativa — novo produto detectado", time: "Hoje 14:32" },
  { type: "crit", text: "@clinicavidaintegra crescimento de 2.400 seguidores em 48h — possivel colaboracao com influencer", time: "Hoje 09:15" },
  { type: "warn", text: "@drmarcosfuncional alterou link da bio para funil de vendas — mudanca de estrategia comercial", time: "Ontem 18:40" },
  { type: "warn", text: "@nutridrapaula publicou 3 reels sobre eixo HPA em 5 dias — territorio nao explorado por voce", time: "Ontem 11:20" },
  { type: "ok", text: "Nenhum concorrente publicou sobre 'microbioma e saude mental' nos ultimos 30 dias — gap de conteudo", time: "03/Abr 06:00" },
  { type: "ok", text: "Sua taxa de engajamento (3.2%) esta acima da media do setor (2.1%) — posicao forte", time: "02/Abr 06:00" },
];

const formatos = [
  { label: "Reels", pct: 42 },
  { label: "Carrossel educativo", pct: 31 },
  { label: "Foto estatica", pct: 15 },
  { label: "Stories highlight", pct: 12 },
];

const sentimentos = [
  { handle: "@drajulianasaude", sentiment: 82 },
  { handle: "@drmarcosfuncional", sentiment: 71 },
  { handle: "@clinicavidaintegra", sentiment: 68 },
  { handle: "@nutridrapaula", sentiment: 74 },
  { handle: "@saudeintegrativabr", sentiment: 55 },
  { handle: "@drlucasortomol", sentiment: 48 },
];

const gaps = [
  { tema: "Microbioma e saude mental", evidencia: "0 posts no setor nos ultimos 30 dias. Volume de busca Google: 8.400/mes. Tendencia crescente." },
  { tema: "Protocolo de destoxificacao hepatica", evidencia: "Apenas 1 concorrente abordou. Engajamento 3x acima da media quando publicado." },
  { tema: "Suplementacao para sono — melatonina vs ashwagandha", evidencia: "Alta demanda nos comentarios. 12 perguntas identificadas em 7 dias." },
  { tema: "Exames funcionais vs convencionais — comparativo", evidencia: "Conteudo educativo com alto save rate (4.2%) quando publicado por @drajulianasaude." },
  { tema: "Jejum intermitente para mulheres — abordagem integrativa", evidencia: "Trending topic no Google. Nenhum concorrente com autoridade no tema." },
];

const briefing = {
  data: "07/Abr/2026",
  movimento: "A @drajulianasaude lancou um curso online de medicina integrativa com preco de R$ 497. Em 48h, o post de lancamento alcancou 45.000 impressoes e 2.100 comentarios — o maior engajamento individual do setor no trimestre. Isso sinaliza uma mudanca de modelo: de atendimento 1:1 para infoproduto escalavel.",
  oportunidade: "O tema 'microbioma e saude mental' nao foi abordado por nenhum concorrente nos ultimos 30 dias, apesar de ter 8.400 buscas mensais no Google e tendencia de crescimento de 22%. Criar uma serie de 3 carrosseis educativos pode posicionar a Auton como referencia antes que o espaco seja ocupado.",
  atencao: "A @clinicavidaintegra cresceu 2.400 seguidores em 48h, provavelmente via collab com influencer de saude. Se o crescimento se mantiver, ela ultrapassara o @drmarcosfuncional no ranking em 2 semanas. Monitorar se ha campanha paga associada.",
};

function alertDotColor(type: string): string {
  if (type === "crit") return DS.error;
  if (type === "warn") return DS.warning;
  return DS.success;
}

function sentimentColor(val: number): string {
  if (val > 70) return DS.success;
  if (val >= 50) return DS.warning;
  return DS.error;
}

function deltaLabel(d: number) {
  if (d > 0) return { text: `+${d}`, bg: "#D1FAE5", color: "#065F46" };
  if (d < 0) return { text: `${d}`, bg: "#FEE2E2", color: "#991B1B" };
  return { text: "=", bg: "#F3F4F6", color: "#6B7280" };
}

/* ---------- COMPONENT ---------- */

export default function ConcorrentesDash() {
  const [activeTab, setActiveTab] = useState<SubTab>("visao_geral");
  const [rankFilter, setRankFilter] = useState<string>("Todos");

  const rankFilters = ["Todos", "Instagram", "Google", "Comercial"];

  /* ---- visao geral content ---- */
  const renderVisaoGeral = () => (
    <div>
      {/* Topbar */}
      <div style={{ ...cardBase, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: DS.textPrimary }}>Monitoramento de Concorrentes</div>
          <div style={{ fontSize: 13, color: DS.textSecondary, marginTop: 4 }}>8 perfis monitorados &middot; Ultima atualizacao: hoje as 06:00</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ background: "#FEE2E2", color: DS.error, fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 12 }}>
            3 alertas novos
          </span>
          <span style={{ background: "#D1FAE5", color: "#065F46", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: DS.success, display: "inline-block" }} />
            Scrapper ativo
          </span>
          <span style={{ fontSize: 13, color: DS.textTertiary }}>08/Abr/2026</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {/* KPI 1 */}
        <div style={{ ...cardBase, borderTop: `3px solid ${C.purple}` }}>
          <div style={{ fontSize: 12, color: DS.textSecondary, marginBottom: 8 }}>Concorrentes monitorados</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: DS.textPrimary }}>8</div>
          <div style={{ fontSize: 12, color: C.purple, marginTop: 4 }}>+2 esta semana</div>
        </div>
        {/* KPI 2 */}
        <div style={{ ...cardBase, borderTop: `3px solid ${DS.success}` }}>
          <div style={{ fontSize: 12, color: DS.textSecondary, marginBottom: 8 }}>Lider de engajamento</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary }}>@drajulianasaude</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: DS.success, marginTop: 2 }}>4.8%</div>
        </div>
        {/* KPI 3 */}
        <div style={{ ...cardBase, borderTop: `3px solid ${DS.success}` }}>
          <div style={{ fontSize: 12, color: DS.textSecondary, marginBottom: 8 }}>Sentimento do setor</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: DS.textPrimary }}>72%</div>
          <div style={{ fontSize: 12, color: DS.success, marginTop: 4 }}>positivo</div>
        </div>
        {/* KPI 4 */}
        <div style={{ ...cardBase, borderTop: `3px solid ${DS.warning}` }}>
          <div style={{ fontSize: 12, color: DS.textSecondary, marginBottom: 8 }}>Gap de oportunidade</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: DS.textPrimary, lineHeight: 1.4 }}>Conteudo sobre eixo HPA</div>
          <div style={{ fontSize: 12, color: DS.warning, marginTop: 4 }}>territorio nao explorado</div>
        </div>
      </div>

      {/* Two cards side by side — Ranking + Alertas */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Ranking do setor */}
        <div style={cardBase}>
          <div style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, marginBottom: 16 }}>Ranking do setor</div>
          {/* Filter pills */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {rankFilters.map((f) => (
              <button
                key={f}
                onClick={() => setRankFilter(f)}
                style={{
                  padding: "5px 14px",
                  borderRadius: 16,
                  border: rankFilter === f ? "none" : `1px solid ${DS.border}`,
                  background: rankFilter === f ? DS.primary : "transparent",
                  color: rankFilter === f ? "#FFFFFF" : DS.textSecondary,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {f}
              </button>
            ))}
          </div>
          {/* Table */}
          <div>
            {competitors.map((c) => {
              const dl = deltaLabel(c.delta);
              const barScore =
                rankFilter === "Instagram"
                  ? c.presence
                  : rankFilter === "Google"
                  ? c.engagement
                  : rankFilter === "Comercial"
                  ? c.commercial
                  : c.score;
              return (
                <div
                  key={c.pos}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 0",
                    borderBottom: `1px solid ${DS.divider}`,
                  }}
                >
                  <span style={{ width: 22, fontSize: 13, fontWeight: 700, color: DS.textTertiary, textAlign: "center" }}>{c.pos}</span>
                  <span style={{ width: 140, fontSize: 13, fontWeight: 600, color: DS.textDefault, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.handle}</span>
                  <div style={{ flex: 1, height: 18, background: DS.divider, borderRadius: 4, overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${barScore}%`,
                        height: "100%",
                        background: C.purple,
                        opacity: 0.3 + 0.7 * (barScore / 100),
                        borderRadius: 4,
                        transition: "width 0.3s",
                      }}
                    />
                  </div>
                  <span style={{ width: 30, fontSize: 13, fontWeight: 700, color: DS.textPrimary, textAlign: "right" }}>{barScore}</span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 10,
                      background: dl.bg,
                      color: dl.color,
                      minWidth: 32,
                      textAlign: "center",
                    }}
                  >
                    {dl.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alertas recentes */}
        <div style={cardBase}>
          <div style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, marginBottom: 16 }}>Alertas recentes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {alerts.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: alertDotColor(a.type),
                    flexShrink: 0,
                    marginTop: 5,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: DS.textDefault, lineHeight: 1.45 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: DS.textTertiary, marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Three cards in a row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Formatos dominantes */}
        <div style={cardBase}>
          <div style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, marginBottom: 16 }}>Formatos dominantes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {formatos.map((f, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: DS.textDefault }}>{f.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: DS.textPrimary }}>{f.pct}%</span>
                </div>
                <div style={{ height: 10, background: DS.divider, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${f.pct}%`, height: "100%", background: C.purple, borderRadius: 4, opacity: 0.4 + 0.6 * (f.pct / 42) }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sentimento por concorrente */}
        <div style={cardBase}>
          <div style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, marginBottom: 16 }}>Sentimento por concorrente</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sentimentos.map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: DS.textDefault }}>{s.handle}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: sentimentColor(s.sentiment) }}>{s.sentiment}%</span>
                </div>
                <div style={{ height: 8, background: DS.divider, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${s.sentiment}%`, height: "100%", background: sentimentColor(s.sentiment), borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gaps de oportunidade (IA) */}
        <div style={cardBase}>
          <div style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary, marginBottom: 16 }}>Gaps de oportunidade (IA)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {gaps.map((g, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${DS.success}`, paddingLeft: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: DS.textPrimary, marginBottom: 2 }}>{g.tema}</div>
                <div style={{ fontSize: 12, color: DS.textSecondary, lineHeight: 1.45 }}>{g.evidencia}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Briefing semanal */}
      <div style={{ ...cardBase, borderLeft: `4px solid ${C.purple}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: DS.textPrimary }}>Briefing semanal</div>
          <span style={{ fontSize: 12, color: DS.textTertiary }}>{briefing.data}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.purple, marginBottom: 6 }}>Movimento da semana</div>
            <div style={{ fontSize: 13, color: DS.textDefault, lineHeight: 1.6 }}>{briefing.movimento}</div>
          </div>
          <div style={{ height: 1, background: DS.divider }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: DS.success, marginBottom: 6 }}>Oportunidade da semana</div>
            <div style={{ fontSize: 13, color: DS.textDefault, lineHeight: 1.6 }}>{briefing.oportunidade}</div>
          </div>
          <div style={{ height: 1, background: DS.divider }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: DS.warning, marginBottom: 6 }}>Atencao</div>
            <div style={{ fontSize: 13, color: DS.textDefault, lineHeight: 1.6 }}>{briefing.atencao}</div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ---- placeholder for other tabs ---- */
  const tabLabels: Record<SubTab, string> = {
    visao_geral: "Visao Geral",
    ranking: "Ranking",
    perfil_individual: "Perfil Individual",
    mapa_mercado: "Mapa de Mercado",
    voz_audiencia: "Voz da Audiencia",
    alertas: "Alertas",
    briefing: "Briefing",
  };

  const renderPlaceholder = (tab: SubTab) => (
    <div style={cardBase}>
      <div style={{ fontSize: 18, fontWeight: 700, color: DS.textPrimary, marginBottom: 8 }}>{tabLabels[tab]}</div>
      <div style={{ fontSize: 14, color: DS.textSecondary }}>Em desenvolvimento — dados do scrapper serao integrados aqui</div>
    </div>
  );

  return (
    <div style={{ background: DS.bgPage, minHeight: "100vh", padding: 32 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Sub-tab buttons */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {subTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding: "8px 18px",
                borderRadius: 20,
                border: activeTab === t.key ? "none" : `1px solid ${DS.border}`,
                background: activeTab === t.key ? DS.primary : "#FFFFFF",
                color: activeTab === t.key ? "#FFFFFF" : DS.textSecondary,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: activeTab === t.key ? DS.cardShadow : "none",
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "visao_geral" ? renderVisaoGeral() : renderPlaceholder(activeTab)}
      </div>
    </div>
  );
}
