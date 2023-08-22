import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginUser: localStorage.getItem("alapUser") ? JSON.parse(localStorage.getItem("alapUser")) : null,
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userdata: (state, action) => {
            state.loginUser = action.payload
        },
    },
})

export const { userdata } = counterSlice.actions

export default counterSlice.reducer