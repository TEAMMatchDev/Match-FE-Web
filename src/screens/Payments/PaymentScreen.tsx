import React from "react";

const PaymentScreen: React.FC = () => {
    const clientId = "S2_5afd76e6601241268007c7aa561ec61a";

    // Function to handle the response from the payment API
    function handlePaymentResponse(response: any) {
        console.log("Payment API response:", response);
        //redirectToFrontend(response);
    }
    const serverAuth = () => {
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
                returnUrl: "https://localhost:3000/auth/pay",
                fnError: function (result: any) {
                    alert(
                        "고객용메시지 : " + result.msg + "\n개발자확인용 : " + result.errorMsg + ""
                    );
                    window.location.href = 'https://localhost:3000/auth/pay/fail';
                },
                fnSuccess: function (result: any) {
                    handlePaymentResponse(result);
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
