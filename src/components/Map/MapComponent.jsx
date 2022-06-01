import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {Map} from './MapComponent.elements'
import {Marker,WMSTileLayer,TileLayer,Popup,useMapEvents}from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Routing from '@/components/Routing/Routing'

const EventHandeler = ()=>{
    const map = useMapEvents({
        zoomend:()=>{
            console.log(map.getZoom())      //todo set into state
        },
        drag:()=>{
            console.log(map.getCenter())    //todo set into state
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
    const position = [51.505, -0.09]

    return (
        <Map
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
                maxZoom= {20}
                subdomains={['mt1','mt2','mt3']}
            />
            
            <Routing/>
            <EventHandeler/>
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
      </Map>
  )
}

export default MapComponent
