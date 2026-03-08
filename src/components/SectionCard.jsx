export default function SectionCard({ title, description, children }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {children}
    </article>
  );
}
