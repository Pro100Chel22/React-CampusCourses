import axios, {AxiosInstance} from "axios";
import {AppStore} from "../store/store";
import {actions} from "../store/reducers/UserReducer/UserSlice";
import {customNotifications} from "../notifications/Notifications";

const BASE_URL: string = "https://camp-courses.api.kreosoft.space";

let localStore: AppStore | null = null;
export const injectStoreToAxiosInstance = (store: AppStore) => {
   localStore = store
}

const axiosInstanceFactory = (useToken: boolean = true): AxiosInstance => {
    const instance: AxiosInstance = axios.create({
        baseURL: BASE_URL
    });

    if(useToken) {
        instance.interceptors.request.use(
            config => {
                const token = localStore?.getState().userReducer.token;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        instance.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (error.response.status === 401) {
                    localStore?.dispatch(actions.localLogout());

                    customNotifications.info({massage: 'Ваша сессия закончилась', key: 'logout'});
                }
                return Promise.reject(error);
            }
        );
    }

    return instance;
};

export default axiosInstanceFactory;