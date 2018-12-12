import {AppLoading} from 'expo'
import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'

import {receiveDecks} from '../actions'
import {white} from '../utils/colors'
import {getDecks} from '../utils/storage'

class ListDecks extends Component {
    state = {
        ready: false,
    };

    componentDidMount() {
        const {dispatch} = this.props;
        getDecks()
            .then((decks) => {
                dispatch(receiveDecks(JSON.parse(decks)));
            })
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

        const keys = (decks) ? Object.keys(decks) : null;

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

                                <Text style={styles.row}>{deck.questions ? deck.questions.length : 0} cards</Text>
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
