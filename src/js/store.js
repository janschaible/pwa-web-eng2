import { configureStore } from "@reduxjs/toolkit";
import routingReducer from '@/features/routing/routingSlice'

export default configureStore({
    reducer:{
        routing:routingReducer
    }
})