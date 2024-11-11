import React from 'react';
import Card from './Card';

const Player = ({ cards, score }) => (
    <div>
        <h3>Jugador</h3>
        <div>
            {cards.map(card => <Card key={card.code} image={card.image} />)}
        </div>
        <p>Puntaje: {score}</p>
    </div>
);

export default Player;
