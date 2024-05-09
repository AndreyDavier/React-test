import Button from "../Button/Button";
import "./JournalForm.css"
import React, { useState } from 'react';



function JournalForm({ onSubmit }) {

    const [inputData, setInputData] = useState("")

    const inputChange = (event) => {
        setInputData(event.target.value)
    }

    const addJournalItem = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const formProps = Object.fromEntries(formData)

        onSubmit(formProps)
    }

    return (
        <>
            <form className="journal-form" onSubmit={addJournalItem}>
                <input type="text" name="title" />
                <input type="date" name="date" />
                <input type="text" name="tag" value={inputData} onChange={inputChange} />
                <textarea name="text" id="" cols="30" rows="10"></textarea>
                <Button text="Сохранить" onClick={() => { console.log("Najali"); }} />
            </form>
        </>
    );
}

export default JournalForm