import { useCallback } from 'react';
import {
  Page
} from 'framework7-react';
import {NavigateButton}from './HomePage.elements'

import { setRoutingActive } from '@/features/routing/routingSlice';
import MapComponent from '/components/Map/MapComponent'
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
    const dispatch = useDispatch()
    const routingActive = useSelector(state=>state.routing.routingActive)
    const currentPosition = useSelector(state=>state.routing.currentPosition)
    const navigate = useCallback(()=>{
        dispatch(setRoutingActive(!routingActive))
    },[routingActive])

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
