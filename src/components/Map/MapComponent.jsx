import React, {useCallback, useEffect, useState} from 'react'
import {Map} from './MapComponent.elements'
import {TileLayer, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Routing from '@/components/Routing/Routing'
import {useDispatch, useSelector} from 'react-redux';
import {setMapPosition, setMapZoom, setCurrentPosition, setFollowing} from '@/features/routing/routingSlice'
import {f7} from 'framework7-react';
import {findWikiEntries} from "../../features/wikiPosts/wikiEntries";

const EventHandeler = () => {
    const dispatch = useDispatch()
    const [locatingError, setLocatingError] = useState(false)
    const following = useSelector(state => state.routing.following)
    const routingActive = useSelector(state => state.routing.routingActive)
    const mapPosition = useSelector(state => state.routing.mapPosition)
    const mapZoom = useSelector(state => state.routing.mapZoom)
    const wikiCollection = findWikiEntries(mapPosition[0], mapPosition[1], mapZoom)

    const map = useMapEvents({
        zoomend: () => {
            //zoom in on mouse position changes position of map
            const center = map.getCenter()
            dispatch(setMapPosition([center.lat, center.lng]))
            dispatch(setMapZoom(map.getZoom()))
        },
        drag: () => {
            const center = map.getCenter()
            dispatch(setMapPosition([center.lat, center.lng]))
            dispatch(setFollowing(false))
        }
    });

    const updateLocation = useCallback(() => {
        window.navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude
            const long = position.coords.longitude
            dispatch(setCurrentPosition([lat, long]))
            if (following) {
                //sets the map position
                dispatch(setMapPosition([lat, long]))
            }
            setLocatingError(false)
        }, () => setLocatingError(true))
    }, [])

    useEffect(() => {
        updateLocation() //sets the current location on startup
    }, [])

    //Creates Marker at locations returned from wikiAPI-call
    //Currently works only when debugging and setting a breakpoint before for-loop (Line 56)
    useEffect(() => {
        console.log(wikiCollection)
        for (let i = 0; i < wikiCollection.length; i++) {
            const marker = L.marker([wikiCollection[i].lat, wikiCollection[i].lon], {title: wikiCollection[i].title}).addTo(map)
        }
    }, [mapPosition])

    useEffect(() => {
        if (!routingActive) return
        //fly on load to lcation of user
        window.navigator.geolocation.getCurrentPosition(position => {
            map.flyTo([position.coords.latitude, position.coords.longitude], map.getZoom())
        })

        //start location polling
        const locationGetter = setInterval(updateLocation, 3000)
        return () => clearInterval(locationGetter)
    }, [routingActive])

//alert user if we cannot get their location
    useEffect(() => {
        if (locatingError) {
            f7.dialog.alert("Leider konnten wir ihre position nicht feststellen")
        }
    }, [locatingError])

    return <></>
}

const MapComponent = () => {
    const position = useSelector(state => state.routing.mapPosition)
    const zoom = useSelector(state => state.routing.mapZoom)

    const [mapRef, setMapRef] = useState(null)
    const mapRefCallback = useCallback(ref => {
        setMapRef(ref)
    }, [])

    useEffect(() => {
        if (mapRef == null) {
            return
        }
        mapRef.setView(position, zoom)
    }, [mapRef, position, zoom])

    return (
        <Map
            ref={mapRefCallback}
            center={position}
            zoom={zoom}
            attributionControl={false}
            zoomControl={false}
            maxBounds={[
                [-90, -180],
                [90, 180]
            ]}
            maxBoundsViscosity={0.8}
            minZoom={3}
        >
            <TileLayer
                noWrap={true}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Routing/>
            <EventHandeler/>
        </Map>
    )
}

export default MapComponent

/*

            <TileLayer
                url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                maxZoom={20}
                subdomains={['mt1','mt2','mt3']}
            />
            
            <TileLayer
            noWrap={true}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <WMSTileLayer
                layers={'TOPO-OSM-WMS'}
                url={`http://ows.mundialis.de/services/service?`}
            />
*/