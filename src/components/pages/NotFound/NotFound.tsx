import React from 'react';
import {Button, Result} from "antd";
import {Link} from "react-router-dom";
import classes from './NotFound.module.css'

const NotFound = () => {
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Страница не найдена."
                className={classes.resultContainer}
                extra={<Link to="/"><Button type="primary">На главную страницу</Button></Link>}
            />
        </div>
    );
};

export default NotFound;