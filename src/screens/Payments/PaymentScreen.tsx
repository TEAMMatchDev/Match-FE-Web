import React, {useEffect} from "react";
import Script from "react";
import {useLocation, useNavigate} from "react-router-dom";
import * as process from "process";
import axios from "axios";

const PaymentScreen: React.FC = () => {

    //pid와 amount, date (결제금액, 결제일)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId') || '';
    const amountString = searchParams.get('amount');
    const amount = amountString !== null ? parseFloat(amountString) : 0;    const title = searchParams.get('title') || '';
    const method = "card";
    const goodsName = title;
    const clientId = "S2_5afd76e6601241268007c7aa561ec61a";
    const returnUrl = `${process.env.REACT_APP_PUBLIC_URL}/auth/pay/once/fin`;

    const reactapphomeurl= process.env.REACT_APP_PUBLIC_URL;
    const navigate = useNavigate();

    useEffect(() => {

        //serverAuth()
        nicePay(clientId, method, orderId, amount, goodsName, returnUrl)

    }, []);


    const requestPay = (options: RequestPayOptions) => {
        // Define the script source URL
        const scriptSrc = "https://pay.nicepay.co.kr/v1/js/";

        // Create a callback function to handle script loading and execution
        const scriptCallback = () => {
            // Check if the external script has defined the `AUTHNICE.requestPay` function
            if (typeof window.AUTHNICE?.requestPay === "function") {
                // Call the external script's `AUTHNICE.requestPay` function with the provided options
                window.AUTHNICE.requestPay(options);
            } else {
                console.error("External script function 'AUTHNICE.requestPay' not found.");
                options.fnError({ msg: "External script not loaded or function missing" });
            }
        };

        // Create a script element
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;

        // Add an event listener to handle script load and execution
        script.addEventListener("load", scriptCallback);

        // Add the script element to the document body
        document.body.appendChild(script);
    };

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

    const nicePay = (clientId: string, method: string, orderId: string, amount: number, goodName: string, returnUrl: string) => {
        requestPay({
            clientId: clientId,
            method: method,
            orderId: orderId,
            amount: amount,
            goodsName: title,
            returnUrl: returnUrl,

            fnError: function (res) {
                const failUrl = `${reactapphomeurl}/auth/pay/fail`;
                window.location.href = failUrl;
                console.log(failUrl);
                alert(
                    "고객용 메시지 : " + res.msg + "\n개발자 확인용 : " + res.errorMsg + ""
                );
            },
            fnSuccess: function (res) {
                console.log('# log from nicypay --tid: ' + res.data.tid);

                /*axios.post(

                )*/

            },
        });
    }


    return (
        <>
            <div>나이스 페이먼츠에 결제요청 보내는 중</div>
        </>
    );
};
declare global {
    interface Window {
        AUTHNICE?: {
            requestPay(options: any): void;
            // Add other properties or functions if needed
        };
    }
}
interface RequestPayOptions {
    clientId: string;
    method: string;
    orderId: string;
    amount: number;
    goodsName: string;
    returnUrl: string;
    fnError: (res: any) => void;
    fnSuccess: (res: any) => void;
}


export default PaymentScreen;
