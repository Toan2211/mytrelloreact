import React from 'react'
import './AppBar.scss'
import { Col, Row, Container as ContainerBootStrap, InputGroup, Form} from 'react-bootstrap'


function AppBar() {
    return (
        <nav className="navbar-app">
            <ContainerBootStrap className = "container-bootstrap">
                <Row>
                    <Col className = "col-no=padding">
                        <div className = "app-actions" >
                            <div className = "item all"> <i className = "fa fa-th"/> </div>
                            <div className = "item home"> <i className = "fa fa-home"/> </div>
                            <div className = "item boards"> <i className = "fa fa-columns">&nbsp;&nbsp;<strong>Boards</strong></i></div>
                            <div className = "item search">
                                <InputGroup className="groupSearch">
                                    <Form.Control
                                        className = "inputSearch"
                                        placeholder="Jump to..."
                                    />
                                    <InputGroup.Text className = "input-icon-search"><i className = "fa fa-search"></i></InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>

                    </Col>
                    <Col>
                        <div className = "app-branding text-center">
                            <span className = "trello-logo">TRELLO</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="user-actions">
                            <div className = "item quick"> <i className = "fa fa-plus-square-o"/> </div>
                            <div className = "item news"> <i className = "fa fa-info-circle"/> </div>
                            <div className = "item notification"> <i className = "fa fa-bell-o"/> </div>
                            <div className= "item user-avatar">
                                <img src = "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg" alt = "avatar" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </ContainerBootStrap>
        </nav>
    )
}

export default AppBar