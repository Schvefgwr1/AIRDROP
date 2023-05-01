import React from "react";
import "./FourhPage.css";
import { useNavigate } from "react-router-dom";
import {Navigate, useLocation} from "react-router-dom";
import {useState} from "react";
import Contacts from "../Contacts/Contacts";

export default function FourthPage() {

    const location = useLocation();
    const [d_airport, setDAirport] = useState(location.state.get('d_airport'));
    const [ar_airport, setARAirport] = useState(location.state.get('ar_airport'));
    const [dep_date, setDepDate] = useState(location.state.get('dep_date'));

    function FirstPart() {
        return (
            <div className="FirstPart___">
                <div className="BigText">
                    Табло рейсов
                </div>
                <div className="Inputs___">
                    <input className="Input1___" type="text" placeholder="Откуда"/>
                    <input className="Input2___" type="text" placeholder="Куда"/>
                    <input className="Input3___" type="date"/>
                    <div className="Button___">
                        <a className="gradient-button___">Найти</a>
                    </div>
                </div>
            </div>
        )
    }

    function Flight() {
        return (
            <div className="Flight___">
                <div className="TypeFlight___">
                    <div className="CircleType___">
                        WA
                    </div>
                    <div className="NumberType___">
                        1079
                    </div>
                </div>
                <div className="TextFlight___">
                    <div className="TextPlaneFlight___">
                        <div className="TextFlight1___">
                            По плану
                        </div>
                        <div className="TextFlight2___">
                            03:00 &#8594; 05:00
                        </div>
                    </div>
                    <div className="TextRealFlight___">
                        <div className="TextFlight3___">
                            Расчетное
                        </div>
                        <div className="TextFlight4___">
                            03:00 &#8594; 05:00
                        </div>
                    </div>
                </div>
                <div className="StatusFlight___">
                    По расписанию<br/>
                    Регистрация открыта
                </div>
            </div>
        )
    }

    function Flights() {
        return (
            <div>
                {Flight()}
                {Flight()}
                {Flight()}
                {Flight()}
            </div>
        )
    }

    function SecondPart() {
        return (
            <div>
                <div className="Text___">
                    VKO &#8594; LED
                </div>
                {Flights()}
            </div>
        )
    }

    function BuyBlock() {
        return (
            <div className="BuyBlock___">
                <div className="BuyText___">
                    VKO &mdash; LED
                </div>
                <div className="BuyPrice___">
                    от 8800 РУБ.
                </div>
                <div className="BuyButton___">
                    <div className="BuyButtonReal___">
                        Купить
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {FirstPart()}
            {SecondPart()}
            {BuyBlock()}
            {Contacts()}
        </div>
    )
}