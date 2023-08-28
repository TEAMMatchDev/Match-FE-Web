import React, {useState, useRef } from "react";
import {IMAGES} from "../constants/images";
import Sidebar from "../components/SideBar";

interface HeaderProps {
    isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
    const reactapphomeurl = process.env.REACT_APP_PUBLIC_URL;

    const toHome = () => {
        const homeUrl = `${reactapphomeurl}`
        window.location.href = homeUrl
    }

    const toLogin = () => {
        const signInUrl = `${reactapphomeurl}/signIn`
        window.location.href = signInUrl
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggleSide = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}>
            <img src={IMAGES.bigLogo} alt="Logo" style={{marginRight: 'auto', marginLeft: '1.69rem'}} onClick={toHome}/>
            {!isLoggedIn && window.location.pathname === '/' &&
                <img onClick={toLogin} style={{marginRight: '1.25rem'}} src={IMAGES.loginBtn}/>}
            <img src={IMAGES.topMenuBar} alt="menu" style={{marginRight: '1.1rem'}} onClick={toggleSide}/>
            {/* Display Sidebar */}
            {isOpen && (
                <Sidebar width={280}>
                    {/* Sidebar Content */}
                    <div className="content">
                        {/* Sidebar content goes here */}
                        {/* ... */}
                    </div>
                </Sidebar>
            )}
        </div>
    );
};

export default Header;
