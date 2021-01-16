import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';
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
        imageSrc = require('./../assets/images/outlet-white-24px.png');
        break;

      case 'Notification':
        imageSrc = require('./../assets/images/mail-white-24px.png');
        break;

      case 'Profile':
        imageSrc = require('./../assets/images/about-dark-24.png');
        break;

      default:
        break;
    }
    setImage(imageSrc);
  }, [props.name]);

  return (
    <View style={styles.container}>
      <Image
        style={{
          tintColor: props.focused ? Colors.primary : Colors.black,
        }}
        source={image}
      />
      <Badge count={props.badgeCount} />
    </View>
  );
}
