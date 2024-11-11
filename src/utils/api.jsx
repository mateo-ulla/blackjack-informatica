const BASE_URL = 'https://deckofcardsapi.com/api/deck';

export async function createDeck() {
    const response = await fetch(`${BASE_URL}/new/shuffle/?deck_count=1`);
    const data = await response.json();
    return data.deck_id;
}

export async function drawCard(deckId, count = 1) {
    const response = await fetch(`${BASE_URL}/${deckId}/draw/?count=${count}`);
    const data = await response.json();
    return data.cards;
}
