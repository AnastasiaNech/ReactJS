import s from './style.module.css';
import cn from 'classnames';

const Navbar = ({isActive,onClickButton}) => {
   const changeNavbar = () => {
       onClickButton && onClickButton();
   }

    return (
        <nav className={s.root}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <a className= {cn(s.menuButton, {[s.active]: isActive})} onClick={changeNavbar} href="#s">
                    <span/>
                </a>
            </div>
        </nav>
    )
}

export default Navbar;