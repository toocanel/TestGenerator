import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-web';
import {
  CheckBox,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Answer = props => {
  //these are the answers of the question

  const [answer, setAnswer] = useState(props); //this is the object containing the answers object

  const UpdateIsCorrect = () => {
    let tmp = answer;
    tmp.answer.isCorrect = !tmp.isCorrect;
    setAnswer(tmp);
  };

  const UpdateAnswerText = text => {
    let tmp = answer;
    tmp.answer.text = text;
    setAnswer(tmp);
  };

  return (
    <View>
      <TextInput
        value={answer.text}
        onChangeText={text => UpdateAnswerText(text)}
      />
      <CheckBox
        value={answer.isCorrect}
        onValueChange={() => UpdateIsCorrect()}
      />
    </View>
  );
};

const Question = props => {
  //this contains the information about the question and the list of answers

  const [question, setQuestion] = useState(props); //this is the question object

  const AddAnswers = () => {
    let tmp = question;
    let emptyAnswer = {text: '', isCorrect: false};
    tmp.question.answers.push(emptyAnswer);
    setQuestion(tmp);
  };

  const RemoveAnswer = () => {
    let tmp = question;
    tmp.question.answers.pop();
    setQuestion(tmp);
  };

  const UpdateQuestionText = text => {
    let tmp = question;
    tmp.question.text = text;
    setQuestion(tmp);
  };

  return (
    <View>
      <Text>Question: </Text>
      <TextInput
        value={question.text}
        onChangeText={text => UpdateQuestionText(text)}
      />
      <View>
        {question.question.answers.map((value, index) => {
          console.log(value);
          return <Answer key={index} answer={value} />;
        })}
      </View>
      <Pressable
        color="#3AB4E9"
        onPress={() => AddAnswers()}
        style={({pressed, hovered, focused}) => [
          {
            backgroundColor: hovered ? '#00d5ff' : '#3AB4E9',
          },
          styles.wrapperCustom,
        ]}>
        <Text>+ Answer</Text>
      </Pressable>
      <Pressable
        color="#3AB4E9"
        onPress={() => RemoveAnswer()}
        style={({pressed, hovered, focused}) => [
          {
            backgroundColor: hovered ? '#00d5ff' : '#3AB4E9',
          },
          styles.wrapperCustom,
        ]}>
        <Text>- Answer</Text>
      </Pressable>
    </View>
  );
};

const Quiz = () => {
  //this contains the list of question objects
  const [questions, setQuestions] = useState(null);

  const AddQuestion = () => {
    let emptyQuestion = {text: '', answers: []};
    if (questions) {
      setQuestions([...questions, emptyQuestion]);
    } else {
      setQuestions([emptyQuestion]);
    }
  };

  const WriteToLog = () => {
    console.log(questions);
  };

  return (
    <View>
      <Pressable
        color="#3AB4E9"
        onPress={() => WriteToLog()}
        style={({pressed, hovered, focused}) => [
          {
            backgroundColor: hovered ? '#00d5ff' : '#3AB4E9',
          },
          styles.wrapperCustom,
        ]}>
        <Text>Write to Log</Text>
      </Pressable>
      <Pressable
        color="#3AB4E9"
        onPress={() => AddQuestion()}
        style={({pressed, hovered, focused}) => [
          {
            backgroundColor: hovered ? '#00d5ff' : '#3AB4E9',
          },
          styles.wrapperCustom,
        ]}>
        <Text>Add Question</Text>
      </Pressable>
      {questions && questions.length ? (
        questions.map((value, index) => {
          return <Question key={index} question={value} />;
        })
      ) : (
        <View>
          <Text>No Questions Yet</Text>
        </View>
      )}
    </View>
  );
};

const AndAgain = () => {
  return (
    <>
      <View>
        <Text>And Again as Before!</Text>
      </View>
      <Text>--------------------------------</Text>
      <Quiz />
    </>
  );
};

export default AndAgain;

const styles = StyleSheet.create({
  someStyle: {
    textAlign: 'center',
  },
});
