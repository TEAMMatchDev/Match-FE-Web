import React from "react";
import {IMAGES} from "../constants/images";
import {TEXT} from "../constants/text";

const Footer: React.FC = ()=> {

    return (
        <div style={{width: "auto", height: '100%'}}>
            <br/>
            <a>{TEXT.topinfo}</a>
            <br/>
            <br/>

            <img src={IMAGES.facebookIcon}/>
            <text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <img src={IMAGES.instagramIcon}/>
            <text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <img src={IMAGES.kakaoIcon}/>
            <br/>
            <br/>

            <div className="middleinfo" style={{marginLeft: 10, marginRight: 10}}>
                <a>{TEXT.middleinfo1}</a>
                <br/>
                <a>{TEXT.middleinfo2}</a>
                <br/>
                <a>{TEXT.middleinfo3}</a>
                <br/>
                <a>{TEXT.middleinfo4}</a>
                <br/>
                <br/>
                <br/>
            </div>

            <a>{TEXT.bottomInfo1}</a>
            <text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <a>{TEXT.bottomInfo2}</a>
            <text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <a>{TEXT.bottomInfo3}</a>
            <br/>
            <br/>
            <br/>
        </div>
    );
}
export default Footer
