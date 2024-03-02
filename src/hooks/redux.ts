import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import {GetThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const thunkSelector = (thunk: GetThunkAPI<any>): RootState => {
    return thunk.getState() as RootState;
}