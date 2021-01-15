import React, { useState, useEffect, } from 'react';
import { View, Animated, StyleSheet, TextInput, TouchableOpacity, Image, Platform, } from 'react-native';
import { moderateScale } from '../libs/scaling';
import { Colors, Fonts } from '../themes';
import TextError from './TextError';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: moderateScale(50),
        width: '100%',
        flexDirection: 'column',
    },
    textInput: {
        flex: 1,
        fontFamily: Fonts.type.regular,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(25),
        color: Colors.textDark,
        marginTop: moderateScale(10),
        marginBottom: moderateScale(-10)
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
        containerStyle,
        isPassword,
        rightComponent,
        editable = true,
    } = props;

    let position = new Animated.Value(props.value ? 1 : 0);
    const [isFieldActive, setIsFieldActive] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    useEffect(() => {
        setHidePassword(props.isPassword);
    }, []);

    useEffect(() => {
        if (props.isGenerate) {
            setIsFieldActive(true);
            setHidePassword(false);
        }
    }, [props.isGenerate]);

    useEffect(() => {
        if (props.value && props.value.length > 0) {
            setIsFieldActive(true);
            _handleFocus();
        }
    }, [props.value]);

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
        if (isFieldActive && !props.value) {
            setIsFieldActive(false);
            Animated.timing(position, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    }

    const _onChangeText = (updatedValue) => {
        const { attrName, updateMasterState } = props;
        updateMasterState(attrName, updatedValue);
    }

    const togglePassword = () => {
        setHidePassword(!hidePassword);
    }

    function _returnAnimatedTitleStyles() {
        const { value } = props;
        const titleActiveSize = props.titleActiveSize ? props.titleActiveSize : 11.5;
        const titleInActiveSize = props.titleInActiveSize ? props.titleInActiveSize : 15;
        const titleActiveColor = props.titleActiveColor ? props.titleActiveColor : 'black'
        const titleInactiveColor = props.titleInactiveColor ? props.titleInactiveColor : 'dimgrey';

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
        <View style={[styles.container, containerStyle, {
            borderBottomColor: isFieldActive ? Colors.accent : (editable ? Colors.black : null),
            borderBottomWidth: editable ? moderateScale(1) : 0,
        }]}>

            <Animated.Text style={[styles.titleStyles, _returnAnimatedTitleStyles()]}>
                {props.title}
            </Animated.Text>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <TextInput
                    value={props.value}
                    style={[styles.textInput, props.textInputStyles]}
                    underlineColorAndroid={'transparent'}
                    onFocus={_handleFocus}
                    onBlur={_handleBlur}
                    editable={editable ? true : false}
                    onChangeText={_onChangeText}
                    keyboardType={props.keyboardType}
                    secureTextEntry={hidePassword}
                    {...props.otherTextInputProps}
                />

                {
                    isPassword ? (
                        <TouchableOpacity style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}
                            onPress={togglePassword}>
                            <Image
                                source={hidePassword ?
                                    require('./../assets/images/visibility-dark-24.png') :
                                    require('./../assets/images/visibility_off-24px.png')} />
                        </TouchableOpacity>
                    ) : null
                }

                {rightComponent}

            </View>

            <TextError style={{ position: 'absolute', bottom: moderateScale(-17) }}
                isError={props.isError}
                message={props.message}
            />

        </View>
    );
}