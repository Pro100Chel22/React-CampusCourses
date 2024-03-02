import axios, {AxiosInstance} from "axios";

const BASE_URL: string = "https://camp-courses.api.kreosoft.space";

const axiosInstanceFactory = (): AxiosInstance => {
    const instance: AxiosInstance = axios.create({
        baseURL: BASE_URL
    });



    return instance;
};

export default axiosInstanceFactory;