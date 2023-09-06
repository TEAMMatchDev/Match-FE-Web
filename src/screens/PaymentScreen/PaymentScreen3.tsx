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

const baseUrl = 'https://prod.match-api-server.com';

const PaymentScreen3 = () => {

    //구매 방법 radio 버튼
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    //안내사항
    const [isOpen, setIsOpen] = useState(false);
    const [isCard, setIsCard] = useState(false);

    //pid와 amount, date (결제금액, 결제일)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');
    const amount = searchParams.get('amount');
    const date = searchParams.get('date');

    //oder/pay/card todo 정규-카드 조회
    const [items, setItems] = useState<any[]>([]); //카드 목록
    const [cardId] = useRecoilState(cardIdState); //카드id
    const token = useRecoilValue(accessTokenState);

    useEffect(() => {
        console.log('# PaymentScreen3 pid : ' + projectId);
        console.log('# PaymentScreen3 amount : ' + amount);
        console.log('# PaymentScreen3 date : ' + date);
        console.log('# PaymentScreen3 cardId : ' + cardId);
    },[projectId,amount,date,cardId])

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
        const body= {
            amount: amount,
            payDate: date,
        }
        const config = {
            headers: {
                //todo token으로 바꾸기
                "X-AUTH-TOKEN": token,
                "Header": token,
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": token,
                "Access-Control-Allow-Origin": `https://match-dev-official.vercel.app`,
                "Access-Control-Allow-Credentials": true,
            },
            withCredentials: true, // 이 부분을 추가
        };
        axios.post(baseUrl+`/order/pay/card/${cardId}/${projectId}`, body, config)
            .then(function (response) {
                console.log("결제 post 성공", response);
                window.location.href = `/auth/payComplete`; //결제완료
                // todo-이미 returnUrl 존재해서 사이트 이동이 되는거 같은데 하이퍼링크 해야됨???
                //window.location.href = afterLoginUrl //인증응답코드 post 요청 성공 시 이동 될 url
            })
            .catch(function (error) {
                // 오류발생시 실행
                console.log("결제 post 실패", error);
                console.log(body);
            });
    }


    return (
        <Fragment>
            <div className={"payment3"}>
                <div className={"match-on"}>{TEXT.payTitle}</div>

                <div className={"three"}>{TEXT.pay3Container1}</div>
                <div className={"border1"}></div>

                <div className={"date-container"}>
                    <text className={"sponsored_amount"}>{TEXT.pay3Container2}</text>
                    <text className={"amount"}>{`매월 ${date}일`}</text>
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
                                <CardCarousel />
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
                    <div className={"acceptance-container"}>
                        <input className={"toggle-circle"} type="radio" id="toggle"/>
                        <label className={"label-agree"} htmlFor="toggle">{TEXT.pay3Agree}</label>
                        {isOpen ? (
                            <img src={IMAGES.toggleUp} className={"toggle-arrow"} alt="toggle_up"
                                 onClick={handleToggle}/>
                        ) : (
                            <img src={IMAGES.toggleDown} className={"toggle-arrow"} alt="toggle_down"
                                 onClick={handleToggle}/>
                        )}
                    </div>

                    <ul style={{display: isOpen ? "block" : "none"}}>
                        <div className="clause-container">
                            <div className={"clause1"}>
                                <input type="checkbox" id="checkbox1" style={{marginRight: "0.25rem"}}/>
                                <label htmlFor="checkbox1">{TEXT.pay3AgreeCK1}</label>
                                <button className={"clause-btn"}>{TEXT.pay3AgreeLook}</button>
                            </div>

                            <div className={"clause2"}>
                                <input type="checkbox" id="checkbox2" style={{marginRight: "0.25rem"}}/>
                                <label htmlFor="checkbox2">{TEXT.pay3AgreeCK2}</label>
                                <button className={"clause-btn"}>{TEXT.pay3AgreeLook}</button>
                            </div>

                        </div>
                    </ul>
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
}

export default PaymentScreen3