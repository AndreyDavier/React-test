import SelectUser from "../SelectUser/SelectUser";
import LogoSvg from "../Svg/LogoSvg";
import "./Header.css"
import Button from "../Button/Button"
import { useState, memo } from "react";

const logos = ["/logo.svg", "/vite.svg"]


function Header() {

    const [logoindex, setLogoIndex] = useState(0)
    const [secondIndex, setsecondIndex] = useState(0)

    const toggleLogo = () => {
        setLogoIndex(state => Number(!state))
    }

    return (
        <>
            <img src={logos[logoindex]} alt="" />
            <LogoSvg></LogoSvg>
            <SelectUser />
            <Button onClick={toggleLogo}>Сменить лого</Button>
        </>
    );
}

export default memo(Header)