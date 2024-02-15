import React, { useEffect, useState } from 'react'
import { Container, FloatingLabel, Form, Row, Col, Button } from 'react-bootstrap'
import { Inertia } from '@inertiajs/inertia';

function ToDos({ todos }) {
  const [ entry, setEntry] = useState('');

  const handleEntryChange = (event) => {
    // Detect and respond to user interactions
    setEntry(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // ensure no empty input sent to the table

    // Make a POST request
    // It has a key pair that represents the name of the data being sent : represents the value of the 'entry' variable
    Inertia.post('/', { entry : entry })
      .then(() => {
        Inertia.visit(route('todos.index'));
      })
      .catch((errors) => {
        console.error('Error:', errors);
      });
  };

  return (
    <Container className="todo-list-container">
      <div className="create-new-container">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={9} lg={10}>
              <FloatingLabel controlId="floatingInput" label="Create a new todo" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Go home and sleep"
                  value={entry}
                  onChange={handleEntryChange}
                />
              </FloatingLabel>
            </Col>
            <Col xs={3} lg={2}>
              <Button type='submit' className='add-button'>Add</Button>
            </Col>  
          </Row>
        </Form>  
        <Row className='todos-item-container'>
          {todos.map((todo, index) => (
            // provide an index ie 0, 1, 2 for the table data
            <div key={todo.id}>
              <input type="checkbox" id={`todo-${index}`} />
              <label htmlFor={`todo-${index}`} className='todolist-entry'>{todo.entry}</label>
            </div>
          ))}
        </Row>
      </div>
      
      
    </Container>
  )
}

export default ToDos;
