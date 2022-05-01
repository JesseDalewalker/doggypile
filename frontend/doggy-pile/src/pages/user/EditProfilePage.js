import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import ProfileFormRender from "../../components/users/ProfileFormRender";

// This is for editing the User's profile page
// The event handler (handleEditProfile) is being passed to our ProfileFormRender component

function EditProfilePage(props) {
  const navigate = useNavigate()

  // states
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

  // event handler
  const handleEditProfile = async (event) => {
    event.preventDefault()

    const userData = {
      first_name: event.target.elements["first-name"].value,
      last_name: event.target.elements["last-name"].value,
    }

    const userProfileData = {
      user: props.username.user_id,
      about: event.target.elements["about"].value,
      gender: event.target.elements["gender-select"].value,
      location: event.target.elements["location"].value,
    }

    console.log("SENDING DATA...")  
    const dataForUser = await DoggyPileAPI.editItems("users", props.username.user_id, userData)
    const dataForProfile = await DoggyPileAPI.editItems("user_profile", props.username.user_id, userProfileData)
  
    if (dataForUser && dataForProfile) {
      console.log("RECEIVED DATA")
      navigate(`/profile/props.username.user_id`)
    }
  }

  return (
    <div>
      <ProfileFormRender handleEditProfile={handleEditProfile} profileDetails={profileDetails} />
    </div>
  )
}

export default EditProfilePage;