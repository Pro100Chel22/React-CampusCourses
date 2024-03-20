import {useForm} from "antd/es/form/Form";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {editProfile} from "../../../store/reducers/UserReducer/EditProfileThunkCreater";
import {serverDateFormat} from "../../consts/consts";

interface IProfileEditForm {
    fullName: string,
    birthDate: dayjs.Dayjs,
}

export const useProfile = () => {
    const [form] = useForm();
    const dispatch = useAppDispatch();
    const {profile, editLoading} = useAppSelector(state => state.userReducer);

    const currentDate = new Date().toLocaleString("ru-RU", {dateStyle: "short"} ); // вынос в константы

    const editHandler = (value: IProfileEditForm) => {
        dispatch(editProfile({
            fullName: value.fullName,
            birthDate: value.birthDate.format(serverDateFormat),
        }));
    }

    return {editHandler, profile, editLoading, form, currentDate};
}