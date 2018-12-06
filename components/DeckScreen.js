import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from "react-redux"

import {white} from "../utils/colors";

class DeckScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params;

        return {
            title: `Deck ${deckId}`
        }
    };

    render() {
        const deck = {id: 1, name: 'Deck 1', cards: 2};

        return (
            <View style={styles.container}>
                <Text>{deck.name}</Text>
                <Text>{deck.cards} cards</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    }
});

function mapDispatchToProps(dispatch, {navigation}) {
    return {
        goBack: () => navigation.goBack(),
    }
}

function mapStateToProps(state, {navigation}) {
    const {deckId} = navigation.state.params;

    return {
        deckId
    }
}

export default connect(mapDispatchToProps, mapStateToProps)(DeckScreen)
