type AboutSectionProps = {
  about: string
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section className="section about-section" aria-labelledby="about-title">
      <div className="section-heading">
        <span className="section-number">01</span>
        <h2 id="about-title">About</h2>
      </div>

      <p className="about-copy">{about}</p>
    </section>
  )
}
