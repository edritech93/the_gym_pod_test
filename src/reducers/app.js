'use strict';
import { Record } from 'immutable';
import { CONNECTION_STATUS, PROFILE, } from '../actions/types';

const objectRecord = new Record({
    isConnected: true,
    profile: null,
});
const initialState = new objectRecord();

const app = (state = initialState, action) => {
    switch (action.type) {

        case CONNECTION_STATUS.CHANGE:
            return state
                .set('isConnected', action.isConnected);

        case PROFILE.CHANGE:
            return state
                .set('profile', action.args);

        default:
            return state;
    }
}

export default app;