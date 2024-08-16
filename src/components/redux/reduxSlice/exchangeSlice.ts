import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'


type exchangeState = {
  value: number
}

const initialState: exchangeState = {
    value: 0,
}

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    test: () => {
        console.log('test')
    }
  },
})

export const { test } = exchangeSlice.actions

export const selectCount = (state: RootState) => state.exchange.value

export default exchangeSlice.reducer