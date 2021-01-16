import React, { useState, useEffect } from 'react';
import {
    View as DefaultView, Text as DefaultText, TouchableOpacity, Image, Alert,
    StyleSheet,
} from 'react-native';
import { FlatList, ModalRadioButton, Avatar, Text, Title, View } from '../../components';
import { DATA_LANGUAGE } from '../../constants/data';
import { moderateScale } from '../../libs/scaling';
import { STORAGE } from '../../actions/types';
import { Helper } from '../../libs/Helper';
import { Colors, Fonts } from '../../themes';
import NavigationService from './../../libs/NavigationService';
import UserDefaults from '../../libs/UserDefaults';
import strings from '../../constants/localize';

const styles = StyleSheet.create({
    wrapHeader: {
        alignItems: 'center',
        padding: moderateScale(16),
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayShadow,
        paddingTop: moderateScale(3),
        paddingBottom: moderateScale(33)
    },
    txtDescProfile: {
        fontFamily: Fonts.type.regular,
        fontSize: moderateScale(10),
        lineHeight: moderateScale(16),
        color: Colors.textDark,
        opacity: 0.6
    },
    wrapItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(18),
        paddingVertical: moderateScale(13),
    },
});

let modalLanguage;

export default function Profile(props) {

    const {
        profile
    } = props;

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const dataSource = [
        {
            id: 0,
            name: strings.CHANGE_LANGUAGE,
            image: require('../../assets/images/translate-dark-24.png'),
            onPress: () => _onPressLanguage()
        },
        {
            id: 1,
            name: strings.ABOUT,
            image: require('../../assets/images/about-dark-24.png'),
            onPress: () => _onPressAbout()
        },
        {
            id: 2,
            name: strings.LOGOUT,
            image: null,
            onPress: () => _onPressLogout()
        },
    ]

    useEffect(() => {
        _loadLanguage();
    }, []);

    async function _loadLanguage() {
        const selected = await UserDefaults.get(STORAGE.LANGUAGE);
        setSelectedLanguage(selected);
    }

    function _onPressLanguage() {
        if (modalLanguage) modalLanguage.open();
    }

    function _onPressAbout() {
        Alert.alert(
            'Version', '1.0.0'
        )
    }

    function _onPressLogout() {
        Helper.removeToken();
        NavigationService.resetRoot('Login');
    }

    const renderItem = ({ item, index }) => {
        let colorName;
        if (item.id === 2) {
            colorName = Colors.red;
        } else {
            colorName = Colors.textDark;
        }
        return (
            <TouchableOpacity style={styles.wrapItem} onPress={item.onPress}>

                <DefaultView style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    {item.image && (
                        <Image
                            style={{ marginRight: moderateScale(16) }}
                            source={item.image}
                        />
                    )}
                    <Text style={{
                        color: colorName
                    }}>{item.name}</Text>
                </DefaultView>

                {item.image && (
                    <DefaultView style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: Colors.greyBorder
                        }}>{(index == 0) && selectedLanguage ? selectedLanguage.name : null}</Text>

                        <Image source={require('../../assets/images/keyboard_arrow_right-dark-24.png')} />
                    </DefaultView>
                )}

            </TouchableOpacity>
        )
    }

    const renderHeader = _ => {
        if (profile) {
            return (
                <DefaultView style={styles.wrapHeader}>
                    <Avatar
                        style={{ marginBottom: moderateScale(12), }}
                        source={profile.avatar ? { uri: profile.avatar } :
                            require('../../assets/images/profile_placeholder-100.png')}
                        nameTag={profile && profile.name ? profile.name : null}
                        size={moderateScale(100)} />

                    <Title style={{
                        fontSize: moderateScale(16),
                        lineHeight: moderateScale(25),
                    }}>{profile?.name ?? '-'}</Title>
                    <DefaultText style={styles.txtDescProfile}>{profile?.email ?? '-'}</DefaultText>
                </DefaultView>
            );
        } else return null;
    }

    function _renderModalLanguage() {
        return (
            <ModalRadioButton
                modalRef={(modal) => { modalLanguage = modal; }}
                dataSource={DATA_LANGUAGE}
                selected={selectedLanguage}
                title={strings.CHANGE_LANGUAGE}
                onSubmitRequest={(selected) => {
                    setSelectedLanguage(selected);
                    UserDefaults.set(STORAGE.LANGUAGE, selected);
                    strings.setLanguage(selected.id);
                    if (modalLanguage) modalLanguage.close();
                    NavigationService.resetRoot("Splash");
                }}
            />
        )
    }

    return (
        <View style={{
            paddingHorizontal: 0,
        }}>

            <FlatList
                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
            />

            {_renderModalLanguage()}

        </View>
    );
}
