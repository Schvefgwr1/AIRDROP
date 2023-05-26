import React, {useEffect, useState} from "react";
import "./FifthPage.css";
import Contacts from "../Contacts/Contacts";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "../Photos/лого-removebg.png";
import {useLocation} from "react-router-dom";


export default function FifthPage() {

    const location = useLocation();

    const [state, setState] = useState('working');
    const [booking_number, setBookingNumber] = useState(location.state.get('book_num'));
    const [response_inp, setResponseInp] = useState();

    function FirstPart() {
        return (
            <div className="FirstPartBookings">
                <div className="TextFirstPartBookings">
                    Мои бронирования
                </div>
            </div>
        )
    }

    const getAllCookies = () => {
        const allCookies = Cookies.get();
        console.log(allCookies);
        const cookieString = [];
        Object.keys(allCookies).forEach(key => {
            cookieString.push(`${allCookies[key]}`);
        });
        const ArrayCookies = [''];
        let k = 0;
        for(let i = 0; i < cookieString[0].length; i++) {
            if(cookieString[0][i] === ',') {
                k++;
                i++;
                ArrayCookies.push('');
            }
            else {
                ArrayCookies[k] += cookieString[0][i];
            }
        }
        return ArrayCookies;
    }

    const [cookie_str, setCookieStr] = useState(getAllCookies());
    const [response_bookings, setResponse_bookings] = useState([]);
    const [i_need_to_load, setINeedToLoad] = useState(1);

    const TabRequestInput = async (book_ref) => {
        setState('loading');
        let url = `http://95.165.11.56:7654/bookings/${book_ref}`;
        const request = await axios.get(
            url
        ).then(
            res => {
                console.log("Response lololol" + new Date());
                console.log(res);
                setResponseInp(res.data);
                console.log(response_bookings);
                setState('working');
            }
        ).catch(
            (error)=>{
                setResponseInp(null);
                setState('working');
            }
        )
    }

    const TabRequest = async (book_ref) => {
        setState('loading');
        let url = `http://95.165.11.56:7654/bookings/${book_ref}`;
        const request = await axios.get(
            url
        ).then(
            res => {
                console.log("Response lololol" + new Date());
                console.log(res);
                setResponse_bookings(prevState => [...prevState, res.data]);
                console.log(response_bookings);
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

    function Requests() {
        TabRequestInput(booking_number).then(r => {});
        for(let i = 0; i < cookie_str.length; i++) {
            TabRequest(cookie_str[i]).then(r => {});
        }
    }

    useEffect(() => {
        if(i_need_to_load === 1) {
            Requests();
            setINeedToLoad(0);
        }
    }, [i_need_to_load]);

    const DeleteRequest = async (book_ref) => {

        function DeleteCookie(book_num) {
            let NewCookies = "";
            for(let i = 0; i < cookie_str.length; i++) {
                if(book_num === cookie_str[i]) {
                    cookie_str.splice(i, 0);
                }
                else {
                    if(i === cookie_str.length - 1) {
                        NewCookies += cookie_str[i];
                    }
                    else {
                        NewCookies += cookie_str[i] + ", ";
                    }
                }
            }
            Cookies.set('myCookie', NewCookies);
        }

        setState('loading');
        let url = `http://95.165.11.56:7654/bookings/${book_ref}`;
        const request = await axios.delete(
            url
        ).then(
            res => {
                console.log("Response lololol" + new Date());
                console.log(res);
                DeleteCookie(book_ref);
                setINeedToLoad(1);
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

    function Booking(resp) {

        let MyDate = new Date(resp?.tickets[0]?.flight[0]?.scheduled_departure);
        let MyLastDate = new Date(resp?.tickets[0]?.flight[resp?.tickets[0]?.flight.length - 1]?.scheduled_departure);
        console.log(MyLastDate);

        let days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
        let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
            "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

        return (
            <div className="Booking">
                <div className="BookingTitle">
                    &nbsp; &nbsp; Бронирование №: {resp?.book_ref}
                </div>
                <div className="BookingMainContent">
                    <div className="MainFirst">
                        {resp?.tickets[0]?.flight[0]?.departure_airport} &#8594; {resp?.tickets[0]?.flight[resp?.tickets[0]?.flight.length - 1]?.arrival_airport}
                    </div>
                    <div className="MainSecond">
                        <div className="MainSecond1">
                            {MyDate.getDate()} {months[MyDate.getMonth()]}, {days[MyDate.getDay()]}
                        </div>
                        <div className="MainSecond2">
                            {MyDate.getHours()}:{MyDate.getMinutes()} {resp?.tickets[0]?.flight[0]?.departure_airport} &#8594; {resp?.tickets[0]?.flight[resp?.tickets[0]?.flight.length - 1]?.arrival_airport} {MyLastDate.getHours()}:{MyLastDate.getMinutes()}
                        </div>
                        <div className="MainSecond3">
                            <div className="CircleType____">
                                &#920;
                            </div>
                        </div>
                        <div className="MainSecond4">
                            {resp?.tickets[0]?.flight[0]?.aircraft_code}
                        </div>
                        <div className="MainSecond5">
                            {resp?.total_amount} РУБ.
                        </div>
                    </div>
                    <div className="MainThird">
                        <div className="MainThird1">
                            Эконом
                        </div>
                        <div className="MainThird2">
                            {resp?.tickets[0]?.passenger_name}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function Bookings() {
        let bookings = [];
        for(let i = 0; i < cookie_str.length; i++) {
            bookings.push(Booking(response_bookings[i]));
        }
        return (
            <div>
                {bookings}
            </div>
        )
    }

    switch (state) {
        case 'working':
            return (
                <div>
                    {FirstPart()}
                    <h1 className="H1">Бронь по номеру</h1>
                    {Booking(response_inp)}
                    <h1 className="H1">Мои бронирования</h1>
                    {Bookings()}
                    {<Contacts/>}
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