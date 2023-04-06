import React from "react";
import tg from '../Photos/tg.png'
import wt from '../Photos/wt.png'
import "./Contacts.css"

export default function Contacts() {
    return (
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
    )
}