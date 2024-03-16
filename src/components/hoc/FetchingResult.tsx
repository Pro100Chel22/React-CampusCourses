import React, {FC} from 'react';
import {IErrorResponse} from "../../types/types";
import {Result} from "antd";
import {ResultStatusType} from "antd/es/result";

export interface IFetchingResult {
    error: IErrorResponse | null;
    children: React.ReactNode;
    errorResultChildren?: React.ReactNode;
}

const FetchingResult: FC<IFetchingResult> = ({error, children, errorResultChildren}) => {
    if(!error) {
        return (<>{children}</>);
    }

    const statuses: Record<number, {status: ResultStatusType; title: string; subTitle: string;}> = {}
    statuses[500] = {status: "500", title: "500", subTitle: "Извините, но что-то пошло не так!"};
    statuses[404] = {status: "404", title: "404", subTitle: "Ресурс не найден!"};
    statuses[0] = {status: "500", title: "", subTitle: "Извините, но что-то пошло так!"};

    let currentStatus = statuses[error.status] ?? statuses[0];

    return (
        <Result
            status={currentStatus.status}
            title={currentStatus.title}
            subTitle={currentStatus.subTitle}
            extra={errorResultChildren}
        />
    );
};

export default FetchingResult;