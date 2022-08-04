import React, { useEffect, useState } from 'react'
import CreateIdeaModal from './createIdeaModal'
//import { Auth } from 'aws-amplify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useCurrentUserIsAuthor } from '../hooks/useCurrentUserIsAuthor'
import { useVotesPerIdea, toggleVote } from '../datastore/vote'
import { useIdeas, deleteIdea } from '../datastore/idea'
import '../styles/ideas.css'

const Ideas = ({ topicId, language }) => {
  const [modalShow, setModalShow] = useState(false)
  const { ideas } = useIdeas(topicId)

  const openModal = () => {
    setModalShow(true)
  }

  const closeModal = () => {
    setModalShow(false)
  }

  return (
    <>
      <div className="ideasWrapper">
        {ideas.map((value, index) => (
          <IdeaCard idea={value} key={index} language={language} />
        ))}
        <CreateIdea ideas={ideas} openModal={openModal} />
      </div>
      <CreateIdeaModal topicId={topicId} show={modalShow} onHide={closeModal} />
    </>
  )
}

const CreateIdea = ({ ideas, openModal }) => {
  return (
    <div className="cardWrapper">
      <button className="createIdeaCard" onClick={openModal}>
        <div className="card">
          <FontAwesomeIcon icon={faCirclePlus} className="icon" />
          <div className="text">
            {ideas.length > 0 ? 'Submit new idea' : 'Submit the first idea!'}
          </div>
        </div>
      </button>
    </div>
  )
}

const IdeaCard = ({ idea, language }) => {
  const { votes } = useVotesPerIdea(idea.id)
  const [liked, setLiked] = useState(false)
  const { userIsAuthor } = useCurrentUserIsAuthor(idea)

  useEffect(() => {
    let sub

    const didCurrentUserVote = async () => {
      // if (!sub) {
      //   sub = (await Auth.currentAuthenticatedUser()).attributes.sub
      // }
      const didVote = votes.includes(sub)
      if (didVote !== liked) {
        setLiked(didVote)
      }
    }

    if (votes) {
      didCurrentUserVote()
    }
  }, [votes, liked])

  return (
    <div className="cardWrapper">
      {userIsAuthor && (
        <button className="deleteIdea" onClick={() => deleteIdea(idea.id)}>
          <FontAwesomeIcon icon={faXmark} className="icon" />
        </button>
      )}
      <button onClick={() => toggleVote(idea.id)}>
        <div className="card">
          {votes && votes.length > 0 && (
            <div className="likeCounter">
              <FontAwesomeIcon icon={faHeart} className="icon" />
              <span>{votes?.length}</span>
            </div>
          )}
          <div className="ideaTitle">{idea?.title[language]}</div>
          <div className={'like-button' + (liked ? ' liked' : '')}>
            <div className="heart-like-button"></div>
          </div>
        </div>
      </button>
    </div>
  )
}

export default Ideas
