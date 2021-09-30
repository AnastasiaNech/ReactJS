import s from './style.module.css';
import {useState} from 'react';
import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import PokemonCard from "../../../../components/PokemonCard";
import PlayerBoard from "./components/PlayerBoard";
import {
    getPlayer2RequestAsync,
    selectPlayerPokemons2Data,
    selectPlayerPokemons2Loading,
} from "../../../../store/playerPokemons2";
import {useDispatch, useSelector} from "react-redux";
import {selectMyPokemonsData,setWinner} from "../../../../store/myBattlePokemon";



const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(item => {
        if (item.card.possession === 'red') {
            player2Count++;
        }

        if (item.card.possession === 'blue') {
            player1Count++;
        }
    });
    return [player1Count, player2Count];
}

const BoardPage = () => {
    console.log("StartBoarPage");

    const dispatch = useDispatch();
    const history = useHistory();

    const playerPokemonsRedux = useSelector(selectMyPokemonsData);

    const playerPokemons2Redux = useSelector(selectPlayerPokemons2Data);
    const Pokemons2Loading = useSelector(selectPlayerPokemons2Loading);

    const [board, setBoard] = useState([]);
    const [steps, setSteps] = useState(0);



    const [player1, setPlayer1] = useState(() => {
        return Object.values(playerPokemonsRedux).map(item => ({
            ...item,
            possession: 'blue'
        }))
    },);
    const [player2, setPlayer2] = useState([] );
    const [choiceCard, setChoiceCard] = useState(null);

     useEffect(() => {
         setPlayer2(() => {
             if(playerPokemons2Redux.data)
             return playerPokemons2Redux.data.map((item) => ({
                 ...item,
                 possession: 'red',
             }))
             else
               return [];
         });
     }, [playerPokemons2Redux]);

    useEffect(async () => {
            const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
            const bordRequest = await boardResponse.json();
            setBoard(bordRequest.data);
            dispatch(getPlayer2RequestAsync());
    },[]);

    const handleClickBoardPlate = async (position) => {
        if (choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board,
            };

            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id));
            }

            if (choiceCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id));
            }

            setBoard(request.data);
            setSteps(prevState => {
                const count = prevState + 1;
                return count;
            });

        }
    };

    useEffect(() => {
        if (steps === 9) {
            const [count1, count2] = counterWin(board, player1, player2);

            if(count1 > count2) {
                alert('WIN');
                dispatch(setWinner(1));

            } else if (count1 < count2) {
                alert('LOSE');
                dispatch(setWinner(2));

            } else {
                alert('DRAW');
                dispatch(setWinner(0));
            }

            history.push('/game/finish');
        }
    }, [steps]);

        return (
            <div className={s.root}>
                <div className={s.board}>
                    {
                        board.map(item => (
                                <div
                                    key={item.position}
                                    className={s.boardPlate}
                                    onClick={() => !item.card && handleClickBoardPlate(item.position)}
                                >
                                    {
                                        item.card && <PokemonCard {...item.card} isActive minimize/>
                                    }
                                </div>
                            )
                        )
                    }
                </div>
                <div className={s.playerOne}>
                    <PlayerBoard
                        player={1}
                        cards={player1}
                        onClickCard={(card) => setChoiceCard(card)}
                    />
                </div>
                <div className={s.playerTwo}>
                    <PlayerBoard
                        player={2}
                        cards={player2}
                        onClickCard={(card) => setChoiceCard(card)}
                    />
                </div>
            </div>
        );
};

export default BoardPage;