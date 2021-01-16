import React from 'react';
import { View as DefaultView, StyleSheet, TouchableOpacity, } from 'react-native';
import { Text } from './Text';
import { Colors } from '../themes';
import { moderateScale } from '../libs/scaling';
import { Helper } from '../libs/Helper';

const styles = StyleSheet.create({
    container: {
        height: moderateScale(48),
        marginBottom: moderateScale(10),
    },
    wrapPicker: {
        flexDirection: 'row',
        paddingVertical: moderateScale(10),
        alignItems: 'center',
        borderBottomWidth: moderateScale(1),
        borderColor: Colors.divider,
    },
    disabled: {
        backgroundColor: Colors.white,
        borderBottomWidth: 0,
        borderColor: Colors.white,
    },
});

export default function DateRangePicker(props) {

    const {
        title = null,
        selectedRange,
        containerStyle,
        editable = true,
        onPress,
    } = props;

    let selectedValue = '-';
    const [startDate, endDate] = selectedRange
    if (startDate && endDate && startDate != endDate) {
        selectedValue = Helper.datePicker(startDate) + ' - ' + Helper.datePicker(endDate);
    } else {
        selectedValue = Helper.datePicker(startDate);
    }

    return (
        <DefaultView style={[styles.container, containerStyle]}>

            {title && <Text style={{
                fontSize: moderateScale(12),
                lineHeight: moderateScale(16)
            }}>{title}</Text>}

            {editable === false ? (
                <DefaultView style={[styles.wrapPicker, styles.disabled]}>

                    <Text style={{
                        flex: 1,
                    }}>{selectedValue}</Text>

                </DefaultView>
            ) : (
                    <TouchableOpacity style={styles.wrapPicker} onPress={onPress}>

                        <Text style={{
                            flex: 1,
                        }}>{selectedValue}</Text>

                    </TouchableOpacity>
                )}

        </DefaultView>
    );
}