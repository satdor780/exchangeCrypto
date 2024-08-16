import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Coins } from '../../types/types'



type coinsState = {
  data: Coins | null
}

const initialState: coinsState = {
    data: {
      "result": [
          {
              "id": "bitcoin",
              "icon": "https://static.coinstats.app/coins/1650455588819.png",
              "name": "Bitcoin",
              "symbol": "BTC",
              "rank": 1,
              "price": 60273.553259741086,
              "priceBtc": 1,
              "volume": 14829586581.70912,
              "marketCap": 1189706517339.7363,
              "availableSupply": 19738450,
              "totalSupply": 21000000,
              "fullyDilutedValuation": 1265744618454.5627,
              "priceChange1h": -0.44,
              "priceChange1d": -0.64,
              "priceChange1w": -1.29,
              "redditUrl": "https://www.reddit.com/r/Bitcoin/",
              "twitterUrl": "https://twitter.com/bitcoin",
              "explorers": [
                  "https://mempool.space/",
                  "https://blockchair.com/bitcoin/",
                  "https://btc.com/",
                  "https://btc.tokenview.io/",
                  "https://www.oklink.com/btc",
                  "https://3xpl.com/bitcoin"
              ]
          },
          {
              "id": "ethereum",
              "icon": "https://static.coinstats.app/coins/1650455629727.png",
              "name": "Ethereum",
              "symbol": "ETH",
              "rank": 2,
              "price": 2624.9216509807306,
              "priceBtc": 0.04355013947276296,
              "volume": 8497268854.638404,
              "marketCap": 315693672882.21625,
              "availableSupply": 120267846,
              "totalSupply": 120267846,
              "fullyDilutedValuation": 315693672882.21625,
              "priceChange1h": -0.95,
              "priceChange1d": 0,
              "priceChange1w": -10.23,
              "redditUrl": "https://www.reddit.com/r/ethereum",
              "websiteUrl": "https://www.ethereum.org/",
              "twitterUrl": "https://twitter.com/ethereum",
              "contractAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
              "decimals": 18,
              "explorers": [
                  "https://etherscan.io/",
                  "https://ethplorer.io/",
                  "https://blockchair.com/ethereum",
                  "https://eth.tokenview.io/",
                  "https://www.oklink.com/eth",
                  "https://3xpl.com/ethereum"
              ]
          },
          {
              "id": "tether",
              "icon": "https://static.coinstats.app/coins/1650455771843.png",
              "name": "Tether",
              "symbol": "USDT",
              "rank": 3,
              "price": 0.9988249355999999,
              "priceBtc": 0.000016571528997065978,
              "volume": 24097207962.146477,
              "marketCap": 115502676091.23392,
              "availableSupply": 115638558845,
              "totalSupply": 115638558845,
              "fullyDilutedValuation": 115502676091.23392,
              "priceChange1h": -0.09,
              "priceChange1d": -0.09,
              "priceChange1w": -0.1,
              "redditUrl": "https://www.reddit.com",
              "websiteUrl": "https://tether.to/",
              "twitterUrl": "https://twitter.com/Tether_to",
              "contractAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
              "decimals": 18,
              "explorers": [
                  "https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7",
                  "https://ethplorer.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7",
                  "https://explorer.kava.io/token/0x919c1c267bc06a7039e03fcc2ef738525769109c",
                  "https://avascan.info/blockchain/c/address/0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7/token",
                  "https://solscan.io/token/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
                  "https://nearblocks.io/token/usdt.tether-token.near",
                  "https://tonscan.org/address/EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
                  "https://celoscan.io/token/0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e",
                  "https://explorer.celo.org/mainnet/token/0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e"
              ]
          },
          {
              "id": "binance-coin",
              "icon": "https://static.coinstats.app/coins/1666608145347.png",
              "name": "BNB",
              "symbol": "BNB",
              "rank": 4,
              "price": 519.3752237610576,
              "priceBtc": 0.00861696707215646,
              "volume": 1682255221.7573075,
              "marketCap": 75770392428.95828,
              "availableSupply": 145887576,
              "totalSupply": 145887576,
              "fullyDilutedValuation": 75770392428.95828,
              "priceChange1h": -0.9,
              "priceChange1d": 0.91,
              "priceChange1w": -1.54,
              "redditUrl": "https://www.reddit.com/r/binance",
              "websiteUrl": "https://www.binance.com",
              "twitterUrl": "https://twitter.com/binance",
              "contractAddress": "BNB",
              "decimals": 18,
              "explorers": [
                  "https://bscscan.com",
                  "https://explorer.binance.org/",
                  "https://binance.mintscan.io/",
                  "https://etherscan.io/token/0xb8c77482e45f1f44de1745f52c74426c631bdd52",
                  "https://ethplorer.io/address/0xb8c77482e45f1f44de1745f52c74426c631bdd52",
                  "https://www.oklink.com/bsc",
                  "https://3xpl.com/bnb"
              ]
          },
          {
              "id": "solana",
              "icon": "https://static.coinstats.app/coins/1701234596791.png",
              "name": "Solana",
              "symbol": "SOL",
              "rank": 5,
              "price": 150.39599325265644,
              "priceBtc": 0.0024952236116650424,
              "volume": 2639692090.850567,
              "marketCap": 70177664521.78766,
              "availableSupply": 466619243,
              "totalSupply": 581950020,
              "fullyDilutedValuation": 87522951281.30328,
              "priceChange1h": -1.88,
              "priceChange1d": -2.31,
              "priceChange1w": 3.89,
              "redditUrl": "https://www.reddit.com/r/solana",
              "websiteUrl": "https://solana.com/",
              "twitterUrl": "https://twitter.com/solana",
              "contractAddress": "0x7dff46370e9ea5f0bad3c4e29711ad50062ea7a4",
              "decimals": 18,
              "explorers": [
                  "https://solscan.io/",
                  "https://xray.helius.xyz/",
                  "https://solana.fm/",
                  "https://solanabeach.io/",
                  "https://www.oklink.com/sol",
                  "https://explorer.solana.com/"
              ]
          },
          {
              "id": "usd-coin",
              "icon": "https://static.coinstats.app/coins/1650455825065.png",
              "name": "USDC",
              "symbol": "USDC",
              "rank": 6,
              "price": 0.998872,
              "priceBtc": 0.00001658761998895291,
              "volume": 2999228717,
              "marketCap": 34440245632,
              "availableSupply": 34452455619,
              "totalSupply": 34453005704,
              "fullyDilutedValuation": 34440795522,
              "priceChange1h": 0.03,
              "priceChange1d": -0.06,
              "priceChange1w": -0.13,
              "redditUrl": "https://www.reddit.com",
              "websiteUrl": "https://www.circle.com/en/usdc",
              "twitterUrl": "https://twitter.com/circle",
              "contractAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
              "decimals": 18,
              "explorers": [
                  "https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                  "https://bscscan.com/token/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
                  "https://nearblocks.io/token/17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
                  "https://ethplorer.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                  "https://basescan.org/token/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
                  "https://arbiscan.io/token/0xaf88d065e77c8cc2239327c5edb3a432268e5831",
                  "https://binplorer.com/address/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
                  "https://explorer.kava.io/token/0xfa9343c3897324496a05fc75abed6bac29f8a40f",
                  "https://ftmscan.com/token/0x04068da6c83afcfa0e13ba15a6696662335d5b75",
                  "https://explorer.energi.network/token/0xffd7510ca0a3279c7a5f50018a26c21d5bc1dbcf"
              ]
          },
          {
              "id": "ripple",
              "icon": "https://static.coinstats.app/coins/XRPdnqGJ.png",
              "name": "XRP",
              "symbol": "XRP",
              "rank": 7,
              "price": 0.5735286615804635,
              "priceBtc": 0.000009515428086824679,
              "volume": 732666606.8005016,
              "marketCap": 32177459315.759777,
              "availableSupply": 56104361423,
              "totalSupply": 99987365591,
              "fullyDilutedValuation": 57345619962.36272,
              "priceChange1h": -0.18,
              "priceChange1d": -4.56,
              "priceChange1w": 4.43,
              "redditUrl": "https://www.reddit.com/r/ripple",
              "websiteUrl": "https://ripple.com/currency/",
              "twitterUrl": "https://twitter.com/Ripple",
              "contractAddress": "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe",
              "decimals": 18,
              "explorers": [
                  "https://blockchair.com/ripple",
                  "https://xrpcharts.ripple.com",
                  "https://xrpscan.com/",
                  "https://bithomp.com/explorer/"
              ]
          },
          {
              "id": "staked-ether",
              "icon": "https://static.coinstats.app/coins/staked-etheruqt.png",
              "name": "Lido Staked Ether",
              "symbol": "STETH",
              "rank": 8,
              "price": 2621.23,
              "priceBtc": 0.04352906793227064,
              "volume": 35284283,
              "marketCap": 25752800939,
              "availableSupply": 9806726,
              "totalSupply": 9806726,
              "fullyDilutedValuation": 25752800939,
              "priceChange1h": -0.56,
              "priceChange1d": 0.02,
              "priceChange1w": -9.97,
              "redditUrl": "https://www.reddit.com/r/lidofinance/",
              "websiteUrl": "https://www.lido.fi",
              "twitterUrl": "https://twitter.com/lidofinance",
              "contractAddress": "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
              "decimals": 18,
              "explorers": [
                  "https://etherscan.io/token/0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
                  "https://ethplorer.io/address/0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
                  "https://ethereum.dex.guru/token/0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
              ]
          },
          {
              "id": "the-open-network",
              "icon": "https://static.coinstats.app/coins/1685602314954.png",
              "name": "Toncoin",
              "symbol": "TON",
              "rank": 9,
              "price": 6.3863980392227555,
              "priceBtc": 0.00010595688645899802,
              "volume": 150900748.6491611,
              "marketCap": 16083818030.097626,
              "availableSupply": 2518449043,
              "totalSupply": 5110326449,
              "fullyDilutedValuation": 32636578813.681786,
              "priceChange1h": -1.45,
              "priceChange1d": -4.83,
              "priceChange1w": 3.95,
              "redditUrl": "https://www.reddit.com",
              "websiteUrl": "https://ton.org/",
              "twitterUrl": "https://twitter.com/ton_blockchain",
              "contractAddress": "0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
              "decimals": 18,
              "explorers": [
                  "https://tonscan.org",
                  "https://tonmoon.org/explorer/",
                  "https://youton.org/",
                  "https://3xpl.com/ton",
                  "https://tonapi.io/",
                  "https://etherscan.io/token/0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
                  "https://ethplorer.io/address/0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
                  "https://bscscan.com/token/0x76a797a59ba2c17726896976b7b3747bfd1d220f",
                  "https://binplorer.com/address/0x76a797a59ba2c17726896976b7b3747bfd1d220f",
                  "https://tonscan.org/address/EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c"
              ]
          },
          {
              "id": "dogecoin",
              "icon": "https://static.coinstats.app/coins/DogecoinIZai5.png",
              "name": "Dogecoin",
              "symbol": "DOGE",
              "rank": 10,
              "price": 0.10562273061089628,
              "priceBtc": 0.0000017523893133648315,
              "volume": 398756128.4591214,
              "marketCap": 15366947184.371506,
              "availableSupply": 145489016384,
              "totalSupply": 145489646384,
              "fullyDilutedValuation": 15367013726.691792,
              "priceChange1h": -1.48,
              "priceChange1d": 1.62,
              "priceChange1w": -2.16,
              "redditUrl": "https://www.reddit.com/r/dogecoin/",
              "twitterUrl": "https://twitter.com/dogecoin",
              "contractAddress": "0xba2ae424d960c26247dd6c32edc70b295c744c43",
              "decimals": 18,
              "explorers": [
                  "https://blockchair.com/dogecoin",
                  "https://doge.tokenview.io/",
                  "https://3xpl.com/dogecoin",
                  "https://www.oklink.com/doge"
              ]
          }
      ],
      "meta": {
          "page": 1,
          "limit": 10,
          "itemCount": 17284,
          "pageCount": 1729,
          "hasPreviousPage": false,
          "hasNextPage": true
      }
  },
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
      console.log(action.payload)
    })
  },
})

export const { test } = coinsSlice.actions

export const selectCount = (state: RootState) => state.coins.data

export default coinsSlice.reducer