import { useT } from "../i18n/useT";

export default function Footer() {
  const { t } = useT();

  return (
    <footer style={{ padding: "34px 0 44px 0" }}>
      <div className="container" style={{ color: "var(--muted)" }}>
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 18,
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>{t.footerText || "Built with React • Vite"}</div>
          <div>© {new Date().getFullYear()} {t.navBrand || "Ahmed Alshamrani"}</div>
        </div>
      </div>
    </footer>
  );
}