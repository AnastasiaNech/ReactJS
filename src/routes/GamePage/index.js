import {useRouteMatch, Route, Switch} from "react-router-dom"
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import {PokemonContext} from "../../context/pokemonContext";
import {useState} from "react";
import {Provider} from "react-redux";


const GamePage = () => {
    const match = useRouteMatch();
    const [selectedPokemons, setSelectedPokemons] = useState({});

    const cleanPokemons = () => {
        setSelectedPokemons({});
    }

    return (
        <PokemonContext.Provider value={{
            clean : cleanPokemons
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage}/>
                <Route path={`${match.path}/board`} component={BoardPage}/>
                <Route path={`${match.path}/finish`} component={FinishPage}/>
            </Switch>
        </PokemonContext.Provider>
    );
};
export default GamePage;