import style from './ChangePrice.module.css'

interface ChangePriceProps {
    value: number
}


const ChangePrice: React.FC<ChangePriceProps>  = ({value}) => {
    const type = value > 0
    return(
        
        <div className={`${style.change__price} ${type ? style.up : style.down}`}>
            {type ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="growth-arrow"><path d="M21.92,6.62a1,1,0,0,0-.54-.54A1,1,0,0,0,21,6H16a1,1,0,0,0,0,2h2.59L13,13.59l-3.29-3.3a1,1,0,0,0-1.42,0l-6,6a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L9,12.41l3.29,3.3a1,1,0,0,0,1.42,0L20,9.41V12a1,1,0,0,0,2,0V7A1,1,0,0,0,21.92,6.62Z"></path></svg>
            ): (
                <svg className={style.fall} viewBox="0 0 24 24" id="down-growth"><path d="M21,11a1,1,0,0,0-1,1v2.59l-6.29-6.3a1,1,0,0,0-1.42,0L9,11.59,3.71,6.29A1,1,0,0,0,2.29,7.71l6,6a1,1,0,0,0,1.42,0L13,10.41,18.59,16H16a1,1,0,0,0,0,2h5a1,1,0,0,0,.38-.08,1,1,0,0,0,.54-.54A1,1,0,0,0,22,17V12A1,1,0,0,0,21,11Z"></path></svg>
            )}
            <span>{value.toFixed(2)}%</span>
        </div>
    )
}

export default ChangePrice