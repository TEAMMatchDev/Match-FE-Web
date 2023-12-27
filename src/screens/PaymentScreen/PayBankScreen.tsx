import React, {Fragment, useState} from "react";
import './style.css';
import {IMAGES} from "../../constants/images";
import {TEXT} from "../../constants/text";

const PayBankScreen = () => {


    const items = [ //카드 item
        {
            bankId: 1,
            icon: IMAGES.card1Btn,
            name: TEXT.cardName1,
        },
        {
            bankId: 2,
            icon: IMAGES.card2Btn,
            name: TEXT.cardName2,
        },
        {
            bankId: 4,
            icon: IMAGES.card4Btn,
            name: TEXT.cardName4,
        },
        {
            bankId: 6,
            icon: IMAGES.card6Btn,
            name: TEXT.cardName6,
        },
        {
            bankId: 7,
            icon: IMAGES.card7Btn,
            name: TEXT.cardName7,
        },
        {
            bankId: 8,
            icon: IMAGES.card8Btn,
            name: TEXT.cardName8,
        },
        {
            bankId: 11,
            icon: IMAGES.card11Btn,
            name: TEXT.cardName11,
        },
        {
            bankId: 12,
            icon: IMAGES.card12Btn,
            name: TEXT.cardName12,
        },
        // {
        //     bankId: 0,
        //     icon: IMAGES.cardEtcBtn,
        //     name: TEXT.cardNameEtc,
        // },
        {
            bankId: 13,
            icon: IMAGES.card13Btn,
            name: TEXT.cardName13,
        },
        {
            bankId: 14,
            icon: IMAGES.card14Btn,
            name: TEXT.cardName14,
        },
        {
            bankId: 15,
            icon: IMAGES.card15Btn,
            name: TEXT.cardName15,
        },
        {
            bankId: 32,
            icon: IMAGES.card32Btn,
            name: TEXT.cardName32,
        },
        {
            bankId: 37,
            icon: IMAGES.card37Btn,
            name: TEXT.cardName37,
        },
        {
            bankId: 38,
            icon: IMAGES.card38Btn,
            name: TEXT.cardName38,
        },
    ]

    const handleSubmitCard = () => {
        const url = process.env.REACT_APP_PUBLIC_URL+`/auth/register`;
        window.location.href = url
    };


    // 테이블을 3열로 나누기
    const numberOfRows = Math.ceil(items.length / 3);

    return (
        <Fragment>
            <div className={"bank-container"}>
                <text className={"submit-title"}>은행을 선택해 주세요.</text>
                <table border={0} className={"card-table"}>
                    <tbody className={"card-name"}>
                    {Array.from({ length: numberOfRows }, (_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: 3 }, (_, colIndex) => {
                                const itemIndex = rowIndex * 3 + colIndex;
                                // 만약 배열 내에 더 이상 아이템이 없다면 빈 셀 생성
                                if (itemIndex >= items.length) {
                                    return <td key={colIndex}></td>;
                                }
                                const item = items[itemIndex];
                                return (
                                    <td key={colIndex}>
                                        <img src={item.icon} alt={item.name} onClick={handleSubmitCard} />
                                        {/*<p>{item.name}</p>*/}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}
export default PayBankScreen