import s from './style.module.css';
import {useState} from "react";

const Input = ({value, label, type = 'text', name, required, onChange}) => {

    return (
        <div className={s.root}>
            <input value = {value} type={type} className={s.input} required onChange = {onChange}/>
            <span className={s.highlight}></span>
            <span className={s.bar}></span>
            <label className={s.label}>{label}</label>
        </div>
    );
};

export default Input;