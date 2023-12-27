import React, {Fragment, useState} from "react";
import {IMAGES} from "../../constants/images";
import {PrologueText} from "../../constants/prologueText";
import {Prologuimages} from "../../constants/prologuimages";
import * as process from "process";
import {useLocation} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userNameState} from "../../state/userState";

const PaymentSuccessRedirectScreen: React.FC = () => {

    //todo -- 04-01 ) tid 추출 성공 시 post 요청 처리
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');
    const amount = searchParams.get('amount');
    const date = searchParams.get('date') || '';
    const title = searchParams.get('title');
    const usages = searchParams.get('donateUsages') || '';
    const status = searchParams.get('doanteStatus') || '';
    const [userName, setUserName] = useRecoilState(userNameState);

    const handleComplete = () => {

        const payDoneUrlAppDepplink = `${process.env.REACT_APP_DEEPLINK_BASE_URL}/donate/?donatorName=${userName}&donateTitle=${title}&donateUsages=${usages}&donateAmount=${amount}&donateStatus=${status}`;
        const completepage = payDoneUrlAppDepplink; //process.env.REACT_APP_PUBLIC_URL+`/introduce`;

        // Redirect the original window to the specified URL
        if (window.opener) {
            window.close();
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
