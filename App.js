import {Constants} from 'expo'
import React, {Component} from 'react'
import {StatusBar, View} from 'react-native'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import {Container} from './components/Navigation'
import reducer from './reducers'
import {purple} from './utils/colors'
import {setLocalNotification} from './utils/notifications'

const store = createStore(reducer);

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
