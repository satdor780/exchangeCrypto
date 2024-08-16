import { useEffect, useState } from 'react';
import ChangePrice from '../ChangePrice/ChangePrice'
import LineChart from '../LineChart/LineChart';
import style from './Cryptcard.module.css'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface CryptcardProps {
    id: string,
    icon: string
    couple: string,
    price: number,
    changePrice24: number,
    amount?: number,
}

const Cryptcard: React.FC<CryptcardProps> = ({id, icon, couple, price, changePrice24, amount}) => {

    const [media, setMedia] = useState(true)

    useEffect(() => {
        if(window.innerWidth < 830){
            setMedia(false)
        }
    }, []);

    return(
        <div className={`${style.item} ${amount && style.amount}`}>
            <div className={style.couple}>
                <img src={icon} alt="icon" />
                <b>{couple}/USD</b>
            </div>
            <span className={style.price}>{price.toFixed(2)}</span>
            {amount && <div className="amount">{amount}</div>}
            <ChangePrice value={changePrice24}/>
            {media && <div className={style.item__chart}><LineChart type={changePrice24 > 0}/></div>}
            <Link to={`/exchange/${id}`} className={style.action} ><button>exchange</button></Link>
        </div>
    )
}

export default Cryptcard