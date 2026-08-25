import type { Experience } from '../../types/experience.types'

type ExperienceSectionProps = {
  experience: Experience[]
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section className="section" aria-labelledby="experience-title">
      <div className="section-heading">
        <span className="section-number">04</span>
        <h2 id="experience-title">Experience</h2>
        <span className="section-count">{experience.length}</span>
      </div>

      <ol className="experience-list">
        {experience.map((item) => (
          <li className="experience-item" key={`${item.company}-${item.period}`}>
            <div className="experience-item__period">
              <span>{item.period}</span>
              <span
                className={
                  item.current
                    ? 'timeline-dot timeline-dot--current'
                    : 'timeline-dot'
                }
                aria-hidden="true"
              />
            </div>

            <div className="experience-item__content">
              <div className="experience-item__heading">
                <div>
                  <h3>{item.company}</h3>
                  <p className="experience-role">
                    {item.role}
                    {item.employmentType && ` · ${item.employmentType}`}
                  </p>
                </div>
                {item.current && <span className="current-badge">Current</span>}
              </div>
              <p className="experience-description">{item.description}</p>

              <div className="experience-details">
                <h4>Highlights</h4>
                <ul className="experience-highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <ul className="experience-stack" aria-label="Technology stack">
                {item.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
