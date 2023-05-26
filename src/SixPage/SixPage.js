import React, {useState} from "react";
import "./SixPage.css";
import Cookies from "js-cookie";
import Contacts from "../Contacts/Contacts";

export default function SixPage() {

    function FirstPart() {
        return (
            <div className="FirstPartBookings">
                <div className="TextFirstPartBookings">
                    Регистрация на рейс
                </div>
            </div>
        )
    }

    const getAllCookies = () => {
        const allCookies = Cookies.get();
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

    const [cookies, setCookies] = useState(getAllCookies());

    function OptionsForm() {
        let form = [];
        for(let i = 0; i < cookies.length; i++) {
            form.push(<option className='Option' value={cookies[i]}>{cookies[i]}</option>);
        }
        return form;
    }



    function Form() {
        return (
            <div className="FormCont">
                <div className="FormFirst">
                    <div className="Cont">
                        <input type='text' placeholder="ФИО" className="FormContentName"/>
                    </div>
                    <div className="Cont">
                        <input type='text' placeholder="ПАСПОРТ" className="FormContentID"/>
                    </div>
                    <div className="Cont">
                        <select className='FormContentBook'>
                            <option disabled={true} value="">
                                Номера бронирований
                            </option>
                            {OptionsForm()}
                        </select>
                    </div>
                </div>
                <div className="FormSecond">
                    <div className="Cont">
                        <input type='text' placeholder="Телефон" className="FormContentName"/>
                    </div>
                    <div className="Cont">
                        <input type='text' placeholder="EMAIL" className="FormContentID"/>
                    </div>
                    <div className="Cont">
                        <div className="_gradient-button">
                            ОТПРАВИТЬ
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            {FirstPart()}
            {Form()}
            <Contacts/>
        </div>
    )
}