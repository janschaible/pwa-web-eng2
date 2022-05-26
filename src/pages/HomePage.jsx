import React, {useContext} from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge
} from 'framework7-react';
import MapComponent from '/components/Map/MapComponent'
import PWAContext from "@/js/PWAContext";

const HomePage = () => {
    const {destination} = useContext(PWAContext)
    return (
        <Page name="home">
            {/* Top Navbar */}
            <Navbar large>
                <NavTitle>pwa-web-eng2</NavTitle>
                <NavTitleLarge>pwa-web-eng2{destination?destination.coords:""}</NavTitleLarge>
            </Navbar>
            <MapComponent/>
        </Page>
    );
}
export default HomePage;
