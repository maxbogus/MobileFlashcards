import {AppLoading} from "expo";
import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import {recieveDecks} from "../actions";
import {fetchDecks} from "../utils/storage";

export default class ListDecks extends Component {
    state = {
        ready: false,
    };

    componentDidMount() {
        const {dispatch} = this.props;
        fetchDecks()
            .then((decks) => dispatch(recieveDecks(decks)))
            .then(() => this.setState(() => ({ready: true})))
    }

    render() {
        const decks = [{id: 1, name: 'Deck 1', cards: 2}, {id: 2, name: 'Deck 2', cards: 3}];
        const {ready} = this.state;

        if (ready === false) {
            return <AppLoading/>
        }

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
