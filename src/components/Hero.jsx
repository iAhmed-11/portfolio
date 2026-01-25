import Reveal from "./Reveal";
import { useT } from "../i18n/useT";
import heroImg from "../assets/images/profile/hero.jpg";

export default function Hero() {
  const { t } = useT();

  const goNext = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <Reveal>
          <div>
            <h1>{t.heroTitle}</h1>
            <h2>{t.heroSubtitle}</h2>
            <p>{t.heroTagline}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="photo-frame">
            <img src={heroImg} alt="Ahmed Alshamrani" />
          </div>
        </Reveal>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        className="scroll-indicator"
        onClick={goNext}
        aria-label="Scroll down"
      >
        <span />
      </button>
    </section>
  );
}