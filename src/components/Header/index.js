import s from './style.module.css';

const Header = ({title}) => {
    return (
        <header className={s.root}>
            <div className={s.forest}></div>
            <div className={s.container}>
                <h1>{title}</h1>
            </div>
        </header>
    )
}

export default Header;
