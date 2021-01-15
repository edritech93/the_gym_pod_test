import { STORAGE } from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';

export const Helper = {
    nowDate: () => {
        return moment().format('YYYY-MM-DD').toString();
    },
    getDateTimeNow: () => {
        return moment().toString();
    },
    getTokenFcm: () => {
        return new Promise(function (resolve, reject) {
            messaging().hasPermission().then(enabled => {
                if (enabled) {
                    messaging().getToken().then(token => {
                        resolve(token);
                    });
                } else {
                    messaging().requestPermission().then(() => {
                        messaging().getToken().then(token => {
                            resolve(token);
                        });
                    }).catch(error => {
                        console.log('_getFirebasePermission => ', error);
                        resolve('');
                    });
                }
            });
        });
    },
    getToken: async () => {
        const token = await AsyncStorage.getItem(STORAGE.TOKEN);
        return token;
    },
    setToken: (token) => {
        AsyncStorage.setItem(STORAGE.TOKEN, token);
    },
}

export const FilterDate = {

    setTodayDate: function () {
        var startDateUTC = moment(new Date()).utc().local().format();
        var endDateUTC = moment(new Date()).utc().local().format();
        var start = moment(new Date()).format('DD MMM YYYY');
        var end = moment(new Date()).format('DD MMM YYYY');
        objData = {
            startDateUTC: startDateUTC,
            endDateUTC: endDateUTC,
            startDate: start,
            endDate: end
        }
        return objData;
    },
    setYesterdayDate: function () {
        var startDateUTC = moment(new Date()).add(-1, 'days').utc().local().format();
        var endDateUTC = moment(new Date()).add(-1, 'days').utc().local().format();
        var start = moment(new Date()).add(-1, 'days').format('DD MMM YYYY');
        var end = moment(new Date()).add(-1, 'days').format('DD MMM YYYY');
        objData = {
            startDateUTC: startDateUTC,
            endDateUTC: endDateUTC,
            startDate: start,
            endDate: end
        }
        return objData;
    },
    setLastSevenDate: function () {
        var start = moment(new Date()).add(-7, 'days').format('DD MMM YYYY');
        var end = moment(new Date()).format('DD MMM YYYY');
        objData = {
            startDate: start,
            endDate: end
        }
        return objData;
    },
    setLast30Day: function () {
        var start = moment(new Date()).add(-30, 'days');
        var end = moment(new Date());
        objData = {
            startDate: start,
            endDate: end
        }
        return objData;
    },
    setLastThirdThreeDate: function () {
        var startDateUTC = moment(new Date()).add(-30, 'days').utc().local().format();
        var endDateUTC = moment(new Date()).utc().local().format();
        var start = moment(new Date()).add(-30, 'days').format('DD MMM YYYY');
        var end = moment(new Date()).format('DD MMM YYYY');
        objData = {
            startDateUTC: startDateUTC,
            endDateUTC: endDateUTC,
            startDate: start,
            endDate: end
        }
        return objData;
    },
    setThisMonthDate: function () {
        var start = moment().startOf('month');
        var end = moment().endOf('month');
        objData = {
            startDate: start,
            endDate: end
        }
        return objData;
    },
    setLastMonthDate: function () {
        let last = moment().subtract(1, 'months').startOf('month')
        let lastEnd = moment(last).endOf('month');

        var startDateUTC = last.utc().local().format();
        var endDateUTC = lastEnd.utc().local().format();

        var start = last.format('DD MMM YYYY');
        var end = lastEnd.format('DD MMM YYYY');

        objData = {
            startDateUTC: startDateUTC,
            endDateUTC: endDateUTC,
            startDate: start,
            endDate: end
        }
        return objData;
    },
    setCustomRangeDate: function (pstart, pend) {
        var startDateUTC = moment(pstart).utc().local().format();
        var endDateUTC = moment(pend).utc().local().format();

        var start = moment(pstart).format('DD MMM YYYY');
        var end = moment(pend).format('DD MMM YYYY');
        objData = {
            startDateUTC: startDateUTC,
            endDateUTC: endDateUTC,
            startDate: start,
            endDate: end
        }
        return objData;
    }
}

