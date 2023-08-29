// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
import React, {useState} from 'react';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./AppRouter";

export const tokenState = atom({
    key: 'tokenState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <RecoilRoot>
            <div className="App">
                <header className="App-header">
                    <Header isLoggedIn={isLoggedIn}/>
                </header>

                <body className="App-body">
                <AppRouter/>
                </body>


                <footer className="App-footer">
                    <Footer/>
                </footer>
            </div>
        </RecoilRoot>
    );
}

export default App;
