import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";
import alertReducer from "../features/alertSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        alert: alertReducer
    }
});