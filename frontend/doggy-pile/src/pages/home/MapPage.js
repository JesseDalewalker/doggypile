import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { LngLat } from 'mapbox-gl';
import { useEffect, useState, useRef } from 'react'
import { Marker, Map } from 'react-map-gl'
import axios from 'axios'
import image from '../../assets/map-marker-icon.png'

function MapPage() {

  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [currentLongitude, setCurrentLongitude] = useState()
  // const [currentLatitude, setCurrentLatitude] = useState()
  // const [markerLongitude, setMarkerLongitude] = useState()
  // const [markerLatitude, setMarkerLatitude] = useState()



  // mapboxgl.accessToken = 'pk.eyJ1IjoianByaWNlNDQiLCJhIjoiY2wya3V0YnAzMDJ2cjNkcG4zdGM3bmoweiJ9.IifArH7eSqtdEvfzaIpxfw';

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true })
  // });


  // function successLocation(position) {
  //   // console.log(position)
  //   setUpMap([position.coords.longitude, position.coords.latitude])
  // }

  // function errorLocation() {
  //   setUpMap([-87.623177, 41.881832])
  // }

  // function setUpMap(center) {
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: center,
  //     zoom: 10,
  //     });
    
  //     const nav = new mapboxgl.NavigationControl();
  //     map.current.addControl(nav);

      // const marker = new mapboxgl.Marker({
      //   color: "#DC143C",
      //   draggable: true
      // }).setLngLat([-87.623177, 41.881832]).addTo(map.current)
  // }

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true })
  // }, [])

  //   function successLocation(position) {
  //     setCurrentLatitude(position.coords.latitude)
  //     setCurrentLongitude(position.coords.longitude)
  // }

  //   function errorLocation() {
  //     setCurrentLatitude(41.881832)
  //     setCurrentLongitude(-87.623177)
  // }

  // function placeMarker(e) {
  //   console.log(e)
  //   console.log(e.lngLat)
  //   console.log(e.lngLat.lng)
  //   console.log(e.lngLat.lat)
  //   setMarkerLongitude(e.lngLat.lng)
  //   setMarkerLatitude(e.lngLat.lat)
  // }

  return (
    <div>
      {/* <div ref={mapContainer} className="map-container" /> */}
      <Map  
      initialViewState={{
        longitude: -87.623177,
        latitude: 41.881832,
        zoom: 10
      }}
      style={{width: '100vw', height: '100vh'}}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      mapboxAccessToken='pk.eyJ1IjoianByaWNlNDQiLCJhIjoiY2wya3V0YnAzMDJ2cjNkcG4zdGM3bmoweiJ9.IifArH7eSqtdEvfzaIpxfw'
      /> 
      {/* <Marker longitude={markerLongitude} latitude={markerLatitude}>
        <img src={image} alt="" />
      </Marker> */}
    </div>
  )
}

export default MapPage;