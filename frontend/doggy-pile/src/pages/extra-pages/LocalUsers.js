import {useEffect, useState} from 'react'
import DoggyPileAPI from '../../api/DoggyPileAPI'
import LocalUserDetails from '../../components/extra-pages/LocalUserDetails'
import './Doggy101.scss'


function LocalUsers() {
  const [lat, setLat] = useState()
  const [long, setLong] = useState()
  const [users, setUsers] = useState()


  //get lat,long of user
  useEffect(() =>{
    getUsers()
  }, [])


  const getUsers = async () => {
    let data = await DoggyPileAPI.getAllItems('dogs')
    
    if (data) {
      setUsers(data)
    }
  }

  function renderUsers() {
    return users.map((item, index) => {
      // if (item.user_profile.city !== )
        return <LocalUserDetails item={item} index={index} />
    })
  }

  console.log("users", users)
  return (
    <div>
      <div className='users-container'>
        { users ? renderUsers() : null }
      </div>
    </div>
  )
}


export default LocalUsers;