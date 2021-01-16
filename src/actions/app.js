import { CONNECTION_STATUS, ALERT, PROFILE, } from "./types";

export const connectionChange = ({ status }) => {
    return { type: CONNECTION_STATUS.CHANGE, isConnected: status };
};

export const showAlert = (alert) => {
    return { type: ALERT.SHOW, alert: alert };
}

export const profileChange = (args) => {
    return { type: PROFILE.CHANGE, args }
}