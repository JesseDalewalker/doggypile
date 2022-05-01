import { useNavigate } from "react-router-dom"
import {Form, Button, Stack, Row, Col, Container } from 'react-bootstrap'

function DogProfileFormRender(props) {
  const navigate = useNavigate()

  return (
    <div>
      <Form onSubmit = { props.handleCreateDogProfile ? props.handleCreateDogProfile : props.handleEditDogProfile } >
        <Form.Group as={Row}>
          <Form.Label column>Name:</Form.Label>
          <Col>
            <Form.Control name="name" defaultValue={ props.profileDogDetails && props.profileDogDetails.name } />
          </Col>
          <Form.Label column>Age:</Form.Label>
          <Col>
            <Form.Control name="age" defaultValue={ props.profileDogDetails && props.profileDogDetails.age } />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column>Breed:</Form.Label>
          <Col>
            <Form.Control name="breed" defaultValue={ props.profileDogDetails && props.profileDogDetails.breed } />
          </Col>
          <Form.Label column>Gender:</Form.Label>
          <Col>
            <Form.Select name="dog-gender">
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </Form.Select>
          </Col>        
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column>Size:</Form.Label>
          <Col>
            <Form.Select name="size">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </Form.Select>
          </Col>
          <Form.Label column>Friendly with:</Form.Label>
          <Col>
            <Form.Select name="friendly-with">
              <option value="humans-dogs" >Everyone</option>
              <option value="humans">Only humans</option>
              <option value="large-dogs">Large dogs</option>
              <option value="small-dogs">Small dogs</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Check inline label="Vaccinated" name="vaccinated" />
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

export default DogProfileFormRender;