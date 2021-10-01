import cn from 'classnames';
import s from './style.module.css';
import {useState} from "react";
import Input from "./Input/input";

const LoginForm = ({onSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit({
            email,
            password,
            isAuth
        });
        setEmail('');
        setPassword('');
    }

    const handleClickLogin = () => {
        setIsAuth(prevState => !prevState);
    }


    return (
        <form onSubmit={handleSubmit}>
            <Input
                value={email}
                label="Email"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                value={password}
                label="Password"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className = {s.flex}>
                <button>
                    {
                        isAuth ? "Sing In" : "Sing Up"
                    }
                </button>
                <span
                    className = {s.question}
                    onClick={handleClickLogin}
                    >
                    {
                        isAuth ? "Register" : "Login"
                    }
                </span>
            </div>
        </form>
    );
};

export default LoginForm;