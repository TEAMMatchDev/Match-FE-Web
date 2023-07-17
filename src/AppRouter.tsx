import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LoginScreen from "./screens/LoginScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

function AppRouter() {
    return (
        <>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<LoginScreen/>} />
                    <Route path="auth/kakao" element={<HomeScreen/>} />
                    <Route path="auth/naver" element={<HomeScreen/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRouter;