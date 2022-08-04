import { useEffect, useState } from 'react'

const useTopics = () => {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    /*********************************
     * Todo: Add real implementation *
     *********************************/
  }, [])

  return { topics }
}

const createTopic = async (title, description, translatedTitle, translatedDescription) => {
  if (title && description) {
    return true
  }
  return false
}

const deleteTopic = async (topicId) => {
  /*********************************
   * Todo: Add real implementation *
   *********************************/
}

export { useTopics, createTopic, deleteTopic }
