import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeChat: localStorage.getItem("activeChat") ? JSON.parse(localStorage.getItem("activeChat")) : null,
}

export const chatSlice = createSlice({
    name: 'chat ',
    initialState,
    reducers: {
        activeChat: (state, action) => {
            state.activeChat = action.payload
        },
    },
})

export const { activeChat } = chatSlice.actions

export default chatSlice.reducer