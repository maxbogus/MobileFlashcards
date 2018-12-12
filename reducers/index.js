import {ADD_CARD, ADD_DECK, RECEIVE_DECKS} from '../actions'

function decks (state = {}, action) {
    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                [action.deck]: {
                    ...state[action.deck],
                    questions: state[action.deck].questions.concat(action.card)
                }
            };
        case ADD_DECK:
            return {
                ...state,
                ...action.deck,
            };
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            };
        default:
            return state
    }
}

export default decks
