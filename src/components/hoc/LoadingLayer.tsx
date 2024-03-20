import React, {FC} from 'react';
import LoadingSpinner from "./LoadingSpinner";

export interface ILoadingLayer {
    children: React.ReactElement;
    isLoading: boolean;
}

const LoadingLayer: FC<ILoadingLayer> = ({isLoading, children}) => {
    if(isLoading) {
        return (<LoadingSpinner/>);
    }

    return children;
};

export default LoadingLayer;