import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from "react-redux"

import {white} from "../utils/colors"
import SubmitBtn from './SubmitBtn'

class DeckScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params;

        return {
            title: `Deck ${deckId}`
        }
    };

    addCard = () => {
        console.log('add card');
    };

    startQuiz = () => {
        console.log('start quiz');
    };

    render() {
        const deck = {id: 1, name: 'Deck 1', cards: 2};

        return (
            <View style={styles.container}>
                <Text>{deck.name}</Text>
                <Text>{deck.cards} cards</Text>
                <SubmitBtn onPress={() => this.addCard()}
                           text='Add Card'
                />
                <SubmitBtn onPress={() => this.startQuiz()}
                           text='Start Quiz'
                />
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
