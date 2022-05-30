import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const API_URL = "http://localhost:8000/api";
// const navigate = useNavigate();


const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const cookies = new Cookies();

    const usertokens = cookies.get('tokens');
    config.headers["Authorization"] = `Bearer ${usertokens}`;

    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
};
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    const cookies = new Cookies();

    if (error.response) {
        // Access Token was expired
        // console.log(error.response.status)
        if (
            error.response.status === 401
        ) {
            const storedToken = cookies.get('tokens');
            // console.log(storedToken);
            try {
                const rs = await axios.post(`${API_URL}/refresh`, {
                    Authorization: storedToken,
                    refresh_token: storedToken.refresh_token,
                });
                // const rs = await axios.post(`${API_URL}/refresh`);
                if (rs.status === 200) {

                    console.log(rs.data)
                    const { token } = rs.data;
                    cookies.set('tokens', token)
                }
                return;
            } catch (_error) {
                cookies.remove('tokens');
                cookies.remove('user');
                return Promise.reject(_error);
            }
        }
    }

    return Promise.reject(error);
};

export const setupInterceptorsTo = (
    axiosInstance: AxiosInstance
): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};