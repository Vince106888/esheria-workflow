export default function HeroSection({ kicker, title, description }) {
  return (
    <section className="hero">
      {kicker ? <div className="hero-kicker">{kicker}</div> : null}
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </section>
  );
}
