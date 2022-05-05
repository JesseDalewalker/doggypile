import {useEffect, useState} from 'react'
import DoggyPileAPI from '../../api/DoggyPileAPI'
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
    let data = await DoggyPileAPI.getAllItems('users')
    
    if (data) {
      setUsers(data)
    }
  }

  function renderUsers() {
    return users.map((item, index) => {
        return <div className='users'>
        <p>{item.first_name}</p>
        <p>{item.last_name}</p>
        <p>{item.email}</p>
      </div>
    })
  }


  return (
    <div>
      <div className='users-container'>
        { users ? renderUsers() : null }
      </div>
    </div>
  )
}


export default LocalUsers;