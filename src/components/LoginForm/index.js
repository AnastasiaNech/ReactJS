import cn from 'classnames';
import s from './style.module.css';
import {useEffect, useState} from "react";
import Input from "./Input/input";

const LoginForm = ({onSubmit, isResetField = false}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setLogin] = useState(true);


    useEffect(() => {
        setEmail('');
        setPassword('');
    }, [isResetField]);


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit({
            type: isLogin ? 'login' : 'signup',
            email,
            password
        });
        setEmail('');
        setPassword('');
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
                        isLogin ?  "Login" : "Sing In"
                    }
                </button>
                <span
                    className = {s.question}
                    onClick={() => setLogin(!isLogin)}
                    >
                    {
                        isLogin ? "Register" : "Login"
                    }
                </span>
            </div>
        </form>
    );
};

export default LoginForm;