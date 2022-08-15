import React, { useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { isEmpty } from 'lodash'
import './BoardContent.scss'
import Column from 'components/Column/Column'
import { initialData } from 'actions/initialData'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import { Col, Row, Container as ContainerBootStrap, Form, Button } from 'react-bootstrap'

function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const toggleOpenNewColumnForm = () => {
        setOpenNewColumnForm(!openNewColumnForm)
    }
    const newColumnInputRef = useRef(null)
    const [newColumnTitle, setnewColumnTitle] = useState('')
    const onNewColumnTitleChange = (e) => {
        setnewColumnTitle(e.target.value)
    }
    useEffect(() => {
        const boardDB = initialData.boards.find(board => board.id === 'board-1')
        if (boardDB)
        {
            setBoard(boardDB)
            setColumns(mapOrder(boardDB.columns, boardDB.columnOrder, 'id'))
        }
    }, [])
    useEffect(() => {
        if (newColumnInputRef && newColumnInputRef.current) {
            newColumnInputRef.current.focus()
            newColumnInputRef.current.select()
        }

    }, [openNewColumnForm])
    if (isEmpty(board))
    {
        return <div className="not-found">Board not found</div>
    }
    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)
        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(col => col.id)
        newBoard.columns = newColumns
        setBoard(newBoard)
        setColumns(newColumns)
    }
    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null)
        {
            let newColumns = [...columns]
            let currentColumn = newColumns.find(col => col.id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(card => card.id)
            setColumns(newColumns)
        }
    }

    const addNewColumn = () => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus()
            return
        }
        const newColumnAdd = {
            id: Math.random().toString(36).substr(2, 5),
            boardId: board.id,
            title: newColumnTitle.trim(),
            cardOrder: [],
            cards: []
        }
        let newColumns = [...columns]
        newColumns.push(newColumnAdd)
        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(col => col.id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
        setOpenNewColumnForm(false)
        setnewColumnTitle('')
    }
    const onUpdateColumn = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate.id
        let newColumns = [...columns]
        const columnIndexToUpdate = newColumns.findIndex(col => col.id === columnIdToUpdate)
        if (newColumnToUpdate._destroy) {
            newColumns.splice(columnIndexToUpdate, 1)
        }
        else {
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
        }
        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(col => col.id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
    }
    return (
        <div className="board-content">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]
                }
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >


                {columns.map((column, index) =>
                    (
                        <Draggable key = {index}>
                            <Column column = {column} onCardDrop = {onCardDrop} onUpdateColumn = {onUpdateColumn}/>
                        </Draggable>
                    ))}
            </Container>
            <ContainerBootStrap className="">
                {
                    !openNewColumnForm &&
                    (<Row>
                        <Col className="addNewColumn" onClick={toggleOpenNewColumnForm}>
                            <i className= "fa fa-plus icon" />  Add another column
                        </Col>
                    </Row>)
                }
                {
                    openNewColumnForm &&
                    (<Row>
                        <Col className="enterNewColumn">
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Enter column title..."
                                className = "inputNewColumn"
                                ref = {newColumnInputRef}
                                value = {newColumnTitle}
                                onChange = {(e) => onNewColumnTitleChange(e)}
                                onKeyDown = {e => (e.key === 'Enter') && addNewColumn()}
                            />
                            <Button variant="success" size = "sm" onClick = {addNewColumn}>Add column</Button>
                            <span className="cancelIcon" onClick={toggleOpenNewColumnForm}><i className="fa fa-trash icon"></i></span>
                        </Col>
                    </Row>)
                }
            </ContainerBootStrap>
        </div>
    )
}

export default BoardContent