import React, {Component, Fragment, useEffect, useState} from "react";
import {IMAGES} from "../../constants/images";
import * as process from "process";

import axios from "axios";
import {Link} from "react-router-dom";
import {TEXT} from "../../constants/text";

const baseUrl = 'https://www.match-api-server.com';
const REACT_APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const LookAroundScreen = () => {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState<any[]>([]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const data = {
            page : 0,
            size : 10,
        }
        axios.get(`${baseUrl}/projects`,{ params: data })
            .then((response) => {
                setItems(response.data.result.contents);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <div className="header">{TEXT.lookaroundHeader}</div>

            <div className={"search_box"}>
                <img className={"search_icon"} src={IMAGES.search} alt="Search Icon"/>
                <input
                    className={"search"}
                    type={"text"}
                    value={search}
                    onChange={onChange}
                    placeholder={"프로젝트를 검색해보세요 (문장, 단어 호환)"}
                />
            </div>
            <div className={"popular_project"}>진행 중인 인기 프로젝트</div>

            <div className={"list-container"}>
                <ul>
                    {items.map((item) => (
                        <ListItem
                            key={item.projectId}
                            customKey={item.projectId} // Pass the projectId as customKey prop
                            img={item.imgUrl}
                            title={item.title}
                            usages={item.usages}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
}
interface ListItemProps {
    customKey: number;
    img: string;
    title: string;
    usages: string;
}
const ListItem: React.FC<ListItemProps> = ({ customKey, img, title, usages }) => {

    return (
        <div className="list-item">
            <Link to={`/detail/${customKey}`} state= {{ title: `${title}` }}  style={{textDecoration : "none"}}>
                <div>
                    <img className={"item-img"} src={img} alt="이미지"/>
                </div>
                <div className="item-title">{title}</div>
                <div className="item-with">
                    <text className="item-with-w">with </text>
                    <text className="item-usages">{usages}</text>
                </div>
            </Link>
        </div>
    );
}

export default LookAroundScreen