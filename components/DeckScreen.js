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
        this.props.navigation.navigate(
            'AddCard',
            {deckId: id}
        )
    };

    startQuiz = () => {
        this.props.navigation.navigate(
            'Quiz',
            {deckId: id}
        )
    };

    render() {
        const deck = {id: 1, name: 'Deck 1', cards: 2};

        return (
            <View style={styles.container}>
                <View style={[styles.row, styles.center]}>
                    <Text>{deck.name}</Text>
                    <Text>{deck.cards} cards</Text>
                </View>
                <View style={styles.center}>
                    <SubmitBtn onPress={() => this.addCard()}
                               style={styles.row}
                               text='Add Card'
                    />
                </View>
                <View style={styles.center}>
                    <SubmitBtn onPress={() => this.startQuiz()}
                               style={styles.row}
                               text='Start Quiz'
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        borderLeftWidth: 4,
        borderRightWidth: 4,
        height: 70
    },
    input: {
        height: 70,
        backgroundColor: white,
        paddingLeft: 15,
        paddingRight: 15
    },
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
