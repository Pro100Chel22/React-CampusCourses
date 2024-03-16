import React, {FC} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import {IRoles} from "../../types/types";

export interface IRequireAuth {
    children: React.ReactElement;
    requiredRoles?: IRoles; // Если роль отмечена true, то пользователь должен иметь эту роль
}

const RequireAuth: FC<IRequireAuth> = ({children, requiredRoles}) => {
    const {checkingAuth, token, roles} = useAuth();
    const location = useLocation();

    if(checkingAuth) return <LoadingSpinner />;

    if(!token) return <Navigate to='/login' state={{from: location}} replace={true}/>

    if(requiredRoles &&
        ((requiredRoles.isAdmin && !roles.isAdmin) ||
        (requiredRoles.isStudent && !roles.isStudent) ||
        (requiredRoles.isTeacher && !roles.isTeacher))) {
        return <Navigate to='/' state={{from: location}} replace={true}/>;
    }

    return children;
};

export default RequireAuth;