import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useState, useRef } from 'react'
// import { Marker, Map, useMap, NavigationControl } from 'react-map-gl'
// import image from '../../assets/map-marker-icon.png'
import axios from 'axios';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Flash from 'mapbox-gl-flash'
import './MapPage.scss'

function MapPage() {
  
  const mapContainer = useRef(null);
  const [map, setMap] = useState();
  const [arrayOfDogParks, setArrayOfDogParks] = useState()
  const [arrayOfShops, setArrayOfShops] = useState()
  const [arrayOfVets, setArrayOfVets] = useState()
  const [arrayOfServices, setArrayOfServices] = useState()
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')

  mapboxgl.accessToken = 'pk.eyJ1IjoianByaWNlNDQiLCJhIjoiY2wybWZyZ3hmMDR1bTNrcGszYzV2OGl3MSJ9.ShuHeiSnowF4fYxU9MGVHQ';

  const dispatchEvent = function(eventName, data){
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, false, data);
    document.dispatchEvent(event);
  };
  
  //get lat,long of user
  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true })
  }, [])

  //able to get coordinates
  function successLocation(position) {
    setLat(position.coords.latitude)
    setLong(position.coords.longitude)   
  }

  //unable to get coordinates sets default to Chicago
  function errorLocation() {
    setLong(-87.623177)
    setLat(41.881832)
  }

  //get info from apis with lat,long
  useEffect(() => {
    if(lat && long){
      dogParkApiCall()
      shopsApiCall()
      vetsApiCall()
      servicesApiCall()
    }
  }, [lat, long])

  //after api calls set the map
  useEffect(() => {
    if (arrayOfDogParks && arrayOfShops && arrayOfVets && arrayOfServices) {
      setUpMap([long, lat])
    }
  }, [arrayOfDogParks, arrayOfShops, arrayOfVets, arrayOfServices] )

  //setup map
  function setUpMap(center) {

    //base map setup
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: 10,
    });
    
    //create nav bar
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    //search box functionality
    const search = new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl : mapboxgl })
    map.addControl(search)    

    //create marker for lost/aggressive dog
    map.on("dblclick", (evt) => {

      //popup for lost/aggressive dog markers
      const popup = new mapboxgl.Popup().setHTML(`
        <select>
          <option value='nothing'>
            nothing
            </options>
          <option value='agressive dog'>
            Aggressive Dog
          </option>
          <option value='lost dog'>
            Lost Dog
          </option>
          <option value='delete'>
            Delete
            </options>
        </select>`)

      let marker = new mapboxgl.Marker().setLngLat([evt.lngLat.lng, evt.lngLat.lat]).setPopup(popup).addTo(map)
      const selectTag = marker.getPopup()._content.children[0]

      selectTag.addEventListener("change", (e) => {
        if (e.target.value === "agressive dog") {
          dispatchEvent('mapbox.setflash', {message: "agressive dog", error: true, fadeout: 10})
          marker.remove()
          marker = new mapboxgl.Marker({
            color: "#DD0000"
          }).setLngLat([evt.lngLat.lng, evt.lngLat.lat]).setPopup(popup).addTo(map)
        } else if (e.target.value === "lost dog") {
          dispatchEvent('mapbox.setflash', {message: "lost dog", warn: true, fadeout: 10})
          marker.remove()
          marker = new mapboxgl.Marker({
            color: "#FFCC00"
          }).setLngLat([evt.lngLat.lng, evt.lngLat.lat]).setPopup(popup).addTo(map)
        } else if (e.target.value === 'delete') {
          marker.remove()
        }
      })
    })

    //alert for marker
    map.addControl( new Flash())

    //show info for dog parks
    map.on("click", "dog-parks", (e) => {
      const name = e.features[0].properties.name;
      const address = e.features[0].properties.address_line2;

      new mapboxgl.Popup({ closeOnClick: false}).setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(`Park Name: ${name}. Location: ${address}`).addTo(map)
    }) 

    //show info for shops
    map.on("click", "shops", (e) => {
      const name = e.features[0].properties.name;
      const address = e.features[0].properties.address_line2;

      new mapboxgl.Popup({ closeOnClick: false}).setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(`Shop Name: ${name}. Location: ${address}`).addTo(map)
    }) 

    //show info for vets
    map.on("click", "vets", (e) => {
      const name = e.features[0].properties.name;
      const address = e.features[0].properties.address_line2;

      new mapboxgl.Popup({ closeOnClick: false}).setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(`Vet Name: ${name}. Location: ${address}`).addTo(map)
    }) 

    //show info for services
    map.on("click", "service", (e) => {
      const name = e.features[0].properties.name;
      const address = e.features[0].properties.address_line2;

      new mapboxgl.Popup({ closeOnClick: false}).setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(`Name: ${name}. Location: ${address}`).addTo(map)
    }) 

    map.on('load', () => {

      //dog park layer
      map.loadImage('https://cdn-icons-png.flaticon.com/512/3564/3564555.png', (error, image) => {
        if (error) throw error;

        //add paw image
        map.addImage('paw', image);

        //set source to dog park API call
        map.addSource('dog-parks', {
          type: 'geojson',
          data: arrayOfDogParks
        })

        //create layer for points with image and source
        map.addLayer({
          id: 'dog-parks',
          source: 'dog-parks', //from source above
          type: 'symbol',
          layout: {
            // Make the layer visible by default.
            'visibility': 'visible',
            'icon-image': 'paw', // reference the image
            'icon-size': 0.06
          },
        })
      });

      //shops layer
      map.loadImage('https://cdn-icons-png.flaticon.com/512/286/286459.png', (error, image) => {
        if (error) throw error;

        //add cart image
        map.addImage('cart', image);

        //set source to shop API call
        map.addSource('shops', {
          type: 'geojson',
          data: arrayOfShops
        })

        //create layer for points with image and source
        map.addLayer({
          id: 'shops',
          source: 'shops', //from source above
          type: 'symbol',
          layout: {
            // Make the layer visible by default.
            'visibility': 'visible',
            'icon-image': 'cart', // reference the image
            'icon-size': 0.06
          },
        })
      });

      //vets layer
      map.loadImage('https://cdn-icons-png.flaticon.com/512/2295/2295137.png', (error, image) => {
        if (error) throw error;

        //add vet image
        map.addImage('vet', image);

        //set source to vet API call
        map.addSource('vets', {
          type: 'geojson',
          data: arrayOfVets
        })

        //create layer for points with image and source
        map.addLayer({
          id: 'vets',
          source: 'vets', //from source above
          type: 'symbol',
          layout: {
            // Make the layer visible by default.
            'visibility': 'visible',
            'icon-image': 'vet', // reference the image
            'icon-size': 0.06
          },
        })
      });

      //services layer
      map.loadImage('https://cdn-icons-png.flaticon.com/512/452/452721.png', (error, image) => {
        if (error) throw error;

        //add service image
        map.addImage('service', image);

        //set source to service API call
        map.addSource('services', {
          type: 'geojson',
          data: arrayOfServices
        })

        //create layer for points with image and source
        map.addLayer({
          id: 'service',
          source: 'services', //from source above
          type: 'symbol',
          layout: {
            // Make the layer visible by default.
            'visibility': 'visible',
            'icon-image': 'service', // reference the image
            'icon-size': 0.06
          },
        })
      });
    });

    //after map is loaded
    map.on('idle', () => {
      // If these layers were not added to the map, abort
      if (!map.getLayer('dog-parks' || 'shops' || 'vets' || 'service')) {
        return
      }
      
      // Enumerate ids of the layers.
      const toggleableLayerIds = ['dog-parks', 'shops', 'vets', 'service'];
      
      // Set up the corresponding toggle button for each layer.
      for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
          continue
        }
        
        // Create a link.
        const link = document.createElement('a');
          link.id = id;
          link.href = '#';
          link.textContent = id;
          link.className = 'active';
        
        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
          const clickedLayer = this.textContent;
          e.preventDefault();
          e.stopPropagation();
          
          const visibility = map.getLayoutProperty(
            clickedLayer,
            'visibility'
          );
          
          // Toggle layer visibility by changing the layouts visibility property.
          if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none')
            this.className = ''
          }
          else {
            this.className = 'active'
            map.setLayoutProperty(
              clickedLayer,
              'visibility',
              'visible'
            )
          }
        };
        
        //add layer button to map menu/nav
        const layers = document.getElementById('menu');
        (link && layers.appendChild(link));        
      }
    });
  }

  //API calls

  //call for dog parks
  const dogParkApiCall = () => {
    axios.get(`https://api.geoapify.com/v2/places?categories=pet.dog_park&filter=circle:${long},${lat},15000&apiKey=1d9fd57fb2b14fb5bfe2315af8475c59`).then((response) => { setArrayOfDogParks(response.data)})
  }

  //call for shops
  const shopsApiCall = () => {
    axios.get(`https://api.geoapify.com/v2/places?categories=pet.shop&filter=circle:${long},${lat},15000&apiKey=1d9fd57fb2b14fb5bfe2315af8475c59`).then((response) => { setArrayOfShops(response.data)})
  }

  //call for vets
  const vetsApiCall = () => {
    axios.get(`https://api.geoapify.com/v2/places?&categories=pet.veterinary&filter=circle:${long},${lat},15000&apiKey=1d9fd57fb2b14fb5bfe2315af8475c59`).then((response) => { setArrayOfVets(response.data)})
  }

  //call for services
  const servicesApiCall = () => {
    axios.get(`https://api.geoapify.com/v2/places?categories=pet.service&filter=circle:${long},${lat},15000&apiKey=1d9fd57fb2b14fb5bfe2315af8475c59`).then((response) => { setArrayOfServices(response.data)})
  }

  return (
    <div>
      <nav id="menu"></nav>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default MapPage;