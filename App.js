import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {Constants} from 'expo'
import React, {Component} from 'react'
import {Platform, StatusBar, View} from 'react-native'
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import DeckScreen from './components/DeckScreen'
import ListDecks from './components/ListDecks'
import Quiz from './components/Quiz'
import reducer from './reducers'
import {purple, white} from './utils/colors'
import {setLocalNotification} from './utils/notifications'

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

const Container = createAppContainer(MainNavigator);

function CardsStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

export default class App extends Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <CardsStatusBar backgroundColor={purple} barStyle='light-content'/>
                    <Container/>
                </View>
            </Provider>
        );
    }
}
