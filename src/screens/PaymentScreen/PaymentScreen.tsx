import React, {Fragment, useState} from "react";
import './style.css';
import {IMAGES} from "../../constants/images";

const PaymentScreen = () => {
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
    });

    const handlePaymentMethodCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [name]: checked,
        }));
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleAcceptanceCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Fragment>
            <div className={"payment3"}>
                <div className={"match-on"}>매치를 켜기</div>

                <div className={"three"}>3. 후원금 납부</div>
                <div className={"border1"}></div>

                <div className={"amount-container"}>
                    <text className={"sponsored_amount"}>후원 금액</text>
                    <text className={"amount"}>매월 N,000 원</text>
                </div>

                <div className={"payment_method-container"}>
                    <div className={"payment_method"}>후원 방식</div>

                    <div className="payment_method-radio-container">
                        <div className={"card_payment-container"}>
                            <input type="radio" id="card_payment" name="radio" value="option1" style={{marginRight: "0.31rem"}} />
                            <label htmlFor="option1">신용 / 체크카드 결제</label>
                        </div>

                        <div className={"account_payment-container"}>
                            <input type="radio" id="account_payment" name="radio" value="option2" style={{marginRight: "0.31rem"}} />
                            <label htmlFor="option2">계좌 등록 결제</label>
                        </div>
                    </div>
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
export default PaymentScreen