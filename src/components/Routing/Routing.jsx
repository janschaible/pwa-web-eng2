import "leaflet-routing-machine/src/localization.js" 
import { useEffect,useMemo } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

const Routing = () => {
  const map = useMap()

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(51.505,-0.09), L.latLng(57.6792, 11.949)],
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
      altLineOptions:{
        styles: [
          {
            color: "gray",
            opacity: 0.2,
            weight: 4
          }
        ]
      },
      router: L.Routing.osrmv1({
        language: 'de'
      }),
      show:false
    }).addTo(map)
    routingControl._container.style.display = "None";//hide itinerary show:false did not remove container

    routingControl.on('routeselected', function(e) {
      var coord = e.route.coordinates;
      var instr = e.route.instructions;
      console.log(instr)
    });    

    return () => map.removeControl(routingControl)
  }, [map])
  return null
}

export default Routing