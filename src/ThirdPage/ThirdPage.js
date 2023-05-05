import React from "react";
import { useState } from "react";
import {Navigate, useLocation} from "react-router-dom";
import "../SecondPage/SecondPage.css";
import "./ThirdPage.css"
import Contacts from "../Contacts/Contacts";
import axios from "axios";
import logo from "../Photos/лого-removebg.png";

export default function ThirdPage() {

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const [state, setState] = useState("confirm");

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const location = useLocation();

    const [ticket1, setTicket1] = useState(location.state.get('ticket1'));
    const [ticket2, setTicket2] = useState(location.state.get('ticket2'));

    const [d_airport, setDAirport] = useState(location.state.get('ticket1')?.flights[0]?.departure_airport);
    const [ar_airport, setARAirport] = useState(location.state.get('ticket2')?.flights[0]?.departure_airport);
    const [max_transits, setMTransits] = useState(2);
    const [dep_date1, setDepDate1] = useState(location.state.get('ticket1')?.flights[0]?.scheduled_departure);
    const [dep_date2, setDepDate2] = useState(location.state.get('ticket2')?.flights[0]?.scheduled_departure);
    const [fare_con, setFCon] = useState(location.state.get('ticket1')?.fare_condition);
    const [num_pass, setNumPass] = useState(location.state.get('ticket1')?.num_of_passengers);

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

    const [stateNavigation, setStateNavigation] = useState(false);
    const handleChangeStateNavigation = event => {
        setStateNavigation(true);
    }

    function getParsedDate(strDate){
        let strSplitDate = String(strDate).split(' ');
        let date = new Date(strSplitDate[0]);
        let dd = date.getDate();
        let mm = date.getMonth() + 1; //January is 0!

        let yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date =  yyyy + "-" + mm + "-" + dd;
        return date.toString();
    }

    function FirstPart() {
        return (
            <div className="FirstPart_">
                <div className="Inputs">
                    <input className='input0_' type='text' placeholder={d_airport} value={d_airport} onChange={handleChangeDAirport}/>
                    <input className='input1_' type='text' placeholder={ar_airport} value={ar_airport} onChange={handleChangeARAirport}/>
                    <div className='tuda_'></div>
                    <input placeholder={getParsedDate(dep_date1)} className="input2_" type="date" value={dep_date1} onChange={handleChangeDepDate1} required/>
                    <div className='obratno_'></div>
                    <input placeholder={getParsedDate(dep_date2)} className="input3_" type="date" value={dep_date2} onChange={handleChangeDepDate2} required/>
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
                    <a className="gradient-button_" onClick={handleChangeStateNavigation}>Найти</a>
                    {stateNavigation && <Navigate className to="/flights_result" state={new Map([
                        ['d_airport', d_airport],
                        ['ar_airport', ar_airport],
                        ['max_transits', max_transits],
                        ['dep_date1', getParsedDate(dep_date1)],
                        ['dep_date2', getParsedDate(dep_date2)],
                        ['fare_con', fare_con],
                        ['num_pass', num_pass]
                    ])} replace={true}/>}
                </div>
            </div>
        )
    }

    function FlightCard(ticket) {

        let days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
        let months = ["Янв", "Фев", "Марта", "Апр", "Мая", "Июня",
            "Июля", "Авг", "Сент", "Окт", "Нояб", "Дек"];

        let peres = "";
        if(ticket.flights.length > 1) {
            peres = String(ticket?.flights?.length - 1) + " пересадка"
        }
        else {
            peres = "без пересадок";
        }

        let date_dep = new Date(ticket?.flights[0]?.scheduled_departure);
        let date_ar = new Date(ticket?.flights[ticket?.flights.length - 1]?.scheduled_arrival)

        let Class = "";
        if(ticket?.fare_condition === "Economy") {
            Class = "Эконом";
        }
        else {
            Class = "Бизнес";
        }

        let times = ticket?.time;
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
            if(ticket?.flights.length === 1) {
                for(let i = 0; i < 13; i++)
                    points.push(getPoint());
            }
            if(ticket?.flights.length === 2) {
                for(let i = 0; i < 5; i++)
                    points.push(getPoint());
                points.push(<text> &nbsp; {ticket?.flights[0]?.arrival_airport}</text>);
                for(let i = 0; i < 5; i++)
                    points.push(getPoint());
            }
            if(ticket?.flights.length === 3) {
                for(let i = 0; i < 3; i++)
                    points.push(getPoint());
                points.push(<text> &nbsp; {ticket?.flights[0]?.arrival_airport + getPoint()} &nbsp; {ticket?.flights[1]?.arrival_airport}</text>);
                for(let i = 0; i < 3; i++)
                    points.push(getPoint());
            }
            return (
                <text className="Points">
                    {points} &nbsp;
                </text>
            )
        }

        return (
            <div className="FlightCard_">
                <div className="DateBlock">
                    <div className="Date_1">
                        {days[date_dep.getDay()]}
                    </div>
                    <div className="Date_2">
                        {date_dep.getDate()}
                    </div>
                    <div className="Date_3">
                        {months[date_dep.getMonth()]}
                    </div>
                </div>
                <div className="TextInformation_">
                    <div className="TextPeresadki_">
                        {peres}
                    </div>
                    <div className="TextInf_">
                        {ticket?.flights[0]?.scheduled_departure.substring(11, 16)} {ticket?.flights[0]?.departure_airport}
                        {ots()}
                        {ticket?.flights[ticket?.flights?.length - 1]?.arrival_airport} {ticket?.flights[ticket?.flights?.length - 1]?.scheduled_arrival.substring(11, 16)}
                        <br/>
                        <br/>
                        {date_dep.getDate()} {months[date_dep.getMonth()]}, {days[date_dep.getDay()] + " "}  &#8226;
                        в пути {times} ч:мин  &#8226;
                        {" " + date_ar.getDate()} {months[date_ar.getMonth()]}, {days[date_ar.getDay()] + " "}
                    </div>
                </div>
                <div className="Block1_">
                    <div className="BlockText_">
                        {Class}
                        <br/>
                        <br/>
                        {ticket?.cost} РУБ.
                    </div>
                </div>
            </div>
        )
    }

    function FlightsInformation() {
        return (
            <div>
                <div className="MiniText">
                    <h2>Вы выбрали</h2>
                    <text>Перелет туда-обратно</text>
                </div>
                {FlightCard(ticket1)}
                {FlightCard(ticket2)}
            </div>
        )
    }

    function ThirdPart() {
        return (
            <div className="ThirdPart">
                <div className="DescriptionClass">
                    <text>
                        Комфортный<br/>полет
                    </text>
                    <div className="PhotoLogo">
                        &nbsp;
                    </div>
                    <div className="PhotoAirBus">
                        &nbsp;
                    </div>
                </div>
                <div className="Buy">
                    <div className="BuyBlock">
                        <div className="BuyText">
                            Итого:  &nbsp; &nbsp; &nbsp; &nbsp; {ticket1?.cost + ticket2?.cost} РУБ.
                        </div>
                        <div className="BuyButton" onClick={() => setState("personal_inp")}>
                            <div className="TextButton_">
                                Купить
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    const [Names, setNames] = useState([]);
    const [tel_n, setTelN] = useState([]);
    const [el_address, setElAddress] = useState([]);
    const [id, setId] = useState([]);
    const handleChangeName = (event, num) => {
        setNames(prevNames => {
            let newNames = [...prevNames];
            newNames[num] = event.target.value;
            return newNames;
        });
    };
    const handleChangeTelN = (event, num) => {
        setTelN(prevTels => {
            let newTels = [...prevTels];
            newTels[num] = event.target.value;
            return newTels;
        });
    };
    const handleChangeID = (event, num) => {
        setId(prevId => {
            let newId = [...prevId];
            newId[num] = event.target.value;
            return newId;
        });
    };
    const handleChangeElAddress = (event, num) => {
        setElAddress(prevAddress => {
            let newAddress = [...prevAddress];
            newAddress[num] = event.target.value;
            return newAddress;
        });
    };

    function PersonalInput(num) {
        return (
            <div>
                <h2 className="MiniText_">
                    Введите персональные данные {num+1} пассажира
                </h2>
                <div className="InputBlock">
                    <div className="FirstPartInputs">
                        <input className="InputPersonal1" placeholder="Фамилия и имя" type='text' value={Names[num]} onChange={(e) => handleChangeName(e, num)}/>
                        <input className="InputPersonal1" placeholder="Номер телефона" type='text' value={tel_n[num]} onChange={(e) => handleChangeTelN(e, num)}/>
                        <input className="InputPersonal1" placeholder="Электронная почта" type='text' value={el_address[num]} onChange={(e) => handleChangeElAddress(e, num)}/>
                    </div>
                    <div className="SecondPartInputs">
                        <input className="InputPersonal2" placeholder="Паспортные данные" type='text' value={id[num]} onChange={(e) => handleChangeID(e, num)}/>
                        <div className="ButtonDiv">
                            <div className="TextButton2">
                                Заполняя анкету, вы соглашаетесь на обработку персональных данных
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function PersonalInputs() {
        let Inputs = [];
        for(let i = 0; i < num_pass; i++) {
            Inputs.push(PersonalInput(i));
        }
        return Inputs;
    }

    const [response1, setResponse1] = useState();
    const [response2, setResponse2] = useState();

    const PostBookingRequest = async (ticket, response) => {
        setState('loading');
        let url = 'http://95.165.11.56:7654/' + 'bookings/';
        let flights_array = [];
        for(let i = 0; i < ticket?.flights.length; i++) {
            flights_array.push(ticket?.flights[i]?.flight_id);
        }
        let passengers = [];
        for(let i = 0; i < Names.length; i++) {
            passengers.push({
               "passenger_id": id[i],
               "passenger_name": Names[i],
               "contact_data": {
                   "phone": tel_n[i],
                   "email": el_address[i]
               }
            });
        }
        let data = {
            "fare_condition": ticket?.fare_condition,
            "flights": flights_array,
            "passengers": passengers
        }
        console.log(data);
        const request = await axios.post(
            url,
            data
        ).then(
            res => {
                console.log("Response lololol" + new Date());
                console.log(res);
                if(response === response1) {
                    setResponse1(res.data);
                }
                if(response === response2) {
                    setResponse2(res.data);
                }
            }
        ).catch(
            (error)=>{
                console.log('error');
                if(error.response.status === 422) {
                    setState('error');
                }
            }
        )
    }

    function Responses() {
        PostBookingRequest(ticket1, response1);
        PostBookingRequest(ticket2, response2);
        setState("receipt");
    }

    function ReceiptTitle() {
        return (
            <div className="FirstPartBookings">
                <div className="TextFirstPartBookings">
                    Маршрутная квитанция
                </div>
            </div>
        )
    }

    function Card() {

    }

    function Check1() {
        return (
            <div className="Check1">
                {FlightCard(ticket1)}

            </div>
        )
    }

    switch (state) {
        case "confirm":
            return(
                <div className="App_">
                    {FirstPart()}
                    {FlightsInformation()}
                    {ThirdPart()}
                    <Contacts/>
                </div>
            )
        case "personal_inp":
            return (
                <div className="App_">
                    {FirstPart()}
                    <div onClick={() => setState("confirm")} className="Test">
                        go back
                    </div>
                    {PersonalInputs()}
                    <div className="BuyButton3" onClick={() => Responses()}>
                        Оплатить
                    </div>
                    <Contacts/>
                </div>
            )
        case "receipt":
            return (
                <div>
                    {ReceiptTitle()}
                    {Check1()}
                </div>
            )
        case 'error':
            return (
                <div className="FirstPart">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2 className="Zag_err">Введены неправильные данные</h2>
                    <div className="Button_1">
                        <a className="gradient-button_" onClick={() => setState("personal_inp")}>Вернуться к заполнению данных</a>
                    </div>
                </div>
            )
    }

}