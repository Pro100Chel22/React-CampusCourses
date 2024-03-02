import {useForm} from "antd/es/form/Form";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import dayjs from "dayjs";
import {register} from "../../../store/reducers/UserReducer/RegisterThunkCreater";
import {checkAuth} from "../../../store/reducers/UserReducer/CheckAuthThunkCreater";
// import {useState} from "react";
// import {ValidateStatus} from "antd/es/form/FormItem";

interface registrationForm {
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

    const tooltip="Это поле обязательное";
    const dateFormat = 'DD.MM.YYYY'; // вынос в константы
    const currentDate = new Date().toLocaleString("ru-RU", {dateStyle: "short"} ); // вынос в константы

    const registrationHandler = (value: registrationForm) => {
        dispatch(register({
            fullName: value.fullName,
            birthDate: value.birthDate.format("YYYY-MM-DD"), // вынос в константы
            email: value.email,
            password: value.password,
            confirmPassword: value.confirmPassword,
        })).then((result) => {if(result.meta.requestStatus === "fulfilled") dispatch(checkAuth())});
    }

    return { registrationLoading, tooltip, dateFormat, currentDate, form, registrationHandler };
}