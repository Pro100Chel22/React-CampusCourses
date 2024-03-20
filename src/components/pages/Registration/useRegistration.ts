import {useForm} from "antd/es/form/Form";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import dayjs from "dayjs";
import {register} from "../../../store/reducers/UserReducer/RegisterThunkCreater";
import {checkAuth} from "../../../store/reducers/UserReducer/CheckAuthThunkCreater";
import {serverDateFormat} from "../../consts/consts";

interface IRegistrationForm {
    fullName: string,
    birthDate: dayjs.Dayjs,
    email: string,
    password: string,
    confirmPassword: string,
}

export const useRegistration = () => {
    const [form] = useForm();
    const dispatch = useAppDispatch();
    const {registrationLoading} = useAppSelector(state => state.userReducer);

    const currentDate = new Date().toLocaleString("ru-RU", {dateStyle: "short"} ); // вынос в константы

    const registrationHandler = (value: IRegistrationForm) => {
        dispatch(register({
            fullName: value.fullName,
            birthDate: value.birthDate.format(serverDateFormat),
            email: value.email,
            password: value.password,
            confirmPassword: value.confirmPassword,
        })).then((result) => {if(result.meta.requestStatus === "fulfilled") dispatch(checkAuth())});
    }

    return { registrationLoading, currentDate, form, registrationHandler };
}