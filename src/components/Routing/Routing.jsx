import "leaflet-routing-machine/src/localization.js" 
import { useCallback, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import {setInstruction,setRoutingActive} from '@/features/routing/routingSlice'

const Routing = () => {
  const map = useMap()
  const dispatch = useDispatch()
  const currentPosition = useSelector(state=>state.routing.currentPosition)
  const targetPosition = useSelector(state=>state.routing.targetPosition)
  const routingActive = useSelector(state=>state.routing.routingActive)
  const [routingControl,setRoutingControl] = useState()

  const spliceWaypoints = useCallback((cp)=>{
    if(!routingControl||!map)return
    try{  
      routingControl.spliceWaypoints(0, 1, L.latLng(cp[0],cp[1]));
    }catch (e){
      console.log("error adjusting current position")
      dispatch(setRoutingActive(false))
      return;
    }
  },[routingControl,map])

  useEffect(()=>{
      spliceWaypoints(currentPosition)
  },[currentPosition])

  const initializeRouting = useCallback(()=>{
    if (!map) return;
    if(routingControl){
      map.removeControl(routingControl)
      setRoutingControl(null)
    }
    dispatch(setInstruction(null))
    if(!routingActive || !targetPosition)return

    const control = L.Routing.control({
      waypoints: [
        L.latLng(currentPosition[0],currentPosition[1]), 
        L.latLng(targetPosition.lat, targetPosition.lon)
      ],
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4
          }
        ]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
      routeWhileDragging: true,
      router: L.Routing.osrmv1({
        language: 'de'
      }),
      show:false
    })
    if(!map)returncreateSlice

    try{
      control.addTo(map)
    }catch (e){
      console.log("error adding control to map stopping navigation")
      dispatch(setRoutingActive(false))
      return;
    }
    control._container.style.display = "None";//hide itinerary show:false did not remove container

    control.on('routeselected', function(e) {
      var instr = e.route.instructions;
      if(Array.isArray(instr[0])){
        instr = instr[0]
      }
      dispatch(setInstruction(instr[0]))
    });

    setRoutingControl(control)
    return ()=> {
      if(!map)return;
      map.removeControl(control)
      setRoutingControl(null)
    }
  },[map,targetPosition,currentPosition,routingActive])

  useEffect(() => {
    return initializeRouting()
  }, [map,routingActive])

  return null
}

export default Routing