'use strict';
import { Record } from 'immutable';
import { CONNECTION_STATUS, ALERT } from '../actions/types';

const objectRecord = new Record({
    isConnected: undefined,
    alert: undefined,
});
const initialState = new objectRecord();

const app = (state = initialState, action) => {
    switch (action.type) {

        case CONNECTION_STATUS.CHANGE:
            return state
                .set('isConnected', action.isConnected);

        case ALERT.SET:
            return state
                .set('alert', action.alert);

        default:
            return state;
    }
}

export default app;