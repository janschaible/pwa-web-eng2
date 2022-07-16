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
        startUp:true,
        mapPosition: getItemFromStorage("mapPosition",[47,9]),
        mapZoom: 10,
        currentPosition: null,
        targetPosition: null,
        instruction: null,
        routingActive: false,
        following: false,
        showLastPath: getItemFromStorage("showLastPath",true),
        lastPath:[],
        tileLayer: getItemFromStorage("tileLayer",0)
        lastTargets: getItemFromStorage("lastTargets",[])
    },
    reducers: {
        setStartUp: (state, action) => {
            state.startUp = action.payload;
        },
        setMapPosition: (state, action) => {
            localStorage.setItem("mapPosition", JSON.stringify(action.payload));
            state.mapPosition = action.payload;
        },
        setTileLayer: (state, action) => {
            localStorage.setItem("tileLayer", JSON.stringify(action.payload));
            state.tileLayer = action.payload;
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
                    let deleteID = -1;
                    for(let i=0;i<state.lastTargets.length;i++){
                        if(state.lastTargets[i].pageid == state.targetPosition.pageid){
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
    }
})

export const {
    setStartUp,
    setMapPosition,
    setTileLayer,
    setMapZoom,
    setCurrentPosition,
    setTargetPosition,
    setInstruction,
    setRoutingActive,
    setFollowing,
    setShowLastPath
} = routingSlice.actions

export default routingSlice.reducer

export const check = () => {
    setCurrentPosition();
    return { coordLat, coordLon };
};