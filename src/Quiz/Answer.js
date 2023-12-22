import React, {useState} from 'react';
import {CheckBox, StyleSheet, Text, View} from 'react-native';

const Answers = ({a, c, index, setRaspuns}) => {
  const [isSet, setIsSet] = useState(a.map((x, i) => i === c - 1));

  const handleOnChange = i => {
    const updateCheckedState = isSet.map((x, y) => y === i);
    setIsSet(updateCheckedState);
    if (isSet[i] === false) {
      setRaspuns(index, i);
    }
  };

  return a.map((b, i) => {
    return (
      <View style={styles.checkboxContainer}>
        <CheckBox
          id={`custom-checkbox-${i}`}
          value={isSet[i]}
          onValueChange={() => handleOnChange(i)}
        />
        <Text style={styles.checkboxText}>{b}</Text>
      </View>
    );
  });
};

export default Answers;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  checkbox: {
    alignSelf: 'center',
    paddingRight: 10,
  },
  checkboxText: {
    paddingLeft: 10,
  },
});
