import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import './assets/styles/index.css'
import './assets/styles/reset.css'

import store from './components/redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
)


