import React from 'react';
import { View, Keyboard } from 'react-native';

const KeyboardSpacer = () => {
  return <View style={{ flex: 1 }} onLayout={Keyboard.dismiss} />;
};

export default KeyboardSpacer;
