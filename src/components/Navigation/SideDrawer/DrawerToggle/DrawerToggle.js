import React from 'react';
import classes from './DrawerToggle.css';

const DrawerToggle = (props) => (
    <div
        onClick={props.toggleClick}
        className={classes.DrawerToggle}
    >
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default DrawerToggle;
