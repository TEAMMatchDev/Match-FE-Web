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

    return (
        <Fragment>
            <div className={"text-container"}>
                <text className={"sponsored_amount"}>후원 금액</text>
                <text className={"amount"}>1,000 원</text>
            </div>

            <div className={"payment_method-container"}>
                <div className={"payment_method"}>결제 방식</div>

                <div className={"chkBox"}>
                    <label className={"chkBox-label"}>
                        <input type="checkbox" name="checkbox1" checked={checkboxes.checkbox1} onChange={handlePaymentMethodCheckboxChange} />
                        &nbsp;&nbsp;&nbsp;<img src={IMAGES.kakaoPayment} style={{width: "2.4000rem", height: "1rem"}}/>
                    </label>
                    <label className={"chkBox-label"} style={{marginTop: "1rem", marginBottom: "1rem"}}>
                        <input type="checkbox" name="checkbox2" checked={checkboxes.checkbox2} onChange={handlePaymentMethodCheckboxChange} />
                        &nbsp;&nbsp;&nbsp;계좌 간편결제
                    </label>
                    <label className={"chkBox-label"}>
                        <input type="checkbox" name="checkbox3" checked={checkboxes.checkbox3} onChange={handlePaymentMethodCheckboxChange} />
                        &nbsp;&nbsp;&nbsp;일반 결제
                    </label>
                </div>
            </div>

            <div className={"acceptance-container"}>
                <div className={"acceptance-label"}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleAcceptanceCheckboxChange}
                        />
                        &nbsp;&nbsp;&nbsp;결제 내용 확인 및 결제 동의
                    </label>
                </div>
                <div className={"clause1"}>
                    <text className={"clause1-text"}>결제대행 서비스 이용약관 동의</text>
                    <button className={"clause1-btn"}>보기</button>
                </div>
                <div className={"clause2"}>
                    <text className={"clause2-text"}>개인정보 제3자 정보 제공 동의</text>
                    <button className={"clause2-btn"}>보기</button>
                </div>
            </div>
            
            <div className={"payment"}>결제 하기</div>
        </Fragment>
    )
}
export default PaymentScreen