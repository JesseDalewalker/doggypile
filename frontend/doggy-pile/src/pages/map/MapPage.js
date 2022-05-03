import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useState, useRef } from 'react'
// import { Marker, Map, useMap, NavigationControl } from 'react-map-gl'
// import image from '../../assets/map-marker-icon.png'
import axios from 'axios';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

function MapPage() {

  const mapContainer = useRef(null);
  const [map, setMap] = useState();
  const [arrayOfDogParks, setArrayOfDogParks] = useState()




  mapboxgl.accessToken = 'pk.eyJ1IjoianByaWNlNDQiLCJhIjoiY2wybWZyZ3hmMDR1bTNrcGszYzV2OGl3MSJ9.ShuHeiSnowF4fYxU9MGVHQ';
  
  useEffect(() => {
    dogParkApiCall()
    
  }, [])

  useEffect(() => {
    if (arrayOfDogParks) {
      navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true })
      
    }

  }, [arrayOfDogParks] )


  function successLocation(position) {
    
    setUpMap([position.coords.longitude, position.coords.latitude])
    
  }

  function errorLocation() {
    setUpMap([-87.623177, 41.881832])
    
  }



  function setUpMap(center) {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: 10,
      });
    
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);
        
      map.on("click", (e) => new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).setPopup( new mapboxgl.Popup().setHTML("<select><option value='agressive dog' className='agro-dog'>Aggressive Dog</option><option value='lost dog'>Lost Dog</option></select>")).addTo(map))

      map.on("click", "chicago-dog-parks", (e) => {
        const name = e.features[0].properties.name;
        const address = e.features[0].properties.address_line2;

        new mapboxgl.Popup({ closeOnClick: false}).setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(`Park Name: ${name}. Location: ${address}`).addTo(map)
    }) 



      const search = new MapboxGeocoder({ accessToken: mapboxgl.accessToken })
      map.addControl(search)

      map.on('load', () => {
        map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Paw-print.svg/1200px-Paw-print.svg.png', (error, image) => {
          if (error) throw error;
  
          map.addImage('paw', image);
  
          map.addSource('chicago-dog-parks', {
            type: 'geojson',
            data: arrayOfDogParks
          })
          map.addLayer({
            id: 'chicago-dog-parks',
            source: 'chicago-dog-parks',
            type: 'symbol',
            layout: {
              // Make the layer visible by default.
              'visibility': 'visible',
              'icon-image': 'paw', // reference the image
              'icon-size': 0.02
              },
          })
        });
      });

  }


  
  const dogParkApiCall = () => {
    axios.get(`https://api.geoapify.com/v2/places?categories=pet.dog_park&filter=rect:-87.80122308044409,42.01504297890354,-87.51437691955522,41.728586465138434&apiKey=1d9fd57fb2b14fb5bfe2315af8475c59`).then((response) => { setArrayOfDogParks(response.data)})
  }

  console.log(arrayOfDogParks)

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default MapPage;