import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useNavigate, useParams } from "react-router-dom"
import DogProfileFormRender from "../../components/dogs/DogProfileFormRender";

// For creating the Dog's profile page

function CreateDogProfile(props) {
  const navigate = useNavigate()
  const { dogId } = useParams()

  // event handlers
  const handleCreateDogProfile = async (event) => {
    event.preventDefault()

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
    const dataForDog = await DoggyPileAPI.createItems("dogs", dogData)

    if (dataForDog) {
      console.log("RECEIVED DATA")
      navigate(`/dog-profile/${dogId}`)
    }
  }

  return (
    <div>
      <DogProfileFormRender handleCreateDogProfile={handleCreateDogProfile} />
    </div>
  )
} 

export default CreateDogProfile;