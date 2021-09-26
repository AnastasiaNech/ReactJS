import React, {useState} from "react";
import s from './style.module.css';
import cn from 'classnames';
import PokemonCard from "../../../../../../components/PokemonCard";

const PlayerBoard = ({player, cards, onClickCard}) => {
    const [isSelected, setSelected] = useState(null);
    return (
        <>
            {
                cards.map((item) => (
                    <div
                        className={cn(s.cardBoard, {
                        [s.selected] : isSelected === item.id
                    })}
                    onClick={() => {
                        setSelected(item.id);
                        onClickCard && onClickCard({
                                player,
                                ...item,
                        });
                    }}
                    >
                        <PokemonCard
                            className={s.cardBoard}
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            minimize
                            isActive
                        />
                    </div>
                ))
            }
        </>
    );
};

export default PlayerBoard;