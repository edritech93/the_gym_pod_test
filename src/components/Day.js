import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { moderateScale } from '../libs/scaling';
import { Colors } from '../themes';
import { Text } from './Text';

export default function Day(props) {

    const {
        date,
        marking,
        onPress
    } = props;

    return (
        <TouchableOpacity style={{
            backgroundColor: (marking && marking.disabled) ? Colors.red : Colors.white,
            borderRadius: moderateScale(8)
        }} 
        disabled={marking?.disabled ?? false}
        onPress={() => onPress()}>
            <Text style={{
                color: (marking && marking.disabled) ? Colors.red : Colors.black
            }}>{date.day}</Text>
        </TouchableOpacity>
    );
}
