import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import contactReducer from "./contact/contactSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
  },
});

export default store;
