import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux'

class Layout extends Component{

    state = {
        showSideDrawer : false
    };

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer}
        });
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false})
    };

    render(){
        return(
            <Aux>
        <div>
            <Toolbar
            isAuthenticated={this.props.isAuthenticated}
            openDrawToggler={this.toggleSideDrawerHandler}/>
            <SideDrawer
            isAuthenticated={this.props.isAuthenticated}
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}/>
        </div>
        <main className={classes.Content}>
            {this.props.children}
        </main>
        </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);