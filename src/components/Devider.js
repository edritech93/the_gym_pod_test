import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../themes';

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.divider,
    borderBottomWidth: 1,
  },
});
export default function Devider(props) {
  return <View style={[styles.container, props.style]} />;
}
