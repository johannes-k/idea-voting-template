import { useEffect, useState } from 'react'

const useIdeas = (topicId) => {
  const [ideas, setIdeas] = useState([])

  useEffect(() => {
    /*********************************
     * Todo: Add real implementation *
     *********************************/

    return () => {
      console.log(`Unsubscribing to idea updates for topic ${topicId}`)
    }
  }, [topicId])

  return { ideas }
}

const createIdea = async (title, translatedTitle, topicId) => {
  if (title && topicId) {
    /*********************************
     * Todo: Add real implementation *
     *********************************/

    return true
  }
  return false
}

const deleteIdea = async (ideaId) => {
  /*********************************
   * Todo: Add real implementation *
   *********************************/
}

export { useIdeas, createIdea, deleteIdea }
