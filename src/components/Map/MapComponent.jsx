/**
 * This file contains the functionality for displaying the map
 * and hadeling events from the map and events that change the maps position or zoom
 */

import React, {useCallback, useEffect, useState} from 'react'
import {Map} from './MapComponent.elements'
import {Polyline,Marker,useMapEvents }from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Routing from '@/components/Routing/Routing'
import {useDispatch, useSelector} from 'react-redux';
import constants from '@/js/constants';
import {
    setMapPosition,
    setMapZoom,
    setCurrentPosition,
    setStartUp,
    setTargetPosition
} from '@/features/routing/routingSlice'
import {f7} from 'framework7-react';
import {findWikiEntries} from "@/features/wikiPosts/wikiEntries";
import L from 'leaflet'

/**
 * Component handles any event that requires access to the map
 * furthermore it keeps the maps state with the app's state in sync
 */

const EventHandeler = () => {
    const dispatch = useDispatch()
    const [locatingError, setLocatingError] = useState(false)
    const [locationPoller, setLocationPoller] = useState()
    const startUp = useSelector(state => state.routing.startUp)
    const following = useSelector(state => state.routing.following)
    const routingActive = useSelector(state => state.routing.routingActive)
    const targetPosition = useSelector(state => state.routing.targetPosition)
    const tileLayer = useSelector(state=>state.routing.tileLayer)
    const [activeLayer,setActiveLayer] = useState()

    /**
     * update the position and zoom of the map into redux store
     */
    const map = useMapEvents({
        zoomend: () => {
            //zoom in on mouse position changes position of map
            const center = map.getCenter()
            dispatch(setMapPosition([center.lat, center.lng]))
            dispatch(setMapZoom(map.getZoom()))
        },
        moveend: () => {
            const center = map.getCenter()
            dispatch(setMapPosition([center.lat, center.lng]))
        }
    });

    const stopLocationPolling = useCallback(() => {
        if (locationPoller) {
            clearInterval(locationPoller)
        }
    }, [locationPoller])

    /**
     * Setting the choosen layer to the map
     */
    useEffect(()=>{
        if(!map)return
        if(activeLayer){
            map.removeLayer(activeLayer)
            setActiveLayer(null)
        }
        if (tileLayer==0) {
            const layer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
                attribution:"&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"

            })
            setActiveLayer(layer)
            map.addLayer(layer)
        }
        if (tileLayer==1) {
            const layer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                maxZoom: 20,
                subdomains: ['mt1','mt2','mt3']
            })
            setActiveLayer(layer)
            map.addLayer(layer)
        }
        if (tileLayer==2) {
            const layer = L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png",
            {
                attribution:
                    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
                    '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
                    "Map data {attribution.OpenStreetMap}",
                minZoom: 1,
                maxZoom: 16
            })
            setActiveLayer(layer)
            map.addLayer(layer)
        }
    }, [tileLayer])

    /**
     * fly to the users position when the map is started
     * has to be done with a variable from redux since there was some wired behaviour
     * when switching back to the main page
     */
    useEffect(()=>{
        if(!startUp)return
        dispatch(setStartUp(false))
        //fly to users location on startup
        window.navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude
            const long = position.coords.longitude
            map.flyTo([lat,long],constants.mapFlyToZoom)
            dispatch(setCurrentPosition([lat,long]))
        }, ()=>setLocatingError(true))
    },[startUp])

    /**
     * starting the location polling and maintains the map on the user position
     */
    useEffect(()=>{
        if(!routingActive){
            stopLocationPolling()
            return
        }
        //fly on load to location of user on navigation start
        window.navigator.geolocation.getCurrentPosition(position => {
            if (!routingActive) {
                return //check again because of delay
            }
            const lat = position.coords.latitude
            const long = position.coords.longitude
            map.flyTo([lat,long],constants.mapFlyToZoom)
            dispatch(setCurrentPosition([lat,long]))
        }, ()=>setLocatingError(true))

        //start location polling
        const locationGetter = setInterval(() => {
            window.navigator.geolocation.getCurrentPosition(position => {
                if (!routingActive) {
                    return //check again because of delay
                }
                const lat = position.coords.latitude
                const long = position.coords.longitude
                if(following){
                    //fly to the location with the current map zoom
                    //that allows the user to zoom in and out while being routed
                    map.flyTo([lat,long],map.getZoom())
                }
                dispatch(setCurrentPosition([lat, long]))
                setLocatingError(false)
            }, () => setLocatingError(true))
        }, 3000)
        setLocationPoller(locationGetter)
        return ()=>clearInterval(locationGetter)
    },[routingActive])

    /**
     * fly to target position whenever that changes
     */
    useEffect(()=>{
        if(!targetPosition)return
        map.flyTo([targetPosition.lat,targetPosition.lon],constants.mapFlyToZoom)
    },[targetPosition])

    /**
     * alert user if we cannot get their location
     */
    useEffect(()=>{
        if(locatingError){clearInterval(locationGetter)
            f7.dialog.alert("Leider konnten wir ihre position nicht feststellen")
        }
    }, [locatingError])
}

/**
 *  MapComponent is the main Map container, which is why it contains the eventhandler
 *  and the routing component so that they have access to the map 
 */
const MapComponent = ()=>{
    const [wikiEntries, setWikiEntries] = useState()
    const dispatch = useDispatch()
    const routingActive = useSelector(state=>state.routing.routingActive)
    const mapPosition = useSelector(state=>state.routing.mapPosition)
    const mapZoom = useSelector(state=>state.routing.mapZoom)
    const showLastPath = useSelector(state=>state.routing.showLastPath)
    const lastPath = useSelector(state=>state.routing.lastPath)

    /**
     * creates a polyline from the last taken path
     */
    const getLastPathPoly = useCallback(()=>{
        if (!showLastPath) return
        return <Polyline
            pathOptions={{
                color: 'black',
                weight: 6,
                opacity: 0.9
            }}
            positions={lastPath}
        />
    }, [showLastPath, lastPath])
    //Creates Marker at locations returned from wikiAPI-call
    useEffect(() => {
        const getMarkers = async () => {
            const wikiCollection = await findWikiEntries(mapPosition[0], mapPosition[1], mapZoom)
            setWikiEntries(wikiCollection)
        }
        getMarkers()
    }, [mapPosition,mapZoom])

    /**
     * returns a onclickfunction that sets the passed wiki entrie as the desired targes position
     */
    const getMarkerOnClick = useCallback(
        (entrie) => ({
            click: () => {
                dispatch(setTargetPosition(entrie))
            },
        }), [])

    /**
     * the map center is only set once on initialization
     * the actual position of the map is set by setting a target position
     * the eventhandler will than fly to that position
     */
    return (
        <Map
            center={mapPosition}
            zoom={mapZoom}
            attributionControl={false}
            zoomControl={false}
            maxBounds={[
                [-90, -180],
                [90, 180]
            ]}
            maxBoundsViscosity={0.8}
            minZoom={3}
        >
            {getLastPathPoly()}
            {wikiEntries && !routingActive ? wikiEntries.map(entrie => {
                return (
                    <Marker
                        key={entrie.pageid}
                        position={[entrie.lat, entrie.lon]}
                        eventHandlers={getMarkerOnClick(entrie)}
                        title={entrie.title}
                    />
                )
            }) : <></>}
            <Routing />
            <EventHandeler />
        </Map>
    )
}

export default MapComponent