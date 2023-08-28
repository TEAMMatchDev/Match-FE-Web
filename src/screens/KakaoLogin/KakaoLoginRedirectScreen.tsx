import {IMAGES} from "../../constants/images";
import React, {Component, Fragment, useEffect, useState} from "react";
import axios from "axios";
import * as process from "process";
import './style.css';

const baseUrl = 'https://www.match-api-server.com';


const KakaoRedirectScreen: React.FC = () => { //여기로 리다이렉트
    const REST_API_KEY= process.env.REACT_APP_REST_API_KEY; //REST API KEY
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI; //Redirect URI  https://www.match-api-server.com/auth/kakao   https://match-official.vercel.app/auth/kakao
    const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

    const [search, setSearch] = useState("");
    const [items, setItems] = useState<any[]>([]);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        //const url = window.location.href;
        //const params = new URLSearchParams(url.split("?")[1]);
        //const code = params.get("code");

        if (code) {
            console.log('인가코드 : '+code);
            getKakaoTokenHandler(code);
        }

        // 프로젝트 전체조회
        axios.get(`${baseUrl}/projects?page=0&size=10`)
            .then((response) => {
                setItems(response.data.result.contents); // 받아온 데이터로 items 상태 업데이트
                console.log(items)

                console.log(response.data.message);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, []);

    //3) 카카오 서버에 access token 발급 요청
    const getKakaoTokenHandler = async (code: string) => {
        try {
            //grant_type은 authorization_code , client_id는 rest api 앱 키 ,  redirect_uri은 인가코드가 리다이렉트된 URI , code는 인가코드
            const data = {
                grant_type: "authorization_code",
                client_id: REST_API_KEY,
                redirect_uri: REDIRECT_URI,
                code: code,
                client_secret: SECRET_KEY,
            };

            // @ts-ignore //왜 data에서 빨간줄인지 모르게썽 .env 하고 나서 빨간줄 떠
            const params = new URLSearchParams(data).toString();
            console.log('카카오 서버에 전달할 params : '+params); //여기 까지 정상

            // 토큰 발급 REST API
            const response = await axios.post(
                `https://kauth.kakao.com/oauth/token`,
                params, // URL 쿼리 파라미터로 넘길 데이터
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            );

            // 서버에 access token 전달
            console.log('서버에 전달할 access token : '+response.data.access_token);
            sendKakaoTokenToServer(response.data.access_token);

        } catch (e) {
            console.error(e);
        }
    };

    const sendKakaoTokenToServer = async (token: string) => {
        console.log('access token : '+token);
        //console.log(' post 요청 url '+baseUrl + '/auth/kakao');
        const data = {
            accessToken: token,
        };

        axios.post(
            baseUrl+`/auth/kakao`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then(function (response) {
                console.log("post 성공", response);
                // response
            })
            .catch(function (error) {
                // 오류발생시 실행
                console.log("post 실패", error);
            })
            .then(function () {
                // 항상 실행
                //console.log("데이터 요청 완료");
            });

    };

    const moveToPay = () => {
        const paymentpage = `pay`; //auth/pay로 이동 됨
        window.location.href = paymentpage
    }






    return(
        <>
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
        </>
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

export default KakaoRedirectScreen
