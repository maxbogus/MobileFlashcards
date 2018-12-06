import {AppLoading} from "expo";
import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'

import {recieveDecks} from "../actions"
import {white} from "../utils/colors"
import {fetchDecks} from "../utils/storage"

class ListDecks extends Component {
    state = {
        ready: false,
    };

    componentDidMount() {
        const {dispatch} = this.props;
        fetchDecks()
            .then((decks) => dispatch(recieveDecks(decks)))
            .then(() => this.setState(() => ({ready: true})))
    }

    selectDeck = (id) => {
        this.props.navigation.navigate(
            'DeckScreen',
            {deckId: id}
        )
    };

    render() {
        const decks = [{id: 1, name: 'Deck 1', cards: 2}, {id: 2, name: 'Deck 2', cards: 3}];
        // const decks = [];
        const {ready} = this.state;

        if (ready === false) {
            return <AppLoading/>
        }

        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.row}>List of Decks</Text>
                </View>
                {decks.length
                    ? (decks.map((deck) => {
                        return (
                            <TouchableOpacity key={deck.id}
                                              style={styles.center}
                                              onPress={() => this.selectDeck(deck.id)}>
                                <Text style={styles.row}>{deck.name}</Text>
                                <Text style={styles.row}>{deck.cards} cards</Text>
                            </TouchableOpacity>
                        )
                    }))
                    : (
                        <View style={styles.center}>
                            <Text style={styles.row}>No decks</Text>
                        </View>
                    )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(ListDecks)
