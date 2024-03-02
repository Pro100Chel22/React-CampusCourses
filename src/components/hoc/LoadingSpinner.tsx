import React from 'react';
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import classes from './LoadingSpinner.module.css'

const LoadingSpinner = () => {
    return (
        <div className={classes.spinnerContainer}>
            <Spin indicator={<LoadingOutlined  className={classes.spinner} />} />
        </div>
    );
};

export default LoadingSpinner;