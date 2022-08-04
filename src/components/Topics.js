import React from 'react'
import Ideas from './Ideas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceGrinBeamSweat } from '@fortawesome/free-regular-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { useCurrentUserIsAuthor } from '../hooks/useCurrentUserIsAuthor'
import { useTopics, deleteTopic } from '../datastore/topic'
import '../styles/topics.css'

const Topics = ({ language }) => {
  const { topics } = useTopics()

  if (topics.length === 0) {
    return <NoTopicsFound />
  }

  return topics.map((topic) => (
    <Topic topic={topic} key={topic.id} language={language}>
      <Ideas topicId={topic.id} language={language} />
    </Topic>
  ))
}

const NoTopicsFound = () => {
  return (
    <div className="noTopicsFound">
      <FontAwesomeIcon icon={faFaceGrinBeamSweat} className="smilie" />
      <p>Did not find any topics</p>
    </div>
  )
}

const Topic = ({ topic, children, language }) => {
  const { userIsAuthor } = useCurrentUserIsAuthor(topic)
  return (
    <div className="topic">
      <div className="topicHeader">
        <div className="topicHeaderText">
          <h3>{topic?.title[language]}</h3>
          <div>{topic?.description[language]}</div>
        </div>
        {userIsAuthor && (
          <button onClick={() => deleteTopic(topic.id)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

export default Topics
