import React, {useContext} from 'react';
import {
    MenuDropdown, MenuDropdownItem,
    MenuItem,
    Page
} from 'framework7-react';
import MapComponent from '/components/Map/MapComponent'
import MenuComponent from "../components/Menu/MenuComponent";
import PWAContext from "@/js/PWAContext";

const HomePage = () => {
    const {destination} = useContext(PWAContext)
    return (
        <Page name="home">
            <MenuComponent/>
            <MapComponent/>
        </Page>
    );
}
export default HomePage;
