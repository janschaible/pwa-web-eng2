import { useCallback } from 'react';
import {
  Page
} from 'framework7-react';
import {NavigateButton}from './HomePage.elements'

import { setRoutingActive } from '@/features/routing/routingSlice';
import MapComponent from '/components/Map/MapComponent'
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from '../js/rev-geo';

const HomePage = () => {
    const dispatch = useDispatch()
    const routingActive = useSelector(state=>state.routing.routingActive)
    const currentPosition = useSelector(state=>state.routing.currentPosition)
    const navigate = useCallback(()=>{
        dispatch(setRoutingActive(!routingActive))
    },[routingActive])

    //Beispiel Funktionsaufruf - Standortkoordinaten können mitgegeben werden 47.90600018751739, 9.386375471603065
    getLocation(35.471354189463575, -102.66812094637949);

    return (
        <Page name="home">
            <MapComponent/>
            <NavigateButton 
                large fill round
                onClick={navigate}
                routingActive={routingActive}
                visible={currentPosition!=null}
            >
              Navigieren
            </NavigateButton>
        </Page>
    );
}
export default HomePage;
