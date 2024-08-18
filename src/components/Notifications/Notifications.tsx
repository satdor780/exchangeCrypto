import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks"
import { hideNotification } from "../redux/reduxSlice/walletSlice";

const Notifications = () => {

    // const [show, setShow] = useState(false)

    const dispatch = useAppDispatch();
    const notifications = useAppSelector(state => state.wallet.notifications);
    const notificationsText = useAppSelector(state => state.wallet.notificationsText);

    useEffect(() => {
        if (notifications) {
            const timer = setTimeout(() => {
                dispatch(hideNotification());
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [notifications, dispatch]);

    return notifications ? (
        <div className="notifications" style={
           { 
            position: 'fixed', 
            zIndex: '1000', 
            background: '#0bba74', 
            padding: '10px 20px', 
            borderRadius: '7px', 
            right: '20px', 
            bottom: '20px', 
            fontSize: '16px', 
            color: '#fff',
            fontWeight: '400'
           }
        }>
            <p>{notificationsText}</p>
        </div>
    ) : null;
    
}

export default Notifications