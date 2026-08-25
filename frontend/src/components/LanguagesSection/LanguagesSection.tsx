import type { SpokenLanguage } from '../../types/spoken-language.types'

type LanguagesSectionProps = {
  languages: SpokenLanguage[]
}

export function LanguagesSection({ languages }: LanguagesSectionProps) {
  return (
    <section className="section" aria-labelledby="languages-title">
      <div className="section-heading">
        <span className="section-number">03</span>
        <h2 id="languages-title">Languages</h2>
        <span className="section-count">{languages.length}</span>
      </div>

      <ul className="language-list">
        {languages.map((language) => (
          <li className="language-item" key={language.name}>
            <span>{language.name}</span>
            <span>{language.level}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
