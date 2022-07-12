import { useCallback } from 'react';

import {
    Page,
    Card,
    CardHeader,
} from 'framework7-react';
import 'framework7-icons';

import MapComponent from '/components/Map/MapComponent'
import {
    NavigateButton,
    NavigateSheet, 
    DetailSheet, 
    SheetControlButton,
    Overlay,
    SettingsButton,
    FavoritesButton
} from "./HomePage.elements";

import {useDispatch, useSelector} from "react-redux";
import {setRoutingActive} from '@/features/routing/routingSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import {getLocation} from "../../js/rev-geo";


const HomePage = () => {
    const dispatch = useDispatch()
    const routingActive = useSelector(state => state.routing.routingActive)
    const currentPosition = useSelector(state => state.routing.currentPosition)
    
    const navigate = useCallback(() => {
        dispatch(setRoutingActive(!routingActive))
    }, [routingActive])

    // Navigation instructions
    const instruction = useSelector(state=>state.routing.instruction)
    let instructionElement = null
    if(instruction){
        instructionElement=
        <Card>
            <CardHeader>
                {instruction.text}
            </CardHeader>
        </Card>
    }

    return (
        <Page name="home">
            <MapComponent/>
            <Overlay>
                    {instructionElement}
                <SettingsButton href="/settings" sheetClose={true}>
                    <FontAwesomeIcon icon={faList} />
                </SettingsButton>
            </Overlay>
            {/*To-DO: CSS-styling for Sheets especially concerning responsiveness (ask other Team-Members
                  how they want it to look
                  Fill headings with actual Data once Rev-Geocoding is merged*/}
            <NavigateSheet
                className="navigateSheet"
                opened backdrop={false}
            >
                <SheetControlButton
                    round iconF7="chevron_up" iconColor="black" iconSize="44px"
                    sheetOpen=".detailSheet"
                >
                </SheetControlButton>
                <div style={{display: "flex", flex: "row"}}>
                    <div>
                        <h1 style={{marginLeft: "50px"}}>Current Country</h1>
                        <h2 style={{marginLeft: "50px"}}>Current City</h2>
                    </div>
                    <div>
                        <h1 style={{marginLeft: "100px"}}>Destination Country</h1>
                        <h2 style={{marginLeft: "100px"}}>Destination City</h2>
                    </div>
                </div>
                <FavoritesButton
                large fill round
                iconF7="star"
                >
                </FavoritesButton>
                <NavigateButton
                    large fill round
                    onClick={navigate}
                    routingActive={routingActive}
                    visible={currentPosition != null}
                >
                    Navigieren
                </NavigateButton>

            </NavigateSheet>
            <DetailSheet
                className="detailSheet"
                backdrop={false}
            >
                <SheetControlButton
                    round iconF7="chevron_down" iconColor="black" iconSize="44px"
                    sheetOpen=".navigateSheet"
                >
                </SheetControlButton>
                <div style={{display: "flex", flex: "row"}}>
                    <div>
                        <h1 style={{marginLeft: "50px"}}>Current Country</h1>
                        <h2 style={{marginLeft: "50px"}}>Current City</h2>
                        <h2 style={{marginLeft: "50px"}}>Current Street</h2>
                        <h2 style={{marginLeft: "50px"}}>Current Housenumber</h2>
                    </div>
                    <div>
                        <h1 style={{marginLeft: "100px"}}>Destination Country</h1>
                        <h2 style={{marginLeft: "100px"}}>Destination City</h2>
                        <h2 style={{marginLeft: "100px"}}>Destination Street</h2>
                        <h2 style={{marginLeft: "100px"}}>Destination Housenumber</h2>
                    </div>
                </div>
                <FavoritesButton
                    large fill round
                    iconF7="star"
                >
                </FavoritesButton>
                <NavigateButton
                    large fill round
                    onClick={navigate}
                    routingActive={routingActive}
                    visible={currentPosition != null}
                >
                    Navigieren
                </NavigateButton>
            </DetailSheet>
        </Page>
    );
}
export default HomePage;