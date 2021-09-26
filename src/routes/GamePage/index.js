import {useRouteMatch, Route, Switch} from "react-router-dom"
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import {PokemonContext} from "../../context/pokemonContext";
import {useState} from "react";


const GamePage = () => {
    const match = useRouteMatch();
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const [playerPokemons2, setPlayer2Pokemons] = useState([]);
    const [winner,setWinner] = useState(0);

    const handleSelectedPokemons = (key, pokemon) => {
        setSelectedPokemons((prevState) => {
                if (prevState[key]) {
                    const copyState = {...prevState};
                    delete copyState[key];

                    return copyState;
                }
                return {
                    ...prevState,
                    [key]: pokemon,
                }
            }
        )
    };

    const cleanPokemons = () => {
        setSelectedPokemons({});
        setPlayer2Pokemons([]);
    }

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            pokemons2: playerPokemons2,
            updPlayers2Pokemons: setPlayer2Pokemons,
            onSelectedPokemons: handleSelectedPokemons,
            clean : cleanPokemons,
            winner: winner,
            setWinner: setWinner
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