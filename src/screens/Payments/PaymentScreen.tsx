import React, {useEffect} from "react";
import Script from "react";
import {useLocation, useNavigate} from "react-router-dom";
import * as process from "process";
import axios from "axios";

//import * as PortOne from '@portone/browser-sdk/v2'; //포트원 결제 sdk
import {RequestPayResponse} from "../../state/RequestPayResponse";
import {RequestPayParams} from "../../state/RequestPayParams";
import {useRecoilState} from "recoil";
import {userNameState, userTelState} from "../../state/userState";
import {accessTokenState} from "../../state/loginState";

const impKey = process.env.REACT_APP_IMP_KEY;
const storeId: string = process.env.REACT_APP_IMP_STORE_ID || '';
const reactapphomeurl= process.env.REACT_APP_PUBLIC_URL;
const baseUrl = process.env.REACT_APP_BASE_URL

const PaymentScreen: React.FC = () => {
    const [token, setToken] = useRecoilState(accessTokenState);

    //pid와 amount, date (결제금액, 결제일)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId') || '';
    const amountString = searchParams.get('amount');
    const amount = amountString !== null ? parseFloat(amountString) : 0;
    const title = searchParams.get('title') || '';
    const method = "card";
    const goodsName = title;

    const [userName, setUserName] = useRecoilState(userNameState);
    const [userTel, setUserTel] = useRecoilState(userTelState);

    const clientId = "S2_5afd76e6601241268007c7aa561ec61a";
    const returnUrl = `${process.env.REACT_APP_BASE_URL}/order/severAuth`;


    useEffect(() => {

        impPay();

    }, []);

    const impPay = () => {
        if (!window.IMP) return;
        /* 1. 가맹점 식별하기 */
        //const { IMP } = window;
        var IMP = window.IMP;
        IMP.init("imp02276456"); // 가맹점 식별코드
        requestPay()

        function requestPay() {
            IMP.request_pay(
                {
                    pg: "nice_v2.iamport00m", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
                    pay_method: "card", // 결제수단
                    merchant_uid: orderId, // 주문번호
                    amount: amount, // 결제금액
                    name: goodsName, // 주문명
                    buyer_name: userName,
                    buyer_tel: userTel, // 구매자 전화번호
                    m_redirect_url: window.location.href = reactapphomeurl + `/auth/payComplete/once`,
                },
                function (res: RequestPayResponse) {
                    if (res.imp_uid != null) {
                        const data = {
                            impUid: res.imp_uid,
                            orderId: orderId,
                            amount: amount,
                            payMethod: method,
                        };
                        axios.post(
                            baseUrl + `/payments/validate`,
                            data,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "X-AUTH-TOKEN": token,
                                },
                            }
                        )
                            .then(function (response) {
                                alert("결제 성공");
                                window.location.href = reactapphomeurl + `/auth/payComplete/once`;
                            })
                            .catch(function (error) {
                                alert("08-01 요청 실패");
                                window.location.href = reactapphomeurl + `/auth/pay/fail`;
                                console.log('# PaymentScreen --정보확인 : '+res.imp_uid, orderId, amount, method);
                            });
                    }
                    else {
                        alert("결제 실패");
                        window.location.href = reactapphomeurl + `/auth/pay/fail`;
                    }
                }
            );


        }
        // /* 2. 결제 데이터 정의하기 */
        // const data: RequestPayParams = {
        //     pg: "nice_v2.iamport00m", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
        //     pay_method: "card", // 결제수단
        //     merchant_uid: orderId, // 주문번호
        //     amount: amount, // 결제금액
        //     name: goodsName, // 주문명
        //
        //     buyer_name: "홍길동", // 구매자 이름
        //     buyer_tel: "01012341234", // 구매자 전화번호
        //     buyer_email: "example@example.com", // 구매자 이메일
        //     buyer_addr: "신사동 661-16", // 구매자 주소
        //     buyer_postcode: "06018", // 구매자 우편번호
        // };
        //
        // /* 4. 결제 창 호출하기 */
        // IMP.request_pay(data, callback);
    }
    /* 3. 콜백 함수 정의하기 */
    function callback(response: RequestPayResponse) {
        const { success, error_msg } = response;

        if (success) {
            alert("결제 성공");
            window.location.href = reactapphomeurl+``;
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    }



    return (
        <>
            <div className={"complete-container"}>
                <text className={"complete-txt"}>나이스 페이먼츠에 결제요청 보내는 중</text>
            </div>
        </>
    );
};

export type RequestPayResponseCallback = (response: RequestPayResponse) => void
export interface Iamport {
    init: (accountID: string) => void;
    request_pay: (
        params: RequestPayParams,
        callback?: RequestPayResponseCallback
    ) => void;
}

declare global {
    interface Window {
        IMP?: Iamport;
    }
}

export default PaymentScreen;
