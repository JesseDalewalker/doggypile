import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useState, useRef } from 'react'
// import { Marker, Map, useMap, NavigationControl } from 'react-map-gl'
// import image from '../../assets/map-marker-icon.png'
import axios from 'axios';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Flash from 'mapbox-gl-flash'
import DoggyPileAPI from "../../api/DoggyPileAPI";
import './MapPage2.scss'
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css'

function MapPage(props) {

  let loading = require('../../assets/loading.gif')
  
  const mapContainer = useRef(null);
  const [map, setMap] = useState();
  const [arrayOfDogParks, setArrayOfDogParks] = useState()
  const [arrayOfShops, setArrayOfShops] = useState()
  const [arrayOfVets, setArrayOfVets] = useState()
  const [arrayOfServices, setArrayOfServices] = useState()
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [mapMarkers, setMapMarkers] = useState()
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    markerApiCall()
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
  }, [arrayOfDogParks, arrayOfShops, arrayOfVets, arrayOfServices, mapMarkers] )

  //setup map
  function setUpMap(center) {

    //base map setup
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: 10,
      doubleClickZoom: false,
    });
    
    //create nav bar
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    //search box functionality
    const search = new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl : mapboxgl, collapsed: true })
    map.addControl(search, 'top-left')   
    
    //--------------------------------------------Markers Start------------------------------------------------------------------------------------------------
    //create marker for lost/aggressive dog from database
    mapMarkers.map(mark => {

      // popup for lost/aggressive dog markers
      const popupDB = new mapboxgl.Popup().setHTML(`
        <select>
          <option value='nothing'>
            nothing
            </options>
          <option value='aggressive dog'>
            Aggressive Dog
          </option>
          <option value='lost dog'>
            Lost Dog
          </option>
          <option value='delete'>
            Delete
            </options>
        </select>`)

      let markerDB = ''

      //set marker color if it is aggressive dog or lost dog
      if (mark.name === "aggressive dog") {
        markerDB = new mapboxgl.Marker({
          color: "#DD0000"
        }).setLngLat([mark.longitude, mark.lattitude]).setPopup(popupDB).addTo(map)
      } else if (mark.name === "lost dog") {
        markerDB = new mapboxgl.Marker({
          color: "#FFCC00"
        }).setLngLat([mark.longitude, mark.lattitude]).setPopup(popupDB).addTo(map)
      }

      //get select tag from marker popup
      const selectTag = markerDB.getPopup()._content.children[0]

      //event listener to change the marker attributes based on selected item
      selectTag.addEventListener("change", (e) => {
        //if aggressive dog makes red marker
        if (e.target.value === "aggressive dog") {
          //creates red alert banner for aggressive dog
          dispatchEvent('mapbox.setflash', {message: "aggressive dog", error: true, fadeout: 10})
          //removes previous default(blue) marker
          let lngLat = markerDB.getLngLat()
          removeMarkerFromDataBase(lngLat)
          markerDB.remove()
          //creates new red marker
          markerDB = new mapboxgl.Marker({
            color: "#DD0000"
          }).setLngLat([mark.longitude, mark.lattitude]).setPopup(popupDB).addTo(map)
          //get/set marker data and save to database
          lngLat = markerDB.getLngLat()
          let markerDBData = {
            name : 'aggressive dog',
            description : 'aggressive dog',
            lattitude : lngLat.lat,
            longitude : lngLat.lng, 
            user : props.username.user_id
          }
          addMarkToDatabaset(markerDBData)
        } 
        //if lost dog makes marker yellow
        else if (e.target.value === "lost dog") {
          //creates yellow alert banner for aggressive dog
          dispatchEvent('mapbox.setflash', {message: "lost dog", warn: true, fadeout: 10})
          //removes previous default(blue) marker
          let lngLat = markerDB.getLngLat()
          removeMarkerFromDataBase(lngLat)
          markerDB.remove()
          // create new yellow marker
          markerDB = new mapboxgl.Marker({
            color: "#FFCC00"
          }).setLngLat([mark.longitude, mark.lattitude]).setPopup(popupDB).addTo(map)
          //get/set marker data and save to database
          lngLat = markerDB.getLngLat()
          let markerDBData = {
            name : 'lost dog',
            description : 'lost dog',
            lattitude : lngLat.lat,
            longitude : lngLat.lng, 
            user : props.username.user_id
          }
          addMarkToDatabaset(markerDBData)
        } 
        //removes marker from map and database
        else if (e.target.value === 'delete') {
          let lngLat = markerDB.getLngLat()
          removeMarkerFromDataBase(lngLat)
          markerDB.remove()
        }
      })

      // function with api call to add marker to db
      const addMarkToDatabaset = async (markerDBData) => {
        const data = await DoggyPileAPI.createItems('marker', markerDBData)
        if (data){
          console.log('added to databaset:')
          markerApiCall()
        }
      }  

      // function with api call to remove marker to db
      const removeMarkerFromDataBase = async (lngLat) => {
        //gets the selected marker from the mapMarker list
        let markerToDelete = mapMarkers.filter(marker => 
          marker.lattitude === lngLat.lat && marker.longitude === lngLat.lng
        )
        //if a marker matches, delete from database
        for (const deleteMarker of markerToDelete){
          let id = deleteMarker.id
          const data = await DoggyPileAPI.deleteItem('marker', id)
          if (data){
            console.log('removed marker')
          }
        }
      }
    })

    //create new marker for lost/aggressive dog
    map.on("dblclick", (evt) => {

      //popup for lost/aggressive dog markers
      const popup = new mapboxgl.Popup().setHTML(`
        <select>
          <option value='nothing'>
            nothing
            </options>
          <option value='aggressive dog'>
            Aggressive Dog
          </option>
          <option value='lost dog'>
            Lost Dog
          </option>
          <option value='delete'>
            Delete
            </options>
        </select>`)

      //set initial marker with popup
      let marker = new mapboxgl.Marker().setLngLat([evt.lngLat.lng, evt.lngLat.lat]).setPopup(popup).addTo(map)
      //get select tag from marker
      const selectTag = marker.getPopup()._content.children[0]

      //event listener for the select tag
      selectTag.addEventListener("change", (e) => {
        //if aggressive dog makes red marker
        if (e.target.value === "aggressive dog") {
          //creates red alert banner for aggressive dog
          dispatchEvent('mapbox.setflash', {message: "aggressive dog", error: true, fadeout: 10})
          //removes previous default(blue) marker
          let lngLat = marker.getLngLat()
          removeMarkerFromDataBase(lngLat)
          marker.remove()
          //creates new red marker
          marker = new mapboxgl.Marker({
            color: "#DD0000"
          }).setLngLat([evt.lngLat.lng, evt.lngLat.lat]).setPopup(popup).addTo(map)
          //get/set marker data and save to database
          lngLat = marker.getLngLat()
          let markerData = {
            name : 'aggressive dog',
            description : 'aggressive dog',
            lattitude : lngLat.lat,
            longitude : lngLat.lng, 
            user : props.username['user_id']
          }
          addMarkToDatabaset(markerData)
        } 
        //if lost dog makes marker yellow
        else if (e.target.value === "lost dog") {
          dispatchEvent('mapbox.setflash', {message: "lost dog", warn: true, fadeout: 10})
          //removes previous default(blue) marker
          let lngLat = marker.getLngLat()
          removeMarkerFromDataBase(lngLat)
          marker.remove()
          // create new yellow marker
          marker = new mapboxgl.Marker({
            color: "#FFCC00"
          }).setLngLat([evt.lngLat.lng, evt.lngLat.lat]).setPopup(popup).addTo(map)
          //get/set marker data and save to database
          lngLat = marker.getLngLat()
          let markerData = {
            name : 'lost dog',
            description : 'lost dog',
            lattitude : lngLat.lat,
            longitude : lngLat.lng, 
            user : props.username['user_id']
          }
          addMarkToDatabaset(markerData)
        } 
        //removes marker from map and database
        else if (e.target.value === 'delete') {
          let lngLat = marker.getLngLat()
          removeMarkerFromDataBase(lngLat)
          marker.remove()
        }
      })

      // function with api call to add marker to db
      const addMarkToDatabaset = async (markerData) => {
        const data = await DoggyPileAPI.createItems('marker', markerData)
        if (data){
          let newMapMarkers = mapMarkers
          newMapMarkers.push(markerData)
          setMapMarkers(newMapMarkers)
          console.log('added to databaset:')
          markerApiCall()
        }
      } 
      
      // function with api call to remove marker to db
      const removeMarkerFromDataBase = async (lngLat) => {
        //gets the selected marker from the mapMarker list
        let markerToDelete = mapMarkers.filter(marker => 
          marker.lattitude === lngLat.lat && marker.longitude === lngLat.lng
        )
        //if a marker matches, delete from database
        for (const deleteMarker of markerToDelete){
          let id = deleteMarker.id
          const data = await DoggyPileAPI.deleteItem('marker', id)
          if (data){
            console.log('removed marker')
          }
        }
      }
    })

    //alert for marker
    map.addControl( new Flash())
//--------------------------------------------Markers End------------------------------------------------------------------------------------------------
//--------------------------------------------Layers Start-----------------------------------------------------------------------------------------------

    const distanceContainer = document.getElementById('distance')

    //create GeoJSON object to hold measurments
    const geojsonRoutes = {
      'type': 'FeatureCollection',
      'features': []
      };
    
    //functionality for creating line
    const linestring = {
      'type': 'Feature',
      'geometry': {
      'type': 'LineString',
      'coordinates': []
      }
      };

    //change cursor for icon hover
    map.on('mouseenter', 'dog-parks', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseenter', 'shops', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseenter', 'vets', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseenter', 'services', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    // map.on('mouseenter', 'measure-points', () => {
    //   map.getCanvas().style.cursor = 'pointer'
    // })
    
    //change cursor back to normal
    map.on('mouseleave', 'dog-parks', () => {
      map.getCanvas().style.cursor = ''
    })
    map.on('mouseleave', 'shops', () => {
      map.getCanvas().style.cursor = ''
    })
    map.on('mouseleave', 'vets', () => {
      map.getCanvas().style.cursor = ''
    })
    map.on('mouseleave', 'services', () => {
      map.getCanvas().style.cursor = ''
    })
    // map.on('mouseleave', 'measure-points', () => {
    //   map.getCanvas().style.cursor = ''
    // })

    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point, {
      layers: ['measure-points']
      });
      // Change the cursor to a pointer when hovering over a point on the map.
      // Otherwise cursor is a default.
      map.getCanvas().style.cursor = features.length
      ? 'pointer'
      : '';
      });

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

      //routes layer

      //set source to geojson object created earlier
      map.addSource('geojsonRoutes', {
        'type': 'geojson',
        'data': geojsonRoutes
        });
      
      //create layer for points on route
      map.addLayer({
        id: 'measure-points',
        type: 'circle',
        source: 'geojsonRoutes',
        layout: {
          'visibility' : 'none',
        },
        paint: {
        'circle-radius': 4,
        'circle-color': '#4B4141'
        },
        filter: ['in', '$type', 'Point']
      });

      //create layer for lines on route
      map.addLayer({
        id: 'measure-lines',
        type: 'line',
        source: 'geojsonRoutes',
        layout: {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility' : 'none',
        },
        paint: {
        'line-color': '#4B4141',
        'line-width': 2.5
        },
        filter: ['in', '$type', 'LineString']
      });

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
            'visibility': 'none',
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
            'visibility': 'none',
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
            'visibility': 'none',
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
            'visibility': 'none',
            'icon-image': 'service', // reference the image
            'icon-size': 0.06
          },
        })
      });
    });

    //after map is loaded
    map.on('idle', () => {

      setIsLoading(false)

      //functionality for routing clicks
      map.on('click', (e) => {

        //get visibility setting for route points and line layers
        let lineVisibility = map.getLayoutProperty(
          'measure-lines',
          'visibility'
        );
        let pointVisibility = map.getLayoutProperty(
          'measure-points',
          'visibility'
        );
        
        //if the layers are visible continue functionality
        if (lineVisibility === 'visible' && pointVisibility === 'visible') {

          //get the points features
          const features = map.queryRenderedFeatures(e.point, {
            layers: ['measure-points']
          });
          
          // Remove the linestring from the group
          if (geojsonRoutes.features.length > 1) geojsonRoutes.features.pop();
          
          // Clear the distance container to populate it with a new value.
          distanceContainer.innerHTML = '';
          
          // If a feature was clicked, remove it from the map.
          if (features.length) {
            const id = features[0].properties.id;
            geojsonRoutes.features = geojsonRoutes.features.filter(
              (point) => point.properties.id !== id
            );
          } 
          // else create geojson data for points
          else {
            const point = {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [e.lngLat.lng, e.lngLat.lat]
              },
              'properties': {
              'id': String(new Date().getTime())
              }
            };
            geojsonRoutes.features.push(point);
          }
          
          //create coordinates for geojson feature lines
          if (geojsonRoutes.features.length > 1) {
            linestring.geometry.coordinates = geojsonRoutes.features.map(
              (point) => point.geometry.coordinates
            );
            
            geojsonRoutes.features.push(linestring);
            
            // Populate the distanceContainer with total distance
            // const value = document.createElement('pre');
            // const distance = turf.length(linestring);
            // value.textContent = `Total distance: ${distance.toLocaleString()}km`;
            // distanceContainer.appendChild(value);
          }
          
          map.getSource('geojsonRoutes').setData(geojsonRoutes);
        }
      });

      //add layer Buttons to menu

      // If these layers were not added to the map, abort
      if (!map.getLayer('dog-parks' || 'shops' || 'vets' || 'service' || 'measure-points' || 'measure-lines')) {
        return
      }
      
      // Enumerate ids of the layers.
      const toggleableLayerIds = ['dog-parks', 'shops', 'vets', 'service'];
      const routeLayers = ['measure-points', 'measure-lines'];
      
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
          link.className = '';
        
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

      if(!document.getElementById('routes')){
        // Skip layers that already have a button set up.
        var routeLink = document.createElement('a');
        routeLink.id = 'routes'
        routeLink.href = '#';
        routeLink.className = '';
        routeLink.textContent = "Routes";
        routeLink.onclick = function (e) {
            for(var index in routeLayers) {
              var clickedLayer = routeLayers[index];
              e.preventDefault();
              e.stopPropagation();

              var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

              if (visibility === 'visible') {
                  map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                  this.className = '';
              } else {
                  this.className = 'active';
                  map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
              }
            }
        };
        var layers = document.getElementById('menu');
        layers.appendChild(routeLink)        
      }
    });    
  }
//--------------------------------------------Layers End-------------------------------------------------------------------------------------------------
//--------------------------------------------API calls--------------------------------------------------------------------------------------------------

  //call for dog parks
  const markerApiCall = async () => {
    const data = await DoggyPileAPI.getAllItems("marker")
    if (data){
      setMapMarkers(data)
      console.log('made doggy api call')
    }
    // setMapMarkers (data ? data : [])
  }

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
      <nav id="menu"> 
        <div id='menu-title'>Filters</div> 
        <hr id='menu-hr'/>
      </nav>
      <div id="distance" class="distance-container"></div>
      {isLoading && <img className='center' src={loading} alt="Loading"/>}
      {/* {isLoading && <div className='center'> Don't worry it's loading</div>} */}
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default MapPage;