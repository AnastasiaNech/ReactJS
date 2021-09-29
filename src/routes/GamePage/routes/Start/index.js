import React from "react";
import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import PokemonCard from "../../../../components/PokemonCard";
import s from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getPokemonsAsync, selectPokemonsData} from "../../../../store/pokemon";
import {clickPokemon, selectMyPokemonsData} from "../../../../store/myBattlePokemon";


const StartPage = () => {
    const pokemonsRedux = useSelector(selectPokemonsData);
    const MyPokemonsDataRedux = useSelector(selectMyPokemonsData);

    const dispatch = useDispatch();
    const history = useHistory();

    const [pokemons, setPokemonCardState] = useState({});

    useEffect(() => {
        dispatch(getPokemonsAsync());
        }, []);

    useEffect(() => {
       setPokemonCardState(pokemonsRedux)
    }, [pokemonsRedux]);

    const handleChangeSelected = (key) => {
        const pokemon = {...pokemons[key]};
        const clickPokemons = () => {
            if (MyPokemonsDataRedux[key])
            {
                const copyState = {...MyPokemonsDataRedux};
                delete copyState[key];
                return copyState;
            }
            return {
                ...MyPokemonsDataRedux,
                [key]:pokemon,
            }
        };
        const data = clickPokemons(pokemon);
        dispatch(clickPokemon(data));


        setPokemonCardState(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected,
            }
        }))
    };

    const handleStartGameClick = () => {
        history.push('/game/board');
    };

    return (
        <>
            <button
                onClick={handleStartGameClick}
                disabled={Object.keys(MyPokemonsDataRedux).length < 5}
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
                            if(Object.keys(MyPokemonsDataRedux).length < 5 || selected) {
                                handleChangeSelected(key)
                            }}}
                        />)
                }
            </div>
        </>

    );
}

export default StartPage;