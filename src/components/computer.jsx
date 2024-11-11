import React from 'react';
import Card from './Card';

const Computer = ({ cards, score, reveal }) => (
    <div>
        <h3>Computadora (Crupier)</h3>
        <div style={{ display: 'flex' }}>
            {cards.map((card, index) => (
                <Card 
                    key={card.code} 
                    image={reveal || index === 0 ? card.image : 'https://via.placeholder.com/100x150?text=Hidden'} 
                />
            ))}
        </div>
        <p>Puntaje: {reveal ? score : '???'}</p>
    </div>
);

export default Computer;
