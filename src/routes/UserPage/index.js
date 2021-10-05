import React from "react";
import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import s from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getUserAsync, removeUser, selectUser} from "../../store/user";


const UserPage = () => {
    const userRedux = useSelector(selectUser);
    const history = useHistory();
    const data = new Date(userRedux.createdAt * 1000).toLocaleDateString();
    const loginAt = new Date(userRedux.lastLoginAt * 1000).toLocaleDateString();
    const email = userRedux.email;
    const dispatch = useDispatch();

    const handleLogOutClick = () => {
        localStorage.removeItem('idToken');
        dispatch(removeUser());
        history.push('/');
    };

    return (
        <>
            <div className={s.userInfo}>
                User Info
            </div>
            <div className= {s.info}>
                <p>Email : {email}</p>
                <p>CreatedAt: {data}</p>
                <p>Last login at: {loginAt}</p>
            </div>
            <button
                onClick={handleLogOutClick}
            >
                LOG OUT
            </button>
        </>

    );
}

export default UserPage;