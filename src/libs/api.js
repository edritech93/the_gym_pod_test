'use strict';
import {Helper} from './Helper';
import {BASE_URL, basicAuth} from '../constants/data';
import axios from 'axios';
import qs from 'qs';

const CancelToken = axios.CancelToken;

const contentType = {
  FORM_DATA: 'form-data',
  URLENCODED: 'urlencoded',
};

var terminateAPI;

export class Api {
  async _request(request, identity = false) {
    let options = {
      url: request.url,
      method: request.method ? request.method : 'get', // default
      baseURL: BASE_URL.DEV,
      timeout: request.timeout == 0 ? request.timeout : 1000 * 90, // default is `0` (no timeout)
      cancelToken: new CancelToken(function (cancel) {}),
    };

    if (request.auth) {
      options.auth = request.auth;
    }

    let header;
    const token = await Helper.getToken();
    if (token) {
      const Authorization = 'Bearer ' + token;
      header = {Authorization: Authorization};
    }

    if (request.contentType) {
      if (request.contentType === contentType.URLENCODED) {
        header = {
          ...header,
          'Content-Type': 'application/x-www-form-urlencoded',
        };
      } else {
        header = {...header, 'Content-Type': 'application/form-data'};
      }
    }
    options.headers = header;

    if (request.params) {
      options.params = request.params;
    }

    if (request.data) {
      options.data = request.data;
    }

    let res = new axios.request(options);
    console.log('REQUEST', options);
    return res;
  }

  singleRequest(request) {
    return new Promise(function (resolve, reject) {
      request
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          const dataMessage = errorCondition(error);
          reject(dataMessage);
        });
    });
  }

  requestMultiple(requests) {
    return new Promise(function (resolve, reject) {
      new axios.all(requests)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          const dataMessage = errorCondition(error);
          reject(dataMessage);
        });
    });
  }

  async login(args) {
    return this._request(
      {
        method: 'post',
        url: 'connect/token',
        data: qs.stringify(args),
        contentType: contentType.URLENCODED,
        auth: {
          username: basicAuth.username,
          password: basicAuth.password,
        },
      },
      true,
    );
  }

  async getProfiles() {
    return this._request({
      method: 'get',
      url: 'mobile/v1/Profile/Me',
    });
  }

  async FcmTokenAdd(args) {
    return this._request({
      method: 'post',
      url: 'mobile/v1/Notification/SaveUserFirebaseNotification',
      data: args,
    });
  }

  async FcmTokenDelete() {
    return this._request({
      method: 'delete',
      url: 'mobile/v1/Notification/DeleteUserFirebaseNotification',
    });
  }
}

function errorCondition(error) {
  const status = error.response ? error.response.status : undefined;
  console.log('------------------------------------');
  console.log('status => ', status);
  console.log('errorCondition => ', error);
  console.log('response err => ', error.response);
  console.log('errorCondition code => ', error.code);
  console.log('errorCondition stringify => ', JSON.stringify(error));
  console.log('------------------------------------');
  let message;
  if (status && status >= 200 && status <= 400) {
    message =
      error.response.data.error ||
      error.response.data.message ||
      error.response.data.Message ||
      error.response.data;

    if (error.response.data.Errors) {
      message += '\n' + error.response.data.Errors;
    }
  } else {
    let errorResponseData = error.response ? error.response.data : undefined;
    if (errorResponseData) {
      if (errorResponseData.Message) {
        message = errorResponseData.Message;
      } else {
        message = errorResponseData;
      }
    }

    if (status === 401) {
      message = '401';
    }

    if (status === 404) {
      message = 'Server not found';
    }

    if (status >= 500 || !message) {
      message =
        'Oops! Something went wrong.\nPlease try again in a few minutes.';
    }
  }

  const dataMessage = {
    message: message,
    errorCode: status,
  };
  return dataMessage;
}

const API = new Api();

export {API, terminateAPI};
