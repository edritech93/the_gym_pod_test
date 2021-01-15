import React, { useEffect } from 'react';
import { StatusBar, SafeAreaView, Platform } from 'react-native';
import { DATA_LANGUAGE } from './constants/data';
import { STORAGE } from './actions/types';
import { Provider } from 'react-redux';
import { Helper } from './libs/Helper';
import { Colors } from './themes';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import NotificationService from './libs/NotificationService';
import messaging from '@react-native-firebase/messaging';
import NavigationService from './libs/NavigationService';
import NetInfo from '@react-native-community/netinfo';
import configureStore from './libs/configureStore';
import UserDefaults from './libs/UserDefaults';
import strings from './constants/localize';
import StackNavigation from './router';

var PushNotification = require("react-native-push-notification");

const store = configureStore();

export default function App(props) {

    useEffect(() => {
        _loadLanguage();
        _setupNetwork();
        _setupNotification();
    }, []);

    async function _loadLanguage() {
        const languageStorage = await UserDefaults.get(STORAGE.LANGUAGE);
        if (languageStorage) {
            strings.setLanguage(languageStorage.id);
        } else {
            UserDefaults.set(STORAGE.LANGUAGE, DATA_LANGUAGE[0]);
            strings.setLanguage(DATA_LANGUAGE[0].id);
        }
    }

    function _setupNetwork() {
        NetInfo.fetch().then(state => {
            // setNetwork(state.isConnected);
        });

        NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            // setNetwork(state.isConnected);
        });
    }

    function _setupNotification() {
        messaging().onMessage(async remoteMessage => {
            const { title, body } = remoteMessage.notification;
            NotificationService.showLocalNotification(title, body, remoteMessage.data.custom_notification);
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });

        messaging().onNotificationOpenedApp(remoteMessage => {
            navigateViaNotification({
                data: JSON.parse(remoteMessage.data.custom_notification)
            });
        });

        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
                try {
                    if (notification.foreground || notification.userInteraction) {
                        navigateViaNotification({
                            data: notification.data
                        });
                    }

                    // (required) Called when a remote is received or opened, or local notification is opened
                    if (Platform.OS === 'ios') notification.finish(PushNotificationIOS.FetchResult.NoData);
                } catch (error) {
                    console.log('error', error);
                }
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }

    async function navigateViaNotification(notification) {
        if (notification && notification.data) {
            const itemId = notification.data.Id;
            const screen = notification.data.Screen ? notification.data.Screen : "Dashboard";
            const token = await Helper.getToken();

            if (token) {
                NavigationService.navigate(screen, {
                    Id: itemId,
                });
            }
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
            forceInset={{ bottom: 'always' }}>

            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={Colors.primaryDark} />

            <Provider store={store}>

                <StackNavigation stackRef={(dataRef) => { NavigationService.initial(dataRef.current) }} />

            </Provider>

        </SafeAreaView>
    );
}
