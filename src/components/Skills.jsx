import Reveal from "./Reveal";
import { useT } from "../i18n/useT";

export default function Skills() {
  const { t } = useT();

  const core = [t.skillCore1, t.skillCore2, t.skillCore3, t.skillCore4].filter(Boolean);
  const learning = [t.skillLearn1, t.skillLearn2, t.skillLearn3].filter(Boolean);

  const chip = (text) => (
    <span
      key={text}
      style={{
        border: "1px solid var(--border)",
        padding: "7px 11px",
        borderRadius: 999,
        fontSize: 13,
        background: "color-mix(in srgb, var(--card) 70%, transparent)",
      }}
    >
      {text}
    </span>
  );

  return (
    <section id="skills">
      <div className="container">
        <Reveal>
          <h3 style={{ margin: 0, fontSize: 22 }}>{t.skillsTitle}</h3>
          <p style={{ margin: "10px 0 0", color: "var(--muted)", lineHeight: 1.9 }}>
            {t.skillsSubtitle}
          </p>
        </Reveal>

        <div
          className="grid"
          style={{
            marginTop: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          <Reveal delay={80}>
            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontWeight: 950 }}>{t.skillsCoreTitle}</div>
              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {core.map(chip)}
              </div>
              <div style={{ marginTop: 12, color: "var(--muted)", lineHeight: 1.85 }}>
                {t.skillsCoreNote}
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontWeight: 950 }}>{t.skillsLearningTitle}</div>
              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {learning.map(chip)}
              </div>
              <div style={{ marginTop: 12, color: "var(--muted)", lineHeight: 1.85 }}>
                {t.skillsLearningNote}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}