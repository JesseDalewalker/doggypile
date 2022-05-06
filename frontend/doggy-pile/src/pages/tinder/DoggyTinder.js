import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import DoggyPileAPI from "../../api/DoggyPileAPI";
import Doggo from "../../images/tinder-dog.jpg"
import "./TinderStyles.scss"

function DoggyTinder() {
  // states
  const [dogProfilesList, setDogProfilesList] = useState([])
  const [lastDirection, setLastDirection] = useState()

  // effect
  useEffect(() => {
    loadDogProfiles()
  }, [])

  const loadDogProfiles = async () => {
    const data = await DoggyPileAPI.getAllItems("dogs")
    setDogProfilesList(data ? data : null)
  }

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div>
      <h1>React Tinder Card</h1>
      <div className='d-flex justify-content-center cardContainer'>
        {dogProfilesList && dogProfilesList.map((dog) =>
          <TinderCard className='swipe' key={dog && dog.name} onSwipe={(dir) => swiped(dir, dog && dog.name)} onCardLeftScreen={() => outOfFrame(dog && dog.name)}>
            <div style={{ backgroundImage: `url(${dog && dog.profile_pic ? dog.profile_pic : Doggo })` }} className='card'>
              <h3>{dog && dog.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
}

export default DoggyTinder;