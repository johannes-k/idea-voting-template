import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { createTopic } from '../datastore/topic'
import { useTranslation } from '../hooks/useTranslation'

import '../styles/modal.css'

const CreateTopicModal = ({ onHide, show }) => {
  const {
    translate: translateTitle,
    translation: translationTitle,
    loading: loadingTitle
  } = useTranslation()

  const {
    translate: translateDescription,
    translation: translationDescription,
    loading: loadingDescription
  } = useTranslation()

  const defaultState = {
    title: '',
    description: ''
  }
  const [value, setValue] = useState(defaultState)

  const handleChange = (event) => {
    setValue((currentValue) => {
      const val = { ...currentValue }
      val[event.target.name] = event.target.value
      return val
    })
  }

  const handleBlur = (event) => {
    if (event.target.name === 'title') {
      translateTitle(event.target.value)
    } else {
      translateDescription(event.target.value)
    }
  }

  const submitAction = async (event) => {
    event.preventDefault()

    if (
      value?.title &&
      value?.description &&
      (await createTopic(value.title, value.description, translationTitle, translationDescription))
    ) {
      onHide()
      setValue(defaultState)
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Title>
        <h3 className="modal-title">Submit a new topic</h3>
      </Modal.Title>
      <Modal.Body>
        <Form onSubmit={(event) => submitAction(event)}>
          <Form.Group>
            <Form.Label>Titel</Form.Label>
            <Form.Control
              type="text"
              name="title"
              className="modal-text-input"
              value={value?.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Titel"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="formSpacing">
            <Form.Label>Beschreibung</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              name="description"
              className="modal-text-area"
              value={value?.description}
              placeholder="Beschreibung"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {(loadingTitle || loadingDescription) && (
            <Spinner animation="border" variant="light" size="sm" className="spinner" />
          )}
          {(translationTitle || translationDescription) && !(loadingTitle || loadingDescription) && (
            <>
              <div>Übersetzung</div>
              <div className="translation">{translationTitle}</div>
              <div className="translation">{translationDescription}</div>
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

export default CreateTopicModal
