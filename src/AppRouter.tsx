import React, { useState, useEffect } from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import LoginScreen from "./screens/LoginScreen/LoginScreen";
import KakaoLoginRedirectScreen from "./screens/KakaoLogin/KakaoLoginRedirectScreen";
import NaverLoginRedirectScreen from "./screens/NaverLogin/NaverLoginRedirectScreen";
import NaverLoginScreen from "./screens/NaverLogin/NaverLoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen/SignUpScreen";

import PaymentScreen from "./screens/Payments/PaymentScreen";
import PaymentRedirectScreen from "./screens/Payments/PaymentRedirectScreen";
import PaymentFailRedirectScreen from "./screens/Payments/PaymentFailRedirectScreen";
import PaymentSuccessRedirectScreen from "./screens/Payments/PaymentSuccessRedirectScreen";

import LookAroundScreen from "./screens/MainScreen/LookAroundScreen";
import ProjectDetailScreen from "./screens/MainScreen/ProjectDetailScreen";

import OneTimePaymentScreen from "./screens/PaymentScreen/OneTimePaymentScreen";
import RegularPaymentScreen from "./screens/PaymentScreen/RegularPaymentScreen";
import PaymentScreen1 from "./screens/PaymentScreen/PaymentScreen1";
import PaymentScreen3 from "./screens/PaymentScreen/PaymentScreen3";
import PayCompleteScreen from "./screens/PaymentScreen/PayCompleteScreen";

function AppRouter() {
    return (
        <>
            <BrowserRouter basename={"/"}>
                <Routes>
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="signUp" element={<SignUpScreen/>}/>
                    <Route path="signIn" element={<LoginScreen/>}/>

                    <Route path="auth/kakao" element={<KakaoLoginRedirectScreen/>}/>
                    <Route path="auth/naver" element={<NaverLoginRedirectScreen/>}/>

                    <Route path="lookAround" element={<LookAroundScreen/>}/>
                    <Route path="detail/:projectId" element={<ProjectDetailScreen/>}/>

                    {/*<Route path="auth/pay" element={<PaymentScreen/>}/>*/}
                    <Route path="auth/pay1" element={<PaymentScreen1/>}/>
                    <Route path="auth/pay3" element={<PaymentScreen3/>}/>
                    <Route path="auth/payComplete" element={<PayCompleteScreen/>}/>

                    <Route path="auth/pay/regular" element={<RegularPaymentScreen/>}/>
                    <Route path="auth/pay/onetime" element={<OneTimePaymentScreen/>}/>
                    <Route path="auth/pay" element={<PaymentScreen3/>}/>

{/*

                    <Route path="auth/pay/redirect" element={<PaymentRedirectScreen/>}/>
                    <Route path="auth/pay/success" element={<PaymentSuccessRedirectScreen/>}/>
                    <Route path="auth/pay/fail" element={<PaymentFailRedirectScreen/>}/>
*/}


                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRouter;
