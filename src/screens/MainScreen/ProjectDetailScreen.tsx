import React, { useEffect, useState } from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {useRecoilState, useRecoilValue} from 'recoil';

import { accessTokenState } from "../../state/loginState";

import axios from "axios";
import { TEXT } from "../../constants/text";
import './styles.css';
import * as process from "process";
const baseUrl = process.env.REACT_APP_BASE_URL

const ProjectDetailScreen: React.FC = () => {
    const REACT_APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

    const regularPayUrl = REACT_APP_PUBLIC_URL+`/auth/pay/regular`
    const oneTimeUrl = REACT_APP_PUBLIC_URL+`/auth/pay/onetime`
    const pay1Url = REACT_APP_PUBLIC_URL+`/auth/pay/info`

    const token = useRecoilValue(accessTokenState);

    const params = useParams().projectId;
    const projectId = params ? parseInt(params) : 0;

    //프로젝트명 props로 전달받음
    const location = useLocation();
    const { title } = location.state

    const [pdata, setPData] = useState<any>([]);
    const [items, setItems] = useState<any[]>([]);
    const [payMethod, setPayMethod] = useState(""); //정기or단기 결제
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        //console.log('jwt : ' + token);
        //console.log('pid: ' + projectId);

        try {
            const data = {
                projectId : projectId,
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                }
            };

            axios.get(baseUrl + `/projects/${projectId}`, config)
                .then((response) => {
                    setPData(response.data.result);
                    setItems(response.data.result.projectImgList);
                    setPayMethod(response.data.result.regularStatus);
                    //console.log('# ProjectDetailScreen -- axios get detail 요청 성공');
                    // console.log('pdataaaaa : '+pdata.contents);
                    // console.log('pdata:', JSON.stringify(pdata, null, 2));
                })
                .catch(function (error) {
                    // 오류발생시 실행
                    console.log("로그인 토큰 만료", error);
                    window.location.href = process.env.REACT_APP_PUBLIC_URL + `/signIn`;
                });

        } catch (e) {
            console.error(e);
        }
    })
    const handleNextBtn = () => {

        const queryString = `?projectId=${projectId}&title=${encodeURIComponent(title)}&usages=${pdata.usages}&pmethod=${payMethod}`;
        window.location.href = pay1Url + queryString;

        // if (payMethod === "REGULAR") {
        //     window.location.href = regularPayUrl + queryString;
        // } else {
        //     window.location.href = oneTimeUrl + queryString;
        // }
    }

    return (
        <div>
            <div className="title">{TEXT.detailHeader}</div>
            <div className="detail-item-usage">
                {pdata.usages ? `${pdata.usages}` : 'Loading...'}
            </div>

            <div className={"list-container"}>
                <ul>
                    {items.map((item) => (
                        <ListItem
                            imgId={item.imgId}
                            imgUrl={item.imgUrl}
                            sequence={item.sequence}
                        />
                    ))}
                </ul>
            </div>

            <div className={"next-btn-div"}>
                <button className={"next-btn"}
                        onClick={() => handleNextBtn()}
                >성냥기부 동참하기</button>
            </div>
            <div className="detail-item-footer">{TEXT.detailFooter}</div>
        </div>
    );
};

interface ImageObject {
    imgId: number;
    imgUrl: string;
    sequence: number;
}
const ListItem: React.FC<ImageObject> = ({ imgId, imgUrl, sequence }) => {
    return (
        <div className="list-item">
            <img className={"detail-item-img"} src={imgUrl} alt="이미지"/>
        </div>
    );
}
export default ProjectDetailScreen;
