import React, {FC} from 'react';
import classes from './MyNotification.module.css'

export interface IMyNotification {
    message: string;
    isImportant: boolean;
    isLast: boolean
}

const MyNotification: FC<IMyNotification> = ({message, isImportant, isLast}) => {
    return (
        <div className={classes.notification + " " + (!isLast ? classes.borderBottom : "") + " " + (isImportant ? classes.important : "")}>
            {message}
        </div>
    );
};

export default MyNotification;