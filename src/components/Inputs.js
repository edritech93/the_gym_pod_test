import React, { useState, useEffect, } from 'react';
import {
    View, Animated, StyleSheet, TextInput, TouchableOpacity, Image,
    Platform, Text
} from 'react-native';
import { moderateScale } from '../libs/scaling';
import { Colors, Fonts } from '../themes';
import strings from '../constants/localize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        fontFamily: Fonts.type.regular,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(25),
        color: Colors.textDark,
        marginTop: moderateScale(8),
        marginBottom: moderateScale(-8)
    },
    titleStyles: {
        fontFamily: Fonts.type.regular,
        fontSize: moderateScale(12),
        color: Colors.textDark,
        position: 'absolute',
        left: 0,
        marginBottom: moderateScale(103),
        marginLeft: Platform.OS == 'ios' ? 0 : moderateScale(3)
    },
});

export default function Inputs(props) {

    const {
        isPassword = false,
        editable = true,
        onChange,
        value,
        title = null,
        titleActiveSize = moderateScale(11.5),
        titleInActiveSize = moderateScale(15),
        titleActiveColor = 'black',
        titleInactiveColor = 'dimgrey',
        containerStyle,
        textInputStyles,
        otherTextInputProps,
        keyboardType = 'default',
        isError = false,
        message = strings.NEED_FILL,
    } = props;

    let position = new Animated.Value(value ? 1 : 0);
    const [isFieldActive, setIsFieldActive] = useState(false);
    const [hidePassword, setHidePassword] = useState(isPassword);

    useEffect(() => {
        if (value && value.length > 0) {
            setIsFieldActive(true);
            _handleFocus();
        }
    }, [value]);

    const _handleFocus = () => {
        if (!isFieldActive) {
            setIsFieldActive(true);
            Animated.timing(position, {
                toValue: 1,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    }

    const _handleBlur = () => {
        if (isFieldActive && !value) {
            setIsFieldActive(false);
            Animated.timing(position, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    }

    const togglePassword = () => {
        setHidePassword(!hidePassword);
    }

    function _returnAnimatedTitleStyles() {
        return {
            top: position.interpolate({
                inputRange: [0, 1],
                outputRange: isFieldActive || value ? [1, 0] : [20, 0]
            }),
            fontSize: isFieldActive || value ? titleActiveSize : titleInActiveSize,
            color: isFieldActive || value ? titleActiveColor : titleInactiveColor,
        }
    }

    return (
        <View style={[styles.container, containerStyle]}>

            <Animated.Text style={[styles.titleStyles, _returnAnimatedTitleStyles()]}>
                {title}
            </Animated.Text>

            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: isFieldActive ? Colors.accent : (editable ? Colors.black : null),
                borderBottomWidth: editable ? moderateScale(1) : 0,
            }}>

                <TextInput
                    value={value}
                    style={[
                        styles.textInput,
                        textInputStyles
                    ]}
                    underlineColorAndroid={'transparent'}
                    onFocus={_handleFocus}
                    onBlur={_handleBlur}
                    editable={editable}
                    onChangeText={onChange}
                    keyboardType={keyboardType}
                    secureTextEntry={hidePassword}
                    autoCapitalize={'none'}
                    {...otherTextInputProps}
                />

                {isPassword && (
                    <TouchableOpacity
                        style={{
                            flex: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={togglePassword}>
                        <Image
                            source={hidePassword ?
                                require('./../assets/images/visibility-dark-24.png') :
                                require('./../assets/images/visibility_off-24px.png')}
                        />
                    </TouchableOpacity>
                )}

            </View>

            {isError && (
                <Text style={{
                    fontSize: moderateScale(10),
                    lineHeight: moderateScale(12),
                    color: Colors.red,
                }}>{message}</Text>
            )}

        </View>
    );
}