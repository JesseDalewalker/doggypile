import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useNavigate } from "react-router-dom"
import ProfileFormRender from "../../components/users/ProfileFormRender";

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
      location: event.target.elements["location"].value,
    }

    const dogData = {
      user: props.username.user_id,
      name: event.target.elements["name"].value,
      gender: event.target.elements["dog-gender"].value,
      friendly_with: event.target.elements["friendly-with"].value,
      age: event.target.elements["age"].value,
      breed: event.target.elements["breed"].value,
      size: event.target.elements["size"].value,
      vaccinated: event.target.elements["vaccinated"].value,
    }

    console.log("SENDING DATA...")
    const dataForUser = await DoggyPileAPI.editItems("users", props.username.user_id, userData)
    const dataForProfile = await DoggyPileAPI.createItems("user_profile", userProfileData)
    const dataForDog = await DoggyPileAPI.createItems("dogs", dogData)

    if (dataForUser && dataForProfile && dataForDog) {
      console.log("RECEIVED DATA")
      navigate(`/profile`)
    }
  }


  return (
    <div>
      <ProfileFormRender handleCreateProfile={handleCreateProfile} />
    </div>
  )
}

export default CreateProfilePage;