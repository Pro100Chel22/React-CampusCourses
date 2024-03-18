import classes from './MyCourseInforItem.module.css'

import React, {FC} from 'react';

export interface IMyCourseInfoItem {
    title: string;
    value: string;
    flex?: string;
}

const MyCourseInfoItem: FC<IMyCourseInfoItem> = ({title, value, flex}) => {
    return (
        <div className={classes.infoContainer} style={{flex: flex}}>
            <div className={classes.infoTitle}>{title}</div>
            <div className={classes.infoValue}>{value}</div>
        </div>
    );
};

export default MyCourseInfoItem;