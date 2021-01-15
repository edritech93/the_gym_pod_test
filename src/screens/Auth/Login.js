import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity, KeyboardAvoidingView, Platform, Image,
    View as DefaultView, TouchableWithoutFeedback,
} from 'react-native';
import { View, ScrollView, PrimaryButtonLoading, Title, } from '../../components';
import { moderateScale } from '../../libs/scaling';
import { STORAGE } from '../../actions/types';
import { Helper } from '../../libs/Helper';
import { Colors } from '../../themes';
import { API } from '../../libs/api';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../../libs/NavigationService';
import UserDefaults from '../../libs/UserDefaults';
import DeviceInfo from 'react-native-device-info';
import strings from '../../constants/localize';
import Inputs from '../../components/Inputs';
import data from '../../constants/data';

//NOTE for testing SFA
// baseUrl: http://157.230.38.16:8082/,
// tenant: 'DEF',
// username: 'hendra1',
// password: '123123',

//NOTE for testing MARTINDO
// baseUrl: http://157.230.38.16:8082/,
// tenant: 'MARTINDO',
// username: 'hendra1',
// password: '123123',

export default function Login(props) {

    const [loading, setLoading] = useState(false);
    const [tenant, setTenant] = useState('DEF');
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [role, setRole] = useState(null);
    const [tokenFcm, setTokenFcm] = useState('');
    const [baseUrl, setBaseUrl] = useState(null);
    const [isShowTenant, setIsShowTenant] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        _loadDataLogin();
        _loadTokenFcm();
    }, []);

    useEffect(() => {
        if (role) _submitDeviceToken();
    }, [role]);

    useEffect(() => {
        if (count === 5) {
            setIsShowTenant(!isShowTenant);
            setCount(0);
        }
    }, [count]);

    async function _loadTokenFcm() {
        const token = await Helper.getTokenFcm();
        setTokenFcm(token);
    }

    async function _loadDataLogin() {
        const dataLogin = await UserDefaults.get(STORAGE.LOGIN_SAVED);
        if (dataLogin) {
            setBaseUrl(dataLogin.baseUrl);
            setTenant(dataLogin.tenancyName);
            setUsername(dataLogin.username);
        }
    }

    async function _saveDataLogin() {
        const dataLogin = {
            baseUrl: baseUrl,
            tenancyName: tenant,
            username: username,
        }
        await UserDefaults.set(STORAGE.LOGIN_SAVED, dataLogin);
    }

    function _onPressLogin() {
        _gotoAnotherScreen();
        // if (tenant && username && password) {
        //     setLoading(true);
        //     _saveDataLogin();

        //     const body = {
        //         grant_type: 'password',
        //         scope: 'api1 offline_access',
        //         tenancy_name: tenant,
        //         username: username,
        //         password: password,
        //     };

        //     API.singleRequest(API.login(body)).then(async response => {
        //         if (response) {
        //             const dataLogin = response.data;
        //             await AsyncStorage.setItem(STORAGE.TOKEN, dataLogin.access_token);
        //             await AsyncStorage.setItem(STORAGE.REFRESH_TOKEN, dataLogin.refresh_token);
        //             _loadProfile();
        //         }
        //     }).catch((error) => {
        //         console.log('error => ', error);
        //         props.showAlert(error);
        //         setLoading(false);
        //     });
        // } else {
        //     if (!username) setUsernameError(true);
        //     if (!password) setPasswordError(true);
        // }
    }

    function _loadProfile() {
        setLoading(true);
        API.singleRequest(API.getProfiles()).then((response => {
            if (response) {
                setLoading(false);
                const dataProfile = response.data;
                UserDefaults.set(STORAGE.USER, dataProfile);
                setRole(dataProfile.role ? dataProfile.role : null);
            }
        })).catch((error) => {
            console.log('error => ', error);
            props.showAlert(error);
            setLoading(false);
        });
    }

    function _submitDeviceToken() {
        let body = {
            os: Platform.OS,
            token: tokenFcm,
        }
        API.requestMultiple([API.FcmTokenAdd(body)]).then((response => {
            console.log("submitDeviceToken Successfully:", response[0].data);
            _gotoAnotherScreen();
        })).catch((error) => {
            console.log('submitDeviceToken => ', error);
            _gotoAnotherScreen();
        });
    }

    function _gotoAnotherScreen() {
        NavigationService.resetRoot("Dashboard");
    }

    return (
        <View>

            <ScrollView>

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={'padding'}
                    enabled={Platform.OS === 'ios' ? true : false}>

                    <Title style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        marginVertical: moderateScale(50)
                    }}>Login Here...</Title>

                    <Inputs
                        title={'Token FCM'}
                        value={tokenFcm}
                        message={strings.NEED_FILL}
                        otherTextInputProps={{ autoCapitalize: 'none' }}
                        updateMasterState={(_, value) => { }}
                        containerStyle={{ marginBottom: moderateScale(15) }}
                    />

                    <Inputs
                        title={'Username'}
                        value={username}
                        isError={usernameError}
                        message={strings.NEED_FILL}
                        otherTextInputProps={{ autoCapitalize: 'none' }}
                        keyboardType={'email-address'}
                        updateMasterState={(_, value) => {
                            setUsername(value);
                            setUsernameError(false);
                        }}
                        containerStyle={{ marginBottom: moderateScale(15) }}
                    />

                    <Inputs
                        title={'Password'}
                        value={password}
                        isPassword={true}
                        isError={passwordError}
                        message={strings.NEED_FILL}
                        otherTextInputProps={{ autoCapitalize: 'none' }}
                        updateMasterState={(_, value) => {
                            setPassword(value);
                            setPasswordError(false);
                        }}
                        containerStyle={{ marginBottom: moderateScale(25) }}
                    />

                    <PrimaryButtonLoading
                        style={{
                            marginBottom: moderateScale(16)
                        }}
                        loading={loading}
                        title={strings.LOGIN}
                        onPress={() => _onPressLogin()} />

                </KeyboardAvoidingView>

            </ScrollView>

        </View>
    );
}
