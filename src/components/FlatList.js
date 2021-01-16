import React from 'react';
import {FlatList as DefaultFlatList} from 'react-native';

export default function FlatList(props) {
  const {children, style, onLimitUp, onLimitDown, ...restProps} = props;

  const handleScroll = (event) => {
    try {
      const limit = event.nativeEvent.contentOffset.y;
      if (limit > 30) {
        if (onLimitUp) {
          onLimitUp();
        }
      } else {
        if (onLimitDown) {
          onLimitDown();
        }
      }
    } catch (error) {
      console.log('handleScroll => ', error);
    }
  };
  return (
    <DefaultFlatList
      style={[
        {
          flex: 1,
        },
        style,
      ]}
      {...restProps}
      onScroll={handleScroll}
      scrollEventThrottle={500}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {children}
    </DefaultFlatList>
  );
}
