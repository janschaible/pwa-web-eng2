import { createSlice } from '@reduxjs/toolkit';
import { findWikiEntries } from '../wikiPosts/wikiEntries';

const getItemFromStorage = (itemName, fallbackValue) => {
    const item = localStorage.getItem(itemName)
    if (!item) return fallbackValue
    return JSON.parse(item)
}

export const routingSlice = createSlice({
    name: 'routing',
    initialState: {
        //weather the map has been initialized
        startUp:true,           
        //currently displayed map position set by the map component
        //only sets the maps position on startup
        //use the targetPosition to fly to a specific map position
        mapPosition: getItemFromStorage("mapPosition",[47,9]),
        //currently displayed map zoom set by the map component
        //only sets the maps zoom on startup
        mapZoom: 10,    
        //current user position updated on startup and when routing is active
        currentPosition: null,
        //when the targetposition changes the map will fly to it
        //also this variable is used to display the information about 
        //the target on the homepage
        targetPosition: null,
        //the current instruction for the user based on the current position
        //and the desired target, only set when routing is active
        instruction: null,
        //starts and stopps the routing process
        routingActive: false,
        //currently not used
        following: false,
        //wheather the users last positions are shown as a poliline on the map
        //can be set by the user on the settingspage
        showLastPath: getItemFromStorage("showLastPath",true),
        //the lastPath travled by the user (recent currentLocations)
        lastPath:[],
        //a list of the last targets visited by the user
        lastTargets: getItemFromStorage("lastTargets",[]),
        //a list of the users favorite destinations
        favorites: getItemFromStorage("favorites",[])
    },
    reducers: {
        setStartUp: (state, action) => {
            state.startUp = action.payload;
        },
        setMapPosition: (state, action) => {
            localStorage.setItem("mapPosition", JSON.stringify(action.payload));
            state.mapPosition = action.payload;
        },
        setMapZoom: (state, action) => {
            state.mapZoom = action.payload
        },
        setCurrentPosition: (state, action) => {
            state.currentPosition = action.payload
            const coordLat = state.currentPosition[0];
            const coordLon = state.currentPosition[1];
            state.lastPath.unshift([coordLat,coordLon])
            state.lastPath = state.lastPath.slice(0,200)
            const mapZom = localStorage.mapZoom;
            const pages = findWikiEntries(coordLat, coordLon, mapZom);
            const collections = pages;
        },
        setTargetPosition: (state, action) => {
            state.targetPosition = action.payload
        },
        setInstruction: (state, action) => {
            state.instruction = action.payload
        },
        setRoutingActive: (state, action) => {
            if (!action.payload) {
                //when routing stops disable following
                state.following = false
            } else {
                if(!state.routingActive){
                    //routing is toggled from inactive to active
                    let deleteID = -1;
                    for(let i=0;i<state.lastTargets.length;i++){
                        if(state.lastTargets[i] && state.lastTargets[i].pageid == state.targetPosition.pageid){
                            //position already in recent targets, delete and insert at index 0 again
                            deleteID = i
                            break
                        }
                    }
                    if(deleteID!=-1){
                        //prevent that item occurs twice in last targets
                        state.lastTargets = state.lastTargets.filter((_,id)=>id!=deleteID) 
                    }
                    //navigation has started add target to last targets
                    state.lastTargets.unshift(state.targetPosition)
                    state.lastTargets = state.lastTargets.slice(0,10)
                    localStorage.setItem("lastTargets",JSON.stringify(state.lastTargets))
                }
                //when routing starts set following to true
                state.following = true
            }
            state.routingActive = action.payload
        },
        setFollowing: (state, action) => {
            state.following = action.payload
        },
        setShowLastPath: (state, action) => {
            localStorage.setItem("showLastPath", JSON.stringify(action.payload));
            state.showLastPath = action.payload
        },
        addFavorite:(state, action) => {
            state.favorites.unshift(action.payload)
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
        removeFavorite:(state, action) => {
            state.favorites = state.favorites.filter(favorite=>favorite.pageid!=action.payload.pageid)
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        }
    }
})

export const {
    setStartUp,
    setMapPosition,
    setMapZoom,
    setCurrentPosition,
    setTargetPosition,
    setInstruction,
    setRoutingActive,
    setFollowing,
    setShowLastPath,
    addFavorite,
    removeFavorite
} = routingSlice.actions

export default routingSlice.reducer

export const check = () => {
    setCurrentPosition();
    return { coordLat, coordLon };
};