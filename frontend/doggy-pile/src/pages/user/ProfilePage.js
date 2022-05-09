import DoggyPileAPI from "../../api/DoggyPileAPI";
import PostView from "../../components/posts/viewposts-deleteposts";
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import { Row, Col, Button, Container, Tabs, Tab, Spinner } from "react-bootstrap";
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
  const [postList, setPostList] = useState([])
  const [loading, setLoading] = useState(false)
  const [inviteArr, setInviteArr] = useState([])

  // effects
  useEffect(() => {
    loadUserDetails()
    loadDogList()
    loadPostList()
    getInvites()
  }, [userId])

  const loadPostList = async () => {
    
    const data = await DoggyPileAPI.getAllItems("post")
    const filteredPosts = data.filter((user) => {
        return user.user.id == userId
    })    
    setPostList(filteredPosts ? filteredPosts : [])
  }

  const loadUserDetails = async () => {
    setLoading(true)
    const data = await DoggyPileAPI.getItemById("user_profile", userId)
    if (data) {
    setUserDetails(data ? data : null)
    setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const loadDogList = async () => {
    const dogs= []
    const data = await DoggyPileAPI.getAllItems("dogs")
    for (let i=0; i < data.length; i++) {
      if(data[i].user_profile.id.id == userId) {
        dogs.push(data[i])
      }
    }
    setDogList(dogs ? dogs : [])
  }


  // Deleting doggo/posts from list (don't do it! *sadface* )
  const removeDoggo = (deletedDogId) => {
    const newDogList = dogList.filter((dog) => {
      return dog.id !== deletedDogId
    })
    setDogList(newDogList)
  }
  const removePost = (deletedPostId) => {
    const newposts = postList.filter(() => {
      return postList.id !== deletedPostId
    })
    setPostList(newposts)
    return loadPostList()
  }

  // Renders doggos. There's a lot of functions inside, be warned. 
  const renderDogs = () => {
    return dogList.map((dog) => {
      const handleDeleteDog = async () => {
        const data = await DoggyPileAPI.deleteItem("dogs", dog.id)
        if (data) {
          removeDoggo(dog.id)
        }
      }

      // Checks if currently logged in user matches profile. If so, renders the Edit and Delete button
      const showButtons = () => {
        if (props.username.user_id == userId) {
          return (
            <Row>
              <Col xs={4}>
                <Link to={`/dog-profile/${dog.id}/edit-profile`}><Button className="edit-btn me-3">Edit</Button></Link>
              </Col>
              <Col xs={1}>
                <Button onClick={ handleDeleteDog} className="edit-btn">Delete</Button>
              </Col>
            </Row>
          )
        }
      }
      // Based on the gender value, it will render the gender SVGs that corresponds with it
      const renderGenderSigns = () => {
        if (dog && dog.gender === 'Male') {
          return <img alt="Gender sign" src={maleSign} className="gender"/>
        } 
        else if (dog && dog.gender === 'Female') {
          return <img alt="Gender sign" src={femaleSign} className="gender"/>
        }
      }
      const checkVaccinated = () => {
        if (dog && dog.vaccinated === true) {
          return <><span className="dog-field">Vaccinated</span> <span className="dog-text">Yes</span> </>
        } else if (dog && dog.vaccinated === false) {
        return <><span className="dog-field">Vaccinated</span> <span className="dog-text">No</span></>
        }
      }
      // Since the JSON file doesn't have the names capitalized, this function takes care of that
      const capitalizeBreedName = (str) => {
        return str.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
      }
      return <Row className="dog-cont">
        <Col xs={4}>
          <img src={ dog && dog.profile_pic } alt="Doggo" className="dog-img"/>
        </Col>
        <Col xs={5} className="dog-details">
          <h4 className="dog-name">{dog && dog.name} { renderGenderSigns() }</h4>
          <span className="dog-field">Breed</span> <span className="dog-text">{capitalizeBreedName(dog && dog.breed)}</span>
          <br />
          <span className="dog-field">Size</span> <span className="dog-text">{dog && dog.size}</span>
          <br />
          <span className="dog-field">Age</span> <span className="dog-text">{dog && dog.age}</span>
          <br />
          <span className="dog-field">Friendly with</span> <span className="dog-text">{dog && dog.friendly_with}</span>
          <br />
          {checkVaccinated()}
        </Col>
        <Col>
          {showButtons()}
        </Col>
      </Row>
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
    if ( !userDetails ) {
      return <Link to={`/profile/${ props.username.user_id}/create-profile`}><Button className="edit-btn">Create Profile</Button></Link> }
    else if ( props.username.user_id == userId ) {
      console.log("inviteArr", inviteArr)
      return (
        <div>
          <Link to={`/profile/${ props.username.user_id}/edit-profile`}><Button className="edit-btn">Edit</Button></Link> 
          <div>
            { inviteArr.map((item, index) => {
              return <p key={ index }>{ item.description }</p>
            })}
          </div>
      </div>
      )
    } else if (props.username.user_id !== userId) {
      return (
        <Button className="edit-btn" onClick={ playDateInvite }>Invite to play date!</Button>
        )
    }
  }

  // get invites from database
  const getInvites = async () => {
    let data = await DoggyPileAPI.getAllItems("invite")

    if (data) {
      setInviteArr(data)
    }
  }


  // onClick function for play date invites
  const playDateInvite = () => {
    inviteArr.push("You've been invited to a play date")
    console.log(userId)
    console.log(props.username)
    const inviteData = {
      user: props.username.user_id,
      to_user: userId,
      description: `You've been invited to a play date by ${props.username.username}`
    }
    let data = DoggyPileAPI.createItems('invite', inviteData)

    return (
      <form>
        <label for="event_id" >Id</label><br/>
        <input type="text" name="event_id" /><br/>
        <label for="event_title" >Title</label>
        <input type="text" name="event_title" />
        <label for="event_start" >Start Date</label>

        <label for="event_end" >End Date</label>

        <label for="event_description" >Description</label>
      </form>

    )
  }
  
  // Returns all user's post
  const renderPosts = () => {
    return postList.map((myPost) => {
      console.log(myPost)
        return <PostView key={ myPost.id } myPost={ myPost } removePost={ removePost } username={ props.username }/>
        })
      }
  // Render Write Posts to User only
  const renderWritePost = () => {
    return postList.map((post)=> {
      if (props.username.user_id == post.user.id) {
      return (
        <>
      <Link key={post.id} to={`/post/create-post/`}> <Button className="write-btn profile">Write A Post</Button></Link><br/>
      </>)
      }
    }
    )
  }

  //Render Add Dog button or not
  const renderAddDogButton = () => {
      if (props.username.user_id == userId) {
      return (
        <>
        <Link key={userId} to={"/dog-profile/create-profile"}><Button className="add-btn mt-3">Add Dog</Button></Link>
        </>
      )
      } 
  }

  // Rendering the whole profile details
  const renderProfile = () => {
    if (!userDetails) {
      return <Link to={`/profile/${ props.username.user_id}/create-profile`}><Button className="edit-btn">Create Profile</Button></Link> }

    return (
    <Container className="profile">
      <Row>
        <Col xs={4}>
          <img src={userDetails && userDetails.profile_pic} className="user-img" alt="User's profile"/>
        </Col>
        <Col xs={7}>
          <Row>
            <Col>
            <h3 align="left">{userDetails && userDetails.id.first_name} {userDetails && userDetails.id.last_name} { renderGenderSigns() }</h3>
            <p align="left" className="location-text">{userDetails && userDetails.city}, {userDetails && userDetails.state}, US</p>
            </Col>
            <Col align="right">
             {editProfileBtn()}
            </Col>
          </Row>
          <p className="about-text" align="left">{userDetails && userDetails.about}</p>
        </Col>
      </Row>

      <div className="d-flex justify-content-center mt-5">
        <Row className="bottom-profile">
          <Tabs defaultActiveKey="dogs" id="profile-tabs">
            <Tab eventKey="dogs" title="Dogs">
              { renderDogs() }
              
              { renderAddDogButton () }
            </Tab>
            <Tab eventKey="posts" title="Posts">
              { renderWritePost() }
              { renderPosts() }
            </Tab>
          </Tabs>
        </Row>
      </div>
    </Container> )
  }

  return (
    <>
     { loading ? <Spinner animation="border" variant="secondary" /> : renderProfile() }
    </>
  )
}

export default ProfilePage;