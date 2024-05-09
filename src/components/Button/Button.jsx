import "./Button.css"
import { useState } from "react"


function Button({ text }) {
    // let text = "Сохранить"

    // const [text, setText] = useState("Сохранить")

    // console.log("РеРender");

    // const clicked = () => {
    //     setText("Закрыть")
    //     console.log("hello")
    // }
    return (
        <button className="button accent">{text}</button>
    );
}

export default Button