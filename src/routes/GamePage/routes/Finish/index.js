import s from './style.module.css';
import React, {useContext, useEffect, useState} from "react";
import PokemonCard from "../../../../components/PokemonCard";
import {PokemonContext} from "../../../../context/pokemonContext";
import {useHistory} from "react-router-dom";
import {FireBaseContext} from "../../../../context/firebaseContext";
import {selectMyPokemonsData,isWinner} from "../../../../store/myBattlePokemon";
import {
    selectPlayerPokemons2Data, updatePlayer2Pokemons
} from "../../../../store/playerPokemons2";
import {useDispatch,useSelector} from "react-redux";


const FinishPage = () => {
    const playerPokemonsRedux = useSelector(selectMyPokemonsData);
    const winner = useSelector(isWinner);
    const playerPokemons2Redux = useSelector(selectPlayerPokemons2Data).data;
    const firebase = useContext(FireBaseContext);
    const {clean} = useContext(PokemonContext);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [selectedPokemon2, setSelectedPokemon2] = useState({});
    const history = useHistory();
    const Dispatch = useDispatch();

    const handleFinishClick = () => {
        if (winner === 1 ) {
            const newKey = firebase.database.ref().child('pokemons').push().key;
            firebase.database.ref('pokemons/' + newKey).set(selectedPokemon);
        }
        clean();
        history.replace('/game');
    }

    const handleSelectedClick = (key,id) => {
        const pokemonsList = playerPokemons2Redux;
        setSelectedPokemon(pokemonsList[key]);
        const newList = ()=> {
            return pokemonsList.reduce((acc, item) => {
                console.log("item", item)
                item=
                    {   ...item,
                        isSelected : false
                    };
                if (item.id === id) {
                    item=
                        {   ...item,
                            isSelected : true
                        };
                }
                console.log("item", item)
                acc.push(item);
                return acc;
            }, []);
        }
        const result=newList();
        console.log("playerPokemonsRedux",result)
        Dispatch(updatePlayer2Pokemons(result));
    }

    if(Object.keys(playerPokemonsRedux).length === 0)
    {
         history.replace('/game');
    }
    console.log("playerPokemonsRedux",playerPokemonsRedux)
    console.log("playerPokemons2Redux",playerPokemons2Redux)
    return (
        <>
            <div className={s.flexPlayer1}>
                {
                    Object.entries(playerPokemonsRedux).map(([key, {id, name, img, type, values, selected}]) =>
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
                    Object.entries(playerPokemons2Redux).map(([key, {id, name, img, type, values, isSelected}]) =>
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