import React, {Fragment, useState} from "react";
import './style.css';
import {IMAGES} from "../../constants/images";
import {TEXT} from "../../constants/text";

const PayRegisterCardScreen = () => {
    const [inputValue, setInputValue] = useState(""); // 초기값은 빈 문자열로 설정

    const [cardNumString, setCardNumString] = useState(""); //1234합침
    const [cardNumString1, setCardNumString1] = useState("");
    const [cardNumString2, setCardNumString2] = useState("");
    const [cardNumString3, setCardNumString3] = useState("");
    const [cardNumString4, setCardNumString4] = useState("");

    const [expDate, setexpDate] = useState(""); //year랑 month랑 합침
    const [expYear, setexpYear] = useState("");
    const [expMonth, setexpMonth] = useState("");
    const [idNO, setidNO] = useState("");
    const [cardPw, setcardPw] = useState("");
    

    const handleManualAmountChange = (event) => {
        setInputValue(event.target.value); // 입력 값이 변경될 때 상태 업데이트
    };

    return (
        <Fragment>
            <div className={"register-title-container"}>
                <div className={"register-title"}>{TEXT.payRegisterTitile}</div>
                <div className={"register-title-info"}>{TEXT.payRegisterInfo}</div>
            </div>

            <div className={"register-body-container"}>
                <div className={"register-body-title"}>{TEXT.payRegisterCardNo}</div>
                <input
                    className={"register-body-input"}
                    placeholder={TEXT.payRegisterCardNoInfo}
                    onChange={handleManualAmountChange}
                    value={cardNumString1} // 상태에 저장된 값으로 설정
                />
                -
                <input
                    className={"register-body-input"}
                    placeholder={TEXT.payRegisterCardNoInfo}
                    onChange={handleManualAmountChange}
                    value={cardNumString2} // 상태에 저장된 값으로 설정
                />
                -
                <input
                    className={"register-body-input"}
                    placeholder={TEXT.payRegisterCardNoInfo}
                    onChange={handleManualAmountChange}
                    value={cardNumString3} // 상태에 저장된 값으로 설정
                />
                -
                <input
                    className={"register-body-input"}
                    placeholder={TEXT.payRegisterCardNoInfo}
                    onChange={handleManualAmountChange}
                    value={cardNumString4} // 상태에 저장된 값으로 설정
                />
            </div>
            <div className={"register-body-container2"}>
                <div>
                    <div className={"register-body-title"}>{TEXT.payRegisterCardDate}</div>
                    <div className={"register-body-input"}>input</div>
                </div>
                <div>
                    <div className={"register-body-title"}>{TEXT.payRegisterCardCVC}</div>
                    <div className={"register-body-input"}>input</div>
                </div>
            </div>
            <div className={"register-body-container2"}>
                <div>
                    <div className={"register-body-title"}>{TEXT.payRegisterBirth}</div>
                    <div className={"register-body-input"}>input</div>
                </div>
                <div>
                    <div className={"register-body-title"}>{TEXT.payRegisterCardPW}</div>
                    <div className={"register-body-input"}>input</div>
                </div>
            </div>
        </Fragment>
    );
}
export default PayRegisterCardScreen