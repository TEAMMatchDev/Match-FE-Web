import React, {Fragment, useEffect, useState} from "react";
import { IMAGES } from "../../constants/images";
import './style.css';
import {useLocation} from "react-router-dom";
import {TEXT} from "../../constants/text";
import CardCarousel from "../../components/CardCarousel";
import Slider from "react-slick";
import axios from "axios";
import {useRecoilState, useRecoilValue} from "recoil";
import {accessTokenState} from "../../state/loginState";
import {cardIdState} from "../../state/cardState";
import * as process from "process";
import CheckBox from "../../components/CheckBox";
import {payAgreeState, signAgreeState} from "../../state/agreeState";
import {ALERTEXT} from "../../constants/alertText";

const baseUrl = process.env.REACT_APP_BASE_URL

const PaymentScreen3 = () => {

    //구매 방법 radio 버튼
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    //안내사항
    const [isOpen, setIsOpen] = useState(false);
    const [isCard, setIsCard] = useState(false);

    //결제 동의
    const [isAgreeAll, setIsAgreeAll] = useState(true);
    const [isAgree1, setIsAgree1] = useState(true);
    const [isAgree2, setIsAgree2] = useState(true);

    //pid와 amount, date (결제금액, 결제일)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');
    const amount = searchParams.get('amount');
    const date = searchParams.get('date');
    const title = searchParams.get('title');
    const orderId = searchParams.get('orderId');

    //oder/pay/card todo 정규-카드 조회
    const [items, setItems] = useState<any[]>([]); //카드 목록
    const [cardId] = useRecoilState(cardIdState); //카드id
    const token = useRecoilValue(accessTokenState);

    //checkbox id
    const [method, setMethod] = useState('pay')

    const state = useRecoilValue(payAgreeState)

    useEffect(() => {

        console.log('# PaymentScreen3 pid : ' + projectId);
        console.log('# PaymentScreen3 amount : ' + amount);
        console.log('# PaymentScreen3 date : ' + date);
        console.log('# PaymentScreen3 cardId : ' + cardId);
        console.log('>> Recoil state 값 확인 --state: ' + state);


    }, [state, projectId, amount, date, cardId, orderId])

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handlePayForCard = () => {
        setIsCard(!isCard);
    }
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleNextBtn = () => {

        if(!payAgreeState){ //전체동의 안하면
            window.alert(ALERTEXT.agreeAlert)
        }
        else {
            //todo 정기결제
            if (date !== null && parseInt(date) !== 0) {
                const body = {
                    amount: amount,
                    payDate: date,
                }
                const config = {
                    headers: {
                        "X-AUTH-TOKEN": token,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // 이 부분을 추가
                };
                axios.post(baseUrl + `/order/pay/card/${cardId}/${projectId}`, body, config)
                    .then(function (response) {
                        console.log("결제 post 성공", response);
                        window.location.href = `/auth/payComplete/reg`; //결제완료
                        // todo-이미 returnUrl 존재해서 사이트 이동이 되는거 같은데 하이퍼링크 해야됨???
                        //window.location.href = afterLoginUrl //인증응답코드 post 요청 성공 시 이동 될 url
                    })
                    .catch(function (error) {
                        // 오류발생시 실행
                        console.log("결제 post 실패", error);
                        console.log(body);
                        window.alert(error.message);
                    });
            }
            //todo 단기결제
            else {
                window.location.href = `/auth/pay/once/?orderId=${orderId}&amount=${amount}&title=${title}`;
            }
        }
    }

    const handleAgreeAll = (e: boolean) => {
        setIsAgreeAll(e)
    }
    const handleAgree1 = (e: boolean) => {
        setIsAgree1(e)
    }
    const handleAgree2 = (e: boolean) => {
        setIsAgree2(e)
    }


    return (
        <Fragment>
            <div className={"payment3"}>
                <div className={"match-on"}>{TEXT.payTitle}</div>

                <div className={"three"}>{TEXT.pay3Container1}</div>
                <div className={"border1"}></div>

                <div className={"date-container"}>
                    <text
                        className={"sponsored_amount"}>{date !== null && parseInt(date) == 0 ? `` : TEXT.pay3Container2}</text>
                    <text className={"amount"}>{date !== null && parseInt(date) == 0 ? `` : `매월 ${date}일`}</text>
                </div>

                <div className={"amount-container"}>
                    <text className={"sponsored_amount"}>{TEXT.pay3Container3}</text>
                    <text className={"amount"}>{`${amount}원`}</text>
                </div>

                <div className={"payment_method-container"}>
                    <div className={"payment_method"}>{TEXT.pay3Container4}</div>

                    <div className={"account_payment-container"}>
                        <div className="payment_method_container">
                            <input className={"toggle-circle"} type="radio" id="account_payment" name="radio"
                                   value="option1" onChange={handleRadioChange}/>
                            <label className={"label-agree"} htmlFor="option1">{TEXT.pay3Select1}</label>
                        </div>
                        {selectedOption === "option1" && (
                            <div className="account-cards-container">
                                <CardCarousel/>
                            </div>
                        )}
                        <div className="acceptance-container">
                            <input className={"toggle-circle"} type="radio" id="account_payment" name="radio"
                                   value="option2" onChange={handleRadioChange}/>
                            <label className={"label-agree"} htmlFor="option2">{TEXT.pay3Select2}</label>
                        </div>
                        {selectedOption === "option2" && (
                            <div className="additional-div">
                                <p>(서비스 준비중)</p>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className={"alert"}>
                        <img src={IMAGES.alert} className={"alert-img"}/>
                        <text className={"alert-text"}>{TEXT.pay3Alert}</text>
                    </div>
                    <ul className={"alert_list"}>
                        <li className={"alert1"}>{TEXT.pay3Alert1}</li>
                        <li className={"alert2"}>{TEXT.pay3Alert2}</li>
                    </ul>
                </div>

                <div className={"border2"}></div>

                <div className="toggle-container">
                    <CheckBox props={method}/>
                </div>

                <div className={"sponsered_payment_nextpage"}>
                    <button className={"sponser-next-btn-active"}
                            onClick={() => handleNextBtn()}
                    >다음
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default PaymentScreen3