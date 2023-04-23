import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAlertError: false,
    isAlertSuccess: false,
    isLoading: false,
    alertMessage: ""
}

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
        },
        alertMessageError: (state,action) => {
            state.isAlertError = true;
            state.isLoading = false
            state.alertMessage = action.payload;
        },
        alertMessageSuccess: (state,action) => {
            state.isAlertSuccess = true
            state.isLoading = false
            state.alertMessage = action.payload;
        },
        resetAlert: (state) => initialState
    }
});

export const {alertMessageError, alertMessageSuccess, resetAlert, setLoading} = alertSlice.actions
export default alertSlice.reducer