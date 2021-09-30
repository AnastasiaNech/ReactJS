import firebase from 'firebase/compat/app';
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyAlScXEWyxKer4DSnfdvmyb_J9I5zeeLVM",
    authDomain: "pokemon-game10.firebaseapp.com",
    databaseURL: "https://pokemon-game10-default-rtdb.firebaseio.com",
    projectId: "pokemon-game10",
    storageBucket: "pokemon-game10.appspot.com",
    messagingSenderId: "71471121799",
    appId: "1:71471121799:web:c6c21324c8480f7b4d3f22"
};

firebase.initializeApp(firebaseConfig);

class Firebase {
    constructor() {
        this.fire = firebase;
        this.database = firebase.database();
    }

    getPokemonSoket = (cb) => {
        this.database.ref('pokemons').on('value', (shapshot) => {
            cb(shapshot.val());
        })
    }

    getPokemonsOnce = async () => {
        return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
    }

    postPokemon = (key, pokemon) => {
        this.database.ref(`pokemons/${key}`).set(pokemon);
    }

    addPokemon = (pokemons, cb) => {
        var pok = Object.entries((pokemons));
        const newKey = this.database.ref().child('pokemons').push().key;
        this.database.ref('pokemons/' + newKey).set(pok[1]).then(() => cb());
    }
}

const FirebaseClass = new Firebase();

export default FirebaseClass;