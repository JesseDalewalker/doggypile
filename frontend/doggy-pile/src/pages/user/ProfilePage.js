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
      {userDetails && userDetails.user.first_name}
      <br/>
      {userDetails && userDetails.user.last_name}
      <br/>
      {userDetails && userDetails.about}
      <br/>
      {userDetails && userDetails.gender}
      <br/>
      {userDetails && userDetails.city}
      <br/>
      {userDetails && userDetails.state}    
    </div>
  )
}

export default ProfilePage;