import axios, { AxiosInstance } from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

export const URL_CLIENT_SERVICE = process.env.URL_CLIENT_SERVICE;
export const API_KEY = process.env.API_KEY;

function createAxiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: URL_CLIENT_SERVICE,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
  });
}

export const axiosInstance = createAxiosInstance();
