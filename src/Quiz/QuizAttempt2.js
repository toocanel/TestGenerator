import React, {useState} from 'react';
import {TextInput} from 'react-native-web';
import {
  CheckBox,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Answer = ({index}) => {
  const [answerText, setAnswerText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

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
  const [questionText, setQuestionText] = useState('');
  const [numberOfAnswers, setNumberOfAnswers] = useState(0);

  const duNuffin = () => {
    //nothing happening here
  };

  const addNumberOfAnswers = a => {
    const total = numberOfAnswers + a;
    if (total >= 0) {
      setNumberOfAnswers(total);
    }
  };

  const Answers = ({count}) => {
    return Array.from({length: count}).map((_item, index) => {
      console.log(index);
      return <Answer index={index} />;
    });
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
          <Button
            color="#3AB4E9"
            title="+ Answer"
            onPress={() => addNumberOfAnswers(1)}
          />
          <Button
            color="#3AB4E9"
            title="- Answer"
            padding="30px"
            onPress={() => addNumberOfAnswers(-1)}
          />
        </View>
        <View>
          <Text>Number of answers: {numberOfAnswers}</Text>
        </View>
        <ScrollView>
          <Answers count={numberOfAnswers} />
        </ScrollView>
      </View>
    </>
  );
};

const QuestionsList = () => {
  const [questionList, setQuestionList] = useState([]);
  const [numberOfQuestions, setnumberOfQuestions] = useState(0);

  const saveCurrentState = () => {
    //To do this thingy
  };

  const Questions = ({count}) => {
    return Array.from({length: count}).map((_item, index) => {
      console.log(index);
      return <Question />;
    });
  };

  const addAnotherQuestion = a => {
    let total = numberOfQuestions + a;
    setnumberOfQuestions(total);
  };

  return (
    <View>
      <Button
        color="#3AB4E9"
        title="Save Current State"
        onPress={() => saveCurrentState}
      />
      <Button
        color="#3AB4E9"
        title="Add Question"
        onPress={() => addAnotherQuestion(1)}
      />
      <ScrollView>
        <Questions count={numberOfQuestions} />
      </ScrollView>
      {[...questionList]}
    </View>
  );
};

const QuiztAttempt2 = () => {
  //   console.log(...questions);
  return (
    <View style={styles.mainPage}>
      <QuestionsList />
    </View>
  );
};

export default QuiztAttempt2;

const styles = StyleSheet.create({
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
