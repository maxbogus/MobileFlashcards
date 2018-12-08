import {AsyncStorage} from 'react-native'
import {STORAGE_KEY} from './_decks'

// getDecks: return all of the decks along with their titles, questions, and answers.
export function getDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
}

// getDeck: take in a single id argument and return the deck associated with that id.
export function getDeck(id) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            return data[id]
        })
}

// saveDeckTitle: take in a single title argument and add it to the decks.
export function saveDeckTitle({title}) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[title] = undefined;
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export function addCardToDeck({title, card}) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [title]: card,
    }))
}