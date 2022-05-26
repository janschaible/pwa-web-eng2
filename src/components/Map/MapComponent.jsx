import React, {useCallback, useEffect, useRef, useState} from 'react'
import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

const initialViewState = {
    latitude: 37.7751,
    longitude: -122.4193,
    zoom: 11,
    bearing: 0,
    pitch: 0
};

const MapComponent = ()=>{
    mapboxgl.accessToken='pk.eyJ1IjoiamFuc2NoYWlibGUiLCJhIjoiY2wzaGN3cmRnMWFvejNjcHY4N3FnY3dseSJ9.TCNygG-kgiT3SJy1_l02yg'
    const [mapRef,setMapRef] = useState(null)

    const getRoute = useCallback(async (end) => {
            if (mapRef==null){
                console.log("mapRef was not set")
                return;
            }
            const map = mapRef.getMap()
            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/cycling/-122.49328605346639,37.8244727708812;${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                { method: 'GET' }
            );
            const json = await query.json();
            const data = json.routes[0];
            console.log(data)
            const route = data.geometry.coordinates;
            const geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: route
                }
            };
            // if the route already exists on the map, we'll reset it using setData
            if (map.getSource('route')) {
                map.getSource('route').setData(geojson);
            }
            // otherwise, we'll make a new request
            else {
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: geojson
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                        'line-opacity': 0.75
                    }
                });
            }
        }
        ,[mapRef])

    const mapRefSet = (ref)=> {
        setMapRef(ref)
        if (mapRef == null) {
            return
        }
        const map = mapRef.getMap()
        map.on('click', (event) => {
            console.log("coordinates",Object.keys(event.lngLat).map((key) => event.lngLat[key]))
            const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
            const end = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: coords
                        }
                    }
                ]
            };
            if (map.getLayer('end')) {
                map.getSource('end').setData(end);
            } else {
                map.addLayer({
                    id: 'end',
                    type: 'circle',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    properties: {},
                                    geometry: {
                                        type: 'Point',
                                        coordinates: coords
                                    }
                                }
                            ]
                        }
                    },
                    paint: {
                        'circle-radius': 10,
                        'circle-color': '#f30'
                    }
                });
            }
            getRoute(coords);
        })
    }

    return (
    <Map
        ref={mapRefSet}
        initialViewState={initialViewState}
        style={{width: "100%", height: "100%"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
    >
    </Map>
  )
}

export default MapComponent
