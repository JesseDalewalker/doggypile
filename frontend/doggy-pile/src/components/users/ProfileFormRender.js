import { useNavigate } from "react-router-dom"
import {Form, Button, Stack, Row, Col, Container } from 'react-bootstrap'

// Renders the form for creating/editing User's profile information

function ProfileFormRender(props) {
  const navigate = useNavigate()

  return (
    <div>
      <Form onSubmit={ props.handleCreateProfile ? props.handleCreateProfile : props.handleEditProfile }>
        {/* User's name details */}
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
        {/* User's gender selection */}
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Gender:</Form.Label>
          <Col>
            <Form.Select name="gender-select">
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </Form.Select>
          </Col>
        </Form.Group>
        {/* User about area */}
        <Form.Group as={Row}>
          <Form.Label>About:</Form.Label>
          <Form.Control name="about" as="textarea" rows={6} defaultValue={ props.profileDetails && props.profileDetails.about } />
        </Form.Group>
        {/* Need to figure out what sort of location input...City and state or zipcode? */}
        <Form.Group> 
          <Form.Label column sm={2}>Location:</Form.Label>
          <Col>
            <Form.Control name="location" />
          </Col>
        </Form.Group>
        <Stack gap={2} className="col-md-5 mx-auto mt-3">
          <Button variant="secondary" type="submit">Save Profile</Button>
          <Button variant="outline-secondary" onClick={() => navigate(-1)} >Cancel</Button>
        </Stack>
      </Form>
    </div>
  )
}

export default ProfileFormRender;