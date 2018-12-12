import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'

import SubmitBtn from './SubmitBtn'
import {white} from '../utils/colors'

class DeckScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params;

        return {
            title: `Deck ${deckId}`
        }
    };

    addCard = (id) => {
        this.props.navigation.navigate(
            'AddCard',
            {deckId: id}
        )
    };

    startQuiz = (id) => {
        this.props.navigation.navigate(
            'Quiz',
            {deckId: id}
        )
    };

    render() {
        const {deck} = this.props;

        if (!deck) {
            return (
                <Text> No data </Text>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.row}>{deck.title}</Text>
                    <Text style={styles.row}>{deck.questions.length} cards</Text>
                </View>
                <View style={styles.center}>
                    <SubmitBtn onPress={() => this.addCard(deck.title)}
                               style={styles.row}
                               text='Add Card'
                    />
                </View>
                <View style={styles.center}>
                    <SubmitBtn onPress={() => this.startQuiz(deck.title)}
                               disabled={deck.questions.length === 0}
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
        deckId,
        deck: state[deckId]
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen)
