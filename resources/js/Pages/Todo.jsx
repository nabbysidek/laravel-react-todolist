import React, { useState } from 'react'
import { Container, FloatingLabel, Form, Row, Col, Button, Modal } from 'react-bootstrap'
import { Inertia } from '@inertiajs/inertia';
import { FaPen, FaTrash } from "react-icons/fa";

function ToDos({ todos }) {
  // To create a new entry in the todo
  const [ entry, setEntry] = useState('');
  // To evaluate whether a todo is checked or not
  const [ checkedTodos, setCheckedTodos ] = useState([]);
  // To edit a todo entry
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editEntry, setEditEntry] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleEntryChange = (event) => {
    // Detect and respond to user interactions
    setEntry(event.target.value);
  };

  const handleEditEntryChange = (event) => {
    // Detect and respond to user interactions
    setEditEntry(event.target.value);
  };

  // Check whether the checkbox is checked or not
  const handleCheckboxChange = (index) => {
    setCheckedTodos((prevCheckedTodos) => {
      const newCheckedTodos = [...prevCheckedTodos]; // creates a shallow copy of the array
      newCheckedTodos[index] = ! newCheckedTodos[index]; // ensures you can check and uncheck an entry in the todo
      return newCheckedTodos;
    });
  };

  // To edit a todo entry
  const handleEdit = (todoId, entry) => {
    setIsEditing(true);
    setEditTodoId(todoId);
    setEditEntry(entry);
    setShowModal(true);
  }

  // To delete a todo entry
  const handleDelete = (todoId) => {
    if(window.confirm('Are you sure you want to delete the todo?')) {
      Inertia.delete(route('todos.destroy', { id: todoId }), {
        onSuccess: () => {
          Inertia.reload({ only: ['todos']});
        }
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // ensure no empty input sent to the table

    if (isEditing) {
      Inertia.patch('/', {id: editTodoId, entry: editEntry}, {
        onSuccess: () => {
          setIsEditing(false);
          setEditTodoId(null);
          setEditEntry('');
          setShowModal(false);
          Inertia.reload({only: ['entry']});
        }
      });
    } else {
      // Make a POST request
    // It has a key pair that represents the name of the data being sent : represents the value of the 'entry' variable
    Inertia.post("/", { entry: entry })
        .then(() => {
            setEntry('');
            Inertia.visit(route("todos.index"));
        })
        .catch((errors) => {
            console.error("Error:", errors);
        });
    }
  };

  // To handle closing the modal
  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditTodoId(null);
    setEditEntry('');
  }

  return (
      <Container className="todo-list-container">
          <div className="create-new-container">
              <Form onSubmit={handleSubmit}>
                  <Row>
                      <Col xs={9} lg={10}>
                          <FloatingLabel
                              controlId="floatingInput"
                              label="Create a new todo"
                          >
                              <Form.Control
                                  type="text"
                                  placeholder="Go home and sleep"
                                  value={entry}
                                  onChange={handleEntryChange}
                              />
                          </FloatingLabel>
                      </Col>
                      <Col xs={3} lg={2}>
                          <Button type="submit" className="add-button">
                              Add
                          </Button>
                      </Col>
                  </Row>
              </Form>
              <Row className="todos-item-container gx-0">
                  {/* provide an index ie 0, 1, 2 for the table data */}
                  {todos.map((todo, index) => (
                      <React.Fragment key={todo.id}>
                          <Col xs={10}>
                              <div>
                                  <input
                                      type="checkbox"
                                      id={`todo-${index}`}
                                      checked={checkedTodos[index] || false}
                                      onChange={() =>
                                          handleCheckboxChange(index)
                                      }
                                  />
                                  <label
                                      htmlFor={`todo-${index}`}
                                      className="todos-item-entry"
                                      style={{
                                          textDecoration: checkedTodos[index]
                                              ? "line-through"
                                              : "none",
                                      }}
                                  >
                                      {todo.entry}
                                  </label>
                              </div>
                          </Col>
                          <Col xs={1}>
                              <Button
                                  className="edit-btn todos-actionable-btns"
                                  onClick={() =>
                                      handleEdit(todo.id, todo.entry)
                                  }
                              >
                                  <FaPen />
                              </Button>
                          </Col>
                          <Col xs={1}>
                              <Button
                                  className="delete-btn todos-actionable-btns"
                                  onClick={() => handleDelete(todo.id)}
                              >
                                  <FaTrash />
                              </Button>
                          </Col>
                      </React.Fragment>
                  ))}
              </Row>
          </div>

          <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Edit your todo"
                  >
                      <Form.Control
                          type="text"
                          placeholder="Go home and sleep"
                          value={editEntry}
                          onChange={handleEditEntryChange}
                      />
                  </FloatingLabel>
              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={handleSubmit}>Save Changes</Button>
              </Modal.Footer>
          </Modal>
      </Container>
  );
}

export default ToDos;
