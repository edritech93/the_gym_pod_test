import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, LayoutAnimation } from 'react-native';
import { moderateScale } from '../libs/scaling';
import { Colors, Fonts } from '../themes';
import Loader from './Loader';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: moderateScale(4),
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(18),
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerCircle: {
        position: 'absolute',
        bottom: moderateScale(10),
        right: moderateScale(10),
        backgroundColor: Colors.primary,
        padding: moderateScale(5),
        borderRadius: moderateScale(30),
        shadowColor: "rgba(69, 91, 99, 0.16)",
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 16,
        shadowOpacity: 1,
    },
    primaryButtonBackground: {
        backgroundColor: Colors.primary
    },
    secondaryButtonBackground: {
        backgroundColor: Colors.white,
        borderColor: Colors.primary,
        borderWidth: moderateScale(1),
    },
    accentButtonBackground: {
        backgroundColor: Colors.white
    },
    disabledButtonBackground: {
        backgroundColor: Colors.greyButton
    },
    txtStyle: {
        fontFamily: Fonts.type.medium,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(19),
        textAlign: 'center',
    },
})

function PrimaryButton(props) {
    const { title, onPress, disabled, style, textStyle, icon } = props;
    const buttonBg = disabled ? styles.disabledButtonBackground : styles.primaryButtonBackground;
    const textStyling = disabled ? styles.disabledButtonText : styles.txtStyle;
    return (
        <TouchableOpacity
            style={[styles.container, buttonBg, style]}
            disabled={disabled}
            onPress={() => onPress()}
        >
            {
                icon ? <Image source={icon} style={{ width: 16, height: 16, marginRight: 4 }} /> : null
            }
            <Text style={[textStyling, textStyle, { color: Colors.white }]}>{title}</Text>
        </TouchableOpacity>
    );
}

function PrimaryButtonLoading(props) {
    const { loading, title, onPress, disabled, style } = props;

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [loading]);

    const buttonBg = loading ? styles.disabledButtonBackground : styles.primaryButtonBackground;
    const textStyling = loading ? styles.disabledButtonText : styles.txtStyle;

    return (
        <TouchableOpacity
            style={[styles.container, buttonBg, style]}
            disabled={disabled || loading}
            onPress={() => onPress()}
        >
            <Text style={[textStyling, { color: Colors.white }]}>{title}</Text>

            <Loader
                visible={loading}
                loaderSize={moderateScale(20)}
                containerStyle={{ flex: 0, marginLeft: 10 }} />

        </TouchableOpacity>
    );
}

function SecondaryButton(props) {
    const { title, onPress, disabled, style, icon, txtStyle } = props;
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={() => onPress()}
            style={[styles.container, styles.secondaryButtonBackground, style]}>
            {
                icon ? <Image source={icon} style={{ width: 16, height: 16, marginRight: 4 }} /> : null
            }
            <Text style={[styles.txtStyle, { color: Colors.primary }, txtStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

function AccentButton(props) {
    const { title, onPress, disabled, style, txtStyle } = props;
    return (
        <TouchableOpacity disabled={disabled}
            onPress={() => onPress()} style={[styles.container, styles.accentButtonBackground, style]}>
            <Text style={[styles.txtStyle, { color: Colors.primary }, txtStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

function FloatingButton(props) {
    const { onPress, style, } = props;
    return (
        <TouchableOpacity style={[styles.containerCircle, style]}
            onPress={() => onPress()}>
            <Image style={{
                width: moderateScale(40),
                height: moderateScale(40),
            }} source={require('../assets/images/add_icon.png')} />
        </TouchableOpacity>
    );
}

export {
    PrimaryButton,
    PrimaryButtonLoading,
    SecondaryButton,
    AccentButton,
    FloatingButton,
}