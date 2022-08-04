import { useState } from 'react'

const translateText = async (text) => {
  /*********************************
   * Todo: Add real implementation *
   *********************************/

  return ''
}

const useTranslation = () => {
  const [translation, setTranslation] = useState('')
  const [loading, setLoading] = useState(false)
  const [latestTranslatedText, setLatestTranslatedText] = useState('')

  const translate = async (text) => {
    if (text && text !== latestTranslatedText) {
      setLoading(true)
      const result = await translateText(text, latestTranslatedText)
      setLatestTranslatedText(text)
      setTranslation(result)
      setLoading(false)
    }
  }

  return { translate, translation, loading }
}

const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export { useTranslation, translateText }
