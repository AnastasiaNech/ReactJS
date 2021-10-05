import {useState} from "react";
import Menu from "./Menu/index";
import Navbar from "./Navbar/index";
import Modal from "../Modal/index";
import LoginForm from "../LoginForm";
import {NotificationManager} from 'react-notifications';
import {useDispatch} from "react-redux";
import {getUserAsync, getUserUpdateAsync} from "../../store/user";

const loginSignupUser = async ({email, password, type}) => {
    const requestOption ={
        method: 'POST',
        body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }
        )
    };

    switch (type) {
        case 'signup':
            return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAlScXEWyxKer4DSnfdvmyb_J9I5zeeLVM', requestOption).then(res => res.json())
        case 'login':
            return await fetch ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAlScXEWyxKer4DSnfdvmyb_J9I5zeeLVM', requestOption).then(res => res.json())
        default:
            return 'I cannot login user'

    }
}

const MenuHeader = ({bgActive}) => {
    const [isActive, setActive] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const handleClickHamburg = () => {
        setActive(prevState => !prevState);
    }
    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState);
    }

    const handleSubmitLoginForm = async (props) => {
        const response = await loginSignupUser(props);
        console.log('123response', response);
        if (response.hasOwnProperty('error')) {
            NotificationManager.error(response.error.message, 'Wrong!');

        } else {
            if (props.type === 'signup') {
                const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json())

                for (const item of pokemonsStart.data) {
                    await fetch(`https://pokemon-game10-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`,
                        {
                            method: 'POST',
                            body: JSON.stringify(item)
                        });
                };
            }
                localStorage.setItem('idToken', response.idToken);
                localStorage.setItem('localId', response.localId);
                NotificationManager.success('Success message');
                dispatch(getUserUpdateAsync());
                handleClickLogin();
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
                        isResetField={!isOpenModal}
                        onSubmit={handleSubmitLoginForm}
                    />
                </Modal>
            </>
        );
    }
export default MenuHeader;