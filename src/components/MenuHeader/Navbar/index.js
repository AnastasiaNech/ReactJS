import s from './style.module.css';
import cn from 'classnames';

const Navbar = ({isActive, bgActive = false, onClickHamburg}) => {
    return (
        <nav className={cn(s.root, {
            [s.bgActive]: bgActive => !bgActive
        })}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <div
                    className={cn(s.menuButton, {
                        [s.active]: isActive
                    })}
                    onClick={onClickHamburg}
                >
                    <span/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;