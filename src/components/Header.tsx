import React from "react";
import {IMAGES} from "../constants/images";
const Header = ()=>
{

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', borderBottom: '1px solid #D9D9D9' }}>
            <img src={IMAGES.logo} alt="Logo" style={{ marginRight: 'auto', marginLeft: '5%' }} />
            <img src={IMAGES.topMenuBar} alt="menu" style={{ marginLeft: 'auto', marginRight: '5%' }} />

        </div>
    );

}
export default Header
