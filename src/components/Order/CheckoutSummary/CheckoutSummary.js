import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const CheckoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>It seems like a tasty burger</h1>
            <div style={{width : "100%", margin : "auto"}}>
                <Burger ingredients={props.ingredients}/>
                <Button
                    btnType="Danger"
                    clicked={props.cancelOrder}>
                        Cancel
                    </Button>
                <Button
                    btnType="Success"
                    clicked={props.continueOrder}>
                        Continue
                    </Button>
            </div>
        </div>
    )
}

export default CheckoutSummary;