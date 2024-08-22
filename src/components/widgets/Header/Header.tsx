import React from 'react';
import style from './../../../styles/Header.module.css'
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.header__inner}>
                    <div className={style.logo}>
                        <NavLink to="/">
                            <h2>logo</h2>
                        </NavLink>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/" className={({ isActive }) => (isActive ? `${style.active}` : "")}>Home</NavLink>
                            </li>
                            <li><NavLink to="/wallet" className={({ isActive }) => (isActive ? `${style.active}` : "")}>Wallet</NavLink></li>
                            <li><NavLink to="/exchange" className={({ isActive }) => (isActive ? `${style.active}` : "")}>Exchange</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
