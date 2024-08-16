import { Link } from "react-router-dom"
import ChangePrice from "../ChangePrice/ChangePrice"
import style from './TopCryptoCard.module.css'

interface TopCryptoCardProps {
    id: string,
    icon: string,
    name: string,
    couple: string,
    price: number,
    changePrice24: number
}

const TopCryptoCard: React.FC<TopCryptoCardProps> = ({id, icon, name, couple, price, changePrice24}) => {
    return(
        <Link to={`/exchange/${id}`} className={style.item}>
            <div className={style.name}>
               <img src={icon} alt="icon" />
                <span>{name}</span>
            </div>
            <div className={style.couple}>{couple}</div>
            <div className={style.price}>
                <b>{price.toFixed(2)}$</b>
                <ChangePrice value={changePrice24}/>
            </div>
        </Link>
    )
}

export default TopCryptoCard