import "./JournalList.css"
import Journalitem from '../Journalitem/Journalitem';
import CardButton from '../CardButton/CardButton';
function JournalList({ items }) {
    if (items.length === 0) {
        return <p>Записей нет</p>
    }

    const sortItems = (a, b) => {
        if (a.date > b.date) {
            return -1
        } else {
            return 1
        }
    }



    return <>
        {items.sort(sortItems).map(el => (
            <CardButton key={el.id}>
                <Journalitem
                    title={el.title}
                    text={el.text}
                    data={el.date}
                />
            </CardButton>
        ))}
    </>
}

export default JournalList