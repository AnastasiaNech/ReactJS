import React from "react";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import s from "./style.module.css";
import pokemons from "../../pokemons.json";
import Layout from "../../components/Layout";
import PokemonCard from "../../components/PokemonCard";

const POKEMONS = pokemons;
const GamePage = () => {
    const history = useHistory();
    const [pokemons, setPokemonCardState] = useState(POKEMONS);
    const handleClick = () => {
        history.push('/');
    }
    const handlePokemonCardIsActive = (id) => {
        setPokemonCardState(
            pokemons.map(item => item.id === id ? item.isActive : !item.isActive))
    }
    return (
        <>
            <div className={s.container}>
                <button onClick={handleClick}>
                    Home
                </button>
            </div>
            <Layout
                title="Cards">
                <div className={s.flex}>
                    {
                        POKEMONS.map((item) => <PokemonCard
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            onChangeIsActive={handlePokemonCardIsActive}
                            isActive={s.pokemon}
                        />)
                    }
                </div>
            </Layout>
        </>
    );
}

export default GamePage;