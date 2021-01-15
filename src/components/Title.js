import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { moderateScale } from '../libs/scaling';
import { Fonts, Colors } from '../themes';

const styles = StyleSheet.create({
    txtStyle: {
        fontFamily: Fonts.type.semiBold,
        fontSize: moderateScale(24),
        lineHeight: moderateScale(29),
        fontWeight: "bold",
        color: Colors.black,
    }
});

export default function Title(props) {
    return (
        <Text style={[styles.txtStyle, props.style]} {...props.Others}>{props.label}</Text>
    )
}