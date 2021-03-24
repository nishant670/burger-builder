import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../../axios-orders';

import {connect} from 'react-redux';

import * as actionCreator from '../../../store/actions/orderAction'

export class ContactData extends Component {

    state = {
        orderForm : {
                name : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Your Full Name',
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                email : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'email',
                        placeholder : 'Your Email',
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                flat : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Flat Number',
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                street : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Street',
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                postalCode : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Postal Code',
                    },
                    value : '',
                    validation : {
                        required : true,
                        minLength : 6,
                        maxLength : 6
                    },
                    valid : false,
                    touched : false
                },
            deliveryMethod : {
                    elementType : 'select',
                    elementConfig : {
                        options : [
                            {value : "fastest", displayValue : "Fastest"},
                            {value : "cheapest", displayValue : "Cheapest"}
                        ]
                    },
                    validation : {},
                    valid : true,
                    value : 'fastest'
            }
    },
    isFormValid : false
}

    chechkValidity = (value, rules) => {

        let isValid  = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;

    }

    inputChangeHandler = (event, inputIdentifier) =>{
        const updatedOrderform = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderform[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.chechkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderform[inputIdentifier] = updatedFormElement;

        let isFormValid = true;
        for ( let inputIdentifier in updatedOrderform){
            isFormValid = updatedOrderform[inputIdentifier].valid && isFormValid;
        }

        this.setState({
            orderForm : updatedOrderform,
            isFormValid : isFormValid
        })

    } 

    orderHandler = (e) => {
        e.preventDefault();
        // console.log(this.props.ingredients)
        this.setState({
            loading : true
        })
        const formData = {};
        for (let formElementData in this.state.orderForm){
            formData[formElementData] = this.state.orderForm[formElementData].value
        }

        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
            orderData : formData,
            userId : this.props.userId
        }

        this.props.purchaseBurgerHandler(order, this.props.token);
        // axios.post('/orders.json', order)
        //      .then(response => {
        //          this.setState({
        //             loading : false
        //          })
        //      })
        //      .catch(error => {
        //         this.setState({
        //             loading : false
        //         })
        //      });
        //      this.props.history.push('/');
    }

    render() {

        const formElementArr = [];
        for( let key in this.state.orderForm){
            formElementArr.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }
        

        let form = (
            <form>
                    {formElementArr.map(formEl => (
                        <Input
                            key={formEl.id}
                            elementType={formEl.config.elementType}
                            elementConfig={formEl.config.elementConfig}
                            value={formEl.config.value}
                            invalid={!formEl.config.valid}
                            shouldValidate={formEl.config.validation}
                            touched={formEl.config.touched}
                            changed={(event) => this.inputChangeHandler(event, formEl.id)}/>
                    ))}
                    
                    <br/>
                    <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.isFormValid}>Order</Button>
                </form>
        )
        if(this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h1>Fill your contact details</h1>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurgerHandler : (orderData, token) => dispatch(actionCreator.purchaseBurger(orderData, token)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
