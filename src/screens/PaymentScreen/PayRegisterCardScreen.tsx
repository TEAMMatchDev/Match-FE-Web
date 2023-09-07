import React, {Fragment, useEffect, useState} from "react";
import './style.css';
import {IMAGES} from "../../constants/images";
import {TEXT} from "../../constants/text";
import axios from "axios";
import {useRecoilState, useRecoilValue} from "recoil";
import {accessTokenState} from "../../state/loginState";
const baseUrl = 'https://www.match-api-server.com';



const PayRegisterCardScreen = () => {
    const token = useRecoilValue(accessTokenState);

    //사업자 or 개인 방법 radio 버튼
    const [selectedOption, setSelectedOption] = useState("option1");

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
    const [cvc, setCVC] = useState("");

    //숫자인지 검사
    const numberRegex = /^[0-9]+$/;

    const handleManualCardNum1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredNum = e.target.value;
        if(enteredNum.length < 5){
            if(checkNumber(enteredNum)) {
                setCardNumString1(enteredNum);
                console.log('# PayRegisterCardScreen --CNum1String : '+enteredNum)
            }
        }
    }
    const handleManualCardNum2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredNum = e.target.value;
        if(enteredNum.length < 5){
            if(checkNumber(enteredNum)) {
                setCardNumString2(enteredNum);
                console.log('# PayRegisterCardScreen --CNum2String : '+enteredNum)
            }
        }
    }
    const handleManualCardNum3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredNum = e.target.value;
        if(enteredNum.length < 5){
            if(checkNumber(enteredNum)) {
                setCardNumString3(enteredNum);
                console.log('# PayRegisterCardScreen --CNum3String : '+enteredNum)
            }
        }
    }
    const handleManualCardNum4Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredNum = e.target.value;
        if(enteredNum.length < 5){
            if(checkNumber(enteredNum)) {
                setCardNumString4(enteredNum);
                console.log('# PayRegisterCardScreen --CNum4String : '+enteredNum)
            }
        }
    }

    const handleManualCardExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredDate = e.target.value;
        if(enteredDate.length < 5){
            if(checkNumber(enteredDate)) {
                setexpDate(enteredDate);
                console.log('# PayRegisterCardScreen --expDateeeee : '+enteredDate)
            }
            if (enteredDate.length === 4) {
                if (parseInt(enteredDate) < 1300) { //12월까지만
                    let month = enteredDate.slice(0, 2);
                    let year = enteredDate.slice(2, 4);
                    if(checkNumber(enteredDate)) {
                        setexpMonth(month);
                        setexpYear(year);
                        console.log('# PayRegisterCardScreen handle --expMonth :' + expMonth);
                        console.log('# PayRegisterCardScreen handle --expYear :' + expYear);
                    }
                }
            }
        }
    }
    const handleManualCardCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredCVC = e.target.value;
        if(enteredCVC.length < 4){
            if(checkNumber(enteredCVC)) {
                setCVC(enteredCVC);
                console.log('# PayRegisterCardScreen --cvc : '+enteredCVC)
            }
        }
    }
    const handleManualIdNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredIdNo = e.target.value;
        if(selectedOption=='option1' && enteredIdNo.length < 7){
            if(checkNumber(enteredIdNo)) {
                setidNO(enteredIdNo);
                console.log('# PayRegisterCardScreen --idNo 개인 : '+enteredIdNo)
            }
        }
        else if (selectedOption=='option2' && enteredIdNo.length < 11){
            if(checkNumber(enteredIdNo)) {
                setidNO(enteredIdNo);
                console.log('# PayRegisterCardScreen --idNo 사업자 : '+enteredIdNo)
            }
        }
    }
    const handleManualCardPWChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredPW = e.target.value;
        if(enteredPW.length < 3){
            if(checkNumber(enteredPW)) {
                setcardPw(enteredPW);
                console.log('# PayRegisterCardScreen --pw : '+enteredPW)
            }
        }
    }

    const handleNextBtn = () => {
        if(cardNumString1.length,cardNumString2.length,cardNumString3.length,cardNumString4.length == 4
            && expDate.length == 4){
            if(parseInt(expDate) < 1300) { //12월까지만
                console.log('# PayRegisterCardScreen 다음버튼 --cardNumString:'+cardNumString);
                console.log('# PayRegisterCardScreen 다음버튼 --expMonth :'+expMonth);
                console.log('# PayRegisterCardScreen 다음버튼 --expYear :'+expYear);

                //todo axios and 화면  종료
                const body= {
                    cardNo: cardNumString,
                    expYear: expYear,
                    expMonth: expMonth,
                    idNo: idNO,
                    cardPw: cardPw,
                }
                const config = {
                    headers: {
                        "X-AUTH-TOKEN": token,
                        "Header": token,
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Headers": token,
                        "Access-Control-Allow-Origin": `https://match-dev-official.vercel.app`,
                        "Access-Control-Allow-Credentials": true,
                    },
                    withCredentials: true, // 이 부분을 추가
                };
                axios.post(baseUrl+`/order/pay/card`, body, config)
                    .then(function (response) {
                        console.log("카드등록 post 성공", response);
                        //todo 현재 창 닫고 auth/pay로 되돌아가기
                        window.close();

                    })
                    .catch(function (error) {
                        // 오류발생시 실행
                        console.log("카드등록 post 실패", error);
                        console.log(body);
                    });
            }
            else {
                alert('유효기간을 올바르게 입력해주세요.');
            }
        }
        else if (expDate.length < 4) {
            alert('유효기간을 올바르게 입력해주세요.');
        }
        else if (cardNumString1.length,cardNumString2.length,cardNumString3.length,cardNumString4.length < 4) {
            alert('카드 번호를 올바르게 입력해주세요.');
        }
        else if (cvc.length < 3) {
            alert('CVC를 올바르게 입력해주세요.');
        }
        else if (cardPw.length < 3) {
            alert('카드 비밀번호를 올바르게 입력해주세요.');
        }
        else {
            alert('생년월일 6자리(사업자 : 10자리)를 올바르게 입력해주세요.');
        }
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const checkNumber = (str: string) => {
        if (numberRegex.test(str)) {
            return true;
        } else {
            alert('숫자로 입력해주세요. ');
        }
    }

    useEffect(() => {
        if(cardNumString1.length,cardNumString2.length,cardNumString3.length,cardNumString4.length == 4 && expDate.length == 4){
            let cardNum = cardNumString1 + cardNumString2 + cardNumString3 + cardNumString4;
            setCardNumString(cardNum);

            console.log('# PayRegisterCardScreen --cardNumString :'+cardNumString);
        }


    }, [cardNumString, cardNumString1, cardNumString2, cardNumString3, cardNumString4, expMonth, expYear, expDate, idNO, cardPw, cvc]);

    return (
        <Fragment>
            <div className={"register"}>
                <div className={"register-title-container"}>
                    <div className={"register-title"}>{TEXT.payRegisterTitile}</div>
                    <div className={"register-title-info"}>{TEXT.payRegisterInfo}</div>
                </div>

                <div className={"register-body-container"}>
                    <div className={"register-body-title1"}>{TEXT.payRegisterCardNo}</div>
                    <input
                        className={`register-body-input1 ${cardNumString1 !== '' ? "register-title" : ''}`}
                        placeholder={TEXT.payRegisterCardNoInfo}
                        onChange={handleManualCardNum1Change}
                        style={{ color: cardNumString1 !== '' ? 'black' : 'initial', }}
                        value={cardNumString1 !== '' ? cardNumString1.toLocaleString() : ''}
                    />
                    -
                    <input
                        className={`register-body-input1 ${cardNumString2 !== '' ? "register-title" : ''}`}
                        placeholder={TEXT.payRegisterCardNoInfo}
                        onChange={handleManualCardNum2Change}
                        style={{ color: cardNumString2 !== '' ? 'black' : 'initial', }}
                        value={cardNumString2 != '' ? cardNumString2.toLocaleString() : ''}
                    />
                    -
                    <input
                        className={`register-body-input1 ${cardNumString3 !== '' ? "register-title" : ''}`}
                        placeholder={TEXT.payRegisterCardNoInfo}
                        onChange={handleManualCardNum3Change}
                        style={{ color: cardNumString3 !== '' ? 'black' : 'initial', }}
                        value={cardNumString3 != '' ? cardNumString3.toLocaleString() : ''}
                    />
                    -
                    <input
                        className={`register-body-input1 ${cardNumString4 !== '' ? "register-title" : ''}`}
                        placeholder={TEXT.payRegisterCardNoInfo}
                        onChange={handleManualCardNum4Change}
                        style={{ color: cardNumString4 !== '' ? 'black' : 'initial', }}
                        value={cardNumString4 != '' ? cardNumString4.toLocaleString() : ''}
                    />
                </div>
                <div className={"register-body-container2"}>
                    <div>
                        <div className={"register-body-title1"}>{TEXT.payRegisterCardDate}</div>
                        <input
                            className={`register-body-input4 ${expDate !== '' ? "register-title" : ''}`}
                            placeholder={TEXT.payRegisterCardDateInfo}
                            onChange={handleManualCardExpDateChange}
                            style={{ color: expDate !== '' ? 'black' : 'initial', }}
                            value={expDate !== null ? expDate : ""}
                        />
                    </div>
                    <div className={"rightdiv"}>
                        <div className={"register-body-title2"}>{TEXT.payRegisterCardCVC}</div>
                        <input
                            className={`register-body-input3 ${cvc !== '' ? "register-title" : ''}`}
                            placeholder={TEXT.payRegisterCardCVCInfo}
                            onChange={handleManualCardCVCChange}
                            style={{ color: cvc !== '' ? 'black' : 'initial', }}
                            value={cvc.length < 4 ? cvc : ""}
                        />
                    </div>
                </div>
                <div className={"register-body-container2"}>
                    <div>
                        <div className={"register-body-title1"}>{TEXT.payRegisterBirth}</div>
                        <div className={"register-radio-container"}>
                            <div className={"register-radio-btn-container"}>
                                <input
                                    type="radio"
                                    value="option1"
                                    checked={selectedOption === "option1"}
                                    onChange={() => setSelectedOption("option1")}
                                />
                                <label className={"register-body-title3"}
                                       htmlFor="option1">{TEXT.payRegisterPerson}</label>
                            </div>
                            <div className={"register-radio-btn-container"}>
                                <input
                                    type="radio"
                                    value="option2"
                                    checked={selectedOption === "option2"}
                                    onChange={() => setSelectedOption("option2")}
                                />
                                <label className={"register-body-title3"}
                                       htmlFor="option1">{TEXT.payRegusterOffice}</label>
                            </div>
                        </div>
                        {selectedOption === "option1" && (
                            <input
                                className={`register-body-input4 ${idNO !== '' ? "register-title" : ''}`}
                                placeholder={TEXT.payRegisterBirthInfo1}
                                style={{ color: idNO !== '' ? 'black' : 'initial', }}
                                value={idNO.length < 7 ? idNO :""} // 상태에 저장된 값으로 설정
                                onChange={handleManualIdNoChange}
                            />
                        )}
                        {selectedOption === "option2" && (
                            <input
                                className={`register-body-input4 ${idNO !== '' ? "register-title" : ''}`}
                                placeholder={TEXT.payRegisterBirthInfo2}
                                style={{ color: idNO !== '' ? 'black' : 'initial', }}
                                value={idNO.length < 11 ? idNO : ""} // 상태에 저장된 값으로 설정
                                onChange={handleManualIdNoChange}
                            />
                        )}
                    </div>
                    <div className={"rightdiv"}>
                        <div className={"register-body-title2"}>{TEXT.payRegisterCardPW}</div>
                        <input
                            className={`register-body-input3 ${cardPw !== '' ? "register-title" : ''}`}
                            placeholder={TEXT.payRegisterCardPWInfo}
                            style={{ color: cardPw !== '' ? 'black' : 'initial', }}
                            onChange={handleManualCardPWChange}
                            value={cardPw} // 상태에 저장된 값으로 설정
                        />
                    </div>
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
export default PayRegisterCardScreen