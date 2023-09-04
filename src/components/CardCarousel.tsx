import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useRecoilState, useRecoilValue} from 'recoil'; // Import the useRecoilValue hook
import { accessTokenState } from "../state/loginState";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

import axios from "axios";
import {IMAGES} from "../constants/images";

import './styles.css';

const baseUrl = 'https://www.match-api-server.com';

const CardCarousel = () => {

    const [pdata, setPData] = useState<any>([]);
    const [items, setItems] = useState<any[]>([]);
    const token = useRecoilValue(accessTokenState);


    useEffect(() => {
        console.log('# CardCarousel tokennnnmnn: '+token);

        try {
            const config = {
                headers: {
                    //todo token으로 바꾸기
                    "X-AUTH-TOKEN": "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY5MzgxMTEzMiwiZXhwIjoxNjkzODQyNjY4fQ.dRgAkuLij-PqGK5COLDVsDkcUHoncIBRdIgXJL3sN7DEyPykbscc09r5mJcaXiXzRAmQa_zlQFKrmlm6aXSisg",
                    "Header": token,
                    "Access-Control-Allow-Headers": token,
                    "Access-Control-Allow-Origin": `https://match-official.vercel.app`,
                    "Access-Control-Allow-Credentials": true,
                }
            };
            axios.get(baseUrl + `/order/pay/card`, config)
                .then((response) => {
                    //setPData(response.data.result);
                    setItems(response.data.result);
                    console.log('# CardCarousel -- axios get detail 요청 성공');
                    // console.log('pdataaaaa : '+pdata.contents);
                    // console.log('pdata:', JSON.stringify(pdata, null, 2));
                })
                .catch((error) => {
                    console.error('# CardCarousel Error fetching data:', error);
                });
        } catch (e) {
            console.error(e);
        }

    },[])

    // 옵션
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, //한 화면에 보이는 아이템 개수
        slidesToScroll: 1, //한번에 넘어가는 컨텐츠 수
    }

    return (
        <>
            <div className="carousel">
                <div>
                    <Slider {...settings}>
                        {items.map((item) => (
                            <ListItem
                                key={item.id}
                                customKey={item.id}
                                cardCode={item.cardCode}
                                cardName={item.cardName}
                                cardNo={item.cardNo}
                            />
                        ))}
                        <img src={IMAGES.submitCardBtn} className="centered-img"/>
                    </Slider>
                </div>
            </div>
        </>
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
        <div className="card-container">
            <text className="item-name">{cardName}</text>
            <text className="item-num">{cardNo}</text>
        </div>
    );
}
export default CardCarousel;
