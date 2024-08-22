import style from './../../../../styles/TopCryptoCard.module.css'

interface TopCryptoSkeletonProps {
    amount?: number;
}

const TopCryptoSkeleton: React.FC<TopCryptoSkeletonProps> = ({ amount = 4 }) => {
    const list = Array.from({ length: amount });

    return (
        <>
            {list.map((_, index) => (
                <div key={index} className={style.skeleton__item}></div>
            ))}
        </>
    );
};

export default TopCryptoSkeleton;
