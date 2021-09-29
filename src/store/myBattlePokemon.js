import {createSlice} from '@reduxjs/toolkit'
import {useSelector} from "react-redux";
import {selectPokemonsData} from "./pokemon";

export const slice = createSlice({
    name:'myBattlePokemons',
    initialState:{
        data:[],
        isWinner:0 // 0-ничья, 1-победа, 2-поражение
    },
    reducers: {
        setPokemon: (state, action) => ({
                ...state,
            data:action.payload
        }),
        setWinner: (state, action) => ({
            ...state,
            isWinner:action.payload
        })
    }
});


export const {setPokemon,setWinner} = slice.actions;

export const selectMyPokemonsData = state => state.myBattlePokemons.data;
export const isWinner = state => state.myBattlePokemons.isWinner;

export const clickPokemon = (pokemons) => (dispatch) => {
        dispatch(setPokemon(pokemons));
};
export const updateWinner = (result) => (dispatch) => {
    dispatch(setWinner(result));
};



export default slice.reducer;