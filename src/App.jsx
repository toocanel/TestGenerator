import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Quiz from './Quiz/Quiz';
import CreateQuiz from './Quiz/CreateQuiz';
import QuiztAttempt2 from './Quiz/QuizAttempt2';
import QuiztAttempt3 from './Quiz/QuizAttempt3';
import AndAgain from './Quiz/AndAgain';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      {/* <Quiz /> */}
      {/* <CreateQuiz /> */}
      {/* <QuiztAttempt2 /> */}
      {/* <QuiztAttempt3 /> */}
      <AndAgain />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#000',
  },
});
