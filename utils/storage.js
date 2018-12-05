import {AsyncStorage} from 'react-native'
import {STORAGE_KEY} from "./_decks";

export function fetchDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
}

export function submitDeck({entry, key}) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [key]: entry,
    }))
}