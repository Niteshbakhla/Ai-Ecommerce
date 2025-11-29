// -------------------------------------------------------
// 1. IMPORT REDUX + YOUR USER/LOGIN SLICE
// -------------------------------------------------------
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";

// -------------------------------------------------------
// 2. IMPORT REDUX-PERSIST
// - storage = uses localStorage
// - persistReducer = wraps reducers so state saves/restores
// -------------------------------------------------------
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";


// -------------------------------------------------------
// 3. CONFIGURE PERSIST SETTINGS
// key = name of entry inside localStorage
// storage = where to save (localStorage)
// -------------------------------------------------------
const persistConfig = {
            key: "root",
            storage,
};


// -------------------------------------------------------
// 4. COMBINE YOUR REDUCERS
// (even if you have only 1, combineReducers is still valid)
// -------------------------------------------------------
const rootReducer = combineReducers({
            auth: authReducer,   // now your state becomes state.auth
});


// -------------------------------------------------------
// 5. WRAP THE ROOT REDUCER WITH PERSISTREDUCER
// This allows Redux to auto-save + auto-restore state
// -------------------------------------------------------
const persistedReducer = persistReducer(persistConfig, rootReducer);


// -------------------------------------------------------
// 6. CREATE THE STORE
// IMPORTANT: pass persistedReducer directly!
// -------------------------------------------------------
export const store = configureStore({
            reducer: persistedReducer,   // ✔ Correct
});


// -------------------------------------------------------
// 7. CREATE PERSISTOR
// This will restore Redux state on refresh
// -------------------------------------------------------
export const persistor = persistStore(store);


// Redux types (optional but helpful)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
            