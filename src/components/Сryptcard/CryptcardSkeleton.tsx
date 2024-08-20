import style from './Cryptcard.module.css'

const CryptcardSkeleton: React.FC = () => {
    return(
        <>
            <div className={style.skeleton__item}></div>
            <div className={style.skeleton__item}></div>
            <div className={style.skeleton__item}></div>
            <div className={style.skeleton__item}></div>
        </>
    )
}

export default CryptcardSkeleton