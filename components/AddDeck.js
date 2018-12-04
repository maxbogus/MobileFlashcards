import React, {Component} from 'react'
import {Button, StyleSheet, Text, TextInput, View} from 'react-native'

export default class AddDeck extends Component {
    state = {
        text: ''
    };

    submitHandler = () => {
        console.log(this.state.text)
    };

    render() {
        return (
            <View>
                <Text>What is the title of your new deck?</Text>
                <TextInput value={this.state.text}
                           onChangeText={(text) => this.setState({text})}/>
                <Button disabled={this.state.text === ''}
                        title='Submit'
                        onPress={() => this.submitHandler()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({});
