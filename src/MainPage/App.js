import logo from '../Photos/лого-removebg.png'
import fon from '../Photos/фон.png'
import tg from '../Photos/tg.png'
import wt from '../Photos/wt.png'
import './App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, {Component} from "react";
import Slider from "react-slick";

export default class App extends Component {
    render() {
        const settings = {
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            //variableWidth: true,
            adaptiveHeight: true
        };

        const settings2 = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 500,
            autoplaySpeed: 50
        };

        return (
            <div className="App">
                <div>
                    <img src={fon} className="Body"/>
                    <Slider {...settings} className="Slider">
                        <div>
                            <h3>Покупка билетов</h3>
                            <div className="OtkudaKuda">
                                <input className='input1' type='text' placeholder="Откуда"/>
                                <input className='input1' type='text' placeholder="Куда"/>
                            </div>
                            <div className="OtkudaKuda">
                                <label htmlFor="date">Туда: </label>
                                <input className='input1' type="date" id="date" name="date"/>
                                <label htmlFor="date">Обратно: </label>
                                <input className='input1' type="date" id="date" name="date"/>
                            </div>
                            <div className="Form1Part2">
                                <input className='input1' type='text' placeholder="Кол-во билетов"/>
                                <div className="form_radio">
                                    <input id="radio-1" type="radio" name="radio" value="1" checked/>
                                        <label htmlFor="radio-1">Эконом</label>
                                </div>
                                <div className="form_radio">
                                    <input id="radio-2" type="radio" name="radio" value="2"/>
                                        <label htmlFor="radio-2">Бизнес</label>
                                </div>
                            </div>
                            <a href="" className="gradient-button">Найти</a>
                        </div>
                        <div>
                            <h3>Регистрация на рейс</h3>
                        </div>
                        <div>
                            <h3>Статус рейса</h3>
                        </div>
                        <div>
                            <h3>Мои бронирования</h3>
                        </div>
                    </Slider>
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
};
