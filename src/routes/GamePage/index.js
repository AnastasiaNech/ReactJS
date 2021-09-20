import React from "react";
import {useState, useEffect} from "react";
import s from "./style.module.css";
import PokemonCard from "../../components/PokemonCard";
import database from "../../service/firebase";


const GamePage = () => {
    const [pokemons, setPokemonCardState] = useState({});

    useEffect(() => {
        database.ref('pokemons').on('value', (snapshot) => {
            setPokemonCardState(snapshot.val());
        });
    }, [pokemons]);

    const handleClickAddPokemons = (id, objID, isActive) => {
        setPokemonCardState(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === id) {
                    pokemon.active = true;
                }
                database
                    .ref('pokemons/' + objID)
                    .set({...Object.entries(pokemons)[objID], active: !isActive});

                acc[item[0]] = pokemon;

                return acc;
            }, {});
        });

    };
    const addPokemons = () => {
        var pok = Object.entries((pokemons));
        const newKey = database.ref().child('pokemons').push().key;
        database.ref('pokemons/' + newKey).set(pok[1]);
    }


    return (
        <>
            <button onClick={addPokemons}>
                Добавить покемона
            </button>
            <div className={s.flex}>
                {
                    Object.entries(pokemons).map(([key, {objID, id, name, img, type, values, active}]) =>
                        <PokemonCard
                            objID={key}
                            key={key}
                            name={name}
                            img={img}
                            id={id}
                            type={type}
                            values={values}
                            isActive={active}
                            onChangeIsActive={handleClickAddPokemons}
                        />)
                }
            </div>
        </>

    );
}

export default GamePage;