import { configureStore } from '@reduxjs/toolkit'
// import { composeWithDevTools } from 'redux-devtools-extension'
import exchangeSlice from './exchange/exchangeSlice'
import coinsSlice from './coins/coinsSlice'
import walletSlice from './wallet/walletSlice'
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