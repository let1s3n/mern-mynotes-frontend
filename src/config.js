import axios from 'axios'

export const API_URL = process.env.REACT_APP_API_URL;


export const axios_instance = axios.create({
  baseURL: API_URL,
});

console.log(API_URL);