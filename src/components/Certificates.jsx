// src/components/Certificates.jsx
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";
import { LanguageContext } from "../i18n/LanguageContext";

/* === Images === */
import kaustImg from "../assets/images/certificates/kaust-ai-program.jpg";
import dlaiDeepNN from "../assets/images/certificates/dlai-deep-neural-networks.jpg";
import dlaiMath from "../assets/images/certificates/dlai-math-for-ml.jpg";
import ibmEda from "../assets/images/certificates/ibm-eda-ml.jpg";
import ibmReg from "../assets/images/certificates/ibm-supervised-regression.jpg";

/* ✅ Python Track images */
import umichBasics from "../assets/images/certificates/umich-python-basics.jpg";
import umichFunctions from "../assets/images/certificates/umich-python-functions-files.jpg";
import umichOop from "../assets/images/certificates/umich-python-classes-inheritance.jpg";
import umichData from "../assets/images/certificates/umich-python-data-collection.jpg";

function Modal({ open, onClose, title, children, bodyRef }) {
  if (!open) return null;

  return (
    <div className="cert-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="cert-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="cert-modal-head">
          <div className="cert-modal-title" style={{ opacity: 0.92 }}>
            {title}
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close" type="button">
            ✕
          </button>
        </div>

        <div className="cert-modal-body" ref={bodyRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

function CertCard({ featured, title, issuer, date, image, onOpen, tags = [] }) {
  return (
    <button
      className={`cert-card card ${featured ? "cert-featured" : ""}`}
      onClick={onOpen}
      style={{ padding: 0, textAlign: "left" }}
      type="button"
    >
      <div className="cert-thumb">
        <img src={image} alt={title} loading="lazy" />
        {featured && <div className="cert-badge">Featured</div>}
      </div>

      <div className="cert-info">
        <div className="cert-title">{title}</div>
        <div className="cert-meta">
          {issuer} • {date}
        </div>

        {!!tags.length && (
          <div className="cert-tags">
            {tags.map((x) => (
              <span key={x} className="cert-tag">
                {x}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

function TrackCard({ title, issuer, date, count, onOpen, tags = [] }) {
  return (
    <button className="cert-card card cert-track" onClick={onOpen} type="button">
      <div className="track-top">
        <div className="track-icon" aria-hidden="true">
          ▦
        </div>
        <div className="track-count">{count}</div>
      </div>

      <div className="cert-info" style={{ paddingTop: 10 }}>
        <div className="cert-title">{title}</div>
        <div className="cert-meta">
          {issuer} • {date}
        </div>

        <div className="track-hint">Click to view all</div>

        {!!tags.length && (
          <div className="cert-tags">
            {tags.map((x) => (
              <span key={x} className="cert-tag">
                {x}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

export default function Certificates() {
  const { lang } = useContext(LanguageContext);

  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null); // cert id OR "py:<id>"

  // ✅ for scrolling with ArrowUp/ArrowDown
  const modalBodyRef = useRef(null);

  const text = useMemo(() => {
    const ar = {
      title: "الشهادات",
      subtitle: "شهادات ودورات تدريبية مختارة",
      all: "الكل",
      ai: "ذكاء",
      data: "بيانات",
      programming: "برمجة",
      tools: "أدوات",
      search: "ابحث عن شهادة...",

      pythonTrackTitle: "مسار Python — University of Michigan",
      pythonTrackIssuer: "University of Michigan (Coursera)",
      pythonTrackCount: "4 شهادات",
      insideTrackHint: "اضغط على أي شهادة لعرضها",
    };

    const en = {
      title: "Certificates",
      subtitle: "Selected certificates and training courses.",
      all: "All",
      ai: "AI",
      data: "Data",
      programming: "Programming",
      tools: "Tools",
      search: "Search certificates...",

      pythonTrackTitle: "Python Track — University of Michigan",
      pythonTrackIssuer: "University of Michigan (Coursera)",
      pythonTrackCount: "4 Certificates",
      insideTrackHint: "Click any certificate to open it",
    };

    return lang === "ar" ? ar : en;
  }, [lang]);

  const pythonItems = useMemo(() => {
    const issuer = "University of Michigan";
    const date = "June 2024";

    return [
      { id: "py-basics", title: "Python Basics", issuer, date, image: umichBasics, tags: ["Python"] },
      { id: "py-functions", title: "Python Functions, Files, and Dictionaries", issuer, date, image: umichFunctions, tags: ["Python"] },
      { id: "py-oop", title: "Python Classes and Inheritance", issuer, date, image: umichOop, tags: ["Python", "OOP"] },
      { id: "py-data", title: "Data Collection and Processing with Python", issuer, date, image: umichData, tags: ["Python", "Data"] },
    ];
  }, []);

  const certs = useMemo(() => {
    return [
      {
        id: "kaust",
        featured: true,
        category: "ai",
        title: lang === "ar"
          ? "برنامج الذكاء الاصطناعي التمهيدي — KAUST × NTDP"
          : "Introductory AI Training Program — KAUST × NTDP",
        issuer: "KAUST Academy + NTDP",
        date: "Jan 2025",
        image: kaustImg,
        tags: ["AI"],
      },
      {
        id: "dlai1",
        category: "ai",
        title: lang === "ar"
          ? "تحسين الشبكات العصبية العميقة: الضبط والتنظيم والتحسين"
          : "Improving Deep Neural Networks: Tuning, Regularization & Optimization",
        issuer: "DeepLearning.AI",
        date: "Dec 2024",
        image: dlaiDeepNN,
        tags: ["AI", "Deep Learning"],
      },
      {
        id: "dlai2",
        category: "ai",
        title: lang === "ar"
          ? "رياضيات لتعلم الآلة وعلوم البيانات"
          : "Mathematics for Machine Learning & Data Science",
        issuer: "DeepLearning.AI",
        date: "Nov 2024",
        image: dlaiMath,
        tags: ["Math", "ML"],
      },
      {
        id: "ibm1",
        category: "data",
        title: lang === "ar"
          ? "تحليل استكشافي للبيانات لتعلم الآلة"
          : "Exploratory Data Analysis for Machine Learning",
        issuer: "IBM",
        date: "Dec 2024",
        image: ibmEda,
        tags: ["Data", "ML"],
      },
      {
        id: "ibm2",
        category: "ai",
        title: lang === "ar"
          ? "تعلم آلة مُوجّه: الانحدار"
          : "Supervised Machine Learning: Regression",
        issuer: "IBM",
        date: "Dec 2024",
        image: ibmReg,
        tags: ["ML", "Regression"],
      },
      {
        id: "track",
        isTrack: true,
        category: "programming",
        title: text.pythonTrackTitle,
        issuer: text.pythonTrackIssuer,
        date: "2024",
        countLabel: text.pythonTrackCount,
        tags: ["Python"],
      },
    ];
  }, [lang, text.pythonTrackTitle, text.pythonTrackIssuer, text.pythonTrackCount]);

  const visible = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return certs.filter((c) => {
      const matchesFilter = filter === "all" ? true : c.category === filter;
      const hay = `${c.title} ${c.issuer} ${(c.tags || []).join(" ")}`.toLowerCase();
      const matchesQ = !qq ? true : hay.includes(qq);
      return matchesFilter && matchesQ;
    });
  }, [certs, filter, q]);

  const openIsPython = typeof open === "string" && open.startsWith("py:");
  const openPythonId = openIsPython ? open.replace("py:", "") : null;

  const openItem = useMemo(() => certs.find((x) => x.id === open), [certs, open]);
  const openPython = useMemo(() => pythonItems.find((x) => x.id === openPythonId), [pythonItems, openPythonId]);

  // Helper to scroll modal body with arrows
  const scrollModalBody = (dir) => {
    const el = modalBodyRef.current;
    if (!el) return;
    const step = Math.max(80, Math.round(el.clientHeight * 0.18));
    el.scrollBy({ top: dir === "down" ? step : -step, behavior: "smooth" });
  };

  // ✅ Keyboard:
  // - ESC closes
  // - ↑ ↓ scroll within modal (if large)
  // - ← → only works when inside python track browsing (multiple items)
  useEffect(() => {
    if (!openItem && !openPython) return;

    const onKeyDown = (e) => {
      const tag = (e.target?.tagName || "").toLowerCase();
      const isTyping = tag === "input" || tag === "textarea" || e.target?.isContentEditable;
      if (isTyping) return;

      if (e.key === "Escape") {
        e.preventDefault();
        if (openPython) setOpen("track");
        else setOpen(null);
        return;
      }

      // scroll (no UI arrows)
      if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollModalBody("down");
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollModalBody("up");
        return;
      }

      // Left/Right only for multi-item browsing in python track
      // (no looping)
      const canLR = !!openPython && pythonItems.length > 1;
      if (!canLR) return;

      const idx = pythonItems.findIndex((x) => x.id === openPythonId);
      if (idx === -1) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIdx = Math.max(0, idx - 1);
        setOpen(`py:${pythonItems[prevIdx].id}`);
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIdx = Math.min(pythonItems.length - 1, idx + 1);
        setOpen(`py:${pythonItems[nextIdx].id}`);
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openItem, openPython, openPythonId, pythonItems]);

  return (
    <section id="certificates">
      <div className="container">
        <Reveal>
          <h3 style={{ margin: 0, fontSize: 22 }}>{text.title}</h3>
          <p style={{ margin: "10px 0 0", color: "var(--muted)", maxWidth: 760 }}>
            {text.subtitle}
          </p>

          <div className="cert-controls">
            <div className="cert-filters">
              <button className={`btn ${filter === "all" ? "primary" : ""}`} onClick={() => setFilter("all")} type="button">
                {text.all}
              </button>

              <button className={`btn ${filter === "ai" ? "primary" : ""}`} onClick={() => setFilter("ai")} type="button">
                {text.ai}
              </button>

              <button className={`btn ${filter === "data" ? "primary" : ""}`} onClick={() => setFilter("data")} type="button">
                {text.data}
              </button>

              <button className={`btn ${filter === "programming" ? "primary" : ""}`} onClick={() => setFilter("programming")} type="button">
                {text.programming}
              </button>

              {/* Tools hidden for future */}
              {/*
              <button className={`btn ${filter === "tools" ? "primary" : ""}`} onClick={() => setFilter("tools")} type="button">
                {text.tools}
              </button>
              */}
            </div>

            <input className="cert-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={text.search} />
          </div>

          <div className="grid cert-grid">
            {visible.map((c) => {
              if (c.isTrack) {
                return (
                  <TrackCard
                    key={c.id}
                    title={c.title}
                    issuer={c.issuer}
                    date={c.date}
                    count={c.countLabel}
                    tags={c.tags}
                    onOpen={() => setOpen(c.id)}
                  />
                );
              }

              return (
                <CertCard
                  key={c.id}
                  featured={c.featured}
                  title={c.title}
                  issuer={c.issuer}
                  date={c.date}
                  image={c.image}
                  tags={c.tags}
                  onOpen={() => setOpen(c.id)}
                />
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Track Modal */}
      <Modal
        open={!!openItem && openItem?.isTrack}
        onClose={() => setOpen(null)}
        title={openItem?.title || ""}
        bodyRef={modalBodyRef}
      >
        <div style={{ color: "var(--muted)", marginBottom: 12 }}>
          {openItem?.issuer} • {openItem?.date} — {text.insideTrackHint}
        </div>

        <div className="cert-grid" style={{ marginTop: 0 }}>
          {pythonItems.map((x) => (
            <CertCard
              key={x.id}
              featured={false}
              title={x.title}
              issuer={x.issuer}
              date={x.date}
              image={x.image}
              tags={x.tags}
              onOpen={() => setOpen(`py:${x.id}`)}
            />
          ))}
        </div>
      </Modal>

      {/* Individual Python certificate modal */}
      <Modal
        open={!!openPython}
        onClose={() => setOpen("track")}
        title={openPython?.title || ""}
        bodyRef={modalBodyRef}
      >
        <div className="cert-modal-img">
          <img src={openPython?.image} alt={openPython?.title} />
        </div>
      </Modal>

      {/* Normal certificate modal */}
      <Modal
        open={!!openItem && !openItem?.isTrack}
        onClose={() => setOpen(null)}
        title={openItem?.title || ""}
        bodyRef={modalBodyRef}
      >
        <div className="cert-modal-img">
          <img src={openItem?.image} alt={openItem?.title} />
        </div>
      </Modal>
    </section>
  );
}