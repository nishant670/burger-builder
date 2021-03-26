import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import {connect} from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreator from '../../store/actions/burgerBuilderAction';
import * as orderActionCreator from '../../store/actions/orderAction';
import * as authAction from '../../store/actions/auth';

export class BurgerBuilder extends Component {

    state = {
        purchasing : false,
        // loading : false,
        // error : false
    }

    componentDidMount(){
            this.props.onInitIngredients();
            this.props.onInitTotalPrice();

        // axios.get('https://burger-builder-2c8dc.firebaseio.com/ingredients.json')
        //      .then(response => {
        //          this.setState({
        //             ingredients : response.data
        //          })
        //      })
        //      .catch(error => {
        //          this.setState({
        //              error : true
        //          })
        //      })
    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    }).reduce((sum, el) => {
                        return sum + el;
                    }, 0);
                    return sum > 0;
    }

    // addIngredientHandler = type => {
    //      const oldCount = this.state.ingredients[type];
    //      const updatedCount = oldCount + 1;
    //      const updatedIngredients = {
    //          ...this.state.ingredients
    //      }
    //      updatedIngredients[type] = updatedCount;

    //      const additionPrice = INGREDIENT_PRICES[type];
    //      const oldPrice = this.state.totalPrice;
    //      const newTotalPrice = oldPrice + additionPrice;
    //      this.setState({
    //          totalPrice : newTotalPrice,
    //          ingredients : updatedIngredients
    //      });
    //      this.updatePurchaseState(updatedIngredients);
    // };

    // removeIngredientHandler = type => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;

    //     const deductionPrice = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newTotalPrice = oldPrice - deductionPrice;
    //     this.setState({
    //         totalPrice : newTotalPrice,
    //         ingredients : updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // };

    purchasingHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchasing : true
            })
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push("/auth");
        }
    }

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing : false
        })
    }

    continuePurchaseHandler = () => {
        // alert("Continue to order");
        
        // const queryParams = [];
        // for( let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        //     queryParams.push('totalPrice=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
            // this.props.history.push({
            //     pathname : '/checkout',
            //     search : '?' + queryString
            // });
            this.props.purchaseBurgerInit();
            this.props.history.push('/checkout');
    }

    render() {
        
        const disabledInfo = {
            ...this.props.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />
        if(this.props.ingredients){
            burger = 
                <Aux>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls 
                    addIngredient={this.props.addIngredientHandler}
                    removeIngredient={this.props.removeIngredientHandler}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    purchasing={this.purchasingHandler}
                    isAuthenticated={this.props.isAuthenticated}
                    disabled={disabledInfo}
                />
                </Aux>
            orderSummary = <OrderSummary
                ingredients = {this.props.ingredients}
                cancelPurchase={this.cancelPurchaseHandler}
                continue={this.continuePurchaseHandler}
                totalPrice={this.props.totalPrice}/>
        }
        // if (this.state.loading){
        //     orderSummary = <Spinner />
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} cancelPurchase={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        purchased : state.order.purchased,
        isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        addIngredientHandler : (type) => dispatch(actionCreator.addIngredient(type)),
        removeIngredientHandler : (type) => dispatch(actionCreator.removeIngredient(type)),
        onInitIngredients : () => dispatch(actionCreator.initIngredient()),
        purchaseBurgerInit : () =>  dispatch(orderActionCreator.purchaseBurgerInit()),
        onInitTotalPrice : () => dispatch(actionCreator.setDefaultPrice()),
        onSetAuthRedirectPath : (path) => dispatch(authAction.authRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
