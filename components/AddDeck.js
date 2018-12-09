import React, {Component} from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {connect} from 'react-redux'

import SubmitBtn from './SubmitBtn'
import {addDeck} from '../actions'
import {white} from '../utils/colors'
import {saveDeckTitle} from '../utils/storage'

class AddDeck extends Component {
    state = {
        title: ''
    };

    submitHandler = () => {
        const {dispatch} = this.props;
        const id = this.state.title;

        const deck = {
            [id]: {
                title: id,
                questions: []
            }
        };

        dispatch(addDeck(deck));
        saveDeckTitle(id);

        this.reset();
        this.toDeck({id})
    };

    reset = () => {
        this.setState({title: ''});
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
                    <Text style={styles.center}>What is the title of your new deck?</Text>
                </View>
                <View style={[styles.row, styles.inputContainer]}>
                    <TextInput style={[styles.row, styles.input]}
                               value={this.state.title}
                               onChangeText={(title) => this.setState({title: title})}/>
                </View>
                <SubmitBtn disabled={this.state.title === ''}
                           onPress={() => this.submitHandler()}/>
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

export default connect()(AddDeck)
