import React, {Fragment, useEffect, useState} from "react";
import { IMAGES } from "../../constants/images";
import './style.css';
import {useLocation} from "react-router-dom";
import {TEXT} from "../../constants/text";

const PaymentScreen3 = () => {
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

    return (
        <Fragment>
            <div className={"payment3"}>
                <div className={"match-on"}>{TEXT.payTitle}</div>

                <div className={"three"}>3. 후원금 납부</div>
                <div className={"border1"}></div>

                <div className={"date-container"}>
                    <text className={"sponsored_amount"}>정기 후원일</text>
                    <text className={"amount"}>{`매월 ${date}일`}</text>
                </div>

                <div className={"amount-container"}>
                    <text className={"sponsored_amount"}>후원 금액</text>
                    <text className={"amount"}>{`${amount}원`}</text>
                </div>

                <div className={"payment_method-container"}>
                    <div className={"payment_method"}>후원 방식</div>

                    <div className="payment_method-radio-container">
                        <div className={"card_payment-container"}>
                            <input type="radio" id="card_payment" name="radio" value="option1" style={{marginRight: "0.31rem"}} />
                            <label htmlFor="option1">신용 / 체크카드 결제</label>

                            <ul style={{ display: isOpen ? "block" : "none" }}>
                                <div className="clause-container">
                                    <div className={"clause1"}>
                                        <input type="checkbox" id="checkbox1" style={{marginRight: "0.25rem"}} />
                                        <label htmlFor="checkbox1">11111</label>
                                        <button className={"clause1-btn"}>보기</button>
                                    </div>

                                    <div className={"clause2"}>
                                        <input type="checkbox" id="checkbox2" style={{marginRight: "0.25rem"}} />
                                        <label htmlFor="checkbox2">22222</label>
                                        <button className={"clause2-btn"}>보기</button>
                                    </div>

                                </div>
                            </ul>
                        </div>

                        <div className={"account_payment-container"}>
                            <input type="radio" id="account_payment" name="radio" value="option2" style={{marginRight: "0.31rem"}} />
                            <label htmlFor="option2">계좌 등록 결제</label>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={"alert"}>
                        <img src={IMAGES.alert} className={"alert-img"}/>
                        <text className={"alert-text"}>안내사항</text>
                    </div>
                    <ul className={"alert_list"}> {/*왜 점이 안보이는거지*/}
                        <li className={"alert1"}>첫 후원금은 즉시 결제되며, 다음달부터는 매월 선택한 결제일에 결제됩니다.</li>
                        <li className={"alert2"}>출금일에 후원금이 승인되지 않은 경우, 재출금을 요청 진행할 수 있습니다.</li>
                    </ul>
                </div>

                <div className={"border2"}></div>

                <div className="toggle-container">
                    <div className={"acceptance-container"}>
                        <input type="radio" id="toggle" style={{marginRight: "0.31rem"}} />
                        <label htmlFor="toggle">결제 내용 확인 및 결제 동의</label>
                        {isOpen ? (
                            <img src={IMAGES.toggleUp} className={"toggle-arrow"} alt="toggle_up" onClick={handleToggle} />
                        ) : (
                            <img src={IMAGES.toggleDown} className={"toggle-arrow"} alt="toggle_down" onClick={handleToggle} />
                        )}
                    </div>

                    <ul style={{ display: isOpen ? "block" : "none" }}>
                        <div className="clause-container">
                            <div className={"clause1"}>
                                <input type="checkbox" id="checkbox1" style={{marginRight: "0.25rem"}} />
                                <label htmlFor="checkbox1">결제대행 서비스 이용약관 동의</label>
                                <button className={"clause1-btn"}>보기</button>
                            </div>

                            <div className={"clause2"}>
                                <input type="checkbox" id="checkbox2" style={{marginRight: "0.25rem"}} />
                                <label htmlFor="checkbox2">개인정보 제3자 정보 제공 동의</label>
                                <button className={"clause2-btn"}>보기</button>
                            </div>

                        </div>
                    </ul>
                </div>

            </div>
        </Fragment>
    )
}
export default PaymentScreen3