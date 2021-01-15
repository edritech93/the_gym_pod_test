import React from 'react';
import { View as DefaultView, Image } from 'react-native';
import { CardView, Text, PrimaryButton } from '../../components'
import { moderateScale } from '../../libs/scaling';

export default function ItemPod(props) {

    const {
        item,
        onPress,
    } = props;

    return (
        <CardView style={{
            marginBottom: moderateScale(16),
        }}>

            <Image
                style={{
                    width: '100%',
                    height: moderateScale(150),
                    borderTopLeftRadius: moderateScale(4),
                    borderTopRightRadius: moderateScale(4)
                }}
                source={{ uri: item.imageUrl }}
            />

            <DefaultView style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: moderateScale(8)
            }}>

                <Text style={{
                    flex: 1,
                }}>{item.title}</Text>

                <PrimaryButton
                    title={'Order'}
                    onPress={() => onPress(item)}
                />

            </DefaultView>

        </CardView>
    );
}
