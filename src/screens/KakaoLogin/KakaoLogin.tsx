import {IMAGES} from "../../constants/images";
import {TEXT} from "../../constants/text";
import React, {useEffect} from "react";
import axios from "axios";

const defaultUrl = 'https://www.match-api-server.com';


const KakaoLogin = () => {
    const REST_API_KEY='8dfa7db4e6e6e29a50acefe5f2016a73' //REST API KEY
    const REDIRECT_URI = 'https://www.match-api-server.com/auth/kakao' //Redirect URI

    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    const handleLogin = ()=>{
        window.location.href = kakaoURL


        const code= new URL(document.location.toString()).searchParams.get('code');
        const grantType = "authorization_code";


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

                try {
                    //응답 성공
                    const response = axios.post(defaultUrl+'/auth/kakao',{
                        accessToken: `${access_token}`,
                    });
                    console.log(response);
                } catch (error) {
                    //응답 실패
                    console.error(error);
                }


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
