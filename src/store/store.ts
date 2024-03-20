import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducer/UserSlice";
import groupsReducer from "./reducers/GroupsReducer/GroupsSlice"
import coursesReducer from "./reducers/GroupCoursesReducer/GroupCoursesSlice"
import myAndTeachingCoursesReducer from "./reducers/MyAndTeachingCoursesReducer/MyAndTeachingCoursesSlice"
import courseDetailReducer from "./reducers/CourseDetailReducer/CourseDetailsSlice"
import {injectStoreToAxiosInstance} from "../requests/AxiosInstance";

const rootReducer = combineReducers({
    userReducer,
    groupsReducer,
    coursesReducer,
    myAndTeachingCoursesReducer,
    courseDetailReducer,
});

const setupStore = () => {
    const store = configureStore({
        reducer: rootReducer,
    });

    injectStoreToAxiosInstance(store);

    return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

const store = setupStore();

export default store;