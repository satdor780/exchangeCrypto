// import ChangePrice from '../ChangePrice/ChangePrice'
import { useAppSelector } from '../../../../hooks'
// import { Transition } from 'react-transition-group';
import CryptcardSkeleton from '../Сryptcard/CryptcardSkeleton'
import Cryptcard from '../Сryptcard/Сryptcard'
import style from './../../../../styles/Market.module.css'
// import { useEffect, useState } from 'react';


const Market = () => {
    const coins = useAppSelector(state => state.coins.data?.result);
    // const [show, setShow] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setShow(true);
    //     }, 2000);
    // }, [coins]);

    return (
        <section className={style.market}>
            <div className="container">
                <div className={style.market__inner}>
                    {coins ? coins.slice(4).map((coin, index) => (
                        <Cryptcard id={coin.id} key={index} icon={coin.icon} couple={coin.symbol} price={coin.price} changePrice24={coin.priceChange1d}/>
                    )): (
                        <CryptcardSkeleton />
                    )}
                </div>
                    
            </div>
        </section>
    );
};

export default Market

// {coins ? coins.slice(4).map((coin, index) => (
//     <Cryptcard id={coin.id} key={index} icon={coin.icon} couple={coin.symbol} price={coin.price} changePrice24={coin.priceChange1d}/>
// )): (
//     <CryptcardSkeleton />
// )}