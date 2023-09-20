import React, {Fragment, useEffect, useState} from "react";
import './style.css';
import Select from "react-select";
import { useLocation } from 'react-router-dom';
import {TEXT} from "../../constants/text";
import axios from "axios";
import {useRecoilValue} from "recoil";
import {accessTokenState} from "../../state/loginState";

const OneTimePaymentScreen = () => {
    const REACT_APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
    const token = useRecoilValue(accessTokenState);

    //pid
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');

    //title
    const title = searchParams.get('title');

    //선택금액
    const [amount, setAmount] = useState(0);
    const [selectBtn1, setSelectBtn1] = useState<number | null>(null);
    //후원일자
    const [date, setDate] = useState(0);
    const [selectBtn2, setSelectBtn2] = useState<number | null>(null);

    const [orderId, setOrderId] = useState<string>('');


    const handleBtnClick1 = (e: number) => {
        setSelectBtn1(e);
        switch (e) {
            case 1:
                setAmount(1000);
                break;
            case 2:
                setAmount(5000);
                break;
            case 3:
                setAmount(10000);
                break;
            case 4:
                setAmount(20000);
                break;
            case 5:
                setAmount(30000);
                break;
            case 6:
                if (amount > 0) {
                    setAmount(amount);
                } else {
                    setAmount(0);
                }
                break;
            default:
                setAmount(0);
                break;
        }
    }

    const handleBtnClick2 = (e: number) => {
        setSelectBtn2(e);
        switch (e) {
            case 1:
                setDate(1);
                break;
            case 2:
                setDate(15);
                break;
            case 3:
                if (date > 0) {
                    setDate(date);
                } else {
                    setDate(0);
                }
                break;
            default:
                setDate(0);
                break;
        }
    }

    const paymentscreen3Url = REACT_APP_PUBLIC_URL + '/auth/pay';
    const handleNextBtn = () => {
        const data = {
            projectId: projectId,
        };

        axios.post(
            process.env.REACT_APP_BASE_URL+`/order/${projectId}`,
            data,
            {
                headers: {
                    "X-AUTH-TOKEN": token,
                },
            }
        )
            .then(function (res){
                setOrderId(res.data.result)
                console.log('# RegularPaymentScreen --orderId: '+res.data.result)
                window.location.href = `${paymentscreen3Url}?projectId=${projectId}&amount=${amount}&date=${date}&title=${title}&orderId=${res.data.result}`;
            });


    }

    const handleManualAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredAmount = parseInt(e.target.value.replace(/,/g, '')); // Remove commas and convert to number
        if (!isNaN(amount)) {
            setAmount(enteredAmount);
        } else {
            setAmount(0);
            console.log('지금 amount null');
        }
    }
    const handleManualDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredDate = parseInt(e.target.value);
        if (!isNaN(enteredDate) && enteredDate >= 1 && enteredDate <= 31) {
            setDate(enteredDate);
        } else {
            setDate(0);
            console.log('지금 date null');
        }
    }


    useEffect(() => {
        if (amount > 0 && date > 0) {
            console.log('선택된 금액 : ' + amount);
            console.log('선택된 날짜 : ' + date);
        }

        console.log('현재 pid : ' + projectId);

    }, [amount, date, title]);

    return (
        <Fragment>
            <div className={"payment1"}>
                <div className={"match-on"}>{TEXT.payTitle}</div>

                <div className={"pay-title"}>{TEXT.pay2Container1}</div>
                <div className={"border1"}></div>

                <div className={"sponser_field"}>{TEXT.pay2Container2}</div>
                <div className={"sponser_title"}>
                    <text style={{color: "#D15437"}}>{TEXT.pay2Container3}</text><text>{TEXT.pay2Container4}</text>
                    <text style={{color: "#D15437"}}>{`${title}`}</text>
                </div>


                <div className={"sponser_amount"}>후원 금액</div>
                <div className={"sponser_amount-alert"}>특별 단기 후원은 1회만 결제됩니다.</div>

                <div className={"sponser_amount-select"}>
                    <div className={"sponser_amount-select1"}>
                        <button className={"sponser-btn"}
                                onClick={() => handleBtnClick1(1)}
                                style={{
                                    backgroundColor: selectBtn1 === 1 ? "#D14753" : "white",
                                    color: selectBtn1 === 1 ? "#F7F7F7" : "#D14753"
                                }}
                        >1,000
                        </button>
                        <button className={"sponser-btn"}
                                onClick={() => handleBtnClick1(2)}
                                style={{
                                    backgroundColor: selectBtn1 === 2 ? "#D14753" : "white",
                                    color: selectBtn1 === 2 ? "#F7F7F7" : "#D14753"
                                }}
                        >5,000
                        </button>
                        <button className={"sponser-btn"}
                                onClick={() => handleBtnClick1(3)}
                                style={{
                                    backgroundColor: selectBtn1 === 3 ? "#D14753" : "white",
                                    color: selectBtn1 === 3 ? "#F7F7F7" : "#D14753",
                                    marginRight: 0
                                }}
                        >10,000
                        </button>
                    </div>
                    <div className={"sponser_amount-select2"}>
                        <button className={"sponser-btn"}
                                onClick={() => handleBtnClick1(4)}
                                style={{
                                    backgroundColor: selectBtn1 === 4 ? "#D14753" : "white",
                                    color: selectBtn1 === 4 ? "#F7F7F7" : "#D14753"
                                }}
                        >20,000
                        </button>
                        <button className={"sponser-btn"}
                                onClick={() => handleBtnClick1(5)}
                                style={{
                                    backgroundColor: selectBtn1 === 5 ? "#D14753" : "white",
                                    color: selectBtn1 === 5 ? "#F7F7F7" : "#D14753"
                                }}
                        >30,000
                        </button>
                        <input
                            className={"sponser-input"}
                            placeholder={"금액 직접 입력"}
                            onChange={handleManualAmountChange}
                            onClick={() => handleBtnClick1(6)}
                            value={amount > 0 ? amount.toLocaleString() : ''}
                            style={{
                                backgroundColor: selectBtn1 === 6 ? "#D14753" : "white",
                                color: selectBtn1 === 6 ? "#F7F7F7" : "#D14753",
                            }}
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
    )
};
export default OneTimePaymentScreen