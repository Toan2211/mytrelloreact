import React, { useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './Column.scss'
import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/sorts'
import { Button, Form } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import ConfirmModal from 'components/Common/ConfirmModal'
import { saveChange, selectAllInlineText } from 'utilities/contentEditable'

function Column({ column, onCardDrop, onUpdateColumn }) {
    const cards = mapOrder(column.cards, column.cardOrder, 'id')
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const ToggleConfirmModal = () => {
        setShowConfirmModal(!showConfirmModal)
    }
    const [columnTitle, setColumnTitle] = useState('')
    useEffect (() => {
        setColumnTitle(column.title)
    }, [column.title])
    const handleColumnTitleChange = (e) => {
        setColumnTitle(e.target.value)
    }

    const onConfirmModalAction = (type) => {
        if (type ==='confirm')
        {
            const newColumn = {
                ...column,
                _destroy: true
            }
            onUpdateColumn(newColumn)
        }
        ToggleConfirmModal()
    }

    const handleColumnTitleBlur = () => {
        const newColumn = {
            ...column,
            title: columnTitle
        }
        onUpdateColumn(newColumn)
    }

    const [openNewCardForm, setopenNewCardForm] = useState(false)
    const toggleOpenNewCardForm = () => {
        setopenNewCardForm(!openNewCardForm)
    }
    const newCardInputRef = useRef(null)
    useEffect(() => {
        if (newCardInputRef && newCardInputRef.current) {
            newCardInputRef.current.focus()
            newCardInputRef.current.select()
        }

    }, [openNewCardForm])
    const [newCardTitle, setnewCardTitle] = useState('')
    const onNewCardTitleChange = (e) => {
        setnewCardTitle(e.target.value)
    }
    const addNewCard = () => {
        if (!newCardTitle) {
            newCardInputRef.current.focus()
            return
        }
        const newCardToAdd = {
            id: Math.random().toString(36).substr(2, 5),
            boardId: column.boardId,
            columnId : column.id,
            title: newCardTitle.trim(),
            cover: null
        }
        let newColumn = {
            ...column,
            cardOrder: [...column.cardOrder, newCardToAdd.id],
            cards: [...column.cards, newCardToAdd]
        }
        onUpdateColumn(newColumn)
        setnewCardTitle('')
        toggleOpenNewCardForm()
    }
    return (
        <div className="column">
            <header className = "column-drag-handle">
                <div className="column-title">
                    <Form.Control
                        size="sm"
                        type="text"
                        className = "content-editable"
                        value = {columnTitle}
                        spellCheck = "false"
                        onClick = {selectAllInlineText}
                        onChange = {handleColumnTitleChange}
                        onBlur = {handleColumnTitleBlur}
                        onKeyDown = {saveChange}
                        onMouseDown = {e => e.preventDefault()}
                    />
                </div>
                <div className="column-dropdown-actions">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" size = "sm" className = "dropdown-btn"/>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick = {toggleOpenNewCardForm} >Add card</Dropdown.Item>
                            <Dropdown.Item onClick = {ToggleConfirmModal}>Remove column</Dropdown.Item>
                            <Dropdown.Item>Move all cards in this column to</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className="card-list">
                <Container
                    {...column.props}
                    groupName="column"
                    // onDragStart={e => console.log('drag started', e)}
                    // onDragEnd={e => console.log('drag end', e)}
                    // onDragEnter={() => {
                    //     console.log('drag enter:', column.id);
                    // }}
                    // onDragLeave={() => {
                    //     console.log('drag leave:', column.id);
                    // }}
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
                    getChildPayload={index => cards[index]
                    }
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"

                    // onDropReady={p => console.log('Drop ready: ', p)}
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview'
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key = {index}>
                            <Card card = {card} />
                        </Draggable>
                    ))
                    }
                </Container>
                {openNewCardForm && (
                    <div className = "addNewCardArea">
                        <Form.Control
                            size="sm"
                            as="textarea"
                            rows = "3"
                            placeholder="Enter title..."
                            className = "inputNewCard"
                            ref = {newCardInputRef}
                            value = {newCardTitle}
                            onChange = {(e) => onNewCardTitleChange(e)}
                            onKeyDown = {e => (e.key === 'Enter') && addNewCard()}
                        />
                    </div>
                )}

            </div>
            <footer>
                {openNewCardForm && (
                    <div className = "addNewCardAction">
                        <Button variant="success" size = "sm" onClick = {addNewCard}>Add card</Button>
                        <span className="cancelIcon" onClick = {toggleOpenNewCardForm} ><i className="fa fa-trash icon"></i></span>
                    </div>
                )}
                {
                    !openNewCardForm &&
                    (<div className="footer-actions" onClick = {toggleOpenNewCardForm}>
                        <i className= "fa fa-plus icon" />  Another card
                    </div>)
                }
            </footer>
            <ConfirmModal
                show = {showConfirmModal}
                title = "Remove column"
                content = {`Are you sure you want to remove <strong>${column.title}</strong> ?`}
                onAction = {onConfirmModalAction}
            />
        </div>
    )
}

export default Column