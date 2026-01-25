import Reveal from "./Reveal";
import { useT } from "../i18n/useT";

export default function About() {
  const { t } = useT();

  return (
    <section id="about">
      <div className="container">
        <Reveal>
          <h3 style={{ margin: 0, fontSize: 22 }}>{t.aboutTitle}</h3>
          <p
            style={{
              margin: "12px 0 0",
              color: "var(--muted)",
              lineHeight: 1.95,
              maxWidth: 820,
            }}
          >
            {t.aboutBody}
          </p>

          <div
            className="grid"
            style={{
              marginTop: 18,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 950 }}>{t.aboutPoint1Title}</div>
              <div style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.85 }}>
                {t.aboutPoint1Body}
              </div>
            </div>

            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 950 }}>{t.aboutPoint2Title}</div>
              <div style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.85 }}>
                {t.aboutPoint2Body}
              </div>
            </div>

            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 950 }}>{t.aboutPoint3Title}</div>
              <div style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.85 }}>
                {t.aboutPoint3Body}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}