import classes from './MyCourseInforItem.module.css'

import React, {CSSProperties, FC} from 'react';

export interface IMyCourseInfoItem {
    title: string;
    value: string;
    flex?: string;
    style?: CSSProperties;
}

const MyCourseInfoItem: FC<IMyCourseInfoItem> = ({title, value, flex, style}) => {
    return (
        <div className={classes.infoContainer} style={{flex: flex}}>
            <div className={classes.infoTitle}>{title}</div>
            <div className={classes.infoValue} style={style}>{value}</div>
        </div>
    );
};

export default MyCourseInfoItem;