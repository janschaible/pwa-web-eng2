import React, {useContext} from 'react';
import {
  Page
} from 'framework7-react';
import MapComponent from '/components/Map/MapComponent'
import PWAContext from "@/js/PWAContext";

const HomePage = () => {
    const {destination} = useContext(PWAContext)
    return (
        <Page name="home">
            <MapComponent/>
        </Page>
    );
}
export default HomePage;
