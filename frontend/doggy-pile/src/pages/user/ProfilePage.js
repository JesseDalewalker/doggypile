import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

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
                <Link to={`/dog-profile/${dog.id}/edit-profile`}><Button>Edit</Button></Link>
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

  // Just rendering all the information to make sure it works
  return (
    <div>
      <h1>User's Profile</h1>
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
    </div>
  )
}

export default ProfilePage;