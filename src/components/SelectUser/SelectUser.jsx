import { useContext } from "react";
import { UserContext } from "../../context/user.context";


function SelectUser({ changedUser }) {

    const { userId, setUserId } = useContext(UserContext)

    const changUser = (e) => {
        setUserId(Number(e.target.value))
    }


    return (
        <select name="user" id="user" value={userId} onChange={changUser}>
            <option value="1">Анна</option>
            <option value="2">Андрей</option>
        </select>
    );
}

export default SelectUser