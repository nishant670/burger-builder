import React, {Component} from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

 class OrderSummary extends Component{

     render(){

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform : "capitalize"}}>{igKey}</span> : {this.props.ingredients[igKey]}
                </li>
            )
        });

         return(
            <Aux>
            <h3 style={{display : "inline-block", float : "left"}}>Your Order</h3><span style={{float : "right", color : "red", marginTop : 20}}><strong>Total Price : {this.props.totalPrice}</strong></span>
            <div></div>
            <br></br>
            <p style={{clear : "both"}}>A delecious burger with the following ingredients - </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <Button
            btnType="Danger"
            clicked={this.props.cancelPurchase}
            >
                CANCEL
            </Button>
            <Button
            btnType="Success"
            clicked={this.props.continue}>CONTINUE</Button>
        </Aux>
         )
     }
 }

export default OrderSummary;