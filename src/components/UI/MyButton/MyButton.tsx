import React, {CSSProperties, FC} from 'react';
import {Button} from "antd";
import classes from "./MyButton.module.css";
import {ButtonHTMLType} from "antd/es/button";

export interface IMyButton {
    children?: React.ReactNode;
    style?: CSSProperties;
    htmlType?: ButtonHTMLType;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    loading?: boolean
}

const MyButton: FC<IMyButton> = ({children, style, htmlType , className, onClick, loading}) => {
    return (
        <Button onClick={onClick} style={style} type="primary" className={`${classes.MyButtonRadius} ${className}`} htmlType={htmlType} loading={loading}>
            {children}
        </Button>
    );
};

export default MyButton;