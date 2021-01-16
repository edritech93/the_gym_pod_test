import { defineAction } from 'redux-define';
import {
    USER,
    TOKEN,
    REFRESH_TOKEN,
    CONFIGURATION,
    CHANGE,
    SET,
    SHOW,
    CLEAR,
    LANGUAGE,
    REQUEST,
    SUCCESS,
    FAILURE,
    LOGIN_SAVED,
    DEVICE_TOKEN,
} from '../constants/state';
const appNamespace = defineAction('THE_GYM_POD');

export const STORAGE = defineAction('STORAGE', [USER, TOKEN, REFRESH_TOKEN, CONFIGURATION,
    LANGUAGE, LOGIN_SAVED, DEVICE_TOKEN], appNamespace);
export const CONNECTION_STATUS = defineAction('CONNECTION_STATUS', [CHANGE], appNamespace);
export const ALERT = defineAction('ALERT', [SHOW], appNamespace);