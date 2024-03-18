import React, {CSSProperties, FC} from 'react';
import {Button} from "antd";
import classes from "./MyButton.module.css";
import {ButtonHTMLType, ButtonType} from "antd/es/button";
import {BaseButtonProps} from "antd/es/button/button";
import {SizeType} from "antd/es/config-provider/SizeContext";

export interface IMyButton {
    children?: React.ReactNode;
    style?: CSSProperties;
    htmlType?: ButtonHTMLType;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    loading?: boolean;
    disabled?: boolean;
    type?: ButtonType;
    size?: SizeType;
}

const MyButton: FC<IMyButton> = ({
     children,
     style,
     htmlType,
     className,
     onClick,
     loading,
     disabled,
     type,
     size
}) => {
    let buttonType = type
    if(buttonType === undefined) {
        buttonType = "primary"
    }

    return (
        <Button onClick={onClick} style={style} type={buttonType} className={`${classes.MyButtonRadius} ${className}`}
                htmlType={htmlType} loading={loading} disabled={disabled} size={size}>
            {children}
        </Button>
    );
};

export default MyButton;