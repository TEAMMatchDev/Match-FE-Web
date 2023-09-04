import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {IMAGES} from "../constants/images";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {accessTokenState} from "../state/loginState";
import axios from "axios";

const baseUrl = 'https://www.match-api-server.com';

const Carousel = () => {

    const [items, setItems] = useState<any[]>([]);
    const token = useRecoilValue(accessTokenState);

    useEffect(() => {
        console.log('# Carousel token : '+token);

        const config = {
            headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN": token,
            }
        };
        console.log('# Carousel token: '+token);

        axios.get(baseUrl + `/order/pay/card`, config)
            .then((response) => {
                setItems(response.data.result);
                console.log('# Carousel -- axios get 카드 조회 요청 성공');
                // console.log('pdataaaaa : '+pdata.contents);
                // console.log('pdata:', JSON.stringify(pdata, null, 2));
            })
            .catch((error) => {
                console.error('# Carousel Error fetching data:', error);
            });

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
