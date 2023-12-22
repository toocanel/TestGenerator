import React, {useState} from 'react';
import {TextInput} from 'react-native-web';
import {Button, StyleSheet, Text, View} from 'react-native';

const CreateQuiz = () => {
  const [questionTextValue, setQuestionTextValue] = useState('');
  const [numberOfAnswers, setNumberOfAnswers] = useState(0);
  const [questions, setQuestions] = useState([]);
  const updateQuestionTextValue = text => {
    setQuestionTextValue(text);
  };
  const updateNumberOfAnswersValue = text => {
    setNumberOfAnswers(text);
  };
  const showMeTheText = () => {
    setQuestions([...questions, questionTextValue]);
    setQuestionTextValue('');
  };
  //   console.log(...questions);
  return (
    <View>
      <Text>Let's Create A Quiz!</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Enter Queston: </Text>
        <TextInput
          value={questionTextValue}
          style={styles.customTextInput}
          onChangeText={updateQuestionTextValue}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Enter Number Of Answers: </Text>
        <TextInput
          value={numberOfAnswers}
          style={styles.customTextInput}
          onChangeText={updateNumberOfAnswersValue}
        />
      </View>
      <Button title="SaveText!" onPress={showMeTheText} />

      {questions.map(a => {
        return <Text>{JSON.stringify(a)}</Text>;
      })}
    </View>
  );
};

export default CreateQuiz;

const styles = StyleSheet.create({
  customTextInput: {
    borderColor: 'pink',
    borderWidth: 5,
    flex: 2,
  },
  inputContainer: {
    flex: 1,
    width: 600,
    flexDirection: 'row',
    textAlignVertical: 'center',
  },
  inputText: {
    flex: 1,
  },
});
