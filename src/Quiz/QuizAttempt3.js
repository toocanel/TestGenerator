import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-web';
import {
  Button,
  CheckBox,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useLocalStorage} from '../helpers/useLocalStorage';

const Answer = ({index, aText, correct}) => {
  const [answerText, setAnswerText] = useState(aText);
  const [isCorrect, setIsCorrect] = useState(correct);

  const handleOnChange = () => {
    let ok = !isCorrect;
    setIsCorrect(ok);
  };

  return (
    <View style={styles.answerBlock}>
      <Text style={styles.answerText}>Answer: {index}</Text>
      <TextInput
        value={answerText}
        style={styles.customTextInputAnswer}
        onChangeText={setAnswerText}
      />
      <CheckBox
        id={`custom-checkbox-${index}`}
        value={isCorrect}
        onValueChange={() => handleOnChange(index)}
      />
    </View>
  );
};

const Question = () => {
  //variable containing the text of the question
  const [questionText, setQuestionText] = useState('');
  //variable containing the number of answers of the question
  const [numberOfAnswers, setNumberOfAnswers] = useState(0);
  //array containing the text of the answers
  const [answersText, setAnswersText] = useState([]);
  //array containing false or true depending if the answer is correct or not
  const [answersCorrect, setAnswersCorrect] = useState([]);

  const duNuffin = () => {
    //nothing happening here
  };

  const addNumberOfAnswers = a => {
    const total = numberOfAnswers + a;
    if (total >= 0) {
      setNumberOfAnswers(total);
      if (a > 0) {
        setAnswersText([...answersText, '']);
        setAnswersCorrect([...answersCorrect, false]);
      } else {
        let tmp = answersText;
        tmp.pop();
        setAnswersText(tmp);
        tmp = answersCorrect;
        tmp.pop();
        setAnswersCorrect(tmp);
      }
    }
  };

  return (
    <>
      <View style={styles.questionBlock}>
        <View style={styles.questionRow}>
          <Text style={styles.questionText}>This Is a Question: </Text>
          <TextInput
            value={questionText}
            style={styles.customTextInput}
            onChangeText={setQuestionText}
          />
          <Pressable
            color="#3AB4E9"
            onPress={() => addNumberOfAnswers(1)}
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
            onPress={() => addNumberOfAnswers(-1)}
            style={({pressed, hovered, focused}) => [
              {
                backgroundColor: hovered ? '#00d5ff' : '#3AB4E9',
              },
              styles.wrapperCustom,
            ]}>
            <Text>- Answer</Text>
          </Pressable>
        </View>
        <View>
          <Text>Number of answers: {numberOfAnswers}</Text>
        </View>
        <ScrollView>
          {/* <Answers count={numberOfAnswers} /> */}
          {answersText.map((v, i) => {
            return (
              <Answer key={i} index={i} aText={v} correct={answersCorrect[i]} />
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

const QuestionsList = () => {
  const [questionList, setQuestionList] = useState([]);
  const [numberOfQuestions, setnumberOfQuestions] = useState(0);
  const [localStorage, saveToLocalStorage] = useLocalStorage('UniQueKey', '');

  useEffect(() => {
    console.log('local storage loaded/updated:', localStorage);
  }, [localStorage]);

  const saveCurrentState = () => {
    // data from the current quiz
    const quiz = {
      quizID: 1,
      quizName: 'Nume quiz',
      questions: [
        {
          question: 'De ce are vaca coada1?',
          answers: ['de ce nu', 'de aia', 'ca poate'],
          corect: 1,
        },
      ],
      otherData: 'blabla',
    };
    // Combine existing data with new data
    const localStorageUpdate = [...localStorage, quiz];
    //Save your to localStorage
    saveToLocalStorage(localStorageUpdate);
  };

  const Questions = ({count}) => {
    return Array.from({length: count}).map((_item, index) => {
      console.log(index);
      return <Question key={index} />;
    });
  };

  const addAnotherQuestion = a => {
    let total = numberOfQuestions + a;
    setnumberOfQuestions(total);
  };

  return (
    <View>
      <Pressable
        color="#3AB4E9"
        onPress={() => saveCurrentState()}
        style={({pressed, hovered, focused}) => [
          {
            backgroundColor: hovered ? '#00d5ff' : '#3AB4E9',
          },
          styles.wrapperCustom,
        ]}>
        <Text>Save Current State</Text>
      </Pressable>
      <Pressable
        color="#3AB4E9"
        onPress={() => addAnotherQuestion(1)}
        style={({pressed, hovered, focused}) => [
          {
            backgroundColor: hovered ? '#00d5ff' : '#3AB4E9',
          },
          styles.wrapperCustom,
        ]}>
        <Text>Add Question</Text>
      </Pressable>
      <ScrollView>
        <Questions count={numberOfQuestions} />
      </ScrollView>
      {/* {[...questionList]} */}
      {/* Local storage data */}
      <Text>{JSON.stringify(localStorage)}</Text>
    </View>
  );
};

const QuiztAttempt3 = () => {
  //   console.log(...questions);
  return (
    <View style={styles.mainPage}>
      <QuestionsList />
    </View>
  );
};

export default QuiztAttempt3;

const styles = StyleSheet.create({
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  mainPage: {
    flex: 1,
  },
  questionBlock: {
    flex: 1,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customTextInput: {
    borderColor: 'pink',
    borderWidth: 5,
  },
  questionText: {},
  answerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerText: {flex: 1},
  customTextInputAnswer: {
    flex: 3,
    borderWidth: 1,
  },
});
