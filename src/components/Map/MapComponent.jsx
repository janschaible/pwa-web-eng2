import React, {useCallback, useEffect, useState} from 'react'
import {Map} from './MapComponent.elements'
import {TileLayer,Polyline,useMapEvents}from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Routing from '@/components/Routing/Routing'
import { useDispatch, useSelector } from 'react-redux';
import {setMapPosition,setMapZoom,setCurrentPosition,setFollowing} from '@/features/routing/routingSlice'
import { f7 } from 'framework7-react';

const EventHandeler = ()=>{
    const dispatch = useDispatch()
    const [locatingError,setLocatingError] = useState(false)
    const [locationPoller,setLocationPoller] = useState()
    const following = useSelector(state=>state.routing.following)
    const routingActive = useSelector(state=>state.routing.routingActive)

    const map = useMapEvents({
        zoomend:()=>{
            //zoom in on mouse position changes position of map
            const center = map.getCenter()
            dispatch(setMapPosition([center.lat,center.lng]))
            dispatch(setMapZoom(map.getZoom()))
        },
        drag:()=>{
            const center = map.getCenter()
            dispatch(setMapPosition([center.lat,center.lng]))
            dispatch(setFollowing(false))
        }
    });

    const updateLocation =  useCallback(()=>{
        
    },[])

    const stopLocationPolling = useCallback(()=>{
        if(locationPoller){
            clearInterval(locationPoller)
        }
    },[locationPoller])

    useEffect(()=>{
        //fly to users location on startup
        window.navigator.geolocation.getCurrentPosition(position=>{
            const lat = position.coords.latitude
            const long = position.coords.longitude
            map.flyTo([lat,long],map.getZoom())
            dispatch(setCurrentPosition([lat,long]))
            dispatch(setMapPosition([lat,long]))
        }, ()=>setLocatingError(true))
    },[])

    useEffect(()=>{
        if(!routingActive){
            stopLocationPolling()
            return
        }
        //fly on load to lcation of user on navigation start
        window.navigator.geolocation.getCurrentPosition(position=>{
            const lat = position.coords.latitude
            const long = position.coords.longitude
            map.flyTo([lat,long],map.getZoom())
            dispatch(setCurrentPosition([lat,long]))
        }, ()=>setLocatingError(true))

        //start location polling
        const locationGetter = setInterval(()=>{
            window.navigator.geolocation.getCurrentPosition(position=>{
                const lat = position.coords.latitude
                const long = position.coords.longitude
                if(following){
                    map.flyTo([lat,long],map.getZoom())
                    dispatch(setMapPosition([lat,long]))
                }
                dispatch(setCurrentPosition([lat,long]))
                setLocatingError(false)
            }, ()=>setLocatingError(true))
        },3000)
        setLocationPoller(locationGetter)
        return ()=>clearInterval(locationGetter)
    },[routingActive])

    //alert user if we cannot get their location
    useEffect(()=>{
        if(locatingError){clearInterval(locationGetter)
            f7.dialog.alert("Leider konnten wir ihre position nicht feststellen")
        }
    },[locatingError])

    return <></>
}

const MapComponent = ()=>{
    const position = useSelector(state=>state.routing.mapPosition)
    const zoom = useSelector(state=>state.routing.mapZoom)
    const showLastPath = useSelector(state=>state.routing.showLastPath)
    const lastPath = useSelector(state=>state.routing.lastPath)

    const [mapRef,setMapRef] = useState(null)
    const mapRefCallback = useCallback(ref=>{
        setMapRef(ref)
    },[])

    useEffect(()=>{
        if(mapRef==null){
            return
        }
        mapRef.setView(position,zoom)
    },[mapRef,position,zoom])

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
    },[showLastPath,lastPath])

    return (
        <Map
            ref={mapRefCallback}
            center={position}
            zoom={zoom} 
            attributionControl={false}
            zoomControl={false}
            maxBounds={[
                [-90,-180],
                [90,180]
            ]}
            maxBoundsViscosity={0.8}
            minZoom={3}  
        >
            <TileLayer
                noWrap={true}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {getLastPathPoly()}
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