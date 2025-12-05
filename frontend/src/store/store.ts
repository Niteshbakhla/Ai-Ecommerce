// -------------------------------------------------------
// 1. IMPORT REDUX + YOUR USER/LOGIN SLICE
// -------------------------------------------------------
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";

// -------------------------------------------------------
// 2. IMPORT REDUX-PERSIST
// -------------------------------------------------------
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// 👉 Add these:
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// -------------------------------------------------------
// 3. CONFIGURE PERSIST SETTINGS
// -------------------------------------------------------
const persistConfig = {
  key: "root",
  storage,
};

// -------------------------------------------------------
// 4. COMBINE YOUR REDUCERS
// -------------------------------------------------------
const rootReducer = combineReducers({
  auth: authReducer,
});

// -------------------------------------------------------
// 5. WRAP ROOT REDUCER WITH PERSISTREDUCER
// -------------------------------------------------------
const persistedReducer = persistReducer(persistConfig, rootReducer);

// -------------------------------------------------------
// 6. CREATE THE STORE (WITH FIXED MIDDLEWARE)
// -------------------------------------------------------
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// -------------------------------------------------------
// 7. CREATE PERSISTOR
// -------------------------------------------------------
export const persistor = persistStore(store);

// Redux types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
