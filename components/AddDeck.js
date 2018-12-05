import React, {Component} from 'react'
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {NavigationActions} from 'react-navigation'

import {purple, white} from "../utils/colors";

function SubmitBtn({onPress, disabled}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}
            disabled={disabled}>
            <Text style={styles.submitBtnText}>Create Deck</Text>
        </TouchableOpacity>
    )
}

export default class AddDeck extends Component {
    state = {
        text: ''
    };

    submitHandler = () => {
        // TODO: save to redux
        // TODO: save to Async storage
        // TODO: get last id
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
                    <Text style={styles.center}>What is the title of your new deck?</Text>
                </View>
                <View style={[styles.row, styles.inputContainer]}>
                    <TextInput style={[styles.row, styles.input]}
                               value={this.state.text}
                               onChangeText={(text) => this.setState({text})}/>
                </View>
                <SubmitBtn disabled={this.state.text === ''}
                           onPress={() => this.submitHandler()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingRight: 30,
        paddingLeft: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginRight: 40,
        marginLeft: 40,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
});
