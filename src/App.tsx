import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

import KakaoLogin from "./screens/LoginScreen/LoginScreen";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
            </header>

            <body className="App-body">
            <KakaoLogin/>
            </body>


            <footer className="App-footer">
                <Footer/>
            </footer>
        </div>
    );

}

export default App;
