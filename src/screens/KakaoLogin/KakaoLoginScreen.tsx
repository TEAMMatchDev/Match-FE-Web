import {IMAGES} from "../../constants/images";
import {TEXT} from "../../constants/text";
import React, {useEffect} from "react";
import axios from "axios";
import KakaoLogin from "react-kakao-login";
import * as process from "process";

const baseUrl = 'https://www.match-api-server.com';


const KakaoLoginScreen = () => {
    const REST_API_KEY= '8dfa7db4e6e6e29a50acefe5f2016a73'; //REST API KEY
    const REDIRECT_URI = 'https://localhost:3000/auth/kakao'; //Redirect URI  https://www.match-api-server.com/auth/kakao    https://localhost:3000/auth/kakao

    // 인가코드 발급 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    const handleLogin = ()=>{
        console.log(' handleLogin 시작 ');

        //## Rest api 방식
        //1) 하이퍼링크 --> code = 뒤에 인가코드 붙어서 나옴
        window.location.href = kakaoURL

        //2) 인가코드 추출 -> 리다이렉트 된 후 HomeScreen에서 계속















        /*const code= new URL(document.location.toString()).searchParams.get('code'); //인가코드 추출
        const grantType = "authorization_code";

        //3) 카카오 서버에 access token 발급 요청
        axios.post( //grant_type은 authorization_code , client_id는 rest api 앱 키 ,  redirect_uri은 인가코드가 리다이렉트된 URI , code는 인가코드
            `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {},
            {headers: {"Content-type": "application/x-www-form-urlencoded;charset=utf-8"}}
        )
            .then((res: any) => {

                const {accessToken} = res.data.access_token; //access token 찾아
                // const {accessToken} = res.data.access_token; //access token 찾아
                console.log('axios 요청 성공');
                console.log('res : ' + `${res}`);
                console.log('data : ' + `${res.data}`);
                console.log('access token : ' + `${res.data.access_token}`);

                //4) 서비스 서버에 accessToken 전달
                try {
                    axios.post(
                        baseUrl + '/auth/kakao',
                        {
                            accessToken: `${accessToken}`,
                        });
                    console.log('access token 전달 성공');
                } catch (error) {
                    console.error(error);
                }
            })
            .catch((Error: any) => {
                console.log(Error)
            });*/

    }






    return (
        <>
            <div style={{width: '100%', height: '100%'}}>
                <button
                    style={{
                        background: `url(${IMAGES.kakaoLoginBtn2})`, // 배경 이미지를 kakaoLoginBtn으로 설정
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: 183, // 버튼의 가로 크기를 100%로 설정
                        height: 45, // auto
                        border: 'none', // 테두리 제거
                    }}
                    onClick={handleLogin}
                />
            </div>
        </>
    );
}


export default KakaoLoginScreen
