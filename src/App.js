import {useLocation, Route, Switch, Redirect, useRouteMatch} from "react-router-dom"
import s from './style.module.css';
import 'react-notifications/lib/notifications.css';
import cn from 'classnames';
import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import UserPage from "./routes/UserPage";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import AboutPage from "./routes/AboutPage";
import NotFound from "./routes/NotFound";
import ContactPage from "./routes/ContactPage/";
import FirebaseClass from "./service/firebase"
import {FireBaseContext} from "./context/firebaseContext";
import {NotificationContainer} from 'react-notifications';
import PrivateRoute from "./components/PrivateRoute";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserAsync, selectUserLoading} from "./store/user";

const App = () => {
    const isUserLoading = useSelector(selectUserLoading);
    const location = useLocation();
    const isPadding = location.pathname === '/' || location.pathname === '/game/board';
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserAsync());
    }, []);

    if (isUserLoading) {
        return 'Loading...';
    }

    return (
        <FireBaseContext.Provider value={FirebaseClass}>
            <Switch>
                <Route path="/404" component={NotFound}/>
                <Route>
                    <>
                        <MenuHeader bgActive={!isPadding}/>
                        <div className={cn(s.wrap, {
                            [s.isHomePage]: isPadding
                        })}>
                            <Switch>
                                <Route path="/" exact component={HomePage}/>
                                <PrivateRoute path="/game" component={GamePage}/>
                                <PrivateRoute path="/about" component={AboutPage}/>
                                <PrivateRoute path="/contact" component={ContactPage}/>
                                <PrivateRoute path="/user" component={UserPage}/>
                                <PrivateRoute render={() => (
                                    <Redirect to="/404"/>
                                )}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </>
                </Route>
            </Switch>
            <NotificationContainer/>
        </FireBaseContext.Provider>
    )
};

export default App;
