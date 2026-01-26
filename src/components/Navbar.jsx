import { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { LanguageContext } from "../i18n/LanguageContext";
import { useT } from "../i18n/useT";

/**
 * Robust active section:
 * 1) IntersectionObserver (fast)
 * 2) Scroll fallback (accurate for last sections)
 */
function useActiveSectionRobust(ids) {
  const [active, setActive] = useState(ids?.[0] || "about");

  useEffect(() => {
    const getElements = () =>
      ids.map((id) => document.getElementById(id)).filter(Boolean);

    let elements = getElements();
    if (!elements.length) return;

    // 1) IntersectionObserver
    const obs = new IntersectionObserver(
      (entries) => {
        // pick the most visible intersecting section
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

        if (best?.target?.id) setActive(best.target.id);
      },
      {
        // make it easier to detect lower sections
        threshold: [0.15, 0.25, 0.35, 0.5],
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    elements.forEach((el) => obs.observe(el));

    // 2) Scroll fallback (fixes projects/cert/contact not updating)
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;

        // refresh elements in case of rerender
        elements = getElements();
        if (!elements.length) return;

        // If near bottom => set last existing section active
        const nearBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
        if (nearBottom) {
          setActive(elements[elements.length - 1].id);
          return;
        }

        // choose the section closest to top offset
        const topOffset = window.innerHeight * 0.22; // "reading line"
        let bestId = active;
        let bestDist = Infinity;

        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top - topOffset);
          // only consider sections that are around viewport
          if (rect.bottom > 80 && rect.top < window.innerHeight - 80) {
            if (dist < bestDist) {
              bestDist = dist;
              bestId = el.id;
            }
          }
        }

        if (bestId && bestId !== active) setActive(bestId);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // trigger once
    onScroll();

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);

  return active;
}

export default function Navbar() {
  const themeCtx = useContext(ThemeContext) || {};
  const langCtx = useContext(LanguageContext) || {};
  const { t } = useT();

  // Theme: supports toggleTheme OR setTheme
  const toggleTheme =
    themeCtx.toggleTheme ||
    (() => themeCtx.setTheme?.((prev) => (prev === "dark" ? "light" : "dark")));

  // Language: supports toggleLang OR setLang
  const lang = langCtx.lang || "en";
  const toggleLang =
    langCtx.toggleLang ||
    (() => langCtx.setLang?.(lang === "en" ? "ar" : "en"));

  const sections = useMemo(
    () => ["about", "skills", "projects", "experience", "certificates", "contact"],
    []
  );

  const existingSections = useMemo(() => {
    return sections.filter((id) => typeof document !== "undefined" && document.getElementById(id));
  }, [sections]);

  const idsToTrack = existingSections.length ? existingSections : sections;

  const active = useActiveSectionRobust(idsToTrack);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const linkStyle = (id) => ({
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid var(--border)",
    background: active === id ? "rgba(124,92,255,0.14)" : "transparent",
    borderColor: active === id ? "rgba(124,92,255,0.35)" : "var(--border)",
    transition: "all 280ms ease",
    fontSize: 13,
    cursor: "pointer",
    color: "var(--text)",
  });

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        background: "color-mix(in srgb, var(--bg) 88%, transparent)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "14px 0",
        }}
      >
        <div style={{ fontWeight: 950, letterSpacing: "-0.01em" }}>
          {t.navBrand || "Ahmed Alshamrani"}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {sections.includes("about") && (
            <button style={linkStyle("about")} onClick={() => goTo("about")}>
              {t.navAbout || "About"}
            </button>
          )}
          {sections.includes("skills") && (
            <button style={linkStyle("skills")} onClick={() => goTo("skills")}>
              {t.navSkills || "Skills"}
            </button>
          )}
          {sections.includes("projects") && (
            <button style={linkStyle("projects")} onClick={() => goTo("projects")}>
              {t.navProjects || "Projects"}
            </button>
          )}
          {sections.includes("experience") && (
            <button style={linkStyle("experience")} onClick={() => goTo("experience")}>
              {t.navExperience || "Experience"}
            </button>
          )}
          {sections.includes("certificates") && (
            <button style={linkStyle("certificates")} onClick={() => goTo("certificates")}>
              {t.navCertificates || "Certificates"}
            </button>
          )}
          {sections.includes("contact") && (
            <button style={linkStyle("contact")} onClick={() => goTo("contact")}>
              {t.navContact || "Contact"}
            </button>
          )}

          <div style={{ width: 1, height: 26, background: "var(--border)", margin: "0 4px" }} />

          <button className="btn" onClick={toggleLang}>
            {lang === "en" ? "AR" : "EN"}
          </button>

          <button className="btn primary" onClick={toggleTheme}>
            {t.navTheme || "Theme"}
          </button>
        </div>
      </div>
    </div>
  );
}