import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Page2 from "./Page2";
import Page3 from "./Page3";
import Navbar from "./Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/page2" element={<Page2/>}/>
            <Route path="/page3" element={<Page3/>}/>
            {/*You can add more pages by adding more Route elements here!*/}
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

