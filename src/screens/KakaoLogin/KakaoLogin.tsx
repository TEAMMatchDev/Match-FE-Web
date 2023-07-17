import {IMAGES} from "../../constants/images";
import {TEXT} from "../../constants/text";
import React, {useEffect} from "react";
import axios from "axios";


const KakaoLogin = () => {
    const Rest_api_key='8dfa7db4e6e6e29a50acefe5f2016a73' //REST API KEY
    const redirect_uri = 'https://localhost:3000/auth/kakao' //Redirect URI

    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

    const handleLogin = ()=>{
        window.location.href = kakaoURL


        const code= new URL(document.location.toString()).searchParams.get('code');
        const grantType = "authorization_code";
        const REST_API_KEY = Rest_api_key;
        const REDIRECT_URI = redirect_uri;


        /*axios.get(
            `https://kapi.kakao.com/v2/user/me`, {
                headers: {
                    Authorization: `Bearer ${Rest_api_key}`,
                }
            })
            .then((res: any) => {
                const { access_token } = res.data;
                console.log('access token : ' + res.data);

                axios.post(
                    `https://kapi.kakao.com/v2/user/me`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        }
                    }
                )
                    .then((res: any) => {
                        console.log('2번째', res);
                    })
            })
            .catch((Error: any) => {
                console.log(Error)
            })*/


        axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {},
            { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
        )
            .then((res: any) => {
                const { access_token } = res.data;
                console.log('access token : '+res.data);

                axios.post(
                    `https://kapi.kakao.com/v2/user/me`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                        }
                    }
                )
                    .then((res: any) => {
                        console.log('2번째', res);
                    })
            })
            .catch((Error: any) => {
                console.log(Error)
            })
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


export default KakaoLogin
