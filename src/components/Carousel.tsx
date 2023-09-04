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

    /* axios.defaults.baseURL = 'https://www.match-api-server.com';
     axios.defaults.headers.common['X-AUTH-TOKEN'] = token;
     axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';*/

    /*const instance = axios.create({
        baseURL : 'https://www.match-api-server.com'
    });
    instance.defaults.headers.common['X-AUTH-TOKEN'] = token;
    instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

*/
    const search = () => {
        return axios.create({
            baseURL: "/order/pay/card",
            headers: { 'X-AUTH-TOKEN': token },
        });
    };

    async function getReq() {
        try {
            // @ts-ignore
            const res = await search().get();
            console.log(res.data.result);
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        console.log('# Carousel token: '+token);
        getReq();


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
