import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../themes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default function Loader(props) {

    if (props.visible) {
        return (
            <View style={[styles.container, props.style]}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    } else return null;
}
