import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";

const authPersist = persistReducer(
  { key: "auth", storage, whitelist: ["token"] },
  authReducer
);

const store = configureStore({
  reducer: { auth: authPersist },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
