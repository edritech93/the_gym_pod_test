import React from 'react';
import { ScrollView as DefaultScrollView } from 'react-native';

export default function ScrollView(props) {
    const { children, style, onLimitUp, onLimitDown, ...restProps } = props;

    handleScroll = (event) => {
        try {
            const limit = event.nativeEvent.contentOffset.y;
            if (limit > 30) {
                if (onLimitUp) onLimitUp()
            } else {
                if (onLimitDown) onLimitDown()
            }
        } catch (error) {
            console.log('handleScroll => ', error);
        }
    }

    return (
        <DefaultScrollView style={[
            {
                flex: 1,
            },
            style
        ]}
            {...restProps}
            onScroll={handleScroll}
            scrollEventThrottle={500}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            {children}
        </DefaultScrollView>
    );
}
