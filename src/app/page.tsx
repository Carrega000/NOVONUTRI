import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import "./nutrition-landing.css";

const integrations = [
  { name: "ŌURA", mark: "◒" },
  { name: "WHOOP", mark: "W" },
  { name: "Apple Health", mark: "♥" },
  { name: "Health Connect", mark: "◎" },
  { name: "STRAVA", mark: "▲" },
  { name: "fitbit", mark: "⠿" },
  { name: "GARMIN", mark: "▴" },
];

const stats = [
  { icon: "📸", value: "1 foto", label: "para começar um registro" },
  { icon: "🥗", value: "4 macros", label: "calorias, proteínas, carboidratos e gorduras" },
  { icon: "⌁", value: "50+", label: "aplicativos para conectar à sua rotina" },
];

const features = [
  {
    eyebrow: "REGISTRO INTELIGENTE",
    title: "Fotografe sua refeição. O resto fica mais simples.",
    text: "Veja estimativas de calorias, proteínas, carboidratos e gorduras a partir de uma foto e revise os itens antes de salvar.",
    badge: "Foto → análise → registro",
  },
  {
    eyebrow: "SEU DIA EM UM SÓ LUGAR",
    title: "Alimentação, água e movimento na mesma visão.",
    text: "Acompanhe refeições, hidratação, exercícios e evolução sem precisar pular entre várias telas ou planilhas.",
    badge: "Rotina organizada",
  },
  {
    eyebrow: "PROGRESSO",
    title: "Entenda o que mudou ao longo do tempo.",
    text: "Visualize tendências de peso, medidas e hábitos para enxergar sua evolução com mais clareza.",
    badge: "Visão simples e direta",
  },
];

function BrandMark() {
  return (
    <span className="brand-lockup" aria-label="Nutri">
      <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
      <strong>nutri</strong>
    </span>
  );
}

export default function Home() {
  return (
    <main className="nutrition-page" id="inicio">
      <header className="site-header">
        <a href="#inicio" className="site-logo"><BrandMark /></a>
        <nav className="site-nav" aria-label="Navegação principal">
          <a href="#recursos">Soluções</a>
          <a href="#recursos">Recursos</a>
          <a href="#integracoes">Integrações</a>
        </nav>
        <div className="site-actions">
          <a className="header-login" href="#inicio">Entrar</a>
          <a className="header-cta" href="#recursos">Começar</a>
        </div>
      </header>

      <a className="nutrition-skip" href="#recursos">Pular apresentação e ver recursos</a>

      <CinematicHero
        brandName="Nutri"
        tagline1="Acompanhe sua alimentação"
        tagline2="com apenas uma foto"
        cardHeading="Seu prato. Seus dados. Seu progresso."
        cardDescription={<>Fotografe sua refeição, revise a estimativa e acompanhe sua rotina em uma única visão.</>}
      />

      <section className="integration-section" id="integracoes" aria-labelledby="integration-title">
        <div className="integration-copy">
          <span className="section-kicker">INTEGRAÇÕES</span>
          <h2 id="integration-title">Conecte-se com mais de 50 aplicativos</h2>
          <p>Reúna seus dados de saúde, treino e rotina para acompanhar tudo em um só lugar.</p>
        </div>
        <div className="brand-marquee" aria-label="Aplicativos compatíveis">
          <div className="brand-track">
            {[...integrations, ...integrations].map((brand, index) => (
              <span className="integration-brand" key={`${brand.name}-${index}`}>
                <b aria-hidden="true">{brand.mark}</b>{brand.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="results-section" aria-labelledby="results-title">
        <h2 id="results-title">Tudo o que você precisa para acompanhar sua rotina</h2>
        <div className="results-grid">
          {stats.map((stat) => (
            <article key={stat.value} className="result-card">
              <span className="result-icon" aria-hidden="true">{stat.icon}</span>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-section" id="recursos" aria-labelledby="features-title">
        <div className="feature-heading">
          <span className="section-kicker dark">RECURSOS</span>
          <h2 id="features-title">Mais recursos para deixar sua rotina mais fácil</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-visual" aria-hidden="true">
                <span className="mini-pill">{feature.badge}</span>
                <div className="mini-phone">
                  <span className="mini-notch" />
                  <div className="mini-screen-lines"><i /><i /><i /><i /></div>
                </div>
              </div>
              <div className="feature-copy">
                <span>{feature.eyebrow}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <span className="section-kicker">COMECE PELO QUE VOCÊ JÁ FAZ TODOS OS DIAS</span>
        <h2>Sua alimentação, mais simples.</h2>
        <p>Tire uma foto, confira a estimativa e acompanhe sua evolução no mesmo lugar.</p>
        <a href="#inicio">Começar agora</a>
      </section>

      <footer className="site-footer">
        <BrandMark />
        <span>Nutrição simples para a rotina real.</span>
        <a href="#inicio">Voltar ao topo ↑</a>
      </footer>
    </main>
  );
}
