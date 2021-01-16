import React from 'react';
import {Image, Text, View} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {Fonts} from '../themes';

export default function Avatar(props) {
  formatNameTag = (nameTag) => {
    let finalNameTag = '';
    try {
      var splited = nameTag.split(' ');
      var count = 0;
      splited.map((x) => {
        if (count >= 2) {
          return;
        }
        finalNameTag += x.charAt(0);
        count++;
      });
    } catch (Exception) {
      return 'NF';
    }
    return finalNameTag;
  };

  const {source, nameTag, color, size, floatingIcon, style} = props;
  if (source) {
    return (
      <View
        style={
          ({
            width: size || moderateScale(44),
            height: size || moderateScale(44),
          },
          style)
        }>
        <Image
          source={source}
          style={{
            width: size || moderateScale(44),
            height: size || moderateScale(44),
            borderRadius: size ? size / 2 : moderateScale(22),
          }}
        />
        {floatingIcon}
      </View>
    );
  } else {
    return (
      <View
        style={
          ({
            width: size || moderateScale(44),
            height: size || moderateScale(44),
          },
          style)
        }>
        <View
          style={{
            backgroundColor: color || '#F0F0F0',
            width: size || moderateScale(44),
            height: size || moderateScale(44),
            borderRadius: size ? size / 2 : moderateScale(22),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.type.medium,
              fontSize: moderateScale(16),
              color: '#0F0F0F',
            }}>
            {formatNameTag(nameTag)}
          </Text>
        </View>
        {floatingIcon}
      </View>
    );
  }
}
