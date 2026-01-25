import { useMemo, useRef, useState } from "react";
import { projects } from "../data/projects";
import { useT } from "../i18n/useT";
import Reveal from "./Reveal";

export default function Projects() {
  const { t } = useT();

  const [open, setOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) || null,
    [activeProjectId]
  );

  const images = activeProject?.images?.filter(Boolean) || [];
  const title = activeProject ? (t[activeProject.titleKey] || "Project") : "";
  const desc = activeProject ? (t[activeProject.descriptionKey] || "") : "";

  const openGallery = (id) => {
    setActiveProjectId(id);
    setActiveIndex(0);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setActiveProjectId(null);
    setActiveIndex(0);
  };

  // Circular navigation
  const prev = () => {
    if (!images.length) return;
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = () => {
    if (!images.length) return;
    setActiveIndex((i) => (i + 1) % images.length);
  };

  // Swipe
  const dragRef = useRef({ isDown: false, startX: 0 });
  const SWIPE_THRESHOLD = 45;

  const onPointerDown = (e) => {
    if (!images.length) return;
    dragRef.current.isDown = true;
    dragRef.current.startX = e.clientX;
  };

  const onPointerUp = (e) => {
    if (!dragRef.current.isDown) return;
    dragRef.current.isDown = false;

    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;

    if (dx < 0) next();
    else prev();
  };

  const onPointerCancel = () => {
    dragRef.current.isDown = false;
  };

  return (
    <section id="projects">
      <div className="container">
        <Reveal>
          <div style={{ marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 22 }}>{t.projectsTitle || "Projects"}</h3>
            <p style={{ margin: "8px 0 0", color: "var(--muted)", lineHeight: 1.9 }}>
              {t.projectsSubtitle || ""}
            </p>
          </div>
        </Reveal>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {projects.map((p, idx) => {
            const cover = p.images?.[0] || "";
            const cardTitle = t[p.titleKey] || "Project";
            const cardDesc = t[p.descriptionKey] || "";
            const year = p.year || "";

            return (
              <Reveal key={p.id} delay={idx * 80}>
                <article
                  className="card"
                  style={{ overflow: "hidden", cursor: "pointer" }}
                  onClick={() => openGallery(p.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openGallery(p.id);
                  }}
                >
                  {cover ? (
                    <div
                      className="project-media"
                      style={{
                        // ✅ Used by CSS for blurred background
                        "--bgImg": `url(${cover})`,
                      }}
                    >
                      <img src={cover} alt={cardTitle} />
                    </div>
                  ) : (
                    <div
                      style={{
                        height: 190,
                        display: "grid",
                        placeItems: "center",
                        color: "var(--muted)",
                        borderBottom: "1px solid var(--border)",
                        background:
                          "radial-gradient(520px 220px at 30% 20%, rgba(124,92,255,0.18), transparent 60%)",
                      }}
                    >
                      {/* TODO: Add a cover image as the first item in images[] */}
                      Project cover will be added here
                    </div>
                  )}

                  <div style={{ padding: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div style={{ fontWeight: 950, fontSize: 16 }}>{cardTitle}</div>
                      <div style={{ color: "var(--muted)" }}>{year}</div>
                    </div>

                    <p style={{ margin: "10px 0 0", color: "var(--muted)", lineHeight: 1.9 }}>
                      {cardDesc}
                    </p>

                    <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {(p.tech || []).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            border: "1px solid var(--border)",
                            padding: "6px 10px",
                            borderRadius: 999,
                            fontSize: 12,
                            background: "color-mix(in srgb, var(--card) 70%, transparent)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div style={{ marginTop: 14, color: "var(--muted)", fontSize: 12 }}>
                      {t.projectsHintOpen || "Click to view images"}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {open && (
          <div className="modal-wrap" onClick={close}>
            <div className="card modal-card" onClick={(e) => e.stopPropagation()}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: 14,
                  borderBottom: "1px solid var(--border)",
                  background: "color-mix(in srgb, var(--bg) 90%, transparent)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 950 }}>{title}</div>
                  <div style={{ marginTop: 6, color: "var(--muted)", lineHeight: 1.7, maxWidth: 720 }}>
                    {desc}
                  </div>
                </div>

                <button className="btn" onClick={close}>
                  {t.close || "Close"}
                </button>
              </div>

              <div
                className="project-modal-media"
                style={{
                  "--bgImg": images.length ? `url(${images[activeIndex]})` : "none",
                  userSelect: "none",
                  touchAction: "pan-y",
                  position: "relative",
                }}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}
              >
                {images.length ? (
                  <img
                    src={images[activeIndex]}
                    alt={`${title} image ${activeIndex + 1}`}
                    draggable={false}
                  />
                ) : (
                  <div
                    style={{
                      height: "min(520px, 62vh)",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--muted)",
                      padding: 24,
                      textAlign: "center",
                    }}
                  >
                    {/* TODO: Add images[] for this project in src/data/projects.js */}
                    No images yet — add images[] to this project
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      className="btn"
                      onClick={prev}
                      style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 2 }}
                    >
                      ‹
                    </button>
                    <button
                      className="btn"
                      onClick={next}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", zIndex: 2 }}
                    >
                      ›
                    </button>

                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        bottom: 10,
                        transform: "translateX(-50%)",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.85)",
                        background: "rgba(0,0,0,0.25)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        padding: "6px 10px",
                        borderRadius: 999,
                        backdropFilter: "blur(8px)",
                        zIndex: 2,
                      }}
                    >
                      {activeIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div style={{ padding: 14, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                  {images.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setActiveIndex(i)}
                      style={{
                        border:
                          i === activeIndex
                            ? "1px solid rgba(124,92,255,0.65)"
                            : "1px solid var(--border)",
                        borderRadius: 14,
                        padding: 0,
                        overflow: "hidden",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                      aria-label={`Open image ${i + 1}`}
                    >
                      <img src={src} alt={`thumb ${i + 1}`} className="project-thumb" draggable={false} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}