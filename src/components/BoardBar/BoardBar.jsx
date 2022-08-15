import React from 'react'
import './BoardBar.scss'
import { Col, Row, Container as ContainerBootStrap } from 'react-bootstrap'

function BoardBar() {
    return (
        <nav className="navbar-board">
            <ContainerBootStrap className = "container-bootstrap">
                <Row>
                    <Col className = "col-no=padding">
                        <div className = "board-info" >
                            <div className = "item board-type">Private WorkSpace</div>
                            <div className = "item member-avatar">
                                <img src = "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg" alt = "avatar" />
                                <img src = "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg" alt = "avatar" />
                                <img src = "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg" alt = "avatar" />
                                <img src = "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg" alt = "avatar" />
                                <span className = "more-mem">+3</span>
                                <span className = "invite">Invite</span>
                            </div>
                        </div>

                    </Col>
                </Row>
            </ContainerBootStrap>
        </nav>
    )
}

export default BoardBar