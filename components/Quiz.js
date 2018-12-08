import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'

import SubmitBtn from './SubmitBtn'
import {purple, white} from '../utils/colors'
import {clearLocalNotification, setLocalNotification} from '../utils/notifications'

class Quiz extends Component {
    static navigationOptions = () => {
        return {
            title: `Quiz`
        }
    };

    state = {
        index: 0,
        showAnswer: false,
        score: 0
    };

    backToDeck = () => {
        this.props.navigation.navigate(
            'DeckScreen',
            {deckId: this.props.deckId}
        )
    };

    componentDidMount() {
        clearLocalNotification()
            .then(setLocalNotification)
    }

    countCorrectAnswer = () => {
        const currentScore = this.state.score;
        this.setState({score: currentScore + 1})
    };

    flipCard = (status) => {
        this.setState({showAnswer: !status})
    };

    restartQuiz = () => {
        this.setState({
            index: 0,
            showAnswer: false,
            score: 0
        })
    };

    increment = () => {
        const currentIndex = this.state.index;
        this.setState({index: currentIndex + 1})
    };

    voteCorrect = () => {
        this.countCorrectAnswer();
        this.increment();
    };

    voteIncorrect = () => {
        this.increment();
    };

    render() {
        const {index, showAnswer} = this.state;
        const {deck} = this.props;
        const {questions} = deck;

        if (index === questions.length) {
            const {score} = this.state;
            return (
                <View style={styles.container}>
                    <View style={styles.center}>
                        <Text>Results:</Text>
                    </View>
                    <View style={styles.center}>
                        <Text>Number of correct answers: {score}.</Text>
                        <Text>{(100 / questions.length) * score}% answers were correct.</Text>
                    </View>
                    <View style={styles.center}>
                        <SubmitBtn onPress={() => {
                            this.restartQuiz()
                        }} text='Restart Quiz'/>
                    </View>
                    <View style={styles.center}>
                        <SubmitBtn onPress={() => {
                            this.backToDeck()
                        }} text='Back to Deck'/>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text>Answered {index} / {questions.length} questions.</Text>
                </View>
                <View style={styles.center}>
                    <TouchableOpacity onPress={() => this.flipCard(showAnswer)}>
                        <Text>{showAnswer ? questions[index].answer : questions[index].question}</Text>
                        <Text style={{color: purple}}>View {showAnswer ? 'question' : 'answer'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.center}>
                    <SubmitBtn onPress={() => {
                        this.voteCorrect()
                    }}
                               style={styles.row}
                               text='Correct'/>
                </View>
                <View style={styles.center}>
                    <SubmitBtn onPress={() => {
                        this.voteIncorrect()
                    }}
                               style={styles.row}
                               text='Incorrect'/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        deck: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        }
    }
}

export default connect(mapDispatchToProps, mapStateToProps)(Quiz)
