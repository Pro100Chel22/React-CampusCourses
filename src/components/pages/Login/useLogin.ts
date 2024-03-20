import {Form} from "antd";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {login} from "../../../store/reducers/UserReducer/LoginThunkCreater";
import {checkAuth} from "../../../store/reducers/UserReducer/CheckAuthThunkCreater";

interface ILoginForm {
    email: string;
    password: string;
}

export const useLogin = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const {loginLoading} = useAppSelector(state => state.userReducer);

    const loginHandler = (value: ILoginForm) => {
        dispatch(login({
            email: value.email,
            password: value.password
        })).then((result) => {if(result.meta.requestStatus === "fulfilled") dispatch(checkAuth())});

    };

    return {loginLoading, loginHandler, form};
}