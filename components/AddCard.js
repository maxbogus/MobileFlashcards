import React, {Component} from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'

import SubmitBtn from './SubmitBtn'
import {white} from '../utils/colors'

export default class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        deckId: null
    };

    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params;

        return {
            title: `Add Card`
        }
    };

    submitHandler = () => {
        // TODO: save to redux
        // TODO: save to Async storage
        const id = 1;

        this.toDeck({id})
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
