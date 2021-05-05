import axios from 'axios';
import { MAP_TOKEN, GEO_MAP_URL, LOGIN_URL, MEMBERS_URL, LIBRARIES_URL } from '../common/constants';

export const getData = async (url, config) => {
    try {
        const response = await axios.get(url, config);
        const data = response.data;
        return data;
    } catch(error) {
        return error;
    }
}

export const postData = async (url, params, config) => {
    try {
        const response = await axios.post(url, params, config);
        const data = response.data;
        return data;
    } catch(error) {
        throw 'Bad credentials';
    }
}

const getRequestConfig = (userToken) => {
    let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${userToken}`
        }
    };
    return config;
}


export const logInUser = async (user) => {
    const data = await postData(LOGIN_URL, user, {Accept: 'application/json'});
    return data;
}


export const getBooks = async(userId, userToken) => {
    const config = getRequestConfig(userToken);
    try {
        const data = await getData(`${MEMBERS_URL}/${userId}/books`, config);
        return data;
    } catch(err) {
        console.log(err);
    }
}


export const getLibraries = async(lat, lon, userToken) => {
    const config = getRequestConfig(userToken);
    try {
        const data = await getData(`${LIBRARIES_URL}?latitude=${lat}&longitude=${lon}`, config)
        return data;
    } catch(err) {
        console.log(err);
    }
}


export const getUserData = async(userToken) => {
    const config = getRequestConfig(userToken);
    try {
        const data = await getData(`${MEMBERS_URL}/2`, config);
        return data;
    } catch(err) {
        console.log(err);
    }
}

const func = async () => {

}

export const getLatAndLongForData = async(addresses) => {
    result = [];
    try {
        for (let i = 0; i < addresses.length; i++ ) {
            const searchAddress = `${addresses[i].country} ${addresses[i].city} ${addresses[i].address1}`
            const url = `${GEO_MAP_URL}${searchAddress}.json?access_token=${MAP_TOKEN}`;
            const resultData = await getData(url, {});
            result.push(resultData);
        }
        return result;
    } catch(err) {
        console.log(err);
    }
}


