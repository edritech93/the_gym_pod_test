import React from 'react';
import { TouchableOpacity, Image, FlatList, StyleSheet, View } from 'react-native';
import { moderateScale } from '../libs/scaling';
import { Colors } from '../themes';
import { Text } from './Text';
import Devider from './Devider';

var Lodash = require('lodash');

const styles = StyleSheet.create({
    wrapItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(12),
    },
    imgStyle: {
        marginRight: moderateScale(20),
    },
    wrapButton: {
        flexDirection: 'row',
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateScale(16)
    },
});

export default function ItemList(props) {

    const _renderItem = ({ item, _ }) => {
        if (item.children && item.children.length > 0) {
            return (
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.wrapItem} onPress={() => { props.onPress(item) }}>
                        {
                            Lodash.find(props.selected, { id: item.id })
                                ? <Image style={[
                                    styles.imgStyle,
                                    {
                                        tintColor: Colors.primary,
                                    }
                                ]} source={props.iconActive} />
                                : <Image style={styles.imgStyle} source={props.iconInactive} />
                        }
                        <Text>{item.name}</Text>
                    </TouchableOpacity>

                    {
                        item.children.map((itemChild, _) => {
                            return (
                                <View style={{ flex: 1 }}>
                                    {_renderSeparator()}
                                    <TouchableOpacity style={[styles.wrapItem, { marginLeft: moderateScale(32) }]}
                                        onPress={() => { props.onPressChild(item, itemChild) }}>
                                        {
                                            Lodash.find(props.selected, { id: itemChild.id })
                                                ? <Image style={[
                                                    styles.imgStyle,
                                                    {
                                                        tintColor: Colors.primary,
                                                    }
                                                ]} source={props.iconActive} />
                                                : <Image style={styles.imgStyle} source={props.iconInactive} />
                                        }
                                        <Text>{itemChild.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View >
            );
        } else {
            return (
                <TouchableOpacity style={styles.wrapItem} onPress={() => { props.onPress(item) }}>
                    {
                        Lodash.find(props.selected, { id: item.id })
                            ? <Image style={[
                                styles.imgStyle,
                                {
                                    tintColor: Colors.primary,
                                }
                            ]} source={props.iconActive} />
                            : <Image style={styles.imgStyle} source={props.iconInactive} />
                    }
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            );
        }
    }

    const _renderSeparator = () => {
        return (
            <Devider />
        )
    }

    return (
        <FlatList
            data={props.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
            ListHeaderComponent={<Devider />}
            ListFooterComponent={<Devider />}
            ItemSeparatorComponent={_renderSeparator}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            {...props}
        />
    )

}
