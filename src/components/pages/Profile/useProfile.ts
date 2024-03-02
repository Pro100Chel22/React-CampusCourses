import {useForm} from "antd/es/form/Form";
import dayjs from "dayjs";
import {useAppSelector} from "../../../hooks/redux";

interface IProfileEditForm {
    fullName: string,
    birthDate: dayjs.Dayjs,
}

export const useProfile = () => {
    const [form] = useForm();
    const profile = useAppSelector(state => state.userReducer.profile);

    const currentDate = new Date().toLocaleString("ru-RU", {dateStyle: "short"} ); // вынос в константы

    const editHandler = (value: IProfileEditForm) => {
        console.log(value);
    }

    return {editHandler, profile, form, currentDate};
}