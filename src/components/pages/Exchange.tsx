import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import style from '../../styles/Exchange.module.css'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { exchange } from '../processes/wallet/walletSlice'
import { Result, walletResult } from '../types/types'
import Notifications from '../shared/Notifications/Notifications'

type RouteParams = Record<string, string | undefined>;

const Exchange: React.FC = () => {

    const params = useParams<RouteParams>();

    const dispatch = useAppDispatch()
    const coins = useAppSelector(state => state.coins.data?.result);
    const walletDate = useAppSelector(state => state.wallet.data.result);

    const [searchText, setSearchText] = useState('')
    const [searchFocus, serSearchFocus] = useState(false)
    const [activeCoin, setActiveCoin] = useState<Result[]>([]); 
    const [currentCoin, setCurrentCoin] = useState<Result | undefined>(undefined);
    const [currentCoin2, setCurrentCoin2] = useState<walletResult | undefined>(undefined);
    const [walletCurrentCoin, setWalletCurrentCoin] = useState<walletResult | undefined>(undefined);

    const [action, setAction] = useState('buy')

    const [clickInsideResult, setClickInsideResult] = useState(false);

    const [amount, setAmount] = useState('0');
    const [total, setTotal] = useState('0');

    const commission: number = total ? parseFloat(total) / 100 / 5 : 0;

    const isValidAmount = (value: number) => {
        const regex = /^\d*\.?\d{0,2}$/;
        return regex.test(value.toString());
    };

    const setAmountFunc = (e: React.ChangeEvent<HTMLInputElement> | number) => {
        if (typeof e === "number") {
            setAmount(String(e))
            if (currentCoin) {
                const calculatedAmount: number = e * currentCoin.price;
                setTotal(String(calculatedAmount.toFixed(4)));
            }
        } else {

            const value = e.target.value;
            const floatValue = parseFloat(value);

            if (isNaN(floatValue) || floatValue === 0) {
                if(!isValidAmount(floatValue)){
                    setAmount(value)
                }else{
                    setAmount(value);
                }
                setTotal('0')
            } else {
                if(!isValidAmount(floatValue)){
                    setAmount(floatValue.toFixed(3))
                }else{
                    setAmount(value);
                }
                if (currentCoin) {
                    const calculatedAmount: number = floatValue * currentCoin.price;
                    setTotal(String(calculatedAmount.toFixed(4)));
                }
            }
        }
    };

    const setTotalFunc = (e: React.ChangeEvent<HTMLInputElement> | number) => {

        if (typeof e === "number") {
            setTotal(String(e))
            if (currentCoin) {
                const calculatedAmount: number = e / currentCoin.price;
                setAmount(String(calculatedAmount.toFixed(4)));
            }
        } else {
            const value = e.target.value;
            const floatValue = parseFloat(value);

            if (isNaN(floatValue) || floatValue === 0) {
                if(!isValidAmount(floatValue)){
                    setTotal(value)
                }else{
                    setTotal(String(floatValue));
                }
                setAmount('0')
            } else {
                if(!isValidAmount(floatValue)){
                    setTotal(floatValue.toFixed(3))
                }else{
                    setTotal(value);
                }
                if (currentCoin) {
                    const calculatedAmount: number = floatValue / currentCoin.price;
                    setAmount(String(calculatedAmount.toFixed(4)));
                }
            }
        }
    };
        
    useEffect(() => {
        if (coins && coins.length > 0) {
            const filteredCoins = coins.filter((coin) => coin.id !== 'tether');
            const couple = params.id || 'bitcoin';
            const currentCoin = filteredCoins.find((c) => c.id === couple) || filteredCoins[0];
    
            setActiveCoin(filteredCoins);
            setCurrentCoin(currentCoin);
            setCurrentCoin2(walletDate.find((coin) => coin.id === 'tether'));
            setWalletCurrentCoin(walletDate.find((coin) => coin.id === couple));
        }
    }, [coins, params.id, walletDate]);
    

    useEffect(() => {
        ToMax()
    }, [action, currentCoin])

    const close = (coin: Result) => {
        setCurrentCoin(coin)
        setSearchText(coin.id)
        serSearchFocus(false)
        setAction('buy')
    }

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        setSearchText(value);
        
        const filteredCoins = coins && coins.filter((coin) => coin.id.includes(value));
        
        filteredCoins && setActiveCoin(filteredCoins);
    };    

    const blur = () => {
        if (clickInsideResult) {
            setClickInsideResult(false);
            return; 
        }

        serSearchFocus(false);
    };

    const swapPairs = () => {
        setAction(action == 'buy' ? 'sell': 'buy')
    }

    const exchangeAction = () => {
        const remove = {
            id: 'tether',
            total: total,
            amount: amount,
            action: action
        }
        const add = currentCoin
        const data = [remove, add]
        dispatch(exchange(data))
    }

    useEffect(() => {
        const filteredWalletCoin = currentCoin && walletDate && walletDate.filter((c) => c.id.includes(currentCoin?.id));
        filteredWalletCoin && setWalletCurrentCoin(filteredWalletCoin[0])
        setCurrentCoin2(walletDate.find((coin) => coin.id === 'tether'));
    }, [currentCoin, walletDate])

    const ToMax = () => {
        action == 'buy' ? setTotalFunc(max): setAmountFunc(max)
    }

    let max: number = action == 'buy' ? currentCoin2 ? Number(currentCoin2.amount): 0 : walletCurrentCoin ? Number(walletCurrentCoin.amount): 0
    let maxSymbol: string | undefined = action == 'buy' ? currentCoin2 && currentCoin2.symbol: currentCoin && currentCoin.symbol

    return(
        <section className={style.exchange}>
            <Notifications />
            <div className="container">
                <h1>Exchange crypto</h1>

                <div className={style.exchange__inner}>

                <div className={style.search}>
                    <div className={style.search__input}>
                        <input 
                            type="text" 
                            placeholder="search.." 
                            value={searchText} 
                            onChange={(e) => search(e)} 
                            onFocus={() => serSearchFocus(true)} 
                            onBlur={blur} 
                        />
                    </div>
                    {searchFocus && (
                        <div className={style.results} onMouseDown={() => setClickInsideResult(true)} >
                            {activeCoin && activeCoin.map((coin) => (
                                <div key={coin.id} className={style.result__item} onClick={() => close(coin)}>
                                    <img src={coin.icon} alt={coin.id} />
                                    <b>{coin.id}</b>
                                </div>
                            ))}
                        </div>
                    )}       
                </div>
                    
                <div className={style.exchange__info}>
                    <div className={style.info__items}>
                        <div className={style.info__item}>
                            <span>я отдаю:</span>
                            <b>{action == 'buy' ? currentCoin2 && currentCoin2.symbol: currentCoin ? currentCoin.symbol: 'btc'}</b>
                        </div>
                        <div className={style.info__item}>
                            <span>я получаю:</span>
                            <b>{action == 'buy' ? currentCoin && currentCoin.symbol: currentCoin2 ? currentCoin2.symbol: 'btc'}</b>
                        </div>
                    </div>
                    <div className={style.swap__place} onClick={swapPairs}>
                        <svg enableBackground="new 0 0 32 32" viewBox="0 0 32 32" id="swap"><path d="M14 2.256V30c-2.209 0-4-1.791-4-4V13H4.714c-.633 0-.949-.765-.502-1.212l9.607-9.607C13.886 2.114 14 2.162 14 2.256zM27.788 20.212l-9.6 9.6C18.118 29.882 18 29.832 18 29.734V2c2.209 0 4 1.791 4 4v13h5.286C27.918 19 28.235 19.765 27.788 20.212z"></path></svg>
                    </div>
                </div>

                <div className={style.form}>
                    <div className={style.form__tabs}>
                        <div className={`${style.tab} ${action === 'buy' ? style.active : ''}`} onClick={() => setAction('buy')}>Купить</div>
                        <div className={`${style.tab} ${action === 'sell' ? style.active : ''}`} onClick={() => setAction('sell')}>Продать</div>
                    </div>

                    <div className={style.form__info}>
                        <h3>{action == 'buy' ?"Купить": "Продать"} {currentCoin ? currentCoin.symbol: 'BTC'}</h3>
                        <span>
                            Доступно:
                            {' '}
                            {max} {' '} {maxSymbol}
                        </span>
                    </div>

                    <form>
                        <div className={style.item}>
                            <label>Количество</label>
                            <div className={style.item__actions}>
                                <div className={style.input}>
                                    <input type="number" step="0.01" value={amount || ''} onChange={(e) => setAmountFunc(e)} min="0"/>
                                    
                                </div> 
                                <button type="button" onClick={ToMax}>max</button>
                            </div>
                           
                        </div>
                        
                        {action == 'sell' && parseFloat(amount) > max && (
                            <div className={style.item}>
                                <span className={style.err}>err</span>
                            </div>
                        )}
                       
                        <div className={style.item}>
                            <label>Курс</label>
                            <div className={style.item__actions}>
                                <div className={style.input}>
                                    <input type="number" defaultValue={currentCoin && currentCoin.price.toFixed(2)} readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className={style.item}>
                            <label>Комиссия</label>
                            <div className={style.item__actions}>
                            <input type="number" defaultValue="0.2" className={style.commission} readOnly/>
                                <div className={style.input}>
                                    <input type="text" value={commission.toFixed(3)} readOnly/>
                                </div>
                                
                            </div>
                        </div>
                        <div className={style.item}>
                            <label >Всего</label>
                            <div className={style.item__actions}>
                                <div className={style.input}>
                                    <input type="number" step="0.01" value={total || ''} onChange={(e) => setTotalFunc(e)}/>
                                </div>
                                <button type="button" onClick={ToMax}>max</button>
                            </div>
                            
                        </div>

                        {action == 'buy' && Number(total) > max &&  (
                            <div className={style.item}>
                                <span className={style.err}>err</span>
                            </div>
                        )}

                        <button 
                            onClick={exchangeAction} 
                            className={`${action === 'sell' ? style.sell : ''}`} 
                            type="button"
                        >

                        {action == 'buy' ?"Купить": "Продать"} {currentCoin ? currentCoin.symbol: 'BTC'}

                        </button>

                    </form>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Exchange