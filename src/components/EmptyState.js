import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { moderateScale } from '../libs/scaling';
import { Metrics } from '../themes';
import strings from '../constants/localize';
import TextRegular14 from './TextRegular14';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Metrics.screenHeight * 0.2,
    },
    imgStyle: {
        marginBottom: moderateScale(16),
    }
});


export default function EmptyState(props) {

    return (
        <View style={styles.container}>
            <Image style={styles.imgStyle} source={props.image} />
            <TextRegular14 label={props.label ? props.label : strings.NOT_FOUND} />
        </View>
    );
}
