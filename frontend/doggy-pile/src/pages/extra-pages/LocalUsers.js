import {useEffect, useState} from 'react'
import { Carousel, Row, Col } from 'react-bootstrap'
import DoggyPileAPI from '../../api/DoggyPileAPI'
import LocalUserDetails from '../../components/extra-pages/LocalUserDetails'
import './Doggy101.scss'


function LocalUsers(props) {
  const [users, setUsers] = useState([])
  const [activeUser, setActiveUser] = useState(null)


  //get lat,long of user
  useEffect(() =>{
    getUsers()
    getActiveUser()
  }, [])


  const getUsers = async () => {
    let data = await DoggyPileAPI.getAllItems('dogs')
    
    if (data) {
      setUsers(data ? data : [])
    }
  }

  const getActiveUser = async () => {
    let data = await DoggyPileAPI.getItemById('user_profile', props.username.user_id)
    if (data) {
      console.log(">>>>>>>>>>>", data)
      setActiveUser(data ? data : null)
    }
  }


  function renderUsers() {
    return users.map((item, index) => {
      if (item.user_profile.city == activeUser.city)
        return <Carousel.Item>
            <LocalUserDetails key={index} item={item} index={index}/>
          </Carousel.Item>
    })
  }

  // console.log("users", users)
  // console.log("username", props.username)
  // console.log("user_id", props.username.user_id)


  return (
    <div>
      {/* Local dogs header */}
      <div className='d-flex justify-content-center align-items-center local-header'>
        <Row className='local-items-cont'>
          <Col className='local-text'>
            <h1 align="left" className='action-txt local'>See which dogs are in your <span style={{ color:'#E96E29'}}>area</span></h1>
            <p align="left" className="header-sub local">Get connected and start setting up playdates</p>
          </Col>
          <Col>
            <img src={require('../../images/labrador-king.png')} alt="Lab Retriever"/>
          </Col>
        </Row>
      </div>
      <div className='d-flex align-items-center justify-content-center location-cont'>
        { activeUser ? <h4>Showing dogs in <span style={{ color:'#E96E29'}}>{activeUser.city}</span></h4> : null }
      </div>

      {/* <div className='users-container'> */}
        <Carousel className="local" variant="dark">
        { users ? renderUsers() : null }
        </Carousel>
      {/* </div> */}
    </div>
  )
}


export default LocalUsers;