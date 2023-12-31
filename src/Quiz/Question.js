import React from 'react';
import {Text, View} from 'react-native';
import Answers from './Answer.js';

const Question = ({q, setRaspuns}) => {
  return q.map((a, i) => {
    return (
      <View>
        <Text>{a.question}</Text>
        <Answers a={a.answers} c={a.corect} index={i} setRaspuns={setRaspuns} />
      </View>
    );
  });
};

export default Question;
