import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { moderateScale } from '../libs/scaling';
import { Colors, Fonts } from '../themes';

const styles = StyleSheet.create({
    txtStyle: {
        fontFamily: Fonts.type.regular,
        fontSize: moderateScale(10),
        lineHeight: moderateScale(12),
        marginTop: moderateScale(2),
        color: Colors.red
    },
});

export default function TextError(props) {
    if (props.isError) {
        return (
            <Text style={[styles.txtStyle, props.style]} {...props.Others}>{props.message}</Text>
        )
    } else return null;
}
