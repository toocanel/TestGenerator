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

  const [answer, setAnswer] = useState(props.answer); //this is the object containing the answers object

  const UpdateIsCorrect = () => {
    let tmp = answer;
    tmp.isCorrect = !tmp.isCorrect;
    props.updateAnswer(props.index, tmp);
  };

  const UpdateAnswerText = text => {
    let tmp = answer;
    tmp.text = text;
    props.updateAnswer(props.index, tmp);
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
  const [question, setQuestion] = useState(props.question); //this is the question object

  const updateText = e => {
    props.updateQuestionText(props.index, e);
  };

  const updateAnswer = (answerIndex, answerValue) => {
    let tmp = question.answers;
    tmp[answerIndex] = answerValue;
    props.updateQuestionAnswers(props.index, tmp);
  };
  const UpdateAnswers = e => {
    if (e > 0) {
      let emptyAnswer = {text: '', isCorrect: false};
      let tmp = [...question.answers, emptyAnswer];
      props.updateQuestionAnswers(props.index, tmp);
    } else {
      let tmp = question.answers;
      tmp.pop();
      props.updateQuestionAnswers(props.index, tmp);
    }
  };

  return (
    <View>
      <Text>Question: </Text>
      <TextInput value={question.text} onChangeText={updateText} />
      <View>
        {question.answers.map((value, index) => {
          console.log(value);
          return (
            <Answer
              key={index}
              index={index}
              answer={value}
              updateAnswer={updateAnswer}
            />
          );
        })}
      </View>
      <Pressable
        color="#3AB4E9"
        onPress={() => UpdateAnswers(1)}
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
        onPress={() => UpdateAnswers(-1)}
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
  const [quiz, setQuiz] = useState({
    name: 'QuizName',
    questions: [],
  });

  const AddQuestion = () => {
    let emptyQuestion = {text: '', answers: []};
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, emptyQuestion],
    });
  };

  const updateQuestionText = (index, questionText) => {
    let tmp = quiz.questions;
    tmp[index].text = questionText;
    setQuiz({...quiz, questions: tmp});
  };

  const updateQuestionAnswers = (index, answers) => {
    let tmp = quiz.questions;
    tmp[index].answers = answers;
    setQuiz({...quiz, questions: tmp});
  };

  const WriteToLog = () => {
    console.log(quiz);
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
      {quiz.questions.length !== 0 ? (
        quiz.questions.map((value, index) => {
          return (
            <Question
              key={index}
              index={index}
              question={value}
              updateQuestionText={updateQuestionText}
              updateQuestionAnswers={updateQuestionAnswers}
            />
          );
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
