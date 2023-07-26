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
        <div/* style={{width: "auto", height: 'auto'}}*/>
            <div style={{marginTop: "0.94rem", marginBottom: "1.31rem", fontSize: "0.875rem", fontFamily: "Apple NeoEB"}}>
                <text>{TEXT.topInfo1}</text>
                <text style={{color: "#D15437"}}>{TEXT.topInfo2}</text>
                <text>{TEXT.topInfo3}</text>
            </div>

            <img src={IMAGES.facebookIcon}/>
            <img src={IMAGES.instagramIcon} style={{marginLeft: "3rem", marginRight: "3rem"}}/>
            <img src={IMAGES.kakaoIcon}/>

            <div className={"middleInfo"} style={{marginTop: "1.29rem", marginBottom: "2.44rem", fontSize: "0.75rem", color: "#666666", fontFamily: "Apple NeoM"}}>
                <text>{TEXT.middleInfo1}</text>
                <br/>
                <text>{TEXT.middleInfo2}</text>
                <br/>
                <text>{TEXT.middleInfo3}</text>
                <br/>
                <text>{TEXT.middleInfo4}</text>
            </div>

            <div style={{marginBottom: "2.31rem", fontSize: "0.75rem", color: "#666666", fontFamily: "Apple NeoEB"}}>
                <text onClick={e => bottomInfo1(e)}>{TEXT.bottomInfo1}</text>
                <text onClick={e => bottomInfo2(e)} style={{marginLeft: "2.12rem", marginRight: "2.19rem"}}>{TEXT.bottomInfo2}</text>
                <text onClick={e => bottomInfo3(e)}>{TEXT.bottomInfo3}</text>
            </div>
        </div>
    );
}
export default Footer