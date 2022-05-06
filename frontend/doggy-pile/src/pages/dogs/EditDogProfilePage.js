import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useNavigate, useParams } from "react-router-dom"
import DogProfileFormRender from "../../components/dogs/DogProfileFormRender";

// For editing the Dog's profile page

function EditDogProfile(props) {
  const navigate = useNavigate()
  const { dogId } = useParams()

  // event handlers
  const handleEditDogProfile = async (event) => {
    event.preventDefault()

    const dogData = {
      user_profile: props.username.user_id,
      name: event.target.elements["name"].value,
      profile_pic: event.target.elements["profile-pic"].value,
      gender: event.target.elements["dog-gender"].value,
      friendly_with: event.target.elements["friendly-with"].value,
      age: event.target.elements["age"].value,
      breed: event.target.elements["breed"].value,
      size: event.target.elements["size"].value,
      vaccinated: event.target.elements["vaccinated"].value,
    }

    console.log("SENDING DATA...")
    const dataForDog = await DoggyPileAPI.editItems("dogs", dogId, dogData)

    if (dataForDog) {
      console.log("RECEIVED DATA")
      navigate(`/profile/${props.username.user_id}`)
    }
  }


  return (
    <div>
      <DogProfileFormRender handleEditDogProfile={handleEditDogProfile} dogId={dogId} />
    </div>
  )
} 

export default EditDogProfile;