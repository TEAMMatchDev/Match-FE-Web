import {IMAGES} from "../../constants/images";
import {TEXT} from "../../constants/text";
import React from "react";


const KakaoLogin = () => {
    const Rest_api_key='8dfa7db4e6e6e29a50acefe5f2016a73' //REST API KEY
    const redirect_uri = 'https://www.match-api-server/auth/kakao' //Redirect URI

    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

    const handleLogin = ()=>{
        window.location.href = kakaoURL //Redirect를 KakaoRedirectHandler로
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
