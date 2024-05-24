import Button from "../Button/Button";
import styles from "./JournalForm.module.css"
import React, { useContext, useEffect, useReducer, useRef } from 'react';
import classNames from "classnames";
import FolderSvg from "../Svg/FolderSvg";
import СalendarSvg from "../Svg/СalendarSvg";
import ArchiveSvg from "../Svg/ArchiveSvg";
import formReducer, { INITIAL_STATE } from "./JournalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";


function JournalForm({ onSubmit, data }) {


    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
    const { isValid, isFormReadyToSubmit, values } = formState
    const titleRef = useRef()
    const dateRef = useRef()
    const postRef = useRef()
    const { userId } = useContext(UserContext)

    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus()
                break
            case !isValid.date:
                dateRef.current.focus()
                break
            case !isValid.post:
                postRef.current.focus()
                break
        }
    }

    useEffect(() => {
        dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
    }, data)

    useEffect(() => {
        let timerId;

        if (!isValid.date || !isValid.post || !isValid.title) {
            focusError(isValid)
            timerId = setTimeout(() => {
                dispatchForm({ type: "RESET_VALIDITY" })
            }, 2000)
        }

        return () => {
            clearTimeout(timerId)
        }

    }, [isValid])

    useEffect(() => {
        if (isFormReadyToSubmit) {
            onSubmit(values)
            dispatchForm({ type: "CLEAR" })
            dispatchForm({ type: 'SET_VALUE', payload: { userId } });
        }
    }, [isFormReadyToSubmit, values, onSubmit, userId])

    useEffect(() => {
        dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }, [userId])

    const onChange = (e) => {
        dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
    }

    const addJournalItem = (e) => {
        e.preventDefault()
        dispatchForm({ type: "SUBMIT" })
    }

    return (
        <form className={styles["journal-form"]} onSubmit={addJournalItem}>

            <div>
                <Input type="text" ref={titleRef} onChange={onChange} value={values.title} name="title" appearence="title" isValid={isValid.title} />
            </div>


            <div className={styles["form-row"]}>
                <label htmlFor="date" className={styles["form-label"]}>
                    <СalendarSvg />
                    <span>Дата</span>
                </label>
                <Input type="date" ref={dateRef} onChange={onChange} value={values.date ? new Date(values.date.toISOString().slice(0, 10)) : ""}) name="date" id="date" appearence="date" isValid={isValid.date} />
            </div>

            <div className={styles["form-row"]}>
                <label htmlFor="tag" className={styles["form-label"]}>
                    <FolderSvg />
                    <span>Метки</span>
                </label>
                <Input type="text" onChange={onChange} id="tag" name="tag" appearence="tag" />
            </div>


            <textarea ref={postRef} name="post" onChange={onChange} id="" value={values.post} cols="30" rows="10" className={classNames(styles["input"], {
                [styles["invalid"]]: !isValid.post
            })
            }></textarea>
            <Button>Сохранить</Button>
        </form >
    )
}

export default JournalForm