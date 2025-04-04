import React from 'react';
import { Text } from 'react-native';
import { colors } from '../styles/Colors';

const Label = ({ children, fontSize = 15, color = colors.MAIN_BLUE_CLIENT, fontWeight = 'bold', style = {} }) => {
  return (
    <Text style={[
      {
        fontWeight: fontWeight,
        marginBottom: 5,
        color: color,
        fontSize: fontSize,
      }, style
    ]}>
      {children}
    </Text>
  );
};

export default Label;
