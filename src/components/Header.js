import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CreateTopicModal from './createTopicModal'
import Form from 'react-bootstrap/Form'

const Header = ({ language, setLanguage }) => {
  const [modalShow, setModalShow] = useState(false)

  const openModal = () => {
    setModalShow(true)
  }

  const closeModal = () => {
    setModalShow(false)
  }

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
  }

  return (
    <>
      <header>
        <h1>Idea Board</h1>
        <div className="right">
          <Form.Select value={language} onChange={handleLanguageChange}>
            <option value="de">de</option>
            <option value="en">en</option>
          </Form.Select>
          <button onClick={openModal} className="button">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </header>
      <CreateTopicModal show={modalShow} onHide={closeModal} />
    </>
  )
}

export default Header
