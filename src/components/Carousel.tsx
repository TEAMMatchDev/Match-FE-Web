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

    async function fetchdata() {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                    "Access-Control-Allow-Origin": `https://match-official.vercel.app`,
                    "Access-Control-Allow-Credentials":true,
                }
            };

            axios.get(`/order/pay/card`, config)
                .then((response) => {
                    setItems(response.data.result);
                    setPData(response.data.result);

                    console.log('# Carousel -- axios get 카드 조회 요청 성공');
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
    }
    useEffect(() => {
        console.log('# Carousel token: '+token);

        fetchdata();

    },[])

    // 옵션
    const settings = {
        dots: true,
        infinite: true,
        speed: 500
    }

    return (
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
export default Carousel;
