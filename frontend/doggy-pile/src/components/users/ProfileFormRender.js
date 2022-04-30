import { useNavigate } from "react-router-dom"
import {Form, Button, Stack, Row, Col, Container } from 'react-bootstrap'

function ProfileFormRender(props) {
  const navigate = useNavigate()

  return (
    <div>
      <Form onSubmit={ props.handleCreateProfile }>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>First Name:</Form.Label>
          <Col>
            <Form.Control name="first-name" defaultValue={ props.profileDetails && props.profileDetails.user.first_name } />
          </Col>
          <Form.Label column sm={2}>Last Name:</Form.Label>
          <Col>
            <Form.Control name="last-name" defaultValue={ props.profileDetails && props.profileDetails.user.last_name } />
          </Col>
        </Form.Group>
        
      </Form>
    </div>
  )
}

export default ProfileFormRender;