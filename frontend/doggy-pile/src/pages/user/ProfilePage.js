import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import { Row, Col, Button, Container } from "react-bootstrap";
import "./ProfileStyles.css"
// SVG import
import maleSign from "../../images/male-sign.svg"
import femaleSign from "../../images/female-sign.svg"

function ProfilePage(props) {
  // params
  const { userId } = useParams()

  // state
  const [userDetails, setUserDetails] = useState(null)
  const [dogList, setDogList] = useState([])

  // effects
  useEffect(() => {
    loadUserDetails()
    loadDogList()
  }, [])

  const loadUserDetails = async () => {
    const data = await DoggyPileAPI.getItemById("user_profile", props.username.user_id)
    setUserDetails(data ? data : null)
  }

  const loadDogList = async () => {
    const dogs= []
    const data = await DoggyPileAPI.getAllItems("dogs")
    for (let i=0; i < data.length; i++) {
      if(data[i].user.id == userId) {
        dogs.push(data[i])
      }
    }
    setDogList(dogs ? dogs : [])
  }

  // Deleting doggo from list (don't do it! *sadface* )
  const removeDoggo = (deletedDogId) => {
    const newDogList = dogList.filter((dog) => {
      return dog.id !== deletedDogId
    })
    setDogList(newDogList)
  }

  // Renders doggos
  const renderDogs = () => {
    return dogList.map((dog) => {
      const handleDeleteDog = async () => {
        const data = await DoggyPileAPI.deleteItem("dogs", dog.id)
        if (data) {
          removeDoggo(dog.id)
        }
      }
      const showButtons = () => {
        if (props.username.user_id == userId) {
          return (
            <Row>
              <Col>
                <Button onClick={ handleDeleteDog}>Delete</Button>
              </Col>
              <Col>
                <Link to={`/dog-profile/${dog.id}/edit-profile`}><Button className="edit-btn">Edit</Button></Link>
              </Col>
            </Row>
          )
        }
      }
      return <div>
        <img src={ dog && dog.profile_pic } width={250} height={250}/>
        <br />
        {dog && dog.name}
        <br />
        {dog && dog.gender}
        <br />
        {dog && dog.friendly_with}
        <br />
        {dog && dog.age}
        <br />
        {dog && dog.breed}
        <br />
        {dog && dog.size}
        <br />
        {dog && dog.vaccinated}
        <br />
        {showButtons()}
      </div>
    })
  }

  // Rendering gender SVGs
  const renderGenderSigns = () => {
    if (userDetails && userDetails.gender === 'Male') {
      return <img alt="Gender sign" src={maleSign} className="gender"/>
    } 
    else if (userDetails && userDetails.gender === 'Female') {
      return <img alt="Gender sign" src={femaleSign} className="gender"/>
    }
  }

  // Show Edit button if user is logged in
  const editProfileBtn = () => {
    if (props.username !== "") {
      return <Link to={`/profile/${ props.username.user_id}/edit-profile`}><Button className="edit-btn">Edit</Button></Link>
    }
  }

  // Just rendering all the information to make sure it works
  return (
    <Container className="profile">
      {/* <Link to={`/profile/${ props.username.user_id}/edit-profile`}><Button>Edit</Button></Link>
      {userDetails && userDetails.id.first_name}
      <br/>
      {userDetails && userDetails.id.last_name}
      <br/>
      {userDetails && userDetails.about}
      <br/>
      {userDetails && userDetails.gender}
      <br/>
      {userDetails && userDetails.city}
      <br/>
      {userDetails && userDetails.state}
      <img src={userDetails && userDetails.profile_pic} width={250} height={250}/>
      <br />
      {renderDogs()}
      <br /> */}
      <Row>
        <Col xs={4}>
          <img src={userDetails && userDetails.profile_pic} className="user-img" alt="User's profile"/>
        </Col>
        <Col xs={8}>
          <Row>
            <Col>
            <h3>{userDetails && userDetails.id.first_name} {userDetails && userDetails.id.last_name} { renderGenderSigns() }</h3>
            <p>{userDetails && userDetails.city}, {userDetails && userDetails.state}, US</p>
            </Col>
            <Col>
             {editProfileBtn()}
            </Col>
          </Row>
          <p>{userDetails && userDetails.about}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage;