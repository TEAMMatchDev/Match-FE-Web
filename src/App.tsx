import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import LoginScreen from "./screens/LoginScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
            </header>

            <body className="App-body">
            {/*<BrowserRouter>
                <Switch>
                    <Route path="/" element={ <KakaoLogin/> } />
                    <Route path="/auth/kakao" element={<HomeScreen/>}/>
                    <Redirect path="*" to="/" />
                </Switch>
            </BrowserRouter>*/}
            <LoginScreen/>
            </body>


            <footer className="App-footer">
                <Footer/>
            </footer>
        </div>
    );

}

export default App;
