export const baseUrl = {
    DEV: 'http://157.230.38.16:8082/',
    LIVE: 'http://157.230.38.16:8080/',
}

export const basicAuth = {
    username: 'app.client',
    password: 'secret'
}

export const dataFlag = [
    {
        key: 0,
        value: "+62",
        label: "Indonesia",
        uri: "https://www.countryflags.io/id/shiny/64.png",
    },
    {
        key: 1,
        value: "+33",
        label: "France",
        uri: "https://www.countryflags.io/fr/shiny/64.png",
    },
    {
        key: 2,
        value: "+49",
        label: "Germany",
        uri: "https://www.countryflags.io/de/shiny/64.png",
    },
]

export const alertType = {
    success: 'success',
    info: 'info',
    error: 'error',
    warning: 'warning'
}

export const fetchData = {
    REQUEST: 'REQUEST',
    RELOAD: 'RELOAD',
    LOAD_MORE: 'LOAD_MORE',
    UPDATE_FILTER: 'UPDATE_FILTER'
}

export const DATA_LANGUAGE = [
    {
        name: 'English',
        id: 'en',
    },
    {
        name: 'Bahasa Indonesia',
        id: 'id',
    },
]

export const USER_TEST = 'test';
export const PASSWORD_TEST = '123qwe';