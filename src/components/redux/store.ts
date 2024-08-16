import { configureStore } from '@reduxjs/toolkit'
// import { composeWithDevTools } from 'redux-devtools-extension'
import exchangeSlice from './reduxSlice/exchangeSlice'
import coinsSlice from './reduxSlice/coinsSlice'
import walletSlice from './reduxSlice/walletSlice'
// ...

const store = configureStore({
  reducer: {
    coins: coinsSlice,
    exchange: exchangeSlice,
    wallet: walletSlice
  },
  // composeWithDevTools
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch