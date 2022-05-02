import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import {Form, Button, Stack, Row, Col } from 'react-bootstrap'
import StateCityData from '../../data/StatesCityData.json'

// Renders the form for creating/editing User's profile information

function ProfileFormRender(props) {
  const navigate = useNavigate()

  // state
  const [cityList, setCityList] = useState([])
  const [profileDetails, setProfileDetails] = useState("")

  // effects
  useEffect(() => {
    loadProfile()
  }, [])

  // Getting existing profile data from user's profile to populate the fields that already have input from before
  const loadProfile = async () => {
    const data = await DoggyPileAPI.getItemById("user_profile", props.username.user_id)
    setProfileDetails(data ? data : null)
  }

  // render
  // Rendering all the states first
  const renderStateOptions = () => {
    let states = []
    for(let state of Object.keys(StateCityData)) {
      states.push(<option value={state}>{state}</option>)
    }
    return states
  }
  // Matching the state's field value when looping through the JSON file to get the list of cities
  const changeCityList = (e) => {
    for (let state of Object.keys(StateCityData)) {
      if (state === e.target.value) {
        setCityList(StateCityData[state])
      }
    }
  }
  // Rendering all the cities from selected state
  const renderCityList = () => {
    return cityList.map((city, index) => {
      return <option key={index} value={city}>{city}</option>
    })
  }

  return (
    <div>
      <Form onSubmit={ props.handleCreateProfile ? props.handleCreateProfile : props.handleEditProfile }>
        {/* User's name details */}
        <Form.Group as={Row}>
          <Form.Label column sm={2}>First Name:</Form.Label>
          <Col>
            <Form.Control name="first-name" defaultValue={ profileDetails && profileDetails.user.first_name } />
          </Col>
          <Form.Label column sm={2}>Last Name:</Form.Label>
          <Col>
            <Form.Control name="last-name" defaultValue={ profileDetails && profileDetails.user.last_name } />
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
          <Form.Control name="about" as="textarea" rows={6} defaultValue={ profileDetails && profileDetails.about } />
        </Form.Group>
        {/* User's location */}
        <Form.Group as={Row}> 
          <Form.Label column sm={2}>State:</Form.Label>
          <Col>
            <Form.Select name="state" onChange={changeCityList}>
              <option>Select your state:</option>
              { renderStateOptions() }
            </Form.Select>
          </Col>
          <Form.Label column sm={2}>City:</Form.Label>
          <Col>
            <Form.Select name="city">
              <option>Select your city:</option>
              { renderCityList() }
            </Form.Select>
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