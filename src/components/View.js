import React from 'react';
import { View as DefautlView } from 'react-native';
import { moderateScale } from '../libs/scaling';
import { Colors } from '../themes';

export function View(props) {
    const { children, style, ...restProps } = props;
    return (
        <DefautlView style={[
            {
                flex: 1,
                paddingHorizontal: moderateScale(16),
                backgroundColor: Colors.white,
            },
            style
        ]} {...restProps}>{children}
        </DefautlView>
    )
}