import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
// import { withRouter } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/burgerBuilderAction';


class Checkout extends Component {

    // componentDidMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()){

    //         if(param[0] === 'totalPrice'){
    //             price = param[1]
    //         }
    //         else{
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({
    //         ingredients : ingredients,
    //         totalPrice : price
    //     })
    // }

    cancelOrderHandler = () => {
        this.props.history.goBack();
        this.props.setDefaultPrice();
    }

    continueOrderHandler = () => {
        this.props.history.replace('/checkout/contact');
    }
    testhandler = () => {
        alert("Test triggered")
    }

    render() {
        let summary = <Redirect to="/"/>
        if(this.props.ingredients){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <React.Fragment>
                    {purchasedRedirect}
                <CheckoutSummary
                ingredients={this.props.ingredients}
                cancelOrder={this.cancelOrderHandler}
                continueOrder={this.continueOrderHandler}
            />
            <Route
                    path={this.props.match.path + '/contact'}
                    component={ContactData}
                    price={this.props.totalPrice}
                    />
                    </React.Fragment>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDefaultPrice : () => dispatch(actionCreators.setDefaultPrice())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
