import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducer/UserSlice";
import groupsReducer from "./reducers/GroupsReducer/GroupsSlice"

const rootReducer = combineReducers({
    userReducer,
    groupsReducer
});

const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

const store = setupStore();

export default store;