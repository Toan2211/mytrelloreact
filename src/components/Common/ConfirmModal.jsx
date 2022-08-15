import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import HTMLReactParser from 'html-react-parser'
function ConfirmModal(props) {

    const { title, content, show, onAction } = props
    return (

        <Modal show={show} onHide={() => onAction('close')}>
            <Modal.Header closeButton>
                <Modal.Title>{HTMLReactParser(title)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onAction('close')}>
                Close
                </Button>
                <Button variant="primary" onClick={() => onAction('confirm')}>
                Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal