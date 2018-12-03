import React, {Component} from 'react';
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {Platform, Text, View} from 'react-native';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation'
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import AddDeck from './components/AddDeck'
import ListDecks from './components/ListDecks'
import reducer from './reducers'
import {purple, white} from './utils/colors'

const store = createStore(reducer);

const Tabs = createBottomTabNavigator({
    ListDecks: {
        screen: ListDecks,
        navigationOptions: {
            tabBarLevel: 'List of Decks',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLevel: 'Add Deck',
            tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1,
        }
    }
});
const Container = createAppContainer(Tabs);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <Text>Open up App.js to start working on your app!</Text>
                    <Container/>
                </View>
            </Provider>
        );
    }
}
