import React, { useState, useEffect } from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import Menu from "./components/Menu";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import KakaoLoginRedirectScreen from "./screens/KakaoLogin/KakaoLoginRedirectScreen";
import NaverLoginRedirectScreen from "./screens/NaverLogin/NaverLoginRedirectScreen";

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

import PayBankScreen from "./screens/PaymentScreen/PayBankScreen";
import PayRegisterCardScreen from "./screens/PaymentScreen/PayRegisterCardScreen";
import PayCompleteScreen from "./screens/PaymentScreen/PayCompleteScreen";
import AppleLoginRedirectScreen from "./screens/AppleLogin/AppleLoginRedirectScreen";

//todo .ver Prologue
import PreIntroScreen from "./screens/prologue/intro/PreIntroScreen";
import PreIntroDesc1Screen from "./screens/prologue/intro/PreIntroDesc1Screen";
import PreIntroDesc2Screen from "./screens/prologue/intro/PreIntroDesc2Screen";
import PreLoginScreen from "./screens/prologue/PreLoginScreen";
import PreSendInfoScreen from "./screens/prologue/PreSendInfoScreen";
import PreLoginRedirectScreen from "./screens/prologue/PreLoginRedirectScreen";
import PreContributorInfoScreen from "./screens/prologue/PreContributorInfoScreen";
import PreDonationInfoScreen from "./screens/prologue/PreDonationInfoScreen";
import SponserDogScreen from "./screens/prologue/sponsor/SponserDogScreen";
import SponserChildScreen from "./screens/prologue/sponsor/SponserChildScreen";
import PreDonationAccountScreen from "./screens/prologue/PreDonationAccountScreen";
import PreDonationCompleteScreen from "./screens/prologue/PreDonationCompleteScreen";
import PreDonationLookAroundScreen from "./screens/prologue/PreDonationLookAroundScreen";

function AppRouter() {
    return (
        <>
            <BrowserRouter basename={"/"}>
                <Routes>
                    <Route path="/" element={<PreIntroScreen/>}/>
                    <Route path="intro/1" element={<PreIntroDesc1Screen/>}/>
                    <Route path="intro/2" element={<PreIntroDesc2Screen/>}/>
                    <Route path={"introduce"} element={<HomeScreen/>}/>

                    <Route path="menu" element={<Menu/>}/>
                    <Route path="signUp" element={<SignUpScreen/>}/>
                    <Route path="signIn" element={<LoginScreen/>}/>

                    <Route path="auth/kakao" element={<KakaoLoginRedirectScreen/>}/>
                    <Route path="auth/naver" element={<NaverLoginRedirectScreen/>}/>
                    <Route path="auth/apple" element={<AppleLoginRedirectScreen/>}/>


                    <Route path="lookAround" element={<LookAroundScreen/>}/>
                    <Route path="detail/:projectId" element={<ProjectDetailScreen/>}/>

                    {/*<Route path="auth/pay" element={<PaymentScreen/>}/>*/}
                    {/*<Route path="auth/pay1" element={<PaymentScreen1/>}/>*/}
                    <Route path="auth/pay3" element={<PaymentScreen3/>}/>
                    <Route path="auth/banks" element={<PayBankScreen/>}/>
                    <Route path="auth/register" element={<PayRegisterCardScreen/>}/>

                    <Route path="auth/pay/regular" element={<RegularPaymentScreen/>}/>
                    <Route path="auth/pay/onetime" element={<OneTimePaymentScreen/>}/>
                    <Route path="auth/pay/info" element={<PaymentScreen1/>}/>
                    <Route path="auth/pay" element={<PaymentScreen3/>}/>
                    <Route path="auth/pay/once" element={<PaymentScreen/>}/>

                    <Route path="auth/payComplete/reg" element={<PayCompleteScreen/>}/>
                    <Route path="auth/payComplete/once" element={<PaymentSuccessRedirectScreen/>}/>

                    {/*
                    <Route path="auth/pay/redirect" element={<PaymentRedirectScreen/>}/>
                    <Route path="auth/pay/fail" element={<PaymentFailRedirectScreen/>}/>
                    */}


                    <Route path={"pre/intro"} element={<PreIntroScreen/>}/>
                    <Route path={"pre/login"} element={<PreLoginScreen/>}/>
                    <Route path="pre/auth/kakao" element={<PreLoginRedirectScreen/>}/>
                    <Route path={"pre/sendInfo"} element={<PreSendInfoScreen/>}/>
                    <Route path={"pre/sendInfo/:method"} element={<PreContributorInfoScreen/>}/>
                    <Route path={"pre/donate"} element={<PreDonationInfoScreen/>}/>
                    <Route path={"pre/donate/DOG"} element={<SponserDogScreen/>}/>
                    <Route path={"pre/donate/CHILD"} element={<SponserChildScreen/>}/>

                    <Route path={"pre/donate/account"} element={<PreDonationAccountScreen/>}/>
                    <Route path={"pre/donate/complete"} element={<PreDonationCompleteScreen/>}/>
                    <Route path={"pre/donate/lookAround"} element={<PreDonationLookAroundScreen/>}/>


                </Routes>
            </BrowserRouter>
        </>
    );

};

export default AppRouter;
