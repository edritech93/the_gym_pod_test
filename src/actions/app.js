import { CONNECTION_STATUS, ALERT } from "./types";

export const connectionChange = ({ status }) => {
    return { type: CONNECTION_STATUS.CHANGE, isConnected: status };
};

export const showAlert = (alert) => {
    return { type: ALERT.SHOW, alert: alert };
}