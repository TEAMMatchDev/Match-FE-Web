import React, {useEffect} from "react";
import Script from "react";
import {useLocation, useNavigate} from "react-router-dom";
import * as process from "process";

const PaymentScreen: React.FC = () => {

    //pid와 amount, date (결제금액, 결제일)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');
    const title = searchParams.get('title');

    const reactapphomeurl= process.env.REACT_APP_PUBLIC_URL;
    const clientId = "S2_5afd76e6601241268007c7aa561ec61a";
    const navigate = useNavigate();

    useEffect(() => {

        serverAuth()

    }, []);

    function serverAuth() {
        if (typeof window !== "undefined") {
            const pay_obj: any = window;
            const { AUTHNICE } = pay_obj;

        }

        // Load the payment library dynamically
        const script = document.createElement("script");
        script.src = "https://pay.nicepay.co.kr/v1/js/";
        script.async = true;
        document.body.appendChild(script); // Append the script to the body to load it

        // Wait for the payment library to load
        script.onload = () => {
            const pay_obj: any = window;
            const { AUTHNICE } = pay_obj;
            AUTHNICE.requestPay({
                clientId: clientId,
                method: "card",
                orderId: orderId,
                amount: amount,
                goodsName: title,
                returnUrl: process.env.REACT_APP_BASE_URL+"/order/serverAuth", //API를 호출할 Endpoint 입력

                fnError: function (res: any) {
                    const failUrl = `${reactapphomeurl}/auth/pay/fail`
                    window.location.href = failUrl
                    console.log(failUrl);
                    alert(
                        "고객용 메시지 : " + res.msg + "\n개발자 확인용 : " + res.errorMsg + ""
                    );
                },
                fnSuccess: function (res: any) {
                    //handlePaymentResponse(result);
                    console.log('fnSuccess');
                    console.log('# log from nicypay --tid: '+res.data.tid)
                    //TODO - auth/pay/redirect 로 이동 + response PaymentRedirectScreen에 전달
                    /*const successUrl = `${reactapphomeurl}/auth/pay/success`
                    window.location.href = successUrl*/
                },
            });
        };


    };


    return (
        <>
            <div>나이스 페이먼츠에 결제요청 보내는 중</div>
        </>
    );
};

export default PaymentScreen;
