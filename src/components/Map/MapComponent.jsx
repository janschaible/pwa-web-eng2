import {useEffect,useRef} from "react";
import mapboxgl from 'mapbox-gl';
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import {MapContainer} from './MapComponent.elements'

const MapComponent = ()=>{
    mapboxgl.accessToken = 'pk.eyJ1IjoiamFuc2NoYWlibGUiLCJhIjoiY2wzaGN3cmRnMWFvejNjcHY4N3FnY3dseSJ9.TCNygG-kgiT3SJy1_l02yg'
    const mapContainer = useRef();

    useEffect(()=>{
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [-73.985664, 40.748514],
            zoom: 12
        });

        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving'
        })
        map.addControl(directions, 'top-left');
    },[])

    return (
        <MapContainer ref={mapContainer}>
        </MapContainer>
  )
}

export default MapComponent
