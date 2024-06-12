import React from 'react';
import { CheckBox, Layout } from '@ui-kitten/components';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/Colors';

const InputCheckBox = ({ data, selectedValues, onChange }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <CheckBox
        key={item.Id}
        checked={selectedValues.includes(item.Id)}
        onChange={() => onChange(item.Id)}
        style={styles.checkbox}
        textStyle={styles.itemText}
      >
        {item.Name}
      </CheckBox>
    </View>
  );

  return (
    <Layout style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    padding: 5,
  },
  itemText: {
    color: colors.MAIN_BLUE_CLIENT,
    fontSize: 15,
  },
  checkbox: {
    flex: 1,
  },
});

export default InputCheckBox;
