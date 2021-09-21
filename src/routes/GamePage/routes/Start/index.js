import React from "react";
import {useState, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import PokemonCard from "../../../../components/PokemonCard";
import s from "./style.module.css";
import {FirebaseContext} from "../../../../context/firebaseContext";
import {PokemonContext} from "../../../../context/pokemonContext";


const StartPage = () => {
    const firebase = useContext(FirebaseContext);
    const pokemonContext = useContext(PokemonContext);
    const history = useHistory();
    const [pokemons, setPokemonCardState] = useState({});


    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setPokemonCardState(pokemons);
        })
    }, []);

    const handleChangeSelected = (key) => {
        const pokemon = {...pokemons[key]};
        pokemonContext.onSelectedPokemons(key);

        setPokemonCardState(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected,
            }
        }))
    };

    const handleStartGameClick = (key) => {
        history.push('/game/board');
    };

    return (
        <>
            <button
                onClick={handleStartGameClick}
                disabled={Object.keys(pokemonContext.pokemons).length < 5}
            >
                Start Game
            </button>
            <div className={s.flex}>
                {
                    Object.entries(pokemons).map(([key, {id, name, img, type, values, selected}]) =>
                        <PokemonCard
                            className={s.card}
                            key={key}
                            name={name}
                            img={img}
                            id={id}
                            type={type}
                            values={values}
                            isActive={true}
                            isSelected={selected}
                            onChangeIsActive={() =>{
                            if(Object.keys(pokemonContext.pokemons).length < 5 || selected) {
                                handleChangeSelected(key)
                            }}}
                        />)
                }
            </div>
        </>

    );
}

export default StartPage;