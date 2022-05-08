import {useEffect, useState} from 'react'
import { Carousel } from 'react-bootstrap'
import DoggyPileAPI from '../../api/DoggyPileAPI'
import LocalUserDetails from '../../components/extra-pages/LocalUserDetails'
import './Doggy101.scss'


function LocalUsers(props) {
  const [users, setUsers] = useState()
  const [activeUser, setActiveUser] = useState()


  //get lat,long of user
  useEffect(() =>{
    getUsers()
    getActiveUser()
  }, [])


  const getUsers = async () => {
    let data = await DoggyPileAPI.getAllItems('dogs')
    
    if (data) {
      setUsers(data)
    }
  }

  const getActiveUser = async () => {
    let data = await DoggyPileAPI.getItemById('user_profile', props.username.user_id)
    if (data) {
      console.log(">>>>>>>>>>>", data)
      setActiveUser(data)
    }
  }


  function renderUsers() {
    return users.map((item, index) => {
      if (item.user_profile.city == activeUser.city)
        return <Carousel.Item>
            <LocalUserDetails item={item} index={index} id="local-user-details-id"/>
          </Carousel.Item>
    })
  }

  // console.log("users", users)
  console.log("username", props.username)
  console.log("user_id", props.username.user_id)


  return (
    <div>
      { activeUser ? <h1>Dogs in {activeUser.city}</h1> : null }
      <div className='users-container'>
        <Carousel >
        { users ? renderUsers() : null }
        </Carousel>
      </div>
    </div>
  )
}


export default LocalUsers;