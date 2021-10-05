import s from './style.module.css';
import cn from 'classnames';
import {ReactComponent as LoginSVG} from "../../../assets/login.svg";
import {ReactComponent as UserSVG} from "../../../assets/user.svg";
import {selectLocalID, selectUserLoading} from "../../../store/user";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Navbar = ({ isActive, bgActive = false, onClickHamburg, onClickLogin}) => {
    const isLoadingUser = useSelector(selectUserLoading);
    const localId = useSelector(selectLocalID);

    return (
        <nav className={cn(s.root, {
            [s.bgActive]: bgActive => !bgActive
        })}>
            <div className={s.navWrapper}>
                <div className={s.brand}>
                    LOGO
                </div>
                <div className={s.loginAndMenu}>
                    { (!isLoadingUser && !localId) && (
                        <div
                            className={s.loginWrap}
                            onClick={onClickLogin}
                        >
                            <LoginSVG/>
                        </div>
                    )}
                    { (!isLoadingUser && localId) && (
                    <Link
                        className={s.loginWrap}
                        to = "/user"
                    >
                        <UserSVG/>
                    </Link>
                    )}
                    <div
                            className={cn(s.menuButton, {
                                [s.active]: isActive
                            })}
                            onClick={onClickHamburg}
                        >
                            <span/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;