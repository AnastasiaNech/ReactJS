import React from "react";
import './App.css';
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import bg1 from "./assets/bg1.jpg";
import bg2 from "./assets/bg2.jpg";
import pokemons from "./pokemons.json"


const POKEMONS = pokemons;

const App = () => {
    return (
        <>
            <Header
                title="This is new Title"
            />
            <Layout
                title="Game description"
                urlBg={bg1}
            >
                <p>
                    In the game two players face off against one another, one side playing as "blue", the other as "red"
                    on a 3x3 grid.
                    Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them
                    into the player's own color of red or blue.
                    To win, a majority of the total ten cards played (including the one card that is not placed on the
                    board) must be of the player's card color.
                    To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon
                    the 'ranks' of the sides where the two cards touch will be compared.
                    If the rank of the opponent's card is higher than the player's card, the player's card will be
                    captured and turned into the opponent's color.
                    If the player's rank is higher, the opponent's card will be captured and changed into the player's
                    color instead.
                </p>
            </Layout>
            <Layout
                title="Cards"
                colorBg='red'
            >
                <div className='flex'>
                    {
                        POKEMONS.map((item) => <PokemonCard
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                        />)
                    }
                </div>
            </Layout>
            <Layout
                urlBg={bg2}
            />
            <Footer/>
        </>
    );
}

export default App;
