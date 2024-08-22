import { useAppSelector } from '../../../../hooks'
import TopCryptoCard from '../TopCryptoCard/TopCryptoCard'
import style from './../../../../styles/TopCrypto.module.css'
import TopCryptoSkeleton from '../TopCryptoCard/TopCryptoSkeleton'

const TopCrypto = () => {
    const coins = useAppSelector(state => state.coins.data?.result)

    const getMediaValue = () => {
        if (window.innerWidth < 700) {
            return 2;
        } else if (window.innerWidth < 880) {
            return 3;
        } else {
            return 4;
        }
    };

    const media = getMediaValue()

    return(
        <section className={style.top}>
             <div className="container">
                <h1>Popular Cryptocurrencies</h1>
                <div className={style.top__inner}>

                    {coins ? coins.slice(0, media).map((coin, index) => (
                        <TopCryptoCard id={coin.id} key={index} icon={coin.icon} name={coin.name} couple={coin.symbol} price={coin.price} changePrice24={coin.priceChange1d}/>
                    )): (
                        <TopCryptoSkeleton amount={media}/>
                    )}
                   
                </div>
             </div>
        </section>
    )
}

export default TopCrypto