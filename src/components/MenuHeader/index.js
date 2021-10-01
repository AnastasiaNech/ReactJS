import {useState} from "react";
import Menu from "./Menu/index";
import Navbar from "./Navbar/index";
import Modal from "../Modal/index";
import LoginForm from "../LoginForm";
import {NotificationManager} from 'react-notifications';


const MenuHeader = ({bgActive}) => {
    const [isActive, setActive] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);

    const handleClickHamburg = () => {
        setActive(prevState => !prevState);
    }
    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState);
    }

    const handleSubmitLoginForm = async ({email, password, isAuth}) => {
        console.log('isAuth', isAuth);
        const requestOption ={
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
                }
            )
        }

        if(isAuth == true) {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAlScXEWyxKer4DSnfdvmyb_J9I5zeeLVM', requestOption).then(res => res.json());
            if(response.hasOwnProperty('error')) {
                NotificationManager.error(response.error.message, 'Wrong!');
            }
            else {
                localStorage.setItem('idToken',response.idToken);
                NotificationManager.success('Success message');
                setOpenModal(false);
            }
        }
        else if (isAuth == false) {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAlScXEWyxKer4DSnfdvmyb_J9I5zeeLVM', requestOption).then(res => res.json());
            console.log ("response" , response);
            if(response.hasOwnProperty('error')) {
                 NotificationManager.error(response.error.message, 'Wrong!');
             }
             else {
                 localStorage.setItem('idToken',response.idToken);
                 NotificationManager.success('Success message');
                 setOpenModal(false);
             }
        }
    }

    return (
        <>
            <Menu isActive={isActive}/>
            <Navbar isActive={isActive}
                    bgActive={bgActive}
                    onClickHamburg={handleClickHamburg}
                    onClickLogin={handleClickLogin}
            />
            <Modal
                isOpen={isOpenModal}
                title="Auth... "
                onCloseModal={handleClickLogin}
            >
                <LoginForm
                 onSubmit={handleSubmitLoginForm}
                />
            </Modal>
        </>
    );
}

export default MenuHeader;