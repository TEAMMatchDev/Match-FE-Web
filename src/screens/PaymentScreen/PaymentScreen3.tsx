import React, {Fragment, useEffect, useState} from "react";
import { IMAGES } from "../../constants/images";
import './style.css';
import {useLocation} from "react-router-dom";
import {TEXT} from "../../constants/text";
import Carousel from "../../components/Carousel";

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

    useEffect(() => {
        console.log('# PaymentScreen3 pid : ' + projectId);
        console.log('# PaymentScreen3 amount : ' + amount);
        console.log('# PaymentScreen3 date : ' + date);
    },[projectId,amount,date])

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handlePayForCard = () => {
        setIsCard(!isCard);
    }
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };


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
                                <Carousel/>
                                <img src={IMAGES.submitCardBtn}  className="centered-img"/>
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

            </div>
        </Fragment>
    );
}
export default PaymentScreen3