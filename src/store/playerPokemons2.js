import {createSlice} from '@reduxjs/toolkit'

export const slice2 = createSlice({
    name:'playerPokemons2',
    initialState:{
        isLoading:false,
        data: [],
        error: null,
    },
    reducers: {
        fetchPlayerPokemons2: state => ({
            ...state,
            isLoading: true,
        }),

        fetchPlayerPokemons2Resolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),

        fetchPlayerPokemons2Reject: (state, action) => ({
            ...state,
            isLoading: false,
            data: [],
            error: action.payload,
        }),

    }
});

export const {
    fetchPlayerPokemons2,
    fetchPlayerPokemons2Resolve,
    fetchPlayerPokemons2Reject
    } = slice2.actions;

export const selectPlayerPokemons2Loading = state => state.playerPokemons2.isLoading;
export const selectPlayerPokemons2Data = state => state.playerPokemons2.data;


export const getPlayer2RequestAsync = () => async (dispatch) => {
    dispatch(fetchPlayerPokemons2());
    const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
    const data = await player2Response.json();
    dispatch(fetchPlayerPokemons2Resolve(data));
}
export const updatePlayer2Pokemons = (pokemons) => (dispatch) => {
    console.log("fetchPlayerPokemons2Resolve",pokemons)
    pokemons = {
        data:pokemons
    }
    dispatch(fetchPlayerPokemons2Resolve(pokemons));
}

export default slice2.reducer;