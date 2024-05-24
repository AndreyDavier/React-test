import "./JournalList.css"
import Journalitem from '../Journalitem/Journalitem';
import CardButton from '../CardButton/CardButton';
import { useContext, useMemo } from "react";
import { UserContext } from "../../context/user.context";

function JournalList({ items, setItem }) {

    const { userId } = useContext(UserContext)

    const sortItems = (a, b) => {
        if (a.date > b.date) {
            return -1
        } else {
            return 1
        }
    }

    const filterItems = useMemo(() => items
        .filter(el => el.userId === userId)
        .sort(sortItems), [items, userId])

    if (items.length === 0) {
        return <p>Записей нет</p>
    }




    return <>
        {filterItems
            .map(el => (
                <CardButton onClick={()=>setItem(el)} key={el.id}>
                    <Journalitem
                        title={el.title}
                        post={el.post}
                        data={el.date}
                    />
                </CardButton>
            ))}
    </>
}

export default JournalList