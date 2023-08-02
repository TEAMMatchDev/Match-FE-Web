// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
import React, {useState} from 'react';

import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./AppRouter";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
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
    );
}

export default App;
