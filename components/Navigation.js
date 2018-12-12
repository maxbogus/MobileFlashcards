import {FontAwesome, Ionicons} from '@expo/vector-icons'
import React from 'react'
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {Platform} from 'react-native'

import AddCard from './AddCard'
import AddDeck from './AddDeck'
import DeckScreen from './DeckScreen'
import ListDecks from './ListDecks'
import Quiz from './Quiz'
import {purple, white} from '../utils/colors'

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

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs
    },
    DeckScreen: {
        screen: DeckScreen,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    }
});

export const Container = createAppContainer(MainNavigator);
