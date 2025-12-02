import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { newsReducer } from "./news/slice";
import { globalReducer } from "./global/slice";
import { friendsReducer } from "./friends/slice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: "root-auth",
  version: 1,
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    news: newsReducer,
    // filters: filterReducer,
    auth: persistedReducer,
    global: globalReducer,
    friends: friendsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
