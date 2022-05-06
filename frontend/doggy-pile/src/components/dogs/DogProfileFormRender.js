import axios from "axios"
import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import {Form, Button, Stack, Row, Col, Container } from 'react-bootstrap'
import DogBreeds from '../../data/dog_breeds.json'
import "./DogFormStyles.css"

function DogProfileFormRender(props) {
  const navigate = useNavigate()

  // state
  const [imageSelected, setImageSelected] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [profileDogDetails, setProfileDogDetails] = useState(null)

  // effects
  useEffect(() => {
    loadDogProfile()
  }, [])

  // Getting existing profile data from Dog's profile to populate the fields that already have input from before
  const loadDogProfile = async () => {
    const data = await DoggyPileAPI.getItemById("dogs", props.dogId)
    setProfileDogDetails(data ? data : null)
    setImageSrc(data ? data.profile_pic : null)
  }

  // Render all dog breed names
  const renderDogBreeds = () => {
    return DogBreeds.map((breed, index) => {
      return <option key={index} value={breed}>{breed}</option>
    })
  }

  // Uploading profile picture
  const uploadImage = async (event) => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("file", imageSelected)
    formData.append("upload_preset", "my-uploads")

    axios.post("https://api.cloudinary.com/v1_1/dbi5z0la5/image/upload", formData)
    .then((response)=>{
      setImageSrc(response ? response.data.secure_url : null)
    })

    console.log("IMAGE URL", imageSrc)
  };
  

  return (
    <Container className="d-flex justify-content-center">
    <div className="form-cont">
      <Container>
        <img src={ imageSrc ? imageSrc : require('../../images/corgi.png') } alt="Uploaded image" className="current-img"/>
      </Container>
      <Row className="my-3">
        <Form.Label column sm={3}>Upload Profile Picture:</Form.Label>
          <Col sm={6}>
            <Form.Control type="file" onChange={(event)=> {setImageSelected(event.target.files[0])}}/>
          </Col>
          <Col><Button onClick={uploadImage} className="edit-btn upload">Upload Image</Button></Col>
      </Row>

      <Form onSubmit = { props.handleCreateDogProfile ? props.handleCreateDogProfile : props.handleEditDogProfile } >
        <Row>
          <input type="hidden" name="profile-pic" value={imageSrc && imageSrc} /> 
        </Row>
        <Form.Group as={Row}>
          <Form.Label column>Name:</Form.Label>
          <Col>
            <Form.Control name="name" defaultValue={ profileDogDetails && profileDogDetails.name } />
          </Col>
          <Form.Label column>Age:</Form.Label>
          <Col>
            <Form.Control name="age" defaultValue={ profileDogDetails && profileDogDetails.age } />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column>Breed:</Form.Label>
          <Col>
            <Form.Select name="breed">
              { renderDogBreeds() }
            </Form.Select>
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
          <Form.Label column sm={3}>Size:</Form.Label>
          <Col sm={3}>
            <Form.Select name="size">
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </Form.Select>
          </Col>
          <Form.Label column>Friendly with:</Form.Label>
          <Col>
            <Form.Select name="friendly-with">
              <option value="Everyone" >Everyone</option>
              <option value="Humans only">Humans only</option>
              <option value="Large dogs">Large dogs</option>
              <option value="Small dogs">Small dogs</option>
            </Form.Select>
          </Col>
        </Form.Group>
          {/* <Form.Group as={Row}>
          <Form.Check column label="Vaccinated" name="vaccinated" id="vaccinated"/>
          </Form.Group> */}
        <Stack gap={2} className="col-md-5 mx-auto mt-3">
          <Button variant="secondary" type="submit">Save Profile</Button>
          <Button variant="outline-secondary" onClick={() => navigate(-1)} >Cancel</Button>
        </Stack>
      </Form>
    </div>
    </Container>
  )
}

export default DogProfileFormRender;