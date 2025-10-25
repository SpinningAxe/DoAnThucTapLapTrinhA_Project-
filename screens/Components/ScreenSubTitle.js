import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../GlobalStyle';

const ScreenSubTitle = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title ? title.toUpperCase() : ''}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 0,
        paddingVertical: 12,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.white ? colors.white : '#FFFFFF',
        fontSize: 18,
        letterSpacing: 1.5,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase', // ensure uppercase style regardless of platform
    },
});

export default ScreenSubTitle;
