import React from 'react';
import {MenuOutlined} from "@ant-design/icons";
import classes from './MyOverflowedIndicator.module.css'

const MyOverflowedIndicator = () => {
    return (
        <span className={classes.overflowedIndicator}>
            <MenuOutlined />
        </span>
    );
};

export default MyOverflowedIndicator;