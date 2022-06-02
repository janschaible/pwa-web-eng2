import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {Map} from './MapComponent.elements'
import {Marker,WMSTileLayer,TileLayer,Popup,useMapEvents}from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Routing from '@/components/Routing/Routing'
import { useDispatch, useSelector } from 'react-redux';
import {setMapPosition} from '@/features/routing/routingSlice'

const EventHandeler = ()=>{
    const dispatch = useDispatch()
    const map = useMapEvents({
        zoomend:()=>{
            //console.log(map.getZoom())      //todo set into state
        },
        drag:()=>{
            const center = map.getCenter()
            dispatch(setMapPosition([center.lat,center.lng]))
        }
    });
    return <></>
}

/*

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

const MapComponent = ()=>{
    const position = useSelector(state=>state.routing.mapPosition)

    const [mapRef,setMapRef] = useState(null)
    const mapRefCallback = useCallback(ref=>{
        setMapRef(ref)
    },[])

    useEffect(()=>{
        if(mapRef==null){
            return
        }
        mapRef.setView(position,mapRef.getZoom())
    },[mapRef,position])

    return (
        <Map
            ref={mapRefCallback}
            center={position}
            zoom={13} 
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
                url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                subdomains={['mt1','mt2','mt3']}
            />
            
            <Routing/>
            <EventHandeler/>
      </Map>
  )
}

export default MapComponent
