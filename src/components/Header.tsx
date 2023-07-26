import React from "react";
import {IMAGES} from "../constants/images";
const Header = ()=> {
    const toHome = ()=> {
        const homeUrl = `https://localhost:3000`
        window.location.href = homeUrl
    }

    return (
        <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', }}>
            <img src={IMAGES.bigLogo} alt="Logo" style={{marginRight: 'auto', marginLeft: '5%'}} onClick={toHome} />
            {/*<img src={IMAGES.loginBtn} style={{marginRight: 20}} />*/}
            <img src={IMAGES.topMenuBar} alt="menu" style={{marginRight: '5%'}} />
        </div>
    );
}
export default Header
