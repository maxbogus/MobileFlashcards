import {AppLoading} from "expo";
import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'

import {recieveDecks} from "../actions";
import {fetchDecks} from "../utils/storage";
import {purple, white} from "../utils/colors";

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

    render() {
        const decks = [{id: 1, name: 'Deck 1', cards: 2}, {id: 2, name: 'Deck 2', cards: 3}];
        const {ready} = this.state;

        if (ready === false) {
            return <AppLoading/>
        }

        return (
            <View style={styles.container}>
                <Text>List of Decks</Text>
                {decks.length && (
                    decks.map((deck) => {
                        return (
                            <View key={deck.id} style={styles.row}>
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
        flex: 1,
        alignItems: 'center',
    },
});

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(ListDecks)