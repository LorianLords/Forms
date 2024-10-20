import React from 'react';

const uniqueSentence = (sentence: (string | number)[] | string): (string | number)[] => {
  const array: (string | number)[] = [];
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] !== sentence[i + 1]) {
      array.push(sentence[i]);
    }
  }
  return array;
};

export default uniqueSentence;
