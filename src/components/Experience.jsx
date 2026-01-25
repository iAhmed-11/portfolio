import Reveal from "./Reveal";
import { useT } from "../i18n/useT";

export default function Experience() {
  const { t } = useT();

  const items = [
    {
      title: t.exp1Title,
      org: t.exp1Org,
      date: t.exp1Date,
      note: t.exp1Note,
    },
    {
      title: t.exp2Title,
      org: t.exp2Org,
      date: t.exp2Date,
      note: t.exp2Note,
    },
    {
      title: t.exp3Title,
      org: t.exp3Org,
      date: t.exp3Date,
      note: t.exp3Note,
    },
  ];

  return (
    <section id="experience">
      <div className="container">
        <Reveal>
          <div style={{ marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 22 }}>{t.expTitle}</h3>
            <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>{t.expSubtitle}</p>
          </div>
        </Reveal>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {items.map((x, i) => (
            <Reveal key={x.title} delay={i * 80}>
              <div className="card" style={{ padding: 18 }}>
                <div style={{ fontWeight: 950 }}>{x.title}</div>
                <div style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.7 }}>
                  {x.org} • {x.date}
                </div>
                <div style={{ marginTop: 10, color: "var(--muted)", lineHeight: 1.9 }}>
                  {x.note}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}