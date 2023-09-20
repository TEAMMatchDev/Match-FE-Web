//PaymentScreen1

import React, {Fragment, useEffect, useState} from "react";
import './style.css';
import Select from "react-select";
import {TEXT} from "../../constants/text";
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import {useRecoilValue} from "recoil";
import {accessTokenState} from "../../state/loginState";
const baseUrl = process.env.REACT_APP_BASE_URL

const PaymentScreen1 = () => {
    const REACT_APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
    const token = useRecoilValue(accessTokenState);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    //pid
    const projectId = searchParams.get('projectId');
    //title
    const title = searchParams.get('title');
    //pmethod
    const [payMethod, setPayMethod] = useState(searchParams.get('pmethod')); //정기or단기 결제

    const [name, setName] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const regularPayUrl = REACT_APP_PUBLIC_URL+`/auth/pay/regular`
    const oneTimeUrl = REACT_APP_PUBLIC_URL+`/auth/pay/onetime`

    useEffect(() => {
        try{
            const data = {

            }
            const config = {
                headers: {
                    "X-AUTH-TOKEN": token,
                    "Content-Type": "application/json",
                },
            };
            axios.post(baseUrl + `/order/user`,data,config)
                .then(function (response) {
                    setName(response.data.result.name);
                    setBirth(response.data.result.birthDay);
                    setPhone(response.data.result.phoneNumber);
                    console.log('후원자 정보 조회요청 post 성공');
                    console.log('# 후원자 정보 data:', JSON.stringify(response.data.result, null, 2));
                })
                .catch(function (error) {
                    console.log("후원자정보 axios post 실패", error);
                    console.log('>>>token : ' + token);
                    window.alert(error.message);
                });
        } catch (e){
            console.log(e)
        }
    })

    const handleNextBtn = () => {
        const queryString = `?projectId=${projectId}&title=${title}`;

        if (payMethod === "REGULAR") {
            window.location.href = regularPayUrl + queryString;
        } else {
            window.location.href = oneTimeUrl + queryString;
        }
    }

    return (
        <Fragment>
            <div className={"payment1"}>
                <div className={"match-on"}>{TEXT.payTitle}</div>

                <div className={"pay-title"}>{TEXT.pay1Container1}</div>
                <div className={"border1"}></div>

                <div className={"sponser_field"}>{TEXT.pay2Container2}</div>
                <div className={"sponser_title"}>
                    <text style={{color: "#D15437"}}>{TEXT.pay2Container3}</text>
                    <text>{TEXT.pay2Container4}</text>
                    <text style={{color: "#D15437"}}>{`${title}`}</text>
                </div>

                <div className={"sponser_amount"}>후원자 상세정보</div>
                <div className={"sponser_amount-alert"}>후원자님의 상세정보를 확인해보세요!</div>

                <div className={"sponser-info"}>이름</div>
                <div className={"sponser-info"}>생년월일</div>
                <div className={"sponser-info"}>휴대폰 번호</div>
                <div className={"sponser-info"}>기부금 영수증</div>


                <div className={"sponsered_payment_nextpage"}>
                    <button className={"sponser-next-btn-active"}
                            onClick={() => handleNextBtn()}
                    >다음
                    </button>
                </div>
            </div>
        </Fragment>
    );
}
export default PaymentScreen1