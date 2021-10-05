import {configureStore} from '@reduxjs/toolkit'
import pokemonsReducer from "./pokemon"
import playerPokemons2Reducer from "./playerPokemons2"
import myBattlePokemonsReducer from "./myBattlePokemon"
import userReducer from "./user"

export default configureStore({
        reducer: {
            user: userReducer,
            pokemons: pokemonsReducer,
            playerPokemons2: playerPokemons2Reducer,
            myBattlePokemons: myBattlePokemonsReducer
        }
})