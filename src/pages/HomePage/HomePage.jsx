import { useCallback } from 'react';

import {
    Page,
    Card,
    CardHeader,
    FabBackdrop,
    Fab,
    Icon,
    FabButtons,
    FabButton,
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
} from "./HomePage.elements";

import { useDispatch, useSelector } from "react-redux";
import { setRoutingActive, setTileLayer } from '@/features/routing/routingSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

export var onsubmit
const HomePage = () => {
    const dispatch = useDispatch()
    const routingActive = useSelector(state => state.routing.routingActive)
    const currentPosition = useSelector(state => state.routing.currentPosition)
    const mapZoom = useSelector(state => state.routing.mapZoom)

    const navigate = useCallback(() => {
        dispatch(setRoutingActive(!routingActive))
    }, [routingActive])
    
    const selectBasic = useCallback(()=>{
        dispatch(setTileLayer(0))
    })

    const selectLayer1 = useCallback(()=>{
        dispatch(setTileLayer(1))
    })

    const selectLayer2 = useCallback(()=>{
        dispatch(setTileLayer(2))
    })
    // Navigation instructions
    const instruction = useSelector(state => state.routing.instruction)
    let instructionElement = null
    if (instruction) {
        instructionElement =
            <Card>
                <CardHeader>
                    {instruction.text}
                </CardHeader>
            </Card>
    }
    return (
        <Page name="home">
            <MapComponent />
            <Overlay>
                {instructionElement}
                <SettingsButton href="/settings">
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
                <div style={{ display: "flex", flex: "row" }}>
                    <div>
                        <h1 style={{ marginLeft: "50px" }}>Current Country</h1>
                        <h2 style={{ marginLeft: "50px" }}>Current City</h2>
                    </div>
                    <div>
                        <h1 style={{ marginLeft: "100px" }}>Destination Country</h1>
                        <h2 style={{ marginLeft: "100px" }}>Destination City</h2>
                    </div>
                </div>
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
                <div style={{ display: "flex", flex: "row" }}>
                    <div>
                        <h1 style={{ marginLeft: "50px" }}>Current Country</h1>
                        <h2 style={{ marginLeft: "50px" }}>Current City</h2>
                        <h2 style={{ marginLeft: "50px" }}>Current Street</h2>
                        <h2 style={{ marginLeft: "50px" }}>Current Housenumber</h2>
                    </div>
                    <div>
                        <h1 style={{ marginLeft: "100px" }}>Destination Country</h1>
                        <h2 style={{ marginLeft: "100px" }}>Destination City</h2>
                        <h2 style={{ marginLeft: "100px" }}>Destination Street</h2>
                        <h2 style={{ marginLeft: "100px" }}>Destination Housenumber</h2>
                    </div>
                </div>
                <NavigateButton
                    large fill round
                    onClick={navigate}
                    routingActive={routingActive}
                    visible={currentPosition != null}
                >
                    Navigieren
                </NavigateButton>
            </DetailSheet>
            <link rel="stylesheet" href="./css/buttons.css" />
            <FabBackdrop slot="fixed"/>

            <Fab id="layerFab" position="right-center" slot="fixed" border-radius="5%">
                <Icon>Layer</Icon>
                <Icon>Layer</Icon>
                <FabButtons position="bottom">
                    <FabButton id="fabButton1" onClick={selectBasic}></FabButton>
                    <FabButton id="fabButton2" onClick={selectLayer1}></FabButton>
                    <FabButton id="fabButton3" onClick={selectLayer2}></FabButton>
                </FabButtons>
            </Fab>
        </Page>
    );
}
export default HomePage;