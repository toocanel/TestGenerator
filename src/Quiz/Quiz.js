import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Question from './Question';
import quest from './mockQuestions.json';

const Quiz = () => {
  const [questions, setQuestions] = useState(quest);

  const [raspunsuriCorecte, setRaspunsuriCorecte] = useState(0);

  const setRaspuns = (indexIntrebare, indexRaspuns) => {
    console.log(
      indexIntrebare,
      indexRaspuns,
      questions[indexIntrebare].corect === indexRaspuns + 1,
    );
    let a = raspunsuriCorecte + 1;
    questions[indexIntrebare].corect === indexRaspuns + 1
      ? setRaspunsuriCorecte(a)
      : null;
    console.log(raspunsuriCorecte);
  };

  return (
    <>
      {/* <Button onPress={_onPressButton} title="Don't Touch!" color="magenta" /> */}
      <View>
        <Question q={quest} setRaspuns={setRaspuns} />
      </View>
      <View>
        <Text>Raspunsuri Corecte: {raspunsuriCorecte}</Text>
      </View>
    </>
  );
};

export default Quiz;
