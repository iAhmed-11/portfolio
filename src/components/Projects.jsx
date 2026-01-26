// src/components/Projects.jsx
import { useEffect, useMemo, useRef, useState } from "react";
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

  const atFirst = activeIndex <= 0;
  const atLast = activeIndex >= images.length - 1;

  // Non-circular navigation
  const prev = () => {
    if (!images.length) return;
    setActiveIndex((i) => Math.max(0, i - 1));
  };

  const next = () => {
    if (!images.length) return;
    setActiveIndex((i) => Math.min(images.length - 1, i + 1));
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

  // Lock body scroll when modal is open (prevents background moving on mobile)
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "auto";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
    };
  }, [open]);

  // Keyboard: ESC closes, arrows navigate (desktop)
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      const tag = (e.target?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target?.isContentEditable) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length, activeIndex]);

  return (
    <section id="projects">
      <div className="container">
        <Reveal>
          <div style={{ marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 22 }}>
              {t.projectsTitle || "Projects"}
            </h3>
            <p style={{ margin: "8px 0 0", color: "var(--muted)", lineHeight: 1.9 }}>
              {t.projectsSubtitle || ""}
            </p>
          </div>
        </Reveal>

        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
          {projects.map((p, idx) => {
            const safeImages = (p.images || []).filter(Boolean);
            const cover = safeImages[0] || "";

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
                      style={{ "--bgImg": `url(${cover})` }}
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
          <div className="modal-wrap" onClick={close} style={{ overscrollBehavior: "contain" }}>
            <div className="card modal-card" onClick={(e) => e.stopPropagation()}>
              <div
                className="modal-head"
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

                <button className="btn" onClick={close} type="button">
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
                    No images yet — add images[] to this project
                  </div>
                )}

                {/* arrows are hidden at first/last */}
                {images.length > 1 && !atFirst && (
                  <button
                    className="btn"
                    onClick={prev}
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 2,
                    }}
                    aria-label="Previous image"
                    type="button"
                  >
                    ‹
                  </button>
                )}

                {images.length > 1 && !atLast && (
                  <button
                    className="btn"
                    onClick={next}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 2,
                    }}
                    aria-label="Next image"
                    type="button"
                  >
                    ›
                  </button>
                )}

                {images.length > 1 && (
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
                )}
              </div>

              {images.length > 1 && (
                <div style={{ padding: 14, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                  {images.map((src, i) => (
                    <button
                      key={`${src}-${i}`}
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
                      type="button"
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