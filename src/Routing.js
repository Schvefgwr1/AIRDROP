import React from "react";
import {BrowserRouter, Route, Routes, Navigate,} from "react-router-dom";
import FirstPage from "./FirstPage/FirstPage";
import SecondPage from "./SecondPage/SecondPage";
import ThirdPage from "./ThirdPage/ThirdPage";
import FourthPage from "./FourthPage/FourthPage";
import FifthPage from "./FifthPage/FifthPage";

export default function Routing() {
    return(
        //add anew path by using <Route/> element
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FirstPage/>} />
                <Route path="/flights_result" element={<SecondPage/>} />
                <Route path="/buy_tickets" element={<ThirdPage/>} />
                <Route path="/tab_flights" element={<FourthPage/>} />
                <Route path="/my_bookings" element={<FifthPage/>} />
            </Routes>
        </BrowserRouter>
    )
}