import React from "react";
import "./FifthPage.css";
import Contacts from "../Contacts/Contacts";


export default function FifthPage() {

    function FirstPart() {
        return (
            <div className="FirstPartBookings">
                <div className="TextFirstPartBookings">
                    Мои бронирования
                </div>
            </div>
        )
    }

    function Booking() {
        return (
            <div className="Booking">
                <div className="BookingTitle">
                    &nbsp; &nbsp; Бронирование №: NT87ES
                </div>
                <div className="BookingMainContent">
                    <div className="MainFirst">
                        VKO &#8594; LED
                    </div>
                    <div className="MainSecond">
                        <div className="MainSecond1">
                            22 Июля, Сб
                        </div>
                        <div className="MainSecond2">
                            5:20 LED &#8594; DME 06:50
                        </div>
                        <div className="MainSecond3">
                            <div className="CircleType____">
                                WA
                            </div>
                        </div>
                        <div className="MainSecond4">
                            3017
                        </div>
                        <div className="MainSecond5">
                            1ч 30мин
                        </div>
                    </div>
                    <div className="MainThird">
                        <div className="MainThird1">
                            Эконом
                        </div>
                        <div className="MainThird2">
                            Airbus 321
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function Bookings() {
        return (
            <div>
                {Booking()}
                {Booking()}
                {Booking()}
            </div>
        )
    }

    return (
        <div>
            {FirstPart()}
            {Bookings()}
            {<Contacts/>}
        </div>
    )
}