import { useContext } from "react";
import { LanguageContext } from "../i18n/LanguageContext";

export default function Contact() {
  const langCtx = useContext(LanguageContext) || {};
  const lang = langCtx.lang || "en";
  const isAr = lang === "ar";

  const content = {
    title: isAr ? "تواصل معي" : "Contact",
    subtitle: isAr
      ? "حاب تتواصل؟ أنا مهتم بفرص التدريب/الوظيفة والتعاون في مشاريع الذكاء الاصطناعي."
      : "Want to reach out? I’m open to internship/job opportunities and collaborative AI projects.",
    emailLabel: isAr ? "البريد الإلكتروني" : "Email",
    linkedinLabel: isAr ? "لينكدإن" : "LinkedIn",
    githubLabel: isAr ? "جيت هب" : "GitHub",
    emailAria: isAr ? "إرسال بريد إلى أحمد الشمراني" : "Email Ahmed Alshamrani",
    linkedinAria: isAr ? "فتح لينكدإن (تبويب جديد)" : "Open LinkedIn profile (new tab)",
    githubAria: isAr ? "فتح جيت هب (تبويب جديد)" : "Open GitHub profile (new tab)",
  };

  return (
    <section id="contact" aria-labelledby="contact-title" dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        <h3 id="contact-title" style={{ margin: 0, fontSize: 22 }}>
          {content.title}
        </h3>

        <p style={{ marginTop: 10, color: "var(--muted)", maxWidth: 720, lineHeight: 1.9 }}>
          {content.subtitle}
        </p>

        <div
          className="grid"
          style={{
            marginTop: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <a
            href="mailto:iahmedh22@gmail.com"
            className="card"
            style={{ padding: 16 }}
            aria-label={content.emailAria}
          >
            <div style={{ fontWeight: 900 }}>{content.emailLabel}</div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>iahmedh22@gmail.com</div>
          </a>

          <a
            href="https://www.linkedin.com/in/ahmed-h-alshamrani-b427b5322"
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{ padding: 16 }}
            aria-label={content.linkedinAria}
          >
            <div style={{ fontWeight: 900 }}>{content.linkedinLabel}</div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>Ahmed H. Alshamrani</div>
          </a>

          <a
            href="https://github.com/iAhmed-11"
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{ padding: 16 }}
            aria-label={content.githubAria}
          >
            <div style={{ fontWeight: 900 }}>{content.githubLabel}</div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>iAhmed-11</div>
          </a>
        </div>
      </div>
    </section>
  );
}