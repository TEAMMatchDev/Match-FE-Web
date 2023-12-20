import React, {Fragment} from "react";
import {IMAGES} from "../../constants/images";
import {PrologueText} from "../../constants/prologueText";
import {Prologuimages} from "../../constants/prologuimages";
import * as process from "process";

const PaymentSuccessRedirectScreen: React.FC = () => {

    //todo -- 04-01 ) tid 추출 성공 시 post 요청 처리

    const handleComplete = () => {
        const payDoneUrlAppDepplink = `${process.env.REACT_APP_DEEPLINK_BASE_URL}/flame/?donatorName=${userName}&donateTitle=${title}&donateUsages=${usages}&donateAmount=${amount}&donateStatus=${status}`;
        const completepage = payDoneUrlAppDepplink; //process.env.REACT_APP_PUBLIC_URL+`/introduce`;
        window.close();

        // Redirect the original window to the specified URL
        if (window.opener) {
            window.opener.location.href = completepage;
        }
    }

    return (
        <>
            <Fragment>
                <div className={"sendinfo-container"}>
                    <img className={"login-cat-icon"} src={Prologuimages.catFace3}/>
                    <text className={"donate-txt"} style={{marginBottom: "4rem"}}>{PrologueText.completeDesc}</text>

                    <button onClick={handleComplete} className={"certi-btn"}>
                        <text className={"certi-btn-txt"}>확인</text>
                    </button>
                </div>
            </Fragment>
        </>
    );
};

export default PaymentSuccessRedirectScreen;
