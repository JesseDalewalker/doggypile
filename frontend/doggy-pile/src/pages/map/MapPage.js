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
      myMap.current.addSource('dog-parks' , {
        type: 'geojson',
        data: {
          "type": "FeatureCollection",
          "features": [
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.300146,
                          34.88618
                      ]
                  },
                  "properties": {
                      "title": "Pavilion Recreation Complex Dog Park",
                      "city": "Taylors"
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.226749,
                          34.856765
                      ]
                  },
                  "properties": {
                      "title": "Pelham Mill Dog Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.3518508,
                          34.7782446
                      ]
                  },
                  "properties": {
                      "title": "Conestee Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.4042238,
                          34.8451735
                      ]
                  },
                  "properties": {
                      "title": "Swamp Rabbit Trail",
                      "city": "Downtown Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.3700161,
                          34.9259714
                      ]
                  },
                  "properties": {
                      "title": "Paris Mountain State Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.4038844,
                          34.8449113
                      ]
                  },
                  "properties": {
                      "title": "Falls Park on the Reedy",
                      "city": "Downtown Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.3669106,
                          34.7745448
                      ]
                  },
                  "properties": {
                      "title": "Lake Conestee Nature Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.40596,
                          34.891952
                      ]
                  },
                  "properties": {
                      "title": "Red Barn Dog Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.3422664,
                          34.8421238
                      ]
                  },
                  "properties": {
                      "title": "Plantations Dog Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          82.402577,
                          34.8415345
                      ]
                  },
                  "properties": {
                      "title": "Cleveland Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.3953416,
                          34.8427859
                      ]
                  },
                  "properties": {
                      "title": "Rock Quarry Garden",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.334689,
                          34.8293486
                      ]
                  },
                  "properties": {
                      "title": "Legacy Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.3965276,
                          34.8570918
                      ]
                  },
                  "properties": {
                      "title": "McPherson Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.3965276,
                          34.8570918
                      ]
                  },
                  "properties": {
                      "title": "Timmons Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.3683167,
                          34.8801117
                      ]
                  },
                  "properties": {
                      "title": "Holmes Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.4397169,
                          34.950441
                      ]
                  },
                  "properties": {
                      "title": "Poinsett Park",
                      "city": "Travelers Rest "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.3942367,
                          34.8658488
                      ]
                  },
                  "properties": {
                      "title": "North Main Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.375516,
                          34.8975971
                      ]
                  },
                  "properties": {
                      "title": "Herdklotz Park",
                      "city": "Greenville "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.6095797,
                          34.8153148
                      ]
                  },
                  "properties": {
                      "title": "Hagood Park\/Bark Park ",
                      "city": "Easley "
                  }
              },
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          -82.25391,
                          34.7406366
                      ]
                  },
                  "properties": {
                      "title": "Simpsonville Dog Spot ",
                      "city": "Simpsonville "
                  }
              }
          ]
      }
      })
      myMap.current.addLayer({
        'id': 'dog-parks-greenville-sc',
        'type': 'circle',
        'source': 'dog-parks',
        'paint': {
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white'
        }
      })
    })
  }


  const dogParkApiCall = () => {
    axios.get(`https://api.geoapify.com/v2/places?categories=pet.dog_park&filter=rect:-87.80122308044409,42.01504297890354,-87.51437691955522,41.728586465138434&limit=20&apiKey=1d9fd57fb2b14fb5bfe2315af8475c59`).then((response) => { setArrayOfDogParks(response.data.features)})
  }

  // const searchAPI = () => [
  //   axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchItem}.json`)
  // ]


  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default MapPage;