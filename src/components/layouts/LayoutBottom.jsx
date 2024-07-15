import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/Colors';

const LayoutBottom = ({ children }) => {
  return (
    <View style={styles.footer}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    justifyContent: 'center',
  }
});

export default LayoutBottom;
