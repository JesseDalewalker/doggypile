import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useEffect, useState } from "react"

function ProfilePage(props) {
  // state
  const [userDetails, setUserDetails] = useState(null)

  // effects
  useEffect(() => {
    loadUserDetails()
  }, [])

  const loadUserDetails = async () => {
    const data = await DoggyPileAPI.getItemById("user_profile", props.username.user_id)
    setUserDetails(data ? data : null)
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
    </div>
  )
}

export default ProfilePage;