import React from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale } from '../libs/scaling';
import { Colors } from '../themes';
import { Text } from './Text';

const styles = StyleSheet.create({
    wrapBadge: {
        borderRadius: moderateScale(4),
        width: moderateScale(17),
        height: moderateScale(17),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.red,
        position: 'absolute',
        right: moderateScale(-20),
        top: moderateScale(-10),
    },
});

export default function Badge(props) {
    if (props.count > 0) {
        return (
            <View style={[styles.wrapBadge, props.style]}>
                <Text style={{
                    fontSize: moderateScale(12),
                    lineHeight: moderateScale(18),
                    color: Colors.white
                }}>{props.count}</Text>
            </View>
        );
    } else {
        return null;
    }
}
