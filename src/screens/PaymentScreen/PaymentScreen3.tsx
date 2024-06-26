import React, {Fragment, useEffect, useState} from "react";
import { IMAGES } from "../../constants/images";
import './style.css';
import {useLocation} from "react-router-dom";
import {TEXT} from "../../constants/text";
import CardCarousel from "../../components/CardCarousel";
import Slider from "react-slick";
import axios from "axios";
import {useRecoilState, useRecoilValue} from "recoil";
import {accessTokenState} from "../../state/loginState";
import {cardIdState, payAbleState} from "../../state/cardState";
import * as process from "process";
import CheckBox from "../../components/CheckBox";
import {payAgreeState, signAgreeState} from "../../state/agreeState";
import {ALERTEXT} from "../../constants/alertText";
import shadows from "@mui/material/styles/shadows";
import {orderIdState} from "../../state/paymentState";
import {axiosPrivateInstance} from "../../services/AxiosApiService";
import {userNameState} from "../../state/userState";

const baseUrl = process.env.REACT_APP_BASE_URL
const clientId = "S2_5afd76e6601241268007c7aa561ec61a";
const returnUrl = `${process.env.REACT_APP_BASE_URL}/order/severAuth`;

const method = "card";

const PaymentScreen3 = () => {
    const [token, setToken] = useRecoilState(accessTokenState);

    //구매 방법 radio 버튼
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    //안내사항
    const [isOpen, setIsOpen] = useState(false);
    const [isCard, setIsCard] = useState(false);

    //결제 동의
    const [isAgreeAll, setIsAgreeAll] = useState(true);
    const [isAgree1, setIsAgree1] = useState(true);
    const [isAgree2, setIsAgree2] = useState(true);
    const agreeState = useRecoilValue(payAgreeState)
    //checkbox id
    const [method, setMethod] = useState('pay')
    //카드 사용가능
    const payAble = useRecoilValue(payAbleState);

    //pid와 amount, date (결제금액, 결제일)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');
    const amount = searchParams.get('amount');
    const date = searchParams.get('date') || '';
    const title = searchParams.get('title');
    const usages = searchParams.get('donateUsages') || '';
    const orderId = searchParams.get('orderId');
    const inApp = searchParams.get('inApp') || '';
    const status = searchParams.get('doanteStatus') || '';
    const [userName, setUserName] = useRecoilState(userNameState);

    const queryString = `?amount=${amount}`;
    const [hrefUrl, setHrefUrl] = useState('');
    const payDoneUrlAppDepplink = `${process.env.REACT_APP_DEEPLINK_BASE_URL}/donate?donatorName=${userName}&donateTitle=${title}&donateUsages=${usages}&donateAmount=${amount}&donateStatus=${status}`;
    const payDoneUrlWeb = `/auth/payComplete/reg`+queryString;

    //oder/pay/card todo 정규-카드 조회
    const [items, setItems] = useState<any[]>([]); //카드 목록
    const [cardId] = useRecoilState(cardIdState); //카드id


    useEffect(() => {


        if (parseFloat(date) != 0){
            //setStatus('REGULAR'); //정기
            handleHrefUrl(inApp);
        } else {
            //setStatus('ONE_TIME'); //단기
            handleHrefUrl(inApp);
        }

        console.log('# PaymentScreen3 pid : ' + projectId);
        console.log('# PaymentScreen3 amount : ' + amount);
        console.log('# PaymentScreen3 date : ' + date);
        console.log('# PaymentScreen3 usages : ' + usages);
        console.log('# PaymentScreen3 cardId : ' + cardId);
        console.log('>> Recoil state 값 확인 --state: ' + agreeState);
        console.log('>> orderId 값 확인: ' + orderId);
        console.log(`# PaymentScreen3 accessToken: ${token}`);
        console.log(`# PaymentScreen3 --생성된 딥링크: ${payDoneUrlAppDepplink}`);


        requestUserInfoWithOrderId();
    }, [agreeState, projectId, amount, date, cardId, orderId])

    const handleHrefUrl = (inApp: string) => {
        setHrefUrl(payDoneUrlAppDepplink); //TODO) 앱의 결제완료 딥링크
        console.log(`>> 인앱 결제 완료 딥링크: ${payDoneUrlAppDepplink}`);

        //TODO) 인앱결제만 진행하기 때문에 우선 if-else문 제거
        /*if (inApp == 'true') {
            setHrefUrl(payDoneUrlAppDepplink); //TODO) 앱의 결제완료 딥링크
            console.log(`>> 인앱 결제 완료 딥링크: ${payDoneUrlAppDepplink}`);
        } else {
            setHrefUrl(payDoneUrlWeb);
            console.log(`>> 웹의 결제 완료 링크: ${payDoneUrlWeb}`);
        }*/
    }

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handlePayForCard = () => {
        setIsCard(!isCard);
    }
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };
    const agreementHandler = () => {
        window.alert(ALERTEXT.agreeAlert)
    }

    const requestUserInfoWithOrderId = () => {
        //todo 08-02 api get 요청
        //todo 정기결제 일때만 orderId로 사용자 accessToken 반환 -> setToken(accessToken)
        if (date !== null && parseInt(date) !== 0) {
            const data = {
                orderId: orderId,
            }

            //TODO) 인터셉터 적용 전
            /*axios.get(baseUrl + `/payments/info`, { params: data },)
                .then(function (response) {
                    console.log(">> orderId로 사용자 토큰조회 성공: ", response);
                    setToken(response.data.result.accessToken);
                })
                .catch(function (error) {
                    // 오류발생시 실행
                    console.log("orderId로 사용자 토큰조회 실패: ", error);
                    console.log(data);
                    window.alert(error.message);
                });*/

            //TODO) axiosPrivateInstance 사용 (인터셉터 적용됨)
            axiosPrivateInstance.get(`/payments/info`, { params: data })
                .then(function (response) {
                    console.log(">> orderId로 사용자 토큰 성공적으로 검색: ", response);
                    setToken(response.data.result.accessToken);
                })
                .catch(function (error) {
                    console.log("orderId로 사용자 토큰 조회 실패: ", error);
                    console.log(data);
                    window.alert(error.message);
                });
        }
    }
    const postPay = ()=> {
        //todo 정기결제
        if (date !== null && parseInt(date) !== 0) {
            const body = {
                amount: amount,
                payDate: date,
            }
            const config = {
                headers: {
                    "X-AUTH-TOKEN": token,
                    "Content-Type": "application/json",
                },
                withCredentials: true, // 이 부분을 추가
            };
            axios.post(baseUrl + `/order/pay/card/${cardId}/${projectId}`, body, config)
                .then(function (response) {
                    console.log("정기 결제 post 성공", response);

                    //todo) 앱에서 왔으면 앱 내 딥링크로 이동 / 웹에서면 웹의 결제 완료 화면으로 이동
                    window.location.href = hrefUrl //결제완료
                    window.close();
                })
                .catch(function (error) {
                    // 오류발생시 실행
                    console.log("정기 결제 post 실패", error);
                    console.log(body);
                    window.alert(error.message);
                });
        }

        //todo 단기결제
        else {
            window.location.href = `/auth/pay/once/?orderId=${orderId}&amount=${amount}&title=${title}`; //PortOneScreen으로 이동하는 href
        }
    }

    const handleAgreeAll = (e: boolean) => {
        setIsAgreeAll(e)
    }
    const handleAgree1 = (e: boolean) => {
        setIsAgree1(e)
    }
    const handleAgree2 = (e: boolean) => {
        setIsAgree2(e)
    }


    return (
        <Fragment>
            <div className={"payment3"}>
                <div className={"match-on"}>{TEXT.payTitle2}</div>

                <img style={{marginLeft: '20px', marginTop:'23px', width: '320px'}} src={IMAGES.progress3}/>

                <div className={"three"}>{TEXT.pay3Container1}</div>
                <div className={"border1"}></div>

                <div className={"date-container"}>
                    <text className={"sponsored_amount"}>기부 금액</text>
                </div>
                <text className={"amount"}>{date !== null && parseInt(date) == 0 ? `${amount}원` : `매월 • ${date}일 • ${amount}원`}</text>

                <div className={"date-container"}>
                    <text className={"sponsored_amount"}>기부 수단</text>
                </div>

                {date !== null && parseInt(date) == 0 ? `` :
                    <div className={"payment_method-container"}>
                        <div className={"account_payment-container"}>
                            <div className="payment_method_container">
                                <input
                                    className={"toggle-circle"}
                                    type="radio"
                                    id="option1"
                                    name="radio"
                                    value="option1"
                                    onChange={handleRadioChange}
                                    style={{ display: 'none' }}
                                />
                                <label className={"label-radio account_payment-container"} htmlFor="option1">
                                    <div style={{ height: '18px' }}>
                                        {selectedOption === 'option1' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                                <path d="M9 17C13.1421 17 16.5 13.6421 16.5 9.5C16.5 5.35786 13.1421 2 9 2C4.85786 2 1.5 5.35786 1.5 9.5C1.5 13.6421 4.85786 17 9 17Z" stroke="#2F3033" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M9 14.5C11.7614 14.5 14 12.2614 14 9.5C14 6.73858 11.7614 4.5 9 4.5C6.23858 4.5 4 6.73858 4 9.5C4 12.2614 6.23858 14.5 9 14.5Z" fill="#2F3033"/>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                                <path d="M9 17C13.1421 17 16.5 13.6421 16.5 9.5C16.5 5.35786 13.1421 2 9 2C4.85786 2 1.5 5.35786 1.5 9.5C1.5 13.6421 4.85786 17 9 17Z" stroke="#D9D9DA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        )}
                                        <text className={"label-agree"} style={{ marginLeft: '5px' }}>{TEXT.pay3Select1}</text>
                                    </div>
                                </label>
                            </div>
                            {selectedOption === "option1" && (
                                <div className="account-cards-container">
                                    <CardCarousel/>
                                </div>
                            )}


                            <div className="payment_method_container" style={{ marginTop:'16px' }}>
                                <input
                                    className={"toggle-circle"}
                                    type="radio"
                                    id="option2"
                                    name="radio"
                                    value="option2"
                                    onChange={handleRadioChange}
                                    style={{ display: 'none' }}
                                />
                                <label className={"label-radio account_payment-container"} htmlFor="option2">
                                    <div style={{ height: '18px' }}>
                                        {selectedOption === 'option2' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                                <path d="M9 17C13.1421 17 16.5 13.6421 16.5 9.5C16.5 5.35786 13.1421 2 9 2C4.85786 2 1.5 5.35786 1.5 9.5C1.5 13.6421 4.85786 17 9 17Z" stroke="#2F3033" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M9 14.5C11.7614 14.5 14 12.2614 14 9.5C14 6.73858 11.7614 4.5 9 4.5C6.23858 4.5 4 6.73858 4 9.5C4 12.2614 6.23858 14.5 9 14.5Z" fill="#2F3033"/>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                                <path d="M9 17C13.1421 17 16.5 13.6421 16.5 9.5C16.5 5.35786 13.1421 2 9 2C4.85786 2 1.5 5.35786 1.5 9.5C1.5 13.6421 4.85786 17 9 17Z" stroke="#D9D9DA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        )}
                                        <text className={"label-agree"} style={{ marginLeft: '5px' }}>{TEXT.pay3Select2}</text>
                                    </div>
                                </label>
                            </div>
                            {selectedOption === "option2" && (
                                <div className="additional-div">
                                    <p>(서비스 준비중)</p>
                                </div>
                            )}
                        </div>
                    </div>
                }


                <div className={"border2"}></div>

                <div className={"date-container"}>
                    <text className={"sponsored_amount"}>결제 내용 확인 및 동의</text>
                </div>


                <div style={{width: "20.0625rem"}}>
                    <CheckBox props={method}/>
                </div>


                <div className={"sponsered_payment_nextpage"}>
                    {cardId === 0 ? (
                        <div className={"sponsered_payment_nextpage"}>
                            <button className={"sponser-next-btn-unactive"}
                                    onClick={() => window.alert('결제 카드로 슬라이드를 넘겨주세요')}
                            >다음
                            </button>
                        </div>
                    ) : (
                        <>
                            <button className={"sponser-next-btn-active"}
                                    onClick={() => (agreeState) ? postPay() : agreementHandler()}
                            >다음
                            </button>
                            <script src="https://pay.nicepay.co.kr/v1/js/"></script>
                        </>
                    )}
                </div>


            </div>
        </Fragment>
    );
};

export default PaymentScreen3