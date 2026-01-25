export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <h3 style={{ margin: 0, fontSize: 22 }}>Contact</h3>
        <p style={{ marginTop: 10, color: "var(--muted)", maxWidth: 620 }}>
          Want to reach out? I’m open to training opportunities and collaborative AI projects.
        </p>

        <div
          className="grid"
          style={{
            marginTop: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {/* Email */}
          <a
            href="mailto:iahmedh22@gmail.com"
            className="card"
            style={{ padding: 16 }}
          >
            <div style={{ fontWeight: 900 }}>Email</div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>
              iahmedh22@gmail.com
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ahmed-h-alshamrani-b427b5322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{ padding: 16 }}
          >
            <div style={{ fontWeight: 900 }}>LinkedIn</div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>
              Ahmed H. Alshamrani
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/iAhmed-11"
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{ padding: 16 }}
          >
            <div style={{ fontWeight: 900 }}>GitHub</div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>
              iAhmed-11
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}