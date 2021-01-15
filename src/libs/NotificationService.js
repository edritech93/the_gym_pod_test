import PushNotification from 'react-native-push-notification';
import { Colors } from '../themes';
var lastId = 0;

function showLocalNotification(title, description, data) {
    lastId++;

    let notificationData = data;

    if (typeof data === 'string') {
        notificationData = JSON.parse(data);
    }

    PushNotification.localNotification({
        /* Android Only Properties */
        id: this.lastId,
        autoCancel: true,
        vibrate: true,
        tag: 'Haermes',
        group: 'Haermes',
        ongoing: false,
        bigText: description,
        smallIcon: "ic_notification",
        color: Colors.primary,

        /* iOS only properties */
        alertAction: 'view',
        category: 'Haermes',
        userInfo: notificationData ? notificationData : {}, // (optional) default: {} (using null throws a JSON value '<null>' error)

        /* iOS and Android properties */
        title: title,
        message: description,
        playSound: true,
        soundName: 'default',
        data: data
    });
}

function checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
}

function requestPermissions() {
    return PushNotification.requestPermissions();
}

function cancelNotif() {
    PushNotification.cancelLocalNotifications({ id: '' + this.lastId });
}

function cancelAll() {
    PushNotification.cancelAllLocalNotifications();
}

function abandonPermissions() {
    PushNotification.abandonPermissions();
}

export default {
    showLocalNotification,
    checkPermission,
    requestPermissions,
    cancelNotif,
    cancelAll,
    abandonPermissions
}