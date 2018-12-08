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
        const {decks} = this.props;
        const {ready} = this.state;
        const keys = Object.keys(decks);

        if (ready === false) {
            return <AppLoading/>
        }

        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.row}>List of Decks</Text>
                </View>
                {keys
                    ? (keys.map((key) => {
                        const deck = decks[key];
                        return (
                            <TouchableOpacity key={key}
                                              style={styles.center}
                                              onPress={() => this.selectDeck(key)}>
                                <Text style={styles.row}>{deck.title}</Text>
                                <Text style={styles.row}>{deck.questions.length} cards</Text>
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
        decks: {
            React: {
                title: 'React',
                questions: [
                    {
                        question: 'What is React?',
                        answer: 'A library for managing user interfaces'
                    },
                    {
                        question: 'Where do you make Ajax requests in React?',
                        answer: 'The componentDidMount lifecycle event'
                    }
                ]
            },
            JavaScript: {
                title: 'JavaScript',
                questions: [
                    {
                        question: 'What is a closure?',
                        answer: 'The combination of a function and the lexical environment within which that function was declared.'
                    }
                ]
            }
        }
    }
}

export default connect(mapStateToProps)(ListDecks)
