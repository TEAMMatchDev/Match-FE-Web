import React, {Fragment, useEffect, useState} from "react";
import { IMAGES } from "../../constants/images";
import './style.css';
import {useLocation} from "react-router-dom";
import {TEXT} from "../../constants/text";
import Carousel from "../../components/Carousel";
import Slider from "react-slick";
import axios from "axios";
import {useRecoilValue} from "recoil";
import {accessTokenState} from "../../state/loginState";

const baseUrl = 'https://www.match-api-server.com';

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
    const [pdata, setPData] = useState<any>([]);
    const token = useRecoilValue(accessTokenState);

    useEffect(() => {
        console.log('# PaymentScreen3 pid : ' + projectId);
        console.log('# PaymentScreen3 amount : ' + amount);
        console.log('# PaymentScreen3 date : ' + date);

        console.log('# Carousel token: '+token);

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                }
            };

            axios.get(baseUrl + `/order/pay/card`, config)
                .then((response) => {
                    setItems(response.data.result);
                    setPData(response.data.result);

                    console.log('# Carousel -- axios get 카드 조회 요청 성공');
                    console.log('card data : '+items);
                    console.log('pdata : '+pdata.contents);
                    console.log('pdata:', JSON.stringify(pdata, null, 2));
                    // console.log('pdataaaaa : '+pdata.contents);
                    // console.log('pdata:', JSON.stringify(pdata, null, 2));
                })
                .catch((error) => {
                    console.error('# Carousel Error fetching data:', error);
                });
        } catch (e) {
            console.error(e);
        }

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

    // todo Carousel 옵션
    const settings = {
        dots: true,
        infinite: true,
        speed: 500
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
                                {/*<Carousel/>*/}
                                <div className="carousel">
                                    <Slider { ...settings }>
                                        <div className={"list-container"}>
                                            <ul>
                                                {items.map((item) => (
                                                    <ListItem
                                                        key={item.id}
                                                        customKey={item.id}
                                                        code={item.cardCode}
                                                        name={item.cardName}
                                                        num={item.cardNumber}
                                                    />
                                                ))}
                                            </ul>
                                        </div>
                                        <img src={IMAGES.submitCardBtn}  className="centered-img"/>

                                    </Slider>
                                </div>
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
interface ListItemProps {
    customKey: number;
    code: string;
    name: string;
    num: string;
}
const ListItem: React.FC<ListItemProps> = ({ customKey, code, name, num }) => {

    return (
        <div className="list-item">
            <div className="item-info">
                <text className="item-name">{name}</text>
                <text className="item-num">{num}</text>
            </div>
        </div>
    );
}
export default PaymentScreen3