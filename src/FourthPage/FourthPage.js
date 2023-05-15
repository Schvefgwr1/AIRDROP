import React from "react";
import "./FourhPage.css";
import { useNavigate } from "react-router-dom";
import {Navigate, useLocation} from "react-router-dom";
import {useState} from "react";
import Contacts from "../Contacts/Contacts";
import {useEffect} from "react";
import axios from "axios";
import logo from "../Photos/лого-removebg.png";

export default function FourthPage() {

    const location = useLocation();
    const [d_airport, setDAirport] = useState(location.state.get('d_airport'));
    const [ar_airport, setArAirport] = useState(location.state.get('ar_airport'));
    const [dep_date, setDepDate] = useState(location.state.get('dep_date'));
    const handleChangeDAirport = event => {
        setDAirport(event.target.value);
    };
    const handleChangeArAirport = event => {
        setArAirport(event.target.value);
    };
    const handleChangeDepDate = event => {
        setDepDate(event.target.value);
    };

    function FirstPart() {
        return (
            <div className="FirstPart___">
                <div className="BigText">
                    Табло рейсов
                </div>
                <div className="Inputs___">
                    <input className="Input1___" type="text" placeholder={d_airport} value={d_airport} onChange={handleChangeDAirport}/>
                    <input className="Input2___" type="text" placeholder={ar_airport} value={ar_airport} onChange={handleChangeArAirport}/>
                    <input className="Input3___" type="date" placeholder={dep_date} value={dep_date} onChange={handleChangeDepDate} required/>
                    <div className="Button___" onClick={() => setINeedToLoad(1)}>
                        <a className="gradient-button___">Найти</a>
                    </div>
                </div>
            </div>
        )
    }

    const [i_need_to_load, setINeedToLoad] = useState(1);
    const [state, setState] = useState("working");
    const [response, setResponse] = useState([]);
    const [best_price, setBestPrice] = useState(-1);

    useEffect(() => {
        if(i_need_to_load === 1) {
            TabRequest(1);
            BestPriceRequest();
            setINeedToLoad(0);
        }
    }, [i_need_to_load]);

    const TabRequest = async (resp_number) => {
        setState('loading');
        let url = `http://95.165.11.56:7654/flights/table/${d_airport}?departure_date=${dep_date}T00:00:00.000000`;
        const request = await axios.get(
            url
        ).then(
            res => {
                console.log("Response lololol" + new Date());
                console.log(res);
                setResponse(res.data);
                setState('working');
            }
        ).catch(
            (error)=>{
                if(error.response.status === 422 || error.response.status === 404) {
                    setState('error');
                }
                if(error.response.status === 503) {
                    setState('error');
                }
            }
        )
    }

    const BestPriceRequest = async () => {
        setState('loading');
        let url = 'http://95.165.11.56:7654/' + 'flights/best_price/';
        let data = {
            'departure_airport': ar_airport,
            'arrival_airport': d_airport,
            'max_transits': 2,
            'departure_date': dep_date,
            'fare_condition': 'Economy',
            'num_of_passengers': 1
        }
        let body = url + '?';
        for (let key in data) {
            body += key + '=' + String(data[key]);
            if (key === 'departure_date') {
                body += 'T00:00:00.000000'
            }
            if (key !== 'num_of_passengers') {
                body += '&';
            }
        }
        const request = await axios.get(
            body
        ).then(
            res => {
                console.log("Response lololol" + new Date());
                console.log(res);
                let min_price = 1000000;
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i] < min_price) {
                        min_price = res.data[i];
                    }
                }
                setBestPrice(min_price);
            }
        ).catch(
            (error) => {
                console.log('error');
                if (error.response.status === 422 || error.response.status === 404) {
                    setState('error');
                }
                if (error.response.status === 503) {
                    setState('error');
                }
            }
        )
    }

    function Flight(flight) {
        let str1 = "";
        let str2 = "";
        switch (flight?.status) {
            case 'On Time':
                str1 = "Без изменений";
                str2 = "Регистрация закрыта";
                break;
            case 'Delayed':
                str1 = "Отложен";
                str2 = "Регистрация закрыта";
                break;
            case 'Departed':
                str1 = "Ушёл";
                str2 = "Регистрация закрыта";
                break;
            case 'Arrived':
                str1 = "Прибыл";
                str2 = "Регистрация закрыта";
                break;
            case 'Scheduled':
                str1 = "По расписанию";
                str2 = "Регистрация открыта";
                break;
            case 'Canceled':
                str1 = "Отменен";
                str2 = "Регистрация закрыта";
                break;
        }

        return (
            <div className="Flight___">
                <div className="TypeFlight___">
                    <div className="CircleType___">
                        {flight?.flight_no?.substr(0, 2)}
                    </div>
                    <div className="NumberType___">
                        {flight?.flight_no?.substr(2, 4)}
                    </div>
                </div>
                <div className="TextFlight___">
                    <div className="TextPlaneFlight___">
                        <div className="TextFlight1___">
                            По плану
                        </div>
                        <div className="TextFlight2___">
                            {flight?.scheduled_departure.substr(11, 5)}
                            &#8594;
                            {flight?.scheduled_arrival.substr(11, 5)}
                        </div>
                    </div>
                    <div className="TextRealFlight___">
                        <div className="TextFlight3___">
                            Расчетное
                        </div>
                        <div className="TextFlight4___">
                            {flight?.scheduled_departure.substr(11, 5)}
                            &#8594;
                            {flight?.scheduled_arrival.substr(11, 5)}
                        </div>
                    </div>
                </div>
                <div className="StatusFlight___">
                    {str1}<br/>
                    Регистрация открыта
                    <br/>
                    {flight?.departure_airport} &#8594; {flight?.arrival_airport}
                </div>
            </div>
        )
    }

    function Flights() {
        let flights = [];
        for(let i = 0; i < response.length; i++) {
            flights.push(Flight(response[i]));
        }
        return (
            <div>
                {flights}
            </div>
        )
    }

    function SecondPart() {
        return (
            <div>
                <div className="Text___">
                    {response[0]?.departure_airport}
                </div>
                {Flights()}
            </div>
        )
    }

    const [stateNavigation, setStateNavigation] = useState(false);
    const handleChangeStateNavigation = event => {
        setStateNavigation(true);
    };

    function BuyBlock() {
        return (
            <div className="BuyBlock___">
                <div className="BuyText___">
                    {d_airport} &mdash; {ar_airport}
                </div>
                <div className="BuyPrice___">
                    от {best_price} РУБ.
                </div>
                <div className="BuyButton___">
                    <div className="BuyButtonReal___" onClick={handleChangeStateNavigation}>
                        Купить
                        {stateNavigation && <Navigate className to="/flights_result" state={new Map([
                            ['d_airport', d_airport],
                            ['ar_airport', ar_airport],
                            ['max_transits', 2],
                            ['dep_date1', dep_date],
                            ['dep_date2', dep_date],
                            ['fare_con', 'Economy'],
                            ['num_pass', 1]
                        ])} replace={true}/>}
                    </div>
                </div>
            </div>
        )
    }

    switch (state) {
        case 'working':
            return (
                <div>
                    {FirstPart()}
                    {SecondPart()}
                    {BuyBlock()}
                    {Contacts()}
                </div>
            )
        case 'loading':
            return(
                <div>
                    {FirstPart()}
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
            )
        case 'error':
            return (
                <div className="FirstPart">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2 className="Zag_err">Введены неправильные данные</h2>
                    <div className="Button_1">
                        <a href="/" className="gradient-button_" onClick={() => setINeedToLoad(1)}>Вернуться на стартовую страницу</a>
                    </div>
                </div>
            )
    }
}