import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Coins } from '../../types/types'



type coinsState = {
  data: Coins | null
}

const initialState: coinsState = {
    data: null
}

const api: string = "/OjgexOZiAZ0jLkZwr0kSnDh5KkfOe8BLCsH+jIUM2k="

export const fetchDate = createAsyncThunk<Coins>(
    'coinsSlice/fetchDate',
    async () => {
        const responce = await axios.get('https://openapiv1.coinstats.app/coins?limit=10', {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'X-API-KEY': api
            }
        })
        return responce.data
    }
)

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    test: () => {
        console.log('test')
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDate.fulfilled, (state, action) => {
      state.data = (action.payload)
    })
  },
})

export const { test } = coinsSlice.actions

export const selectCount = (state: RootState) => state.coins.data

export default coinsSlice.reducer