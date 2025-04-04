import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {colors} from "../../styles/Colors";

const CustomFormError = ({ children }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 20,
        overflow: 'hidden',
        alignItems: 'flex-end',
        margin: 3
    },
    errorText: {
        color: colors.RED,
        fontSize: 12,
        paddingRight: 10,
    },
});

export default CustomFormError;
