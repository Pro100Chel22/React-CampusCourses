import React from "react";

export const useMyModalFormAddTeacher = () => {
    const customFilterOption = (inputValue: string, option?: React.ReactElement) => {
        // @ts-ignore
        const value = option?.children.toLowerCase();
        inputValue = inputValue.toLowerCase();

        return value?.includes(inputValue);
    };

    return {customFilterOption};
}