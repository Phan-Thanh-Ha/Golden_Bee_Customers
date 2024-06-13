import React from 'react';
import { Toggle } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const BtnToggle = ({ value, onChange }) => {
  return (
    <Toggle checked={value} onChange={onChange} />
  );
};

export default BtnToggle;
