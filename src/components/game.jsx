import React, { useState, useEffect } from 'react';
import { createDeck, drawCard } from '../utils/api';
import Player from './Player';
import Computer from './Computer';
import './Game.css';

const Game = () => {
    const [deckId, setDeckId] = useState(null);
    const [playerCards, setPlayerCards] = useState([]);
    const [computerCards, setComputerCards] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [revealComputerCards, setRevealComputerCards] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = async () => {
        const newDeckId = await createDeck();
        setDeckId(newDeckId);

        const initialPlayerCards = await drawCard(newDeckId, 2);
        const initialComputerCards = await drawCard(newDeckId, 2);
        setPlayerCards(initialPlayerCards);
        setComputerCards(initialComputerCards);

        const playerScore = calculateScore(initialPlayerCards);
        if (playerScore === 21) {
            setWinner('Jugador'); 
            setIsGameOver(true);
            setRevealComputerCards(true); 
        }
    };

    const resetGame = () => {
        setPlayerCards([]);
        setComputerCards([]);
        setIsGameOver(false);
        setWinner(null);
        setRevealComputerCards(false);
        initializeGame();
    };

    const calculateScore = (cards) => {
        let score = 0;
        let aceCount = 0;
        cards.forEach(card => {
            if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
                score += 10;
            } else if (card.value === 'ACE') {
                aceCount += 1;
                score += 11;
            } else {
                score += parseInt(card.value);
            }
        });
        while (score > 21 && aceCount) {
            score -= 10;
            aceCount -= 1;
        }
        return score;
    };

    const handlePlayerHit = async () => {
        if (deckId && !isGameOver) {
            const newCard = await drawCard(deckId);
            const updatedPlayerCards = [...playerCards, ...newCard];
            setPlayerCards(updatedPlayerCards);

            const playerScore = calculateScore(updatedPlayerCards);
            if (playerScore > 21) {
                setWinner('Crupier');  
                setIsGameOver(true);
                setRevealComputerCards(true); s
            }
        }
    };

    const handleStand = async () => {
        let computerScore = calculateScore(computerCards);
        let newComputerCards = [...computerCards];
        while (computerScore < 17) {
            const newCard = await drawCard(deckId);
            newComputerCards = [...newComputerCards, ...newCard];
            computerScore = calculateScore(newComputerCards);
        }
        setComputerCards(newComputerCards);
        setRevealComputerCards(true);
        determineWinner();
    };

    const determineWinner = () => {
        const playerScore = calculateScore(playerCards);
        const computerScore = calculateScore(computerCards);
        if (playerScore > 21 || (computerScore <= 21 && computerScore >= playerScore)) {
            setWinner('Crupier');
        } else {
            setWinner('Jugador');
        }
        setIsGameOver(true);
    };

    return (
        <div className="game-container">
            <h2>Juego de Blackjack</h2>
            <Player cards={playerCards} score={calculateScore(playerCards)} />
            <Computer 
                cards={computerCards} 
                score={isGameOver ? calculateScore(computerCards) : null} 
                reveal={revealComputerCards} 
            />
            <div className="controls">
                {isGameOver ? (
                    <>
                        <h3>Ganador: {winner}</h3>
                        <button className="play-again-button" onClick={resetGame}>Jugar de Nuevo</button>
                    </>
                ) : (
                    <>
                        <button className="action-button" onClick={handlePlayerHit}>Pedir Carta</button>
                        <button className="action-button" onClick={handleStand}>Plantarse</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Game;
