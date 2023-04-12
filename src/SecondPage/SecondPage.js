import React, {Component, useEffect} from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SecondPage.css";
import Contacts from "../Contacts/Contacts";
import {useLocation} from "react-router-dom";
import axios from "axios";
import logo from "../Photos/лого-removebg.png"

export default function SecondPage() {
    const location = useLocation();

    const [state_use, setStateUse] = useState(0);
    const handleChangeStateUse = event => {
        setStateUse(state_use + 1);
    };

    const [state, setState] = useState('');
    const [i_need_to_load, setLoad] = useState(1);

    const [selected, setSelected] = useState('');

    const handleChange = event => {
        setSelected(event.target.value);
    };

    const [d_airport, setDAirport] = useState(location.state.get('d_airport'));
    const [ar_airport, setARAirport] = useState(location.state.get('ar_airport'));
    const [max_transits, setMTransits] = useState(location.state.get('max_transits'));
    const [dep_date1, setDepDate1] = useState(location.state.get('dep_date1'));
    const [dep_date2, setDepDate2] = useState(location.state.get('dep_date2'));
    const [fare_con, setFCon] = useState(location.state.get('fare_con'));
    const [num_pass, setNumPass] = useState(location.state.get('num_pass'));

    const handleChangeDAirport = event => {
        setDAirport(event.target.value);
    };
    const handleChangeARAirport = event => {
        setARAirport(event.target.value);
    };
    const handleChangeMTransits = event => {
        setMTransits(event.target.value);
    };
    const handleChangeDepDate1 = event => {
        setDepDate1(event.target.value);
    };
    const handleChangeDepDate2 = event => {
        setDepDate2(event.target.value);
    };
    const handleChangeFCon = event => {
        setFCon(event.target.value);
    };
    const handleChangeNumPass = event => {
        setNumPass(event.target.value);
    };

    function FirstPart() {

        return (
            <div className="FirstPart_">
                <div className="Inputs">
                    <input className='input0_' type='text' placeholder={d_airport} value={d_airport} onChange={handleChangeDAirport}/>
                    <input className='input1_' type='text' placeholder={ar_airport} value={ar_airport} onChange={handleChangeARAirport}/>
                    <div className='tuda_'></div>
                    <input placeholder={dep_date1} className="input2_" type="date" value={dep_date1} onChange={handleChangeDepDate1} required/>
                    <div className='obratno_'></div>
                    <input placeholder={dep_date2} className="input3_" type="date" value={dep_date2} onChange={handleChangeDepDate2} required/>
                    <input className='input4_' type='text' placeholder={"Количество " + num_pass} value={num_pass} onChange={handleChangeNumPass}/>
                    <select className='input5_' value={fare_con} onChange={handleChangeFCon}>
                        <option disabled={true} value="">
                            {fare_con}
                        </option>
                        <option className='Option' value="Economy">Эконом</option>
                        <option className='Option' value="Business">Бизнес</option>
                    </select>
                </div>
                <div className="Button_">
                    <a className="gradient-button_" onClick={() => setLoad(1)}>Найти</a>
                </div>
            </div>
        )
    }

    const [response1, setResponse1] = useState([]);

    const [response2, setResponse2] = useState([]);

    const FlightsRequest = async (resp_number) => {
        setState('loading');
        let url = 'http://95.165.11.56:7654/' + 'flights/';
        let data;
        if(resp_number === 1) {
            data = {
                'departure_airport': d_airport,
                'arrival_airport': ar_airport,
                'max_transits': max_transits,
                'departure_date': dep_date1,
                'fare_condition': fare_con,
                'num_of_passengers': num_pass
            }
        }
        else if(resp_number === 2) {
            data = {
                'departure_airport': ar_airport,
                'arrival_airport': d_airport,
                'max_transits': max_transits,
                'departure_date': dep_date2,
                'fare_condition': fare_con,
                'num_of_passengers': num_pass
            }
        }
        let body = url + '?';
        for(let key in data) {
            body += key + '=' + String(data[key]);
            if(key === 'departure_date') {
                body += 'T00:00:00.000000'
            }
            if(key !== 'num_of_passengers') {
                body += '&';
            }
        }
        setStateUse(state_use + 1);
        const request = await axios.get(
            body
        ).then(
            res => {
                console.log("Response lololol" + new Date());
                console.log(res);
                if(resp_number === 1) {
                    setResponse1(res.data);
                }
                if(resp_number === 2) {
                    setResponse2(res.data);

                }
                setState('working');
                console.log(state);
            }
        ).catch(
            (error)=>{
                console.log('error');
                console.log(error);
                console.log(location.state);
                if(error.response.status === 422) {
                    setState('error');
                }
            }
        )
    }

    // console.log("responses")
    // console.log(response1)
    // console.log(response2)
    // console.log("end responses")

    useEffect(() => {
        if(i_need_to_load === 1) {
            FlightsRequest(1);
            FlightsRequest(2);
            setLoad(0);
        }
    }, [i_need_to_load]);

    let days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

    function FlightTo(otkuda, kuda, date, k_bil, option, part) {
        //otkuda, kuda, date, k_bil, option, part

        let res = [];
        if(part === 1) {
            res = response1;
        }
        if(part === 2) {
            res = response2;
        }

        let MyDate = new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10));

        const settings = {
            className: "center",
            centerMode: true,
            arrows: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 500
        };

        return (
            <div className="SecondPart_">
                <div>
                    <div className="TextFlight">
                        <h2>Выберите ближайший перелет {option}: {days[MyDate.getDay()]}, {MyDate.getDate()} {months[MyDate.getMonth()]}</h2>
                        <h2>{otkuda} &#8594; {kuda}</h2>
                    </div>

                </div>
                <div className="Options">
                    <select className='Sort' value={selected} onChange={handleChange}>
                        <option disabled={true} value="">
                            Сортировать по
                        </option>
                        <option className='TextOption' value="economy">Возрастанию</option>
                        <option className='TextOption' value="business">Убыванию</option>
                    </select>
                </div>
                {AllFlights(res)}
            </div>
        )
    }

    function AllFlights(result) {
        const cards = [];
        for(let i = 0; i < result.length; i++) {
            cards.push(FlightCard(result[i]));
        }
        return cards;
    }

    function FlightCard(road) {

        let peres = "";
        if(road.flights.length > 1) {
            peres = String(road?.flights?.length - 1) + " пересадка"
        }
        else {
            peres = "без пересадок";
        }

        let date_dep = new Date(road?.flights[0]?.scheduled_departure);
        let date_ar = new Date(road?.flights[road?.flights.length - 1]?.scheduled_arrival)

        let Class = "";
        if(road?.fare_condition === "Economy") {
            Class = "Эконом";
        }
        else {
            Class = "Бизнес";
        }

        let times = road?.time;
        times = times.replace(/day/, 'день');
        times = times.slice(0, -3);

        function getPoint() {
            return (
                <text>
                    &nbsp; &#8226;
                </text>
            )
        }

        function ots() {
            const points = [];
            if(road?.flights.length === 1) {
                for(let i = 0; i < 13; i++)
                    points.push(getPoint());
            }
            if(road?.flights.length === 2) {
                for(let i = 0; i < 5; i++)
                    points.push(getPoint());
                points.push(<text> &nbsp; {road?.flights[0]?.arrival_airport}</text>);
                for(let i = 0; i < 5; i++)
                    points.push(getPoint());
            }
            if(road?.flights.length === 3) {
                for(let i = 0; i < 3; i++)
                    points.push(getPoint());
                points.push(<text> &nbsp; {road?.flights[0]?.arrival_airport + getPoint()} &nbsp; {road?.flights[1]?.arrival_airport}</text>);
                for(let i = 0; i < 3; i++)
                    points.push(getPoint());
            }
            return (
                <text className="Points">
                    {points} &nbsp;
                </text>
            )
        }
        //'2023-04-18T19:20:00+03:00'
        //"8:25:00"
        return (
            <div className="FlightCard">
                <div className="TextInformation">
                    <div className="TextPeresadki">
                        {peres}
                    </div>
                    <div className="TextInf">
                        {road?.flights[0]?.scheduled_departure.substring(11, 16)} {road?.flights[0]?.departure_airport}
                        {ots()}
                        {road?.flights[road?.flights?.length - 1]?.arrival_airport} {road?.flights[road?.flights?.length - 1]?.scheduled_arrival.substring(11, 16)}
                        <br/>
                        <br/>
                        {date_dep.getDate()} {months[date_dep.getMonth()]}, {days[date_dep.getDay()] + " "}  &#8226;
                        в пути {times} ч:мин  &#8226;
                        {" " + date_ar.getDate()} {months[date_ar.getMonth()]}, {days[date_ar.getDay()] + " "}
                    </div>
                </div>
                <div className="Block1">
                    <div className="BlockText">
                        {Class} базовый
                        <br/>
                        <br/>
                        {road?.cost} РУБ.
                    </div>
                </div>
                <div className="Block2">
                    <div className="BlockText">
                        {Class} стандарт
                        <br/>
                        <br/>
                        {road?.cost} РУБ.
                    </div>
                </div>
            </div>
        )
    }

    function MainContent() {
        return (
            <div className="App_">
                {FirstPart()}
                {FlightTo(d_airport, ar_airport, dep_date1, num_pass, "туда", 1)}
                {FlightTo(ar_airport, d_airport, dep_date2, num_pass, "обратно", 2)}
                <Contacts/>
            </div>
        )
    }

    switch (state) {
         case 'working':
            return (
                <div>
                    {MainContent()}
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
                        <a href="/" className="gradient-button_" onClick={() => setLoad(1)}>Вернуться на стартовую страницу</a>
                    </div>
                </div>
            )
    }
}