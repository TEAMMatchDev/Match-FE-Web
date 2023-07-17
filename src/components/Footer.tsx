import React from "react";
import {IMAGES} from "../constants/images";
import {TEXT} from "../constants/text";

const Footer: React.FC = ()=> {
    function bottomInfo1 (e: React.MouseEvent) {
        window.open("https://gorgeous-muscari-f15.notion.site/c06273c5930f431faeb5d4df70d3201e?pvs=4", '_blank', 'width=500,height=600');
    }
    function bottomInfo2 (e: React.MouseEvent) {
        window.open("https://gorgeous-muscari-f15.notion.site/4f621cfc34df4103845261a6c88da77d?pvs=4", '_blank', 'width=500,height=600');
    }
    function bottomInfo3 (e: React.MouseEvent) {
        window.open("https://gorgeous-muscari-f15.notion.site/eda8a33050d24cc5ac9dfcc3557eb798?pvs=4", '_blank', 'width=500,height=600');
    }

    return (
        <div style={{width: "auto", height: '100%'}}>
            <br/>
            <div style={{fontSize: 15, fontWeight: "bold"}}>
                <text>{TEXT.topinfo1}</text>
                <text style={{color: "#D15437"}}>{TEXT.topinfo2}</text>
                <text>{TEXT.topinfo3}</text>
            </div>
            <br/>
            <br/>

            <img src={IMAGES.facebookIcon}/>
            <text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <img src={IMAGES.instagramIcon}/>
            <text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <img src={IMAGES.kakaoIcon}/>
            <br/>
            <br/>

            <div className="middleinfo" style={{fontSize: 12, color: "#666666"}}>
                <text>{TEXT.middleinfo1}</text>
                <br/>
                <text>{TEXT.middleinfo2}</text>
                <br/>
                <text>{TEXT.middleinfo3}</text>
                <br/>
                <text>{TEXT.middleinfo4}</text>
            </div>
            <br/>
            <br/>

            <div style={{fontSize: 12, fontWeight: "bold", color: "#666666", textAlign: "center"}} >
                <text onClick={e => bottomInfo1(e)}>{TEXT.bottomInfo1}</text>
                <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                <text onClick={e => bottomInfo2(e)}>{TEXT.bottomInfo2}</text>
                <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                <text onClick={e => bottomInfo3(e)}>{TEXT.bottomInfo3}</text>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    );
}
export default Footer