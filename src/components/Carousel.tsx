import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useRecoilState, useRecoilValue} from 'recoil'; // Import the useRecoilValue hook
import { accessTokenState } from "../state/loginState";

import axios from "axios";
import {IMAGES} from "../constants/images";

import './styles.css';

const baseUrl = 'https://www.match-api-server.com';

const Carousel = () => {

    const [pdata, setPData] = useState<any>([]);
    const [items, setItems] = useState<any[]>([]);
    const token = useRecoilValue(accessTokenState);

    console.log('# Carousel token: '+token);

    useEffect(() => {
        console.log('# Carousel token: '+token);

        try {
            const customAxios = axios.create({
                baseURL: baseUrl,
                headers: {
                    "X-AUTH-TOKEN": token,
                    "Access-Control-Allow-Origin": "https://match-official.vercel.app",
                    "Access-Control-Allow-Credentials": true,
                    withCredentials: true
                },
            });
            customAxios
                .get(`/order/pay/card`)
                .then((response) => {
                    setItems(response.data.result);
                    console.log('# Carousel -- axios get detail request successful');
                    console.log('items : '+items);
                })
                .catch((error) => {
                    console.error('# Carousel Error fetching data:', error);
                });
            /*
            const config = {
                headers: {
                    "X-AUTH-TOKEN": token,
                    "Access-Control-Allow-Origin": `https://match-official.vercel.app`,
                    "Access-Control-Allow-Credentials": true,
                }
            };
            axios.get(baseUrl + `/order/pay/card`, config)
                .then((response) => {
                    //setPData(response.data.result);
                    setItems(response.data.result.contents);
                    console.log('# Carousel -- axios get detail 요청 성공');
                    // console.log('pdataaaaa : '+pdata.contents);
                    // console.log('pdata:', JSON.stringify(pdata, null, 2));

                    //todo - 04-00 : 나이스 페이먼츠 할 때 필요한데 CORS 에러 나서 일단 패스하기로
                    /!*axios.post(baseUrl+`/order/${projectId}`, data, config) //api 연결
                        .then((res) => {
                            setOrderId(res.data.result);
                            console.log('# ProjectDetailScreen -- axios post 요청 성공');
                            console.log('order id : ' + orderId);
                        })
                        .catch(function (error){
                            console.log("04-00 post 실패");
                            console.log('jwt 재확인 : '+config.headers["X-AUTH-TOKEN"]);
                        });*!/
                })
                .catch((error) => {
                    console.error('# Carousel Error fetching data:', error);
                });*/










        } catch (e) {
            console.error(e);
        }

    },[])

    // 옵션
    const settings = {
        dots: true,
        infinite: true,
        speed: 500
    }

    return (
        <div className="carousel">
            {/*<Slider { ...settings }>
            </Slider>*/}
            <div className={"list-container"}>
                <ul>
                    {items.map((item) => (
                        <ListItem
                            key={item.id}
                            customKey={item.id}
                            cardCode={item.cardCode}
                            cardName={item.cardName}
                            cardNo={item.cardNo}
                        />
                    ))}
                </ul>
            </div>
            <img src={IMAGES.submitCardBtn}  className="centered-img"/>
        </div>
    );
}
interface ListItemProps {
    customKey: number;
    cardCode: string;
    cardName: string;
    cardNo: string;
}
const ListItem: React.FC<ListItemProps> = ({ cardName, cardNo }) => {

    return (
        <div className="list-item">
            <div className="item-info">
                <text className="item-name">{cardName}</text>
                <text className="item-num">{cardNo}</text>
            </div>
        </div>
    );
}
export default Carousel;
