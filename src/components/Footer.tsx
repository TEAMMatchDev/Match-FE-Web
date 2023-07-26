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
            <div style={{marginTop: 15, marginBottom: 21, fontSize: 15, fontFamily: "Apple NeoEB"}}>
                <text>{TEXT.topInfo1}</text>
                <text style={{color: "#D15437"}}>{TEXT.topInfo2}</text>
                <text>{TEXT.topInfo3}</text>
            </div>

            <img src={IMAGES.facebookIcon}/>
            <img src={IMAGES.instagramIcon} style={{marginLeft: 49, marginRight: 49}}/>
            <img src={IMAGES.kakaoIcon}/>

            <div className={"middleInfo"} style={{marginTop: 21, marginBottom: 39, fontSize: 12, color: "#666666", fontFamily: "Apple NeoM"}}>
                <text>{TEXT.middleInfo1}</text>
                <br/>
                <text>{TEXT.middleInfo2}</text>
                <br/>
                <text>{TEXT.middleInfo3}</text>
                <br/>
                <text>{TEXT.middleInfo4}</text>
            </div>

            <div className={"footerBtn"}>
                <span onClick={e => bottomInfo1(e)}>{TEXT.bottomInfo1}</span>
                <span onClick={e => bottomInfo2(e)}>{TEXT.bottomInfo2}</span>
                <span onClick={e => bottomInfo3(e)}>{TEXT.bottomInfo3}</span>
            </div>
        </div>
    );
}
export default Footer