import {useCallback, useEffect, useState,useRef} from 'react';

import {
    f7,
    Page,
    Card,
    CardHeader,
    Fab,
    Icon,
    FabButtons,
    Sheet
} from 'framework7-react';
import 'framework7-icons';

import MapComponent from '/components/Map/MapComponent'
import {
    NavigateButton,
    SearchbarField,
    Overlay,
    SettingsButton,
    FabPainting,
    FabSattelite,
    FabRegular,
    ArrowContainer,
    DetailButtonContainer,
    FavoritesButton
} from "./HomePage.elements";

import { useDispatch, useSelector } from "react-redux";
import {
    setRoutingActive,
    removeFavorite,
    addFavorite,
    setTileLayer,
    setTargetPosition
} from '@/features/routing/routingSlice'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList,faArrowUp} from '@fortawesome/free-solid-svg-icons'
import {getLocation} from "../../js/rev-geo";
import {findWikiEntriesByTitle,findWikiByPageID} from "@/features/wikiPosts/wikiEntries";

const HomePage = () => {
    const sheetRef = useRef()
    const dispatch = useDispatch()
    const routingActive = useSelector(state => state.routing.routingActive)
    const currentPosition = useSelector(state => state.routing.currentPosition)
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
    const [search,setSearch] = useState()
    const [targetDescription,setTargetDescription] = useState()

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
                const target = await getLocation(targetPosition.lat, targetPosition.lon)
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

    const selectBasic = useCallback(() => {
        dispatch(setTileLayer(0))
    })

    const selectLayer1 = useCallback(() => {
        dispatch(setTileLayer(1))
    })

    /**
     * @return true if the currently selected targetlocation is a user faforite false if not
     */
    const isTargetFavorite = useCallback(() => {
        if (!favorites || !targetPosition) return false
        for (let favorite of favorites) {
            if (favorite.pageid == targetPosition.pageid) {
                return true
            }
        }
        return false
    }, [targetPosition, favorites])

    const selectLayer2 = useCallback(() => {
        dispatch(setTileLayer(2))
    })
    /**
     * onclick for the faforite button,
     * toggles the favorite state of the selected target
     */
    const toggleFavorite = useCallback(() => {
        if (!favorites || !targetPosition) return
        if (isTargetFavorite()) {
            dispatch(removeFavorite(targetPosition))
            return
        }
        dispatch(addFavorite(targetPosition))
    }, [targetPosition, favorites, isTargetFavorite])

    const onClickSearch = useCallback((e) => {
        e.preventDefault()
        let lowercasetext = search.toLowerCase();
        findWikiEntriesByTitle(lowercasetext).then((value) => {
            const b = value[1]
            let c
            if (value.length > 1) {
                if (b[-1] == null) {
                    for (let [key] of Object.entries(b)) {
                        c = key
                    }
                    const finalPosition = b[c]["coordinates"]
                    const lat = finalPosition[0]["lat"]
                    const lon = finalPosition[0]["lon"]
                    let wikiEntrie = {
                        lat: lat,
                        lon: lon,
                        ...b[c]
                    }
                    dispatch(setTargetPosition(wikiEntrie))
                }
                else {
                    f7.dialog.alert("Leider haben wir für diese Suche keine Ergebnisse gefunden")
                }
            }
            else {
                for (let [key] of Object.entries(b)) {
                    c = key
                }
                const finalPosition = b[c]["coordinates"]
                if (!finalPosition) {
                    f7.dialog.alert("Leider haben wir für diese Suche keine Ergebnisse gefunden")
                    return
                }
                const lat = finalPosition[0]["lat"]
                const lon = finalPosition[0]["lon"]
                let wikiEntrie = {
                    lat: lat,
                    lon: lon,
                    ...b[c]
                }
                dispatch(setTargetPosition(wikiEntrie))
            }
        });
    }, [search])

    /**
     * get the full wiki page
     */
    useEffect(()=>{
        if(!targetPosition){
            setTargetDescription(null)
            return
        }
        console.log("searching for page")
        findWikiByPageID(targetPosition.pageid).then((response)=>{
            console.log(response)
            setTargetDescription(response?response.extract:null)
        })
    },[targetPosition])


    /**
     * Navigation instructions
     */

    const instruction = useSelector(state => state.routing.instruction)
    let topBarElement = null
    if (instruction) {
        topBarElement =
            <Card>
                <CardHeader>
                    {instruction.text}
                </CardHeader>
            </Card>
    } else {
        topBarElement = <Card>
            <CardHeader>
                <SearchbarField
                    init={true}
                    inline={true}
                    placeholder={"Suche deinen Weg"}
                    onInput={(e) => setSearch(e.target.value)}
                    onSubmit={onClickSearch}
                    disableButton={true}
                    disableButtonText={"CANCEL"}
                    backdropEl={false}
                />
            </CardHeader>
        </Card>
    }
    return (
        <Page name="home">
            <MapComponent />
            <Overlay>
                {topBarElement}
                <SettingsButton href="/settings" sheetClose={true}>
                    <FontAwesomeIcon icon={faList} />
                </SettingsButton>
                <Fab border-radius="5%">
                    <Icon>Layer</Icon>
                    <Icon>Layer</Icon>
                    <FabButtons position="bottom">
                        <FabRegular id="fabButton1" onClick={selectBasic} />
                        <FabSattelite id="fabButton2" onClick={selectLayer1} />
                        <FabPainting id="fabButton3" onClick={selectLayer2} />
                    </FabButtons>
                </Fab>
            </Overlay>
            <Sheet
                ref={sheetRef}
                opened={targetPosition!=undefined}
                className="demo-sheet-swipe-to-step"
                style={{height: 'auto', '--f7-sheet-bg-color': '#fff'}}
                swipeToStep
                backdrop={false}
            >
                {/* Initial swipe step sheet content */}
                <div className="sheet-modal-swipe-step">
                    <ArrowContainer>
                        <FontAwesomeIcon icon={faArrowUp}/>
                        <span style={{textAlign:"center"}}>
                            {targetPosition?targetPosition.title:""}
                        </span>
                        <div className="margin-top text-align-center" style={{fontSize:"1rem"}}>
                            Für mehr Details nach oben ziehen
                        </div>
                    </ArrowContainer>
                    <DetailButtonContainer>
                        <NavigateButton
                            large fill round
                            onClick={navigate}
                            routingActive={routingActive}
                            visible={currentPosition != null}
                            disabled={targetPosition==undefined}
                        >
                            Navigieren
                        </NavigateButton>
                        <FavoritesButton
                            large fill round
                            iconF7={isTargetFavorite()?"star_fill":"star"}
                            favorite={isTargetFavorite()}
                            disabled={targetPosition==undefined}
                            onClick={toggleFavorite}
                        />
                    </DetailButtonContainer>
                </div>
                {/* Rest of the sheet content that will opened with swipe */}
                {routingActive?"":(
                    <div style={{padding:"0 2rem 2rem 2rem"}}>
                        <p>{targetDescription}</p>
                        <div style={{ display: "flex",justifyContent:"space-around",flexWrap:"wrap"}}>
                            <div>
                                <h1>Deine Position:</h1>
                                <h2 style={{marginLeft: "50px"}}>{currentCountry}</h2>
                                <h3 style={{marginLeft: "50px"}}>{currentState}</h3>
                                <h3 style={{marginLeft: "50px"}}>{currentCity}</h3>
                                <h3 style={{marginLeft: "50px"}}>{currentStreet} {currentHousenumber}</h3>
                            </div>
                            <div>
                                <h1>Die Zielposition:</h1>
                                <h2 style={{marginLeft: "50px"}}>{targetCountry}</h2>
                                <h3 style={{marginLeft: "50px"}}>{targetState}</h3>
                                <h3 style={{marginLeft: "50px"}}>{targetCity}</h3>
                                <h3 style={{marginLeft: "50px"}}>{targetStreet} {targetHousenumber}</h3>
                            </div>
                        </div>
                    </div>
                )}

            </Sheet>
        </Page>
    );
}
export default HomePage;