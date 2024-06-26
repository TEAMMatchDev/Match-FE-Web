import React, {useState, useRef, useEffect} from "react";
import {IMAGES} from "../constants/images";
import Sidebar from "../components/SideBar";
import {accessTokenState} from "../state/loginState";
import {useRecoilValue} from "recoil";

const Header = () => {
    const token = useRecoilValue(accessTokenState);

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
        const menuUrl = reactapphomeurl+`/menu`;
        window.location.href = menuUrl;
    };


    return (
        <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}>
            <img src={IMAGES.bigLogo} alt="Logo" style={{marginRight: 'auto', marginLeft: '1.69rem'}} onClick={toHome}/>

            {/*todo --Header 로그인 버튼*/}
            {token === null
            && window.location.pathname !== "/"
            && !window.location.pathname.includes("pre" && "intro")
            || window.location.pathname === "/introduce" ? (
                <img onClick={toLogin} style={{ marginRight: '1.25rem' }} src={IMAGES.loginBtn} alt="Login" />
            ) : null}
            {/*todo --Header 로그인 버튼*/}


            {/*todo 상단 오른쪽 메뉴바*/}
             <img src={IMAGES.topMenuBar} alt="menu" style={{marginRight: '1.1rem'}} onClick={toggleSide}/>
            {/*todo 상단 오른쪽 메뉴바*/}

            {/*todo SideBar 예시코드*/}
            {/*{isOpen && (
                <Sidebar width={280}>
                    <div className="content">
                    </div>
                </Sidebar>
            )}*/}
            {/*todo SideBar 예시코드*/}

        </div>
    );
};

export default Header;
