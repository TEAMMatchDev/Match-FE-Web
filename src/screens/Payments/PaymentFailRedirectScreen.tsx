import React from "react";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";

const PaymentFailRedirectScreen: React.FC = () => {

    const serverAuth = () => {
        console.log('버튼')
        window.location.href = process.env.REACT_APP_PUBLIC_URL+``
    };


    return (
        <>
            <div className={"sendinfo-container"}>
                <img className={"login-cat-icon"} src={Prologuimages.catFace3}/>
                <text className={"donate-txt"} style={{marginBottom: "4rem"}}>기부 요청 실패</text>

                <button onClick={() => serverAuth()} className={"certi-btn"}>
                    <text className={"certi-btn-txt"}>확인</text>
                </button>
            </div>
        </>
    );
};

export default PaymentFailRedirectScreen;
