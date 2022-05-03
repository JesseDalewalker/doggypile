import axios from "axios"
import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import {Form, Button, Stack, Row, Col } from 'react-bootstrap'
import DogBreeds from '../../data/dog_breeds.json'

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
    <div>
      <Row>
        <img src={ imageSrc && imageSrc } width={250} height={250}/>
      </Row>
      <Row className="mb-3">
        <Form.Label column sm={2}>Upload Profile Picture:</Form.Label>
          <Col>
            <Form.Control type="file" onChange={(event)=> {setImageSelected(event.target.files[0])}}/>
          </Col>
          <Col><Button onClick={uploadImage}>Upload Image</Button></Col>
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