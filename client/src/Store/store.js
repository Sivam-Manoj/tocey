import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import { apiSlice } from "./Slices/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import toggleReducer from "./Slices/toggleSlice";
import taskReducer from "./Slices/taskItemsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    toggle: toggleReducer,
    taskItems: taskReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
