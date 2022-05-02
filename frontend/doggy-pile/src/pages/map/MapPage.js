import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useState, useRef } from 'react'
// import { Marker, Map, useMap, NavigationControl } from 'react-map-gl'
// import image from '../../assets/map-marker-icon.png'
import axios from 'axios';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

function MapPage() {

  const mapContainer = useRef(null);
  const myMap = useRef(null);
  const [arrayOfDogParks, setArrayOfDogParks] = useState()
  const [searchItem, setSearchItem] = useState()



  mapboxgl.accessToken = 'pk.eyJ1IjoianByaWNlNDQiLCJhIjoiY2wybWZyZ3hmMDR1bTNrcGszYzV2OGl3MSJ9.ShuHeiSnowF4fYxU9MGVHQ';

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true })
    dogParkApiCall()
  }, [] )


  function successLocation(position) {
    // console.log(position)
    setUpMap([position.coords.longitude, position.coords.latitude])
  }

  function errorLocation() {
    setUpMap([-87.623177, 41.881832])
  }

  function setUpMap(center) {
    myMap.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: 10,
      });
    
      const nav = new mapboxgl.NavigationControl();
      myMap.current.addControl(nav);
        
      myMap.current.on("click", (e) => new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(myMap.current))

    // const directions = new mapboxgl.MapboxDirections({
    //   accessToken: mapboxgl.accessToken
    // })
    // myMap.current.addControl(directions, "top-left")

    const search = new MapboxGeocoder({ accessToken: mapboxgl.accessToken })
    myMap.current.addControl(search)

    myMap.current.on('load', () => {
      myMap.current.addSource('chicago-dog-parks-source', {
        type: 'geojson',
        data: arrayOfDogParks
      })
      myMap.current.addLayer({
        id: 'chicago-dog-parks-layer',
        source: 'chicago-dog-parks-source',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#007cbf'
        }
      })
    })
  }


  const dogParkApiCall = () => {
    axios.get(`https://api.geoapify.com/v2/places?categories=pet.dog_park&filter=rect:-87.80122308044409,42.01504297890354,-87.51437691955522,41.728586465138434&limit=20&apiKey=1d9fd57fb2b14fb5bfe2315af8475c59`).then((response) => { setArrayOfDogParks(response.data)})
  }

  // const searchAPI = () => [
  //   axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchItem}.json`)
  // ]

  console.log(arrayOfDogParks)
  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default MapPage;