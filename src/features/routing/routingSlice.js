import { createSlice } from "@reduxjs/toolkit";

export const routingSlice = createSlice({
    name:'routing',
    initialState:{
        mapPosition:[51.505, -0.09]
    },
    reducers:{
        setMapPosition:(state,action)=>{
            state.mapPosition = action.payload
        }
    }
})

export const {setMapPosition} = routingSlice.actions

export default routingSlice.reducer