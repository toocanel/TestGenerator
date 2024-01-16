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
import {useLocalStorage} from '../helpers/useLocalStorage';

const Answer = props => {
  const [answerText, setAnswerText] = useState(props.aText);
  const [answerIndex, setanswerIndex] = useState(props.index);
  const [isCorrect, setIsCorrect] = useState(props.correct);

  const handleOnChange = () => {
    let ok = !isCorrect;
    setIsCorrect(ok);
    props.updAnswerIsCorrect(answerIndex, ok);
  };

  const handleOnChangeText = text => {
    setAnswerText(text);
    props.updAnswerText(answerIndex, text);
  };

  return (
    <View style={styles.answerBlock}>
      <Text style={styles.answerText}>Answer: {answerIndex}</Text>
      <TextInput
        value={answerText}
        style={styles.customTextInputAnswer}
        onChangeText={text => handleOnChangeText(text)}
      />
      <CheckBox
        id={`custom-checkbox-${answerIndex}`}
        value={isCorrect}
        onValueChange={() => handleOnChange(answerIndex)}
      />
    </View>
  );
};

const Question = props => {
  //variable containing the text of the question
  const [questionText, setQuestionText] = useState('');
  //variable containing the number of answers of the question
  const [numberOfAnswers, setNumberOfAnswers] = useState(0);
  //variable containing the index of the question
  const [indexQ, setIndexQ] = useState(props.index);
  //variable containing the question data
  const [questionObject, setQuestionObject] = useState(props.question);

  const [testValue, setTestValue] = useState(null);

  const duNuffin = data => {
    //nothing happening here
    let q = {index: indexQ, question: questionObject};
    console.log(q);

    questionObject !== null &&
    questionObject.answers &&
    questionObject.answers.length > 0
      ? questionObject.answers.map((v, i) => {
          console.log(v, i);
          // return (
          //   <Answer
          //     key={i}
          //     index={i}
          //     aText={questionObject.answers[i].text}
          //     correct={questionObject.answers[i].correct}
          //     updAnswerText={updateAnswerText}
          //     updAnswerIsCorrect={updateAnswerIsCorrect}
          //   />
          // );
        })
      : null;
  };

  const updateAnswerText = (index, value) => {
    //answersText[index] = value;
    questionObject.answers[index].text = value;
    let q = {index: indexQ, question: questionObject};
    props.updateQuestion(q);
  };
  const updateAnswerIsCorrect = (index, value) => {
    //answersCorrect[index] = value;
    questionObject.answers[index].correct = value;
    let q = {index: indexQ, question: questionObject};
    props.updateQuestion(q);
  };

  const addNumberOfAnswers = a => {
    if (questionText.length <= 0) {
      //console.log('scrie ceva in question');
      return;
    }
    const total = numberOfAnswers + a;
    if (total >= 0) {
      let tmp = questionObject;

      setNumberOfAnswers(total);
      if (a > 0) {
        if (typeof tmp !== 'undefined' && tmp !== null) {
          let answer = {text: '', correct: false};
          tmp.answers.push(answer);
          //console.log('adding crap');
        } else {
          let answer = {text: '', correct: false};
          let question = {
            text: questionText,
            answers: [],
          };
          question.answers.push(answer);
          tmp = question;
          //console.log('initializing');
        }
        setQuestionObject(tmp);
      } else {
        tmp.answers.pop();
        setQuestionObject(tmp);
      }
    }
    let q = {index: indexQ, question: questionObject};
    props.updateQuestion(q);
    console.log(questionObject);
  };

  const updateQuestionText = text => {
    setQuestionText(text);
  };

  return (
    <>
      <View style={styles.questionBlock}>
        <View style={styles.questionRow}>
          <Text style={styles.questionText}>This Is a Question: </Text>
          <TextInput
            value={
              questionObject && questionObject.text ? questionObject.text : ''
            }
            style={styles.customTextInput}
            onChangeText={updateQuestionText}
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
          {questionObject !== null &&
          questionObject.answers &&
          questionObject.answers.length > 0
            ? questionObject.answers.map((v, i) => {
                return (
                  <Answer
                    key={i}
                    index={i}
                    aText={questionObject.answers[i].text}
                    correct={questionObject.answers[i].correct}
                    updAnswerText={updateAnswerText}
                    updAnswerIsCorrect={updateAnswerIsCorrect}
                  />
                );
              })
            : null}
        </ScrollView>
      </View>
      {/* <Pressable
        color="#3AB4E9"
        onPress={() => duNuffin()}
        style={({pressed, hovered, focused}) => [
          {
            backgroundColor: hovered ? '#00d5ff' : '#3AB4E9',
          },
          styles.wrapperCustom,
        ]}>
        <Text>My Test Button! Go Away!!!! XD</Text>
      </Pressable> */}
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

  const UpdateQuestion = question => {
    questionList[question.index] = question;
  };

  const Questions = () => {
    return questionList.map((value, _index) => {
      return (
        <Question
          key={_index}
          question={value.question}
          index={_index}
          updateQuestion={UpdateQuestion}
        />
      );
    });
  };

  const addAnotherQuestion = a => {
    let total = numberOfQuestions + a;
    let question = {index: numberOfQuestions, question: null};

    setQuestionList([...questionList, question]);
    setnumberOfQuestions(total);
  };

  const Cucubau = () => {
    return <Text>Un Cucubau</Text>;
  };

  const writeToLog = () => {
    console.log(questionList);
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
      <Pressable
        color="#3AB4E9"
        onPress={() => writeToLog()}
        style={({pressed, hovered, focused}) => [
          {
            backgroundColor: hovered ? '#00d5ff' : '#3AB4E9',
          },
          styles.wrapperCustom,
        ]}>
        <Text>Write to Log</Text>
      </Pressable>
      <ScrollView>
        <Questions />
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
