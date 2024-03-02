import {useAppSelector} from "./redux";

export const useAuth = () => {
    return useAppSelector(state => state.userReducer);
}