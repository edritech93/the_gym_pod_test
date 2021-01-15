import { takeEvery } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { ALERT, STORAGE } from '../actions/types';
import { API } from '../libs/api';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../libs/NavigationService';
import Config from 'react-native-config';

var CryptoJS = require("crypto-js");

export function* viewAlertShow(action) {
    try {
        const { alert } = action;
        if (alert.message && alert.message != 401) {
            let dataMessage = alert.message;
            if (typeof alert.message === 'object') {
                dataMessage = JSON.stringify(alert.message);
            }
            setTimeout(() => {
                Alert.alert(
                    'Boilerplate',
                    dataMessage,
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                            }
                        }
                    ],
                );
            }, 1000);
        } else if (alert.message == 401) {
            _refreshToken();
        }
    } catch (error) {
        console.log('viewAlertShow => ', error);
    }
}

async function _refreshToken() {
    //NOTE for testing only
    NavigationService.resetRoot("Login");

    //NOTE comment until API provided
    // const refreshToken = await AsyncStorage.getItem(STORAGE.REFRESH_TOKEN);
    // if (refreshToken) {
    //     let body = {
    //         grant_type: 'refresh_token',
    //         refresh_token: refreshToken
    //     }

    //     API.requestMultiple([API.login(body)]).then((response => {
    //         const dataLogin = response[0].data;
    //         if(dataLogin)   {
    //             const access_token = dataLogin.access_token;
    //             const ciphertext = CryptoJS.AES.encrypt(access_token, Config.SECRET_KEY);
    //             AsyncStorage.setItem(STORAGE.TOKEN, ciphertext.toString());
    //             AsyncStorage.setItem(STORAGE.REFRESH_TOKEN, dataLogin.refresh_token);
    //             NavigationService.resetRoot("Dashboard");
    //         } else {
    //             NavigationService.resetRoot("Login");
    //         }
    //     })).catch((error) => {
    //         console.log('error => ', error);
    //         NavigationService.resetRoot("Login");
    //     });
    // }
}

export function* watchAlertShow() {
    yield takeEvery(ALERT.SHOW, viewAlertShow);
}