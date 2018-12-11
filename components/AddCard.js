import React, {Component} from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'

import SubmitBtn from './SubmitBtn'
import {white} from '../utils/colors'
import {addCard} from "../actions";
import {addCardToDeck} from "../utils/storage";
import {connect} from "react-redux";

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        deckId: null
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: `Add Card`
        }
    };

    submitHandler = () => {
        const {question, answer} = this.state;
        const {deckId, dispatch} = this.props;

        const card = {
            question: question,
            answer: answer
        };

        dispatch(addCard(deckId, card));
        // TODO: save to Async storage
        addCardToDeck(deckId, card);

        this.toDeck({id: deckId})
    };

    toDeck = ({id}) => {
        this.props.navigation.navigate(
            'DeckScreen',
            {deckId: id}
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.center}>Add question</Text>
                </View>
                <View style={[styles.row, styles.inputContainer]}>
                    <TextInput style={[styles.row, styles.input]}
                               value={this.state.question}
                               onChangeText={(question) => this.setState({question})}/>
                </View>
                <View style={styles.row}>
                    <Text style={styles.center}>Add answer</Text>
                </View>
                <View style={[styles.row, styles.inputContainer]}>
                    <TextInput style={[styles.row, styles.input]}
                               value={this.state.answer}
                               onChangeText={(answer) => this.setState({answer})}/>
                </View>
                <SubmitBtn disabled={this.state.question === '' && this.state.answer === ''}
                           onPress={() => this.submitHandler()}
                           text='Submit'/>
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

function mapStateToProps(state, {navigation}) {
    const {deckId} = navigation.state.params;

    return {
        deckId
    }
}

export default connect(mapStateToProps)(AddCard)
