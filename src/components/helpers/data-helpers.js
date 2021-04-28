import axios from 'axios';
import { URL } from '../common/constants';

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


export const getBooks = async(userId, userToken) => {
    const config = getRequestConfig(userToken);
    try {
        const data = await getData(`${URL}/members/${userId}/books`, config);
        return data;
    } catch(err) {
        console.log(err);
    }
}


export const getLibraries = async(lat, lon, userToken) => {
    const config = getRequestConfig(userToken);
    try {
        const data = await getData(`${URL}/libraries?latitude=${lat}&longitude=${lon}`, config)
        return data;
    } catch(err) {
        console.log(err);
    }
}


export const getUserData = async(userToken) => {
    const config = getRequestConfig(userToken);
    try {
        const data = await getData(`${URL}/members/2`, config);
        return data;
    } catch(err) {
        console.log(err);
    }
}


