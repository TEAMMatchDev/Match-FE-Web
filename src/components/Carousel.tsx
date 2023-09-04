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
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                    "Access-Control-Allow-Origin": `https://match-official.vercel.app`,
                    "Access-Control-Allow-Credentials": true,
                }
            };

            axios.get(baseUrl+`/order/pay/card`, config)
                .then((response) => {
                    setItems(response.data.result);
                    setPData(response.data.result);

                    console.log('# Carousel -- axios get 카드 조회 요청 성공');
                    console.log('# Carousel -- axios get items : '+items);
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
