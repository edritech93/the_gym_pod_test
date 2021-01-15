import React from 'react';
import { TouchableOpacity, View as DefaultView } from 'react-native';
import { Text } from '../../components';
import { moderateScale } from '../../libs/scaling';
import { Colors, Fonts } from '../../themes';

export default function ItemNotification(props) {

    const { item } = props;

    return (
        <TouchableOpacity style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(24),
            paddingBottom: moderateScale(18),
            borderBottomWidth: 1,
            borderBottomColor: Colors.divider,
            backgroundColor: Colors.white
        }} onPress={() => { _onPressItem(item) }}>

            <DefaultView style={{
                flex: 1,
            }}>

                <Text
                    style={{
                        fontFamily: Fonts.type.medium,
                    }}
                    numberOfLines={1}>{item.title}</Text>

                <Text
                    style={{
                        opacity: 0.6,
                    }}
                    numberOfLines={1}>{item.description}</Text>

            </DefaultView>

            <Text
                style={{
                    fontSize: moderateScale(14),
                    opacity: 0.6,
                }}>{item.createdDate}</Text>

        </TouchableOpacity>
    );
}
