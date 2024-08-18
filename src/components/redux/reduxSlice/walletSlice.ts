import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
// import { createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'
import { wallet, walletResult } from '../../types/types'


type walletState = {
  data: wallet,
  notifications: boolean,
  notificationsText: string
}

export interface Iexchange {
    id:                     string;
    amount?:                number;
    icon?:                  string;
    name?:                  string;
    symbol?:                string;
    rank?:                  number;
    price?:                 number;
    priceBtc?:              number;
    volume?:                number;
    marketCap?:             number;
    availableSupply?:       number;
    totalSupply?:           number;
    fullyDilutedValuation?: number;
    priceChange1h?:         number;
    priceChange1d?:         number;
    priceChange1w?:         number;
    redditUrl?:             string;
    twitterUrl?:            string;
    explorers?:             string[];
}

const initialState: walletState = {
    data: {
        result: [
            {
                id: 'bitcoin',
                icon: "https://static.coinstats.app/coins/1650455588819.png",
                name: "Bitcoin",
                amount: 0.06,
                symbol: 'BTC',
                buyPrice: 40000,
            },
            {
                id: 'ethereum',
                icon: "https://static.coinstats.app/coins/1650455629727.png",
                name: "Ethereum",
                amount: 2,
                symbol: 'ETH',
                buyPrice: 4400
                
            },
            {
                id: 'tether',
                icon: "https://static.coinstats.app/coins/1650455771843.png",
                name: "Tether",
                amount: 6000,
                symbol: 'USDT',
                buyPrice: 1
            },
            {
                id: 'binance-coin',
                icon: "https://static.coinstats.app/coins/1666608145347.png",
                name: "BNB",
                amount: 20,
                symbol: 'BNB',
                buyPrice: 200
            },
        ]
    },
    notifications: false,
    notificationsText: 'сделка прошло успешна'
}

// const api: string = "/OjgexOZiAZ0jLkZwr0kSnDh5KkfOe8BLCsH+jIUM2k="

// export const fetchWalletDate = createAsyncThunk<Coins>(
//     'walletSlice/fetchWalletDate',
//     async () => {
//         const responce = await axios.get('https://openapiv1.coinstats.app/portfolio/coins', {
//             method: 'GET',
//             headers: {
//               accept: 'application/json',
//               'X-API-KEY': api
//             }
//         })
//         return responce.data
//     }
// )

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    exchange: (state, payload) => {
        let data = state.data.result 
        const remove = payload.payload[0]
        const add = payload.payload[1]
        let usdtArr = data.filter((coin) => coin.id == 'tether')
        let addArrCoin = data.filter((coin) => coin.id == add.id)
        // const total = remove.action == 'buy' ? remove.total: remove.amount
        // const amount = remove.action == 'buy' ? remove.amount: remove.total
        const possible = remove.action == 'sell' ? true : Number(remove.total) <= usdtArr[0].amount
        const possible2 = remove.action == 'buy'? true : Number(remove.amount) <= addArrCoin[0].amount


        if(possible && possible2){
            const usdt = usdtArr[0];
            const newUsdt = {...usdt, amount: remove.action == 'buy' ? usdt.amount - remove.total: usdt.amount + remove.total}
            data = data.filter((coin) => coin.id !== 'tether')
            // newUsdt.amount == 0 ? null: data.push(newUsdt)
            data.push(newUsdt)
            state.notifications = true
        }
        if(remove.amount > 0 && addArrCoin.length > 0 && possible && possible2){
            const coin = addArrCoin[0]
            const newCoin = {...coin, amount: remove.action == 'buy' ? Number(coin.amount) + Number(remove.amount):  Number(coin.amount) - Number(remove.amount)}
            data = data.filter((coin) => coin.id !== add.id)
            newCoin.amount >= 0 ? data.push(newCoin) : null
            state.notifications = true
        }else if(possible && possible2){
            const coin: walletResult = {
                id: add.id,
                icon: add.icon,
                name: add.name,
                amount: remove.action == 'buy' ? Number(remove.amount): 0,
                symbol: add.symbol,
                buyPrice: add.price
            }
            data.push(coin)
            state.notifications = true
        }

        state.data.result = data
    },
    hideNotification: (state) => {
        state.notifications = false
    }
  },
})

export const { exchange, hideNotification } = walletSlice.actions

export const selectCount = (state: RootState) => state.coins.data

export default walletSlice.reducer