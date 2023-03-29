import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import tg from '../Photos/tg.png'
import wt from '../Photos/wt.png'
import './FirstPage.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FirstPage() {

    const settings2 = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        autoplaySpeed: 50
    };

    function MenuPart() {

        const [part, setPart] = useState(0);

        const Click = (n) => {
            console.log("Click good!!!");
            setPart(n);
        }

        switch (part) {
            case 0:
                return (
                    <div className="Menu">
                        <nav className="tabs">
                            <ul>
                                <li className="active"><a>Купить билеты</a></li>
                                <li><a onClick={event => Click(1)}>Статус рейса</a></li>
                                <li><a onClick={event => Click(2)}>Регистрация на рейс</a></li>
                                <li><a onClick={event => Click(3)}>Багаж</a></li>
                            </ul>
                        </nav>
                        <div className="Form1">
                            <br/>
                            <div className="Form1Part1">
                                <input className='input0' type='text' placeholder="Откуда"/>
                                <input className='input1' type='text' placeholder="Куда"/>
                                <div className='tuda'></div>
                                <input className='input2' type="date" id="date" name="date"/>
                                <div className='obratno'></div>
                                <input className='input3' type="date" id="date" name="date"/>
                            </div>
                            <div className="Form1Part2">
                                <input className='input4' type='text' placeholder="Кол-во билетов"/>
                                <select className='input5'>
                                    <option className='Option' value="economy">Эконом</option>
                                    <option className='Option' value="business">Бизнес</option>
                                </select>
                            </div>
                            <div className="Button">
                                <a href="" className="gradient-button">Найти</a>
                            </div>
                        </div>
                    </div>
                )
            case 1:
                return (
                    <div className="Menu">
                        <nav className="tabs">
                            <ul>
                                <li><a onClick={event => Click(0)}>Купить билеты</a></li>
                                <li className="active"><a>Статус рейса</a></li>
                                <li><a onClick={event => Click(2)}>Регистрация на рейс</a></li>
                                <li><a onClick={event => Click(3)}>Багаж</a></li>
                            </ul>
                        </nav>
                        <div className="Form1">
                            <br/>
                            <input className='input6' type='text' placeholder="Номер рейса"/>
                            <div className='tuda2'></div>
                            <input className='input7' type="date" id="date" name="date"/>
                            <div className="Button2">
                                <a href="" className="gradient-button">Найти</a>
                            </div>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="Menu">
                        <nav className="tabs">
                            <ul>
                                <li><a onClick={event => Click(0)}>Купить билеты</a></li>
                                <li><a onClick={event => Click(1)}>Статус рейса</a></li>
                                <li className="active"><a>Регистрация на рейс</a></li>
                                <li><a onClick={event => Click(3)}>Багаж</a></li>
                            </ul>
                        </nav>
                        <div className="Form1">
                            <br/>
                            <input className='input8' type='text' placeholder="Фамилия пассажира (латиницой)"/>
                            <input className='input9' type='text' placeholder='Номер заказа (брони)'/>
                            <div className="Button2">
                                <a href="" className="gradient-button">Найти</a>
                            </div>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="Menu">
                        <nav className="tabs">
                            <ul>
                                <li><a onClick={event => Click(0)}>Купить билеты</a></li>
                                <li><a onClick={event => Click(1)}>Статус рейса</a></li>
                                <li><a onClick={event => Click(2)}>Регистрация на рейс</a></li>
                                <li className="active"><a>Мои бронирования</a></li>
                            </ul>
                        </nav>
                        <div className='Form1'>
                            <input className='input10' type='text' placeholder='Номер заказа (брони)'/>
                            <div className="Button2">
                                <a href="" className="gradient-button">Найти</a>
                            </div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="App">
            <div>

                <div className="FirstPart">
                    {MenuPart()}
                </div>

                <div className="About">
                    <h1>О КОМПАНИИ</h1>
                    <div className="TextAbout">
                        <div>AirWorld - это авиакомпания, которая предлагает международные и внутренние авиарейсы
                            для пассажиров, желающих путешествовать по всему миру. Компания имеет сильный флот,
                            состоящий из современных самолетов различных моделей, которые обеспечивают максимальный
                            комфорт и безопасность во время полета.
                            AirWorld предлагает широкий спектр услуг, включая экономичные и бизнес-классы
                            обслуживания, а также премиум-класс для пассажиров, которые ищут наивысший уровень
                            комфорта и сервиса. Компания также предоставляет бесплатный Wi-Fi и развлечения во время
                            полета, включая фильмы, телешоу и музыку.
                        </div>
                        <br></br>
                        <div>AirWorld уделяет большое внимание безопасности и техническому состоянию своих
                            самолетов, проводя регулярное техническое обслуживание и проверку каждого самолета перед
                            вылетом. Компания также имеет опытных пилотов и команду профессиональных
                            бортпроводников, которые готовы оказать помощь и поддержку пассажирам на протяжении
                            всего полета.
                        </div>
                        <br></br>
                        <div>AirWorld предлагает удобные варианты бронирования билетов через свой сайт или мобильное
                            приложение, где пассажиры могут выбрать свой маршрут, удобное время вылета и класс
                            обслуживания. Компания также предоставляет услуги по оформлению виз и багажа для
                            пассажиров, чтобы сделать путешествие как можно более комфортным и безопасным.
                            AirWorld стремится предоставить лучший опыт полета для своих пассажиров и сделать их
                            путешествие приятным и комфортным.
                        </div>
                    </div>

                    <Slider {...settings2} className="Slider2">
                        <div className="City1">
                            <h2>Стамбул</h2>
                            <div>от 9999руб.</div>
                        </div>
                        <div className="City2">
                            <h2>Рим</h2>
                            <div>от 9999руб.</div>
                        </div>
                        <div className="City3">
                            <h2>Берлин</h2>
                            <div>от 9999руб.</div>
                        </div>
                        <div className="City4">
                            <h2>Париж</h2>
                            <div>от 9999руб.</div>
                        </div>
                        <div className="City5">
                            <h2>Аллепо</h2>
                            <div>от 9999руб.</div>
                        </div>
                        <div className="City6">
                            <h2>Мариуполь</h2>
                            <div>от 9999руб.</div>
                        </div>
                    </Slider>

                    <div className="Contacts">
                        <div className="TextContacts">
                            <br/>
                            Поддержка клиентов
                            <br/>
                            <img src={tg} alt="" className="Tg"/>
                            <div className="Number">
                                +7 (391) 222 - 02 - 22
                            </div>
                            <img src={wt} alt="" className="Tg"/>
                            <div className="Number">
                                +7 (391) 222 - 02 - 22
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}