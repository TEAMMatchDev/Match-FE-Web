// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
import React from 'react';

import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./AppRouter";

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
            </header>

            <body className="App-body">
                <AppRouter/>
            </body>


            <footer className="App-footer">
                <Footer/>
            </footer>
        </div>
    );

}

export default App;
