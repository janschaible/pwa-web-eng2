import { setCurrentPosition } from "../routing/routingSlice";

export const coords = () => {
    const ladertyp = setCurrentPosition.checkLat;
    const londertyp = setCurrentPosition.checkLon;
    return ladertyp,londertyp;
}