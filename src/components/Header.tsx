import React from "react";
import {IMAGES} from "../constants/images";
const Header = ()=> {
    return (
        <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', }}>
            <img src={IMAGES.logo} alt="Logo" style={{marginRight: 'auto', marginLeft: '5%'}} />
            {/*<img src={IMAGES.loginBtn} style={{marginRight: 20}} />*/}
            <img src={IMAGES.topMenuBar} alt="menu" style={{marginRight: '5%'}} />
        </div>
    );
}
export default Header
