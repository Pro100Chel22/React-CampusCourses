import {useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {logout} from "../../store/reducers/UserReducer/LogoutThunkCreater";

export const useCustomLayout = () => {
    const location = useLocation().pathname;
    const {roles, token, checkingAuth, profile} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return {logoutHandler, location, roles, token, checkingAuth, profile};
}