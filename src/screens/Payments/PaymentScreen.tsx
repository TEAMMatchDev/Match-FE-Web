import React, {useEffect} from "react";
import Script from "react";
import { useNavigate  } from "react-router-dom";

const PaymentScreen: React.FC = () => {
    const clientId = "S2_5afd76e6601241268007c7aa561ec61a";
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://pay.nicepay.co.kr/v1/js/";
        script.async = true;
        document.body.appendChild(script);

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

        // Wait for the payment library to load
        script.onload = () => {
            const pay_obj: any = window;
            const { AUTHNICE } = pay_obj;
            AUTHNICE.requestPay({
                clientId: clientId,
                method: "card",
                orderId: random(),
                amount: 1004,
                goodsName: "나이스페이-상품",
                returnUrl: "https://localhost:3000/auth/pay", //API를 호출할 Endpoint 입력

                fnError: function (result: any) {
                    window.location.href = 'https://localhost:3000/auth/pay/fail';
                    alert(
                        "고객용메시지 : " + result.msg + "\n개발자확인용 : " + result.errorMsg + ""
                    );
                },
                fnSuccess: function (result: any) {
                    //handlePaymentResponse(result);
                    console.log('fnSuccess');
                    //TODO - auth/pay/redirect 로 이동 + response PaymentRedirectScreen에 전달
                    window.location.href = 'https://localhost:3000/auth/pay/redirect';
                },
            });
        };

        // Append the script to the body to load it
        document.body.appendChild(script);

    };


    // Test orderId 생성
    const random = (length: number = 8): string => {
        return Math.random().toString(16).substr(2, length);
    };

    return (
        <>
            <button onClick={() => serverAuth()}>Pay serverAuth</button>
        </>
    );
};

export default PaymentScreen;
