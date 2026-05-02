import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
// Custom storage to fix Vite 'storage.getItem is not a function' error
const storage = {
    getItem: (key) => {
        return Promise.resolve(localStorage.getItem(key));
    },
    setItem: (key, item) => {
        localStorage.setItem(key, item);
        return Promise.resolve(item);
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
        return Promise.resolve();
    }
};
import userSlice from '../Redux/userSlice'
import ownerSlice from '../Redux/ownerSlice'
import mapSlice from '../Redux/mapSlice'

const userPersistConfig = {
    key: 'user',
    storage,
    blacklist: ['socket']
}

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userSlice),
    owner: ownerSlice,
    map: mapSlice
})

const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
})

export const persistor = persistStore(store)

export default store;