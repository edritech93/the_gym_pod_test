import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors } from '../themes';

const styles = StyleSheet.create({
    boxPanel: {
        height: 20,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    },
    linePanel: {
        width: 30,
        height: 4,
        borderRadius: 8,
        backgroundColor: Colors.greyishBrown
    }
})

const ModalContent = props => {
    const {
        style,
        children,
        ...otherProps
    } = props;
    return (
        <View style={style}>
            {
                Platform.OS === "android" ? <StatusBar
                    backgroundColor="#00000080"
                    barStyle="light-content"
                /> : null
            }

            <View style={styles.boxPanel}>
                <View style={styles.linePanel} />
            </View>
            {children}
        </View>
    );
};

export default ModalContent;