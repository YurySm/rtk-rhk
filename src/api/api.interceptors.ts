import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {BaseQueryFn} from "@reduxjs/toolkit/query";

export const axiosClassic = axios.create({
    baseURL: process.env.API_URL
});

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            headers?: AxiosRequestConfig['headers']
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers }) => {
            try {
                const result = await axiosClassic({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers,
                })
                if (result.data.result === 'ERR') {
                    throw new Error(result.data.errmsg)
                }
                return { data: result.data }
            } catch (axiosError) {
                const err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }