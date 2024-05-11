import Button from "../Button/Button";
import styles from "./JournalForm.module.css"
import React, { useEffect, useState } from 'react';
import classNames from "classnames";
import FolderSvg from "../Svg/FolderSvg";
import СalendarSvg from "../Svg/СalendarSvg";
import ArchiveSvg from "../Svg/ArchiveSvg";

const INITIAL_STATE = {
    title: true,
    post: true,
    date: true
}


function JournalForm({ onSubmit }) {

    const [formValidState, setFormValidState] = useState(INITIAL_STATE)

    useEffect(() => {
        let timerId;

        if (!formValidState.date || !formValidState.post || !formValidState.title) {
            timerId = setTimeout(() => {
                setFormValidState(INITIAL_STATE)
            }, 2000)
        }

        return () => {
            clearTimeout(timerId)
        }
        
    }, [formValidState])

    const addJournalItem = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const formProps = Object.fromEntries(formData)

        let isFormValid = true
        if (!formProps.title?.trim().length) {
            setFormValidState(state => ({ ...state, title: false }))
            isFormValid = false
        } else {
            setFormValidState(state => ({ ...state, title: true }))
        }
        if (!formProps.post?.trim().length) {
            setFormValidState(state => ({ ...state, post: false }))
            isFormValid = false
        } else {
            setFormValidState(state => ({ ...state, post: true }))
        }
        if (!formProps.date) {
            setFormValidState(state => ({ ...state, date: false }))
            isFormValid = false
        } else {
            setFormValidState(state => ({ ...state, date: true }))
        }
        if (!isFormValid) {
            return
        }
        onSubmit(formProps)
    }

    return (
        <>
            <form className={styles["journal-form"]} onSubmit={addJournalItem}>
                <div>
                    <input type="text" name="title" className={classNames(styles["input-title"], {
                        [styles["invalid"]]: !formValidState.title,
                    })} />
                </div>


                <div className={styles["form-row"]}>
                    <label htmlFor="date" className={styles["form-label"]}>
                        <СalendarSvg />
                        <span>Дата</span>
                    </label>
                    <input type="date" name="date" id="date" className={classNames(styles["input"], {
                        [styles["invalid"]]: !formValidState.date
                    })} />
                </div>

                <div className={styles["form-row"]}>
                    <label htmlFor="tag" className={styles["form-label"]}>
                        <FolderSvg />
                        <span>Метки</span>
                    </label>
                    <input type="text" id="tag" name="tag" className={styles["input"]} />
                </div>


                <textarea name="post" id="" cols="30" rows="10" className={classNames(styles["input"], {
                    [styles["invalid"]]: !formValidState.post
                })
                }></textarea>
                <Button text="Сохранить" />
            </form >
        </>
    );
}

export default JournalForm