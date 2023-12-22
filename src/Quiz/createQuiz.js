import React, {useState} from 'react';
import {TextInput} from 'react-native-web';
import {Button, StyleSheet, Text, View} from 'react-native';

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [someText, setSomeText] = useState('');
  const updateOther = text => {
    setSomeText(text);
  };
  const showMeTheText = () => {
    questions.push(someText);
    setQuestions(questions);
  };
  console.log(questions);
  return (
    <View>
      <Text>Let's Create A Quiz!</Text>
      <View style={styles.inputContainer}>
        <Text>Enter Something: </Text>
        <TextInput style={styles.customTextInput} onChangeText={updateOther} />
        <Button title="SaveText!" onPress={showMeTheText} />
      </View>

      {questions.map(a => {
        return <Text>{a}</Text>;
      })}
    </View>
  );
};

export default CreateQuiz;

const styles = StyleSheet.create({
  customTextInput: {
    borderColor: 'pink',
    borderWidth: 5,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    textAlignVertical: 'center',
  },
});
