// import ChangePrice from '../ChangePrice/ChangePrice'
import { useAppSelector } from '../../hooks'
import Cryptcard from '../Сryptcard/Сryptcard'
import style from './Market.module.css'

const Market = () => {
    const coins = useAppSelector(state => state.coins.data?.result)
    return(
        <section className={style.market}>
            <div className="container">
                <div className={style.market__inner}>
                    {coins && coins.slice(4).map((coin, index) => (
                        <Cryptcard id={coin.id} key={index} icon={coin.icon} couple={coin.symbol} price={coin.price} changePrice24={coin.priceChange1d}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Market