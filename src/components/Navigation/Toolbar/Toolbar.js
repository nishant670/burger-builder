import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle toggleClick={props.openDrawToggler} />
            <div className={classes.Logo}>
            <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuthenticated}/>
            </nav>
        </header>
    )
}

export default Toolbar;
