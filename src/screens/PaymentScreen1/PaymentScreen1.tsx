import React, {Fragment, useState} from "react";
import './style.css';
import Select from 'react-select';

const options = [
    { value: '후원 분야1', label: '후원 분야1' },
    { value: '후원 분야2', label: '후원 분야2' },
    { value: '후원 분야3', label: '후원 분야3' },
];

const PaymentScreen1 = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (selected) => {
        setSelectedOption(selected);
    };

    const [amount, setAmount] = useState('');
    const [selectBtn1, setSelectBtn1] = useState<number | null>(null);
    const handleBtnClick1 = (e: number) => {
        setSelectBtn1(e);
        switch (e){
            case 1: setAmount('1,000'); break;
            case 2: setAmount('5,000'); break;
            case 3: setAmount('10,000'); break;
            case 4: setAmount('20,000'); break;
            case 5: setAmount('30,000'); break;
            case 6: setAmount('금액 직접 입력'); break;
            default: setAmount('알 수 없음'); break;
        }
    }

    const [date, setDate] = useState('');
    const [selectBtn2, setSelectBtn2] = useState<number | null>(null);
    const handleBtnClick2 = (e: number) => {
        setSelectBtn2(e);
        switch (e){
            case 1: setDate('1일'); break;
            case 2: setDate('15일'); break;
            case 3: setDate('결제일 직접 입력'); break;
            default: setDate('알 수 없음'); break;
        }
    }

    return (
        <Fragment>
            <div className={"payment1"}>
                <div className={"match-on"}>매치를 켜기</div>

                <div className={"one"}>1. 후원 방법</div>
                <div className={"border1"}></div>
                
                <div className={"sponser_field"}>후원 분야</div>

                <Select
                    className={"select-sponser_field"}
                    classNamePrefix="custom-option"
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    placeholder="후원 분야를 선택하세요"/>

                <div className={"sponser_amount"}>후원 금액</div>
                <div className={"sponser_amount-alert"}>후원은 정기후원으로 진행됩니다. 매달 같은 금액이 후원돼요!</div>

                <div className={"sponser_amount-select"}>
                    <div className={"sponser_amount-select1"}>
                        <button className={"sponser-btn"}
                                onClick={() => handleBtnClick1(1)}
                                style={{
                                    backgroundColor: selectBtn1 === 1 ? "#D14753" : "white",
                                    color: selectBtn1 === 1 ? "#F7F7F7" : "#D14753"}}
                        >1,000</button>
                        <button className={"sponser-btn"}
                                onClick={() => handleBtnClick1(2)}
                                style={{
                                    backgroundColor: selectBtn1 === 2 ? "#D14753" : "white",
                                    color: selectBtn1 === 2 ? "#F7F7F7" : "#D14753"}}
                        >5,000</button>
                        <button className={"sponser-btn"}
                                onClick={() => handleBtnClick1(3)}
                                style={{
                                    backgroundColor: selectBtn1 === 3 ? "#D14753" : "white",
                                    color: selectBtn1 === 3 ? "#F7F7F7" : "#D14753",
                                    marginRight: 0}}
                        >10,000</button>
                    </div>
                    <div className={"sponser_amount-select2"}>
                        <button className={"sponser-btn"}
                                onClick={() => handleBtnClick1(4)}
                                style={{
                                    backgroundColor: selectBtn1 === 4 ? "#D14753" : "white",
                                    color: selectBtn1 === 4 ? "#F7F7F7" : "#D14753"}}
                        >20,000</button>
                        <button className={"sponser-btn"}
                                onClick={() => handleBtnClick1(5)}
                                style={{
                                    backgroundColor: selectBtn1 === 5 ? "#D14753" : "white",
                                    color: selectBtn1 === 5 ? "#F7F7F7" : "#D14753"}}
                        >30,000</button>
                        <input className={"sponser-input"} placeholder={"금액 직접 입력"}/>
                        {/*<button className={"sponser-btn"}
                                onClick={() => handleBtnClick1(6)}
                                style={{
                                    backgroundColor: selectBtn1 === 6 ? "#D14753" : "#F7F7F7",
                                    color: selectBtn1 === 6 ? "#F7F7F7" : "#D14753",
                                    marginRight: 0}}
                        >금액 직접 입력</button>*/}
                    </div>
                </div>

                <div className={"sponsered_payment_date"}>후원 결제일</div>
                <div className={"sponsered_payment_date_select"}>
                    <button className={"sponser-btn"}
                            onClick={() => handleBtnClick2(1)}
                            style={{
                                backgroundColor: selectBtn2 === 1 ? "#D14753" : "white",
                                color: selectBtn2 === 1 ? "#F7F7F7" : "#D14753"}}
                    >1일</button>
                    <button className={"sponser-btn"}
                            onClick={() => handleBtnClick2(2)}
                            style={{
                                backgroundColor: selectBtn2 === 2 ? "#D14753" : "white",
                                color: selectBtn2 === 2 ? "#F7F7F7" : "#D14753"}}
                    >15일</button>
                    <input className={"sponser-input"} placeholder={"결제일 직접 입력"}/>
                    {/*<input className={"sponser_payment_date-btn"}
                            onClick={() => handleBtnClick2(3)}
                            style={{
                                backgroundColor: selectBtn2 === 3 ? "#D14753" : "#F7F7F7",
                                color: selectBtn2 === 3 ? "#F7F7F7" : "#D14753",
                                marginRight: 0}}
                    >결제일 직접 입력</input>*/}
                </div>
            </div>
        </Fragment>
    )
}
export default PaymentScreen1