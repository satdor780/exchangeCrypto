import { useEffect, useState } from "react";
import { defaults } from "chart.js/auto";
import {Pie} from "react-chartjs-2";

import style from '../../styles/Wallet.module.css'
import TopCryptoCard from "../widgets/TopСrypto/TopCryptoCard/TopCryptoCard";
import Cryptcard from '../widgets/Market/Сryptcard/Сryptcard'
import { useAppSelector } from "../../hooks";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = false;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const Wallet = () => {
    
    let filterDate
    let sourceData = useAppSelector(state => state.wallet.data?.result)
    const coins = useAppSelector(state => state.coins.data?.result)
    const [media, setMedia] = useState(true)
    let slice = media ? 3: 100

    if (coins && sourceData) {
        const updatedSourceData = sourceData.map((item) => {

            for (let index = 0; index < coins.length; index++) {
                if (coins[index].id === item.id) {
                    return {
                        ...item,
                        price: coins[index].price,
                    };
                } 
            }
            
            return item;
        });
        const filterAmount = updatedSourceData.filter((coin) => coin.amount !== 0)
        sourceData = filterAmount; 
        filterDate = sourceData.sort((a, b) => {
            const valueA = a.amount * (a.price || 0);
            const valueB = b.amount * (b.price || 0);
            return valueB - valueA;
        });
    }

    useEffect(() => {
        if(window.innerWidth < 830){
            setMedia(false)
        }
    }, []);
    

    
    
    return(
        <section className={style.wallet}>
            <div className="container">
                <h1>Wallet</h1>
                <div className={style.wallet__inner}>
                    <div className={style.wallet__statistic}>
                        <div className={style.wallet__chart}>
                            <Pie
                                data={{
                                    labels: sourceData.map((data) => data.id),
                                    datasets: [
                                    {
                                        label: "Count",
                                        data: sourceData.map((data) => data.price && data.amount * data.price),
                                        weight: 12,
                                        backgroundColor: [
                                            'rgba(255, 99, 71, 0.8)',   // Tomato
                                            'rgba(135, 206, 250, 0.9)', // LightSkyBlue
                                            'rgba(255, 182, 193, 0.7)', // LightPink
                                            'rgba(124, 252, 0, 0.85)',  // LawnGreen
                                            'rgba(255, 215, 0, 0.75)',  // Gold
                                            'rgba(221, 160, 221, 0.9)', // Plum
                                            'rgba(30, 144, 255, 0.8)',  // DodgerBlue
                                            'rgba(255, 140, 0, 0.85)',   // DarkOrange
                                            'rgba(100, 149, 237, 0.7)', // CornflowerBlue
                                            'rgba(255, 105, 180, 0.6)'   // HotPink
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 71, 0.8)',   // Tomato
                                            'rgba(135, 206, 250, 0.9)', // LightSkyBlue
                                            'rgba(255, 182, 193, 0.7)', // LightPink
                                            'rgba(124, 252, 0, 0.85)',  // LawnGreen
                                            'rgba(255, 215, 0, 0.75)',  // Gold
                                            'rgba(221, 160, 221, 0.9)', // Plum
                                            'rgba(30, 144, 255, 0.8)',  // DodgerBlue
                                            'rgba(255, 140, 0, 0.85)',   // DarkOrange
                                            'rgba(100, 149, 237, 0.7)', // CornflowerBlue
                                            'rgba(255, 105, 180, 0.6)'   // HotPink
                                        ],
                                    },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                    title: {
                                        text: "Revenue Sources",
                                    },
                                    },
                                }}
                            />
                        </div>
                        <div className={style.wallet__top}>
                            {filterDate && filterDate.slice(0, slice).map((coin, index) => (
                                <TopCryptoCard id={coin.id} key={index} icon={coin.icon} name={coin.name} couple={coin.symbol} price={coin.price ? coin.price * coin.amount: 0} changePrice24={coin.price ? (coin.price - coin.buyPrice) / (coin.price / 100) : 0}/>
                            ))}
                        </div>
                    </div>

                    <div className={style.others__coins}>
                        {filterDate && media && filterDate.slice(3).map((coin, index) => (
                            <Cryptcard id={coin.id} key={index} icon={coin.icon} couple={coin.symbol} price={coin.price ? coin.price * coin.amount: 0} changePrice24={coin.price ? (coin.price - coin.buyPrice) / (coin.price / 100) : 0}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Wallet