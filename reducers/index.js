import {RECIEVE_DECKS, ADD_DECK, ADD_QUESTION} from '../actions'

function decks (state = {}, action) {
    switch (action.type) {
        case RECIEVE_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case ADD_DECK:
            return {
                ...state,
                ...action.deck,
            };
        case ADD_QUESTION:
            return state;
        default:
            return state
    }
}

export default decks
