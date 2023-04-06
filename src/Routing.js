import React from "react";
import {BrowserRouter, Route, Routes, Navigate,} from "react-router-dom";
import FirstPage from "./FirstPage/FirstPage";
import SecondPage from "./SecondPage/SecondPage";

export default function Routing() {
    return(
        //add anew path by using <Route/> element
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FirstPage/>} />
                <Route path="/flights_result" element={<SecondPage/>} />

            </Routes>
        </BrowserRouter>
    )
}