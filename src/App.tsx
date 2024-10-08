import { useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/pages/Home.tsx';
import Header from './components/widgets/Header/Header.tsx';
import Exchange from './components/pages/Exchange.tsx';
import Wallet from './components/pages/Wallet.tsx';

import { useAppDispatch } from './hooks.ts';
import { fetchDate } from './components/processes/coins/coinsSlice.ts';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchDate())
  }, [])

  return (
    <> 
     <Router>
        <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/exchange/:id?" element={<Exchange />} />
          </Routes>
      </Router>
    </>
  )
}

export default App