import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { createIdea } from '../datastore/idea'
import { useTranslation, translateText } from '../hooks/useTranslation'
import '../styles/modal.css'

const CreateIdeaModal = ({ onHide, topicId, show }) => {
  const {
    translate: translateTitle,
    translation: translationTitle,
    loading: loadingTitle
  } = useTranslation()
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleBlur = (event) => {
    translateTitle(event.target.value)
  }

  const submitAction = async (event) => {
    event.preventDefault()

    let translation
    if (translationTitle !== '') {
      translation = translationTitle
    } else {
      translation = await translateText(event?.target[0]?.value)
    }

    if (value && (await createIdea(value, translation, topicId))) {
      onHide()
      setValue('')
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Title>
        <h3 className="modal-title">Submit a new idea</h3>
      </Modal.Title>
      <Modal.Body>
        <Form onSubmit={(event) => submitAction(event)}>
          <Form.Group className="formSpacing2">
            <Form.Label>Titel</Form.Label>
            <Form.Control
              type="text"
              name="title"
              className="modal-text-input"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
            />
          </Form.Group>
          {loadingTitle && (
            <Spinner animation="border" variant="light" size="sm" className="spinner" />
          )}
          {translationTitle && !loadingTitle && (
            <>
              <div>Übersetzung</div>
              <div className="translation">{translationTitle}</div>
            </>
          )}
          <div className="buttons">
            <button type="button" className="modal-close-button" onClick={onHide}>
              Close
            </button>
            <input type="submit" className="modal-submit-button" value="Submit" />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateIdeaModal
