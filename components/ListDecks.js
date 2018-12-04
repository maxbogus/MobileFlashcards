import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default class ListDecks extends Component {
    render() {
        const decks = [{id: 1, name: 'Deck 1', cards: 2}, {id: 2, name: 'Deck 2', cards: 3}];
        return (
            <View>
                <Text>List of Decks</Text>
                {decks.length && (
                    decks.map((deck) => {
                        return (
                            <View key={deck.id}>
                                <Text>{deck.name}</Text>
                                <Text>{deck.cards} cards</Text>
                            </View>
                        )
                    })
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({});
