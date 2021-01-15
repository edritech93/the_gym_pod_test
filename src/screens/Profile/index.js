import React, { useState, useEffect } from 'react';
import {
    View, Text as DefaultText, FlatList, TouchableOpacity, Image,
    Alert
} from 'react-native';
import { Loader, ModalRadioButton, Avatar, Text, Title, } from '../../components';
import { DATA_LANGUAGE } from '../../constants/data';
import { moderateScale } from '../../libs/scaling';
import { STORAGE } from '../../actions/types';
import { Colors } from '../../themes';
import { API } from '../../libs/api';
import NavigationService from './../../libs/NavigationService';
import UserDefaults from '../../libs/UserDefaults';
import strings from '../../constants/localize';
import styles from './styles';

let modalLanguage;

export default function Profile(props) {

    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);
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
        _loadProfile();
    }, []);

    async function _loadProfile() {
        const dataProfile = await UserDefaults.get(STORAGE.USER);
        const selected = await UserDefaults.get(STORAGE.LANGUAGE);
        setSelectedLanguage(selected);
        setProfile(dataProfile);
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
        setLoading(true);
        API.singleRequest(API.FcmTokenDelete()).then((response => {
            console.log("removeDeviceToken Successfully:", response[0].data);
        })).catch((error) => {
            console.log('removeDeviceToken => ', error);
        }).finally(() => {
            const keys = [STORAGE.USER, STORAGE.TOKEN, STORAGE.CONFIGURATION];
            UserDefaults.multiRemove(keys);
            _resetLoading();
            _gotoLogin();
        })
    }

    function _resetLoading() {
        setLoading(false);
    }

    function _gotoLogin() {
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
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {
                        item.image ? (
                            <Image style={{ marginRight: moderateScale(16) }}
                                source={item.image} />
                        ) : null
                    }
                    <Text style={{
                        color: colorName
                    }}>{item.name}</Text>
                </View>

                {
                    item.image ? (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: Colors.greyBorder
                            }}>{(index == 0) && selectedLanguage ? selectedLanguage.name : null}</Text>

                            <Image source={require('../../assets/images/keyboard_arrow_right-dark-24.png')} />
                        </View>
                    ) : null
                }

            </TouchableOpacity>
        )
    }

    const renderHeader = _ => {
        if (profile) {
            return (
                <View style={styles.wrapHeader}>
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
                </View>
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
        <View style={{ flex: 1 }}>

            <FlatList style={styles.container}
                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem.bind(this)}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false} />

            {_renderModalLanguage()}

            <Loader visible={loading} />

        </View>
    );
}
