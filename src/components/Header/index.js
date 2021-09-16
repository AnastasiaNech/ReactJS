import s from './style.module.css';
import {useHistory} from "react-router-dom";

const Header = ({title}) => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/game');
    }
    return (
        <header className={s.root}>
            <div className={s.forest}></div>
            <div className={s.silhouette}></div>
            <div className={s.moon}></div>
            <div className={s.container}>
                <h1>{title}</h1>
                <button onClick={handleClick}>
                   Start Game
                </button>
            </div>
        </header>
    );
}

export default Header;
