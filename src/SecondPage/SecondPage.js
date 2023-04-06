import React, {Component} from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SecondPage.css";
import Contacts from "../Contacts/Contacts";

export default function SecondPage() {
    function FirstPart(otkuda, kuda, date1, date2, k_bil, Class) {
        const [selected, setSelected] = useState('');

        const handleChange = event => {
            setSelected(event.target.value);
        };

        return (
            <div className="FirstPart_">
                <div className="Inputs">
                    <input className='input0_' type='text' placeholder={otkuda}/>
                    <input className='input1_' type='text' placeholder={kuda}/>
                    <div className='tuda_'></div>
                    <input placeholder={date1} className="input2_" type="date" required/>
                    <div className='obratno_'></div>
                    <input placeholder={date2} className="input3_" type="date" required/>
                    <input className='input4_' type='text' placeholder={"Количество " + k_bil}/>
                    <select className='input5_' value={selected} onChange={handleChange}>
                        <option disabled={true} value="">
                            {Class}
                        </option>
                        <option className='Option' value="economy">Эконом</option>
                        <option className='Option' value="business">Бизнес</option>
                    </select>
                </div>
                <div className="Button_">
                    <a href="" className="gradient-button_">Найти</a>
                </div>
            </div>
        )
    }

    function FlightTo(otkuda, kuda, date, k_bil, option, Class) {
        let MyDate = new Date(date.substring(6, 10), date.substring(3, 5), date.substring(0, 2));

        let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
        let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
                      "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

        const settings = {
            className: "center",
            centerMode: true,
            arrows: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 500
        };

        const [selected, setSelected] = useState('');

        const handleChange = event => {
            setSelected(event.target.value);
        };

        return (
            <div className="SecondPart_">
                <div>
                    <div className="TextFlight">
                        <h2>Выберите перелет {option}: {days[MyDate.getDay()]}, {MyDate.getDate()} {months[MyDate.getMonth()-1]}</h2>
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
                {FlightCard()}
                {FlightCard()}
            </div>
        )
    }

    function FlightCard() {
        return (
            <div className="FlightCard">
                <div className="TextInformation">
                    <div className="TextPeresadki">
                        1 пересадка
                    </div>
                    <div className="TextInf">
                        17:35 DME
                        &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226;
                        KNV 03:05
                        <br/>
                        <br/>
                        25 фев, сб
                        в пути 7 ч 30 мин
                        26 фев, вс
                    </div>
                </div>
                <div className="Block1">
                    <div className="BlockText">
                        Эконом базовый
                        <br/>
                        <br/>
                        35 000 РУБ.
                    </div>
                </div>
                <div className="Block2">
                    <div className="BlockText">
                        Эконом стандарт
                        <br/>
                        <br/>
                        35 000 РУБ.
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="App_">
            {FirstPart("Москва", "Тверь", "21.01.2023", "25.01.2023", 3, "Эконом")}
            {FlightTo("Москва", "Тверь", "16.02.2012", 1, "туда", "Эконом")}
            {FlightTo("Москва", "Тверь", "16.02.2012", 1, "обратно", "Эконом")}
            <Contacts/>
        </div>
    )
}