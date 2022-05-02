import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useNavigate } from "react-router-dom"
import ProfileFormRender from "../../components/users/ProfileFormRender";

// This is for creating the User's profile page
// We are passing the event handler (handleCreateProfile) to our component to get the value from the form fields
// ProfileFormRender is how we're rendering the form itself

function CreateProfilePage(props) {
  const navigate = useNavigate()

  // event handlers
  const handleCreateProfile = async (event) => {
    event.preventDefault()

    const userData = {
      first_name: event.target.elements["first-name"].value,
      last_name: event.target.elements["last-name"].value,
    }

    const userProfileData = {
      user: props.username.user_id,
      about: event.target.elements["about"].value,
      gender: event.target.elements["gender-select"].value,
      state: event.target.elements["state"].value,
      city: event.target.elements["city"].value,
    }

    console.log("SENDING DATA...")
    const dataForUser = await DoggyPileAPI.editItems("users", props.username.user_id, userData)
    const dataForProfile = await DoggyPileAPI.createItems("user_profile", userProfileData)

    // If this fails to navigate, use params for userId instead
    if (dataForUser && dataForProfile) {
      console.log("RECEIVED DATA")
      navigate(`/profile/${props.username.user_id}`)
    }
  }


  return (
    <div>
      <ProfileFormRender handleCreateProfile={handleCreateProfile} />
    </div>
  )
}

export default CreateProfilePage;