import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user/userSlice'
import activeChatReducer from './slices/activechat/ActiveChat'

export const store = configureStore({
  reducer: {
    loggedUser: userReducer,
    activeChat: activeChatReducer,
  },
})