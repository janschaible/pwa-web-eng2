import React from 'react'
import Map, {NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const initialViewState = {
    latitude: 37.7751,
    longitude: -122.4193,
    zoom: 11,
    bearing: 0,
    pitch: 0
};

const MapComponent = ()=>{
    return (
    <Map
        initialViewState={initialViewState}
        style={{width: "100%", height: "100%"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={'pk.eyJ1IjoiamFuc2NoYWlibGUiLCJhIjoiY2wzaGN3cmRnMWFvejNjcHY4N3FnY3dseSJ9.TCNygG-kgiT3SJy1_l02yg'}
    >
        <NavigationControl position='top-left'/>
    </Map>
  )
}

export default MapComponent
