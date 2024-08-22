import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import './styles/global.css'
import './styles/reset.css'

import store from './components/processes/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
)


