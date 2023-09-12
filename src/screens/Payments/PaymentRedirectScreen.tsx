import React, {useEffect} from "react";
import Script from "react";
import { useParams, useLocation } from "react-router-dom";
// import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import * as process from "process";

const baseUrl = process.env.REACT_APP_BASE_URL

const PaymentRedirectScreen: React.FC = () => {
    // 1. useLocation 훅 취득
    const location = useLocation();

    // 2. location.state 에서 파라미터 취득
    const projectId = location.state.projectId;
    const tid = location.state.tid;
    const amount = location.state.amount;

    useEffect(() => {
        const data = {
            projectId: projectId,
            tid: tid,
            amount: amount,
        };

        axios.post(
            baseUrl+`/order/pay`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTM5Mzg1NCwiZXhwIjoxNjkxNDI1MzkwfQ.idgFwyXYsd6wjvcNlQ-ajfBEfEqCPdCSbkEEIVfwdrpB4FdGlV2wJblMbxpND7eNZ_eov6y3a9DATt7-4WHSVQ",
                },
            }
        )
            .then(function (response) {
                console.log("결제 post 성공", response);

                // todo-이미 returnUrl 존재해서 사이트 이동이 되는거 같은데 하이퍼링크 해야됨???
                //window.location.href = afterLoginUrl //인증응답코드 post 요청 성공 시 이동 될 url
            })
            .catch(function (error) {
                // 오류발생시 실행
                console.log("결제 post 실패", error);
            })
            .then(function () {
                // 항상 실행
                //console.log("데이터 요청 완료");
            });


        // gpt가 알려준거
        /*fetch("YOUR_SERVER_ENDPOINT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Server response:", data);
                // Handle the server response if needed
            })
            .catch((error) => {
                console.error("Error sending data to server:", error);
                // Handle the error if needed
            });*/
    }, []);


    return (
        <>
            <div>PaymentRedirectScreen - Data Sent to Server</div>
        </>
    );
};

export default PaymentRedirectScreen;
