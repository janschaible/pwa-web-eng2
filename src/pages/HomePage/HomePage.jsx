import { useCallback, useRef } from 'react';

import {
    Page,
    Card,
    CardHeader
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
    SearchbarField
} from "./HomePage.elements";

import { useDispatch, useSelector } from "react-redux";
import { setRoutingActive } from '@/features/routing/routingSlice'

import { findWikiEntries, findWikiEntriesByTitle } from '@/features/wikiPosts/wikiEntries'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { Marker } from 'react-leaflet';
import { useEffect } from 'react';


const HomePage = () => {
    const dispatch = useDispatch()
    const routingActive = useSelector(state => state.routing.routingActive)
    const currentPosition = useSelector(state => state.routing.currentPosition)
    const mapZoom = useSelector(state => state.routing.mapZoom)

    const navigate = useCallback(() => {
        dispatch(setRoutingActive(!routingActive))
    }, [routingActive])

    // Navigation instructions
    const instruction = useSelector(state => state.routing.instruction)
    let instructionElement = null
    let onSubmit = true
    if (instruction) {
        instructionElement =
            <Card>
                <CardHeader>
                    {instruction.text}
                </CardHeader>
            </Card>
    }
    // useEffect(() => {
    //     const getMarkers = async () => {
    //         const wikiCollection = await findWikiEntries(mapPosition[0], mapPosition[1], mapZoom)
    //         setWikiEntries(wikiCollection)
    //     }
    //     getMarkers()
    // }, [mapPosition, mapZoom])
    let search = ''
    let searchPrint = ''
    return (
        <Page name="home">
            <MapComponent searchPrint={searchPrint} searchingActive={onSubmit}/>
            <Overlay>
                <SearchbarField
                    //ref={inputRef}
                    init={true}
                    inline={true}
                    placeholder={"Suche deinen Weg"}
                    onInput={(e) => {
                        search = e.target.value
                        //findWikiEntries(currentPosition[0],currentPosition[1],search, mapZoom)
                    }}
                    onSubmit={async (e) => {
                        e.preventDefault()
                        // const coll = findWikiEntries(currentPosition[0], currentPosition[1], mapZoom)
                        searchPrint = findWikiEntriesByTitle(search)
                        onSubmit = true
                        //console.log(searchPrint)
                    }}
                    onClickDisable={true}
                    disableButton={false}
                >
                </SearchbarField>
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
        </Page>
    );
}
export default HomePage;