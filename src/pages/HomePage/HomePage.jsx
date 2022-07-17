import {useCallback, useEffect, useState} from 'react';

import {
    Page,
    Card,
    CardHeader,
    Fab,
    Icon,
    FabButtons,
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
    FavoritesButton,
    FabPainting,
    FabSattelite,
    FabRegular
} from "./HomePage.elements";

import {useDispatch, useSelector} from "react-redux";
import {
    setRoutingActive,
    removeFavorite,
    addFavorite,
    setTileLayer
} from '@/features/routing/routingSlice'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList} from '@fortawesome/free-solid-svg-icons'
import {getLocation} from "../../js/rev-geo";

export var onsubmit
const HomePage = () => {
    const dispatch = useDispatch()
    const routingActive = useSelector(state => state.routing.routingActive)
    const currentPosition = useSelector(state => state.routing.currentPosition)
    const mapZoom = useSelector(state => state.routing.mapZoom)
    const targetPosition = useSelector(state => state.routing.targetPosition)
    const favorites = useSelector(state => state.routing.favorites)
    const [currentCountry, setCurrentCountry] = useState()
    const [currentState, setCurrentState] = useState()
    const [currentCity, setCurrentCity] = useState()
    const [currentStreet, setCurrentStreet] = useState()
    const [currentHousenumber, setCurrentHousenumber] = useState()
    const [targetCountry, setTargetCountry] = useState()
    const [targetState, setTargetState] = useState()
    const [targetCity, setTargetCity] = useState()
    const [targetStreet, setTargetStreet] = useState()
    const [targetHousenumber, setTargetHousenumber] = useState()

    useEffect(() => {
        if (currentPosition != null) {
            const getLocationString = async () => {
                const location = await getLocation(currentPosition[0], currentPosition[1])
                const locationArray = location.split("\n")
                setCurrentCountry(locationArray[0])
                setCurrentState(locationArray[1])
                setCurrentCity(locationArray[2])
                setCurrentStreet(locationArray[3])
                setCurrentHousenumber(locationArray[4])
            }
            getLocationString()
        }
    }, [currentPosition])

    useEffect(() => {
        if (targetPosition != null) {
            const getTargetString = async () => {
                const target = await getLocation(currentPosition[0], currentPosition[1])
                const targetArray = target.split("\n")
                setTargetCountry(targetArray[0])
                setTargetState(targetArray[1])
                setTargetCity(targetArray[2])
                setTargetStreet(targetArray[3])
                setTargetHousenumber(targetArray[4])
            }
            getTargetString()
        } else setTargetCountry("No Target selected")
    }, [targetPosition])

    const navigate = useCallback(() => {
        dispatch(setRoutingActive(!routingActive))
    }, [routingActive])
    
    const selectBasic = useCallback(()=>{
        dispatch(setTileLayer(0))
    })

    const selectLayer1 = useCallback(()=>{
        dispatch(setTileLayer(1))
    })

    /**
     * @return true if the currently selected targetlocation is a user faforite false if not
     */
    const isTargetFavorite = useCallback(()=>{
        if (!favorites || !targetPosition)return false
        for(let favorite of favorites){
            if(favorite.pageid == targetPosition.pageid){
                return true
            }
        }
        return false
    },[targetPosition,favorites])
    
    const selectLayer2 = useCallback(()=>{
        dispatch(setTileLayer(2))
    })
    /**
     * onclick for the faforite button,
     * toggles the favorite state of the selected target
     */
    const toggleFavorite = useCallback(()=>{
        if (!favorites || !targetPosition)return
        if(isTargetFavorite()){
            dispatch(removeFavorite(targetPosition))
            return
        }
        dispatch(addFavorite(targetPosition))
    },[targetPosition,favorites,isTargetFavorite])

    /**
     * Navigation instructions
     */
     
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
                <SettingsButton href="/settings" sheetClose={true}>
                    <FontAwesomeIcon icon={faList}/>
                </SettingsButton>
                <Fab border-radius="5%">
                    <Icon>Layer</Icon>
                    <Icon>Layer</Icon>
                    <FabButtons position="bottom">
                        <FabRegular id="fabButton1" onClick={selectBasic}/>
                        <FabSattelite id="fabButton2" onClick={selectLayer1}/>
                        <FabPainting id="fabButton3" onClick={selectLayer2}/>
                    </FabButtons>
                </Fab>
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
                        <h1 style={{marginLeft: "50px"}}>{currentCountry}</h1>
                        <h2 style={{marginLeft: "50px"}}>{currentCity}</h2>
                    </div>
                    <div>
                        <h1 style={{marginLeft: "100px"}}>{targetCountry}</h1>
                        <h2 style={{marginLeft: "100px"}}>{targetCity}</h2>
                    </div>
                </div>
                <FavoritesButton
                    large fill round
                    iconF7={isTargetFavorite()?"star_fill":"star"}
                    favorite={isTargetFavorite()}
                    disabled={targetPosition==undefined}
                    onClick={toggleFavorite}
                >
                </FavoritesButton>
                <NavigateButton
                    large fill round
                    onClick={navigate}
                    routingActive={routingActive}
                    visible={currentPosition != null}
                    disabled={targetPosition==undefined}
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
                        <h1 style={{marginLeft: "50px"}}>{currentCountry}</h1>
                        <h2 style={{marginLeft: "50px"}}>{currentState}</h2>
                        <h2 style={{marginLeft: "50px"}}>{currentCity}</h2>
                        <h2 style={{marginLeft: "50px"}}>{currentStreet} {currentHousenumber}</h2>
                    </div>
                    <div>
                        <h1 style={{marginLeft: "100px"}}>{targetCountry}</h1>
                        <h2 style={{marginLeft: "100px"}}>{targetState}</h2>
                        <h2 style={{marginLeft: "100px"}}>{targetCity}</h2>
                        <h2 style={{marginLeft: "100px"}}>{targetStreet} {targetHousenumber}</h2>
                    </div>
                </div>
                <FavoritesButton
                    large fill round
                    iconF7={isTargetFavorite()?"star_fill":"star"}
                    favorite={isTargetFavorite()}
                    disabled={targetPosition==undefined}
                    onClick={toggleFavorite}
                >
                </FavoritesButton>
                <NavigateButton
                    large fill round
                    onClick={navigate}
                    routingActive={routingActive}
                    visible={currentPosition != null}
                    disabled={targetPosition==undefined}
                >
                    Navigieren
                </NavigateButton>
            </DetailSheet>
        </Page>
    );
}
export default HomePage;