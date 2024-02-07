import React from 'react'
import { Container, FloatingLabel, Form, Row, Col, Button } from 'react-bootstrap'

function ToDos() {
  return (
    <Container className="todo-list-container">
      <div className="create-new-container">
        <Row>
        <Col xs={9} lg={10}>
          <FloatingLabel controlId="floatingInput" label="Create a new todo" className="mb-3">
            <Form.Control type="text" placeholder="Go home and sleep"/>
          </FloatingLabel>
        </Col>
        <Col xs={3} lg={2}>
          <Button className='add-button'>Add</Button>
        </Col>  
        </Row>
      </div>
    </Container>
  )
}

export default ToDos;
