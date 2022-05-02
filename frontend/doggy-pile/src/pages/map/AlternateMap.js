import Map, { Layer, Source, NavigationControl, GeolocateControl } from 'react-map-gl';
import { useEffect, useState, useRef, useCallback } from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import axios from 'axios';

function AlternateMap(props) {
  const [arrayOfDogParks, setArrayOfDogParks] = useState()

  // mapboxgl.accessToken = 'pk.eyJ1IjoianByaWNlNDQiLCJhIjoiY2wybWZyZ3hmMDR1bTNrcGszYzV2OGl3MSJ9.ShuHeiSnowF4fYxU9MGVHQ';

  useEffect(() => {
    dogParkApiCall()
  }, [])

  const dogParkApiCall = () => {
    axios.get(`https://api.geoapify.com/v2/places?categories=pet.dog_park&filter=rect:-87.80122308044409,42.01504297890354,-87.51437691955522,41.728586465138434&limit=20&apiKey=1d9fd57fb2b14fb5bfe2315af8475c59`).then((response) => { setArrayOfDogParks(response.data)})
  }

  const mapRef = useRef()
  const geojson = arrayOfDogParks


  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
    
  };
  const whenClicked = () => {
    console.log("clicked")
  }
  
  console.log(arrayOfDogParks)
  return (
    <div>
      <Map ref={mapRef}  initialViewState={{
        longitude: -87.623177,
        latitude: 41.881832,
        zoom: 10
      }} style={{
        width: '100vw',
        height: '100vh'
      }} mapStyle='mapbox://styles/mapbox/streets-v11'
      mapboxAccessToken='pk.eyJ1IjoianByaWNlNDQiLCJhIjoiY2wybWZyZ3hmMDR1bTNrcGszYzV2OGl3MSJ9.ShuHeiSnowF4fYxU9MGVHQ'
      >
        <Source id="dog-parks" type="geojson" data={geojson} onClick={whenClicked} >
          <Layer {...layerStyle} />
        </Source>
        <NavigationControl />
        <GeolocateControl />
      </Map>
    </div>
  )
}


export default AlternateMap;