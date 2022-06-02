import { createSlice } from "@reduxjs/toolkit";

export const routingSlice = createSlice({
    name:'routing',
    initialState:{
        value:1
    },
    reducers:{
        increment:(state)=>{
            state.value++
        }
    }
})

export const {increment} = routingSlice.actions

export default routingSlice.reducer