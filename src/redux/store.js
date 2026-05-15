import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage/index";
import { api } from "./api";
import userInfoReducer from "./reducers/userInfo/userInfoSlice";
import overrideReducer from "./reducers/userInfo/overrideSlice";

// Manual localStorage wrapper — bypasses redux-persist import resolution issues with Vite
const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};
const persistConfig = {
  key: "userInfo",
  storage,
  whitelist: ["token", "user", "isLoggedIn", "role", "permissions"],
};

const persistedUserReducer = persistReducer(persistConfig, userInfoReducer);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userInfo: persistedUserReducer,
    override: overrideReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
          "persist/FLUSH",
        ],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
