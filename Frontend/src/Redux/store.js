import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../Redux/userSlice'
import ownerSlice from '../Redux/ownerSlice'
import mapSlice from '../Redux/mapSlice'
const store = configureStore({
    reducer: {
        user: userSlice,
        owner: ownerSlice,
        map: mapSlice
    }
})

export default store;