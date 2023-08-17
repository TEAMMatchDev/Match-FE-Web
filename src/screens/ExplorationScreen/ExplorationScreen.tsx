import React, {Component, Fragment, useEffect, useState} from "react";
import {IMAGES} from "../../constants/images";
import './style.css';
import axios from "axios";

const baseUrl = 'https://www.match-api-server.com';
const ExplorationScreen: React.FC = () => {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState<any[]>([]);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        // API로부터 데이터를 받아옴
        axios.get(`${baseUrl}/projects?page=0&size=10`)
            .then((response) => {
                setItems(response.data.result.contents); // 받아온 데이터로 items 상태 업데이트
                console.log(items)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // 빈 배열을 넣어 한 번만 호출되도록 설정

    return (
        <Fragment>
            <div className={"header"}>우리가 바라온 세상</div>
            <div className={"search_box"}>
                <img className={"search_icon"} src={IMAGES.search}/>
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
                            img={item.imgUrl}
                            title={item.title}
                            w="with"
                            usages={item.usages}
                        />
                    ))}
                </ul>
            </div>
        </Fragment>
    )
}

class ListItem extends Component<{ img: string, title: string, w: string, usages: string }> {
    render() {
        let {title, img, w, usages} = this.props;
        return (
            <ul className="list-item">
                <div>
                    <img className={"item-img"} src={img} alt="이미지" />
                </div>
                <div className="item-title">{title}</div>
                <div className="item-with">
                    <text className="item-with-w">{w}&nbsp;</text>
                    <text className="item-usages">{usages}</text>
                </div>
            </ul>
        );
    }
}

export default ExplorationScreen