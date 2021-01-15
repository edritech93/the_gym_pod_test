import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { moderateScale } from '../libs/scaling';
import Badge from './Badge';

const styles = StyleSheet.create({
  container: {
    width: moderateScale(24),
    height: moderateScale(24),
    paddingTop: moderateScale(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function IconWithBadge(props) {
  const defaultImage = require('./../assets/images/arrow_left.png');
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    let imageSrc = defaultImage;
    switch (props.name) {
      case 'Home':
        if (props.focused) {
          imageSrc = require('./../assets/images/arrow_left.png');
        } else {
          imageSrc = require('./../assets/images/arrow_left.png');
        }
        break;

      case 'Order':
        if (props.focused) {
          imageSrc = require('./../assets/images/arrow_left.png');
        } else {
          imageSrc = require('./../assets/images/arrow_left.png');
        }
        break;

      case 'Notification':
        if (props.focused) {
          imageSrc = require('./../assets/images/arrow_left.png');
        } else {
          imageSrc = require('./../assets/images/arrow_left.png');
        }
        break;

      default:
        break;
    }
    setImage(imageSrc);
  }, [props.name]);

  return (
    <View style={styles.container}>
      <Image source={image} />
      <Badge count={props.badgeCount} />
    </View>
  );
}