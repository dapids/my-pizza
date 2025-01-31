type Props = {
  language: 'en' | 'it'
  translations: {
    en: string
    it: string
  }
}

export const Translation = ({ language, translations }: Props) => <>{translations[language]}</>
