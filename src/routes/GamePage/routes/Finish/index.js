import s from './style.module.css';
import React, {useContext, useEffect, useState} from "react";
import PokemonCard from "../../../../components/PokemonCard";
import {PokemonContext} from "../../../../context/pokemonContext";
import {useHistory} from "react-router-dom";
import {FireBaseContext} from "../../../../context/firebaseContext";




const FinishPage = () => {
    const firebase = useContext(FireBaseContext);
    const {pokemons, pokemons2, winner, clean, updPlayers2Pokemons} = useContext(PokemonContext);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [selectedPokemon2, setSelectedPokemon2] = useState({});
    const history = useHistory();

    const handleFinishClick = () => {
        if (winner === 1 ) {
            const newKey = firebase.database.ref().child('pokemons').push().key;
            firebase.database.ref('pokemons/' + newKey).set(selectedPokemon);
        }
        clean();
        history.replace('/game');
    }

    const handleSelectedClick = (key,id) => {
        setSelectedPokemon(pokemons2[key]);
        console.log('addPok');
       //      Object.entries(pokemons2).map(item=>({...item,selected:false}));
       //  // updPlayers2Pokemons(pokemons2=>({
       //  //         ...pokemons2,
       //  //         ...pokemons2.selected=false}));
       // // pokemons2.map((item) => item.selected = false);
       //  updPlayers2Pokemons(pokemons2 => ({
       //      ...pokemons2,
       //      [key]: {
       //           ...pokemons2[key],
       //           selected: true,
       //      }
       //  }));
        updPlayers2Pokemons( pokemons2 => {
            return pokemons2.reduce((acc, item) =>{
                item.isSelected = false;
                if( item.id === id)
                {
                    item.isSelected = true;
                }
                acc.push(item);
                return acc;
            },[]);
        })


    }

    if(Object.keys(pokemons).length === 0)
    {
         history.replace('/game');
    }
    console.log('testOtherName',selectedPokemon);


    return (
        <>
            <div className={s.flexPlayer1}>
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
                        />)
                }
            </div>
            <button
                onClick={handleFinishClick}
                disabled={(!selectedPokemon.id && winner===1)}
            >
                End Game
            </button>
            <div className={s.flexPlayer2}>
                {
                    Object.entries(pokemons2).map(([key, {id, name, img, type, values, isSelected}]) =>
                        <PokemonCard
                            className={s.card}
                            key={key}
                            name={name}
                            img={img}
                            id={id}
                            type={type}
                            values={values}
                            isActive={true}
                            isSelected={isSelected}
                            onChangeIsActive={() =>{
                                if(winner === 1) {
                                    handleSelectedClick(key,id)
                                }}}
                        />)
                }
            </div>
        </>
    );
}

export default FinishPage;