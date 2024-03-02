import React, {FC} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {Navigate} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export interface IRequireNotAuth {
    children: React.ReactElement;
}

const RequireNotAuth: FC<IRequireNotAuth> = ({children}) => {
    const {checkingAuth, token} = useAuth();

    if(checkingAuth) return <LoadingSpinner />;

    if(!!token) return <Navigate to='/' replace={true}/>

    return children;
};

export default RequireNotAuth;