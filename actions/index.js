export const RECIEVE_DECKS = 'RECIEVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function recieveDecks(decks) {
    return {
        type: RECIEVE_DECKS,
        decks
    }
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCard(deck, card) {
    return {
        type: ADD_CARD,
        deck,
        card
    }
}