/**
 * This file contains the functionality for the routing functionality inclusive 
 * the instruction processing
 */

import "leaflet-routing-machine/src/localization.js" 
import { useCallback, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import {setInstruction,setRoutingActive} from '@/features/routing/routingSlice'

/**
 * Routing returns a Component that must be a child of a leaflet map
 * it will update the instructions seen by the user and continuesly update
 * them and the remaining route based on the users current location
 * which is accessed using the 'targetPosition' variable from the routing slice.
 * 
 * The Routing component will handle the routing to the 'targetPosition' set in the
 * routing slice
 * 
 * However this component is not responsible for setting the users current position
 * 
 * The routing is started and stopped by the 'state.routing.routingActive' variable 
 * from the redux store
 */
const Routing = () => {
  const map = useMap()
  const dispatch = useDispatch()
  const currentPosition = useSelector(state=>state.routing.currentPosition)
  const targetPosition = useSelector(state=>state.routing.targetPosition)
  const routingActive = useSelector(state=>state.routing.routingActive)
  const [routingControl,setRoutingControl] = useState()
  const [isRouting, setIsRouting] = useState()

  /**
   * update the route based on the users current position
   */
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
      if(!routingActive)return;
      spliceWaypoints(currentPosition)
  },[currentPosition])

  /**
   * responsible for handling the initialization of the routing
   * including setting the language, hiding the original direction panel
   */
  const initializeRouting = useCallback(()=>{
    if (!map || !routingActive || !targetPosition || !currentPosition) return;
    setIsRouting(true)

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

    /**
     * update the currently seen instruction by the user
     */
    control.on('routeselected', function(e) {
      var instr = e.route.instructions;
      if(Array.isArray(instr[0])){
        instr = instr[0]
      }
      dispatch(setInstruction(instr[0]))
    });

    setRoutingControl(control)
  },[map,targetPosition,currentPosition,routingActive])

  /**
   * starting the routing and
   */
  useEffect(() => {
    if(routingActive && !isRouting){
      dispatch(setInstruction(null))
      return initializeRouting()
    }else if(!routingActive) {
      setIsRouting(false)
      dispatch(setInstruction(null))
      if(routingControl){
        map.removeControl(routingControl)
        setRoutingControl(null)
      }
    }
  }, [routingActive,currentPosition])

  return null
}

export default Routing