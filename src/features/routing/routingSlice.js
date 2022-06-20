import { createSlice } from '@reduxjs/toolkit';
import { findWikiEntries } from '../wikiPosts/wikiEntries';

const getItemFromStorage = (itemName, fallbackValue) => {
    const item = localStorage.getItem(itemName)
    if (!item) return fallbackValue
    return JSON.parse(item)
}

const initialMapPosition = localStorage.getItem("mapPosition")

export const routingSlice = createSlice({
    name: 'routing',
    initialState: {
        mapPosition: getItemFromStorage("mapPosition", [0, 0]),
        mapZoom: getItemFromStorage("mapZoom", 15),
        currentPosition: null,
        targetPosition: [49, 9],
        instruction: null,
        routingActive: false,
        following: false
    },
    reducers: {
        setMapPosition: (state, action) => {
            localStorage.setItem("mapPosition", JSON.stringify(action.payload));
            state.mapPosition = action.payload;
        },
        setMapZoom: (state, action) => {
            localStorage.setItem("mapZoom", JSON.stringify(action.payload));
            state.mapZoom = action.payload
        },
        setCurrentPosition: (state, action) => {
            state.currentPosition = action.payload
            const coordLat = state.currentPosition[0];
            const coordLon = state.currentPosition[1];
            const mapZom = localStorage.mapZoom;
            const pages = findWikiEntries(coordLat, coordLon, mapZom);
            const collections = pages;
            console.log(collections);
        },
        setTargetPosition: () => {
            state.targetPosition = action.targetPosition
        },
        setInstruction: (state, action) => {
            state.instruction = action.payload
        },
        setRoutingActive: (state, action) => {
            state.routingActive = action.payload
            if (!action.payload) {
                //when routing stops disable following
                state.following = false
            } else {
                //when routing starts set following to true
                state.following = true
            }
        },
        setFollowing: (state, action) => {
            state.following = action.payload
        }
    }
})

export const {
    setMapPosition,
    setMapZoom,
    setCurrentPosition,
    setTargetPosition,
    setInstruction,
    setRoutingActive,
    setFollowing
} = routingSlice.actions

export default routingSlice.reducer

export const check = () => {
    setCurrentPosition();
    return { coordLat, coordLon };
};