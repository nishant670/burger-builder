import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label : "Salad", type : "salad"},
    { label : "Meat", type : "meat"},
    { label : "Bacon", type : "bacon"},
    { label : "Cheese", type : "cheese"}
]

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>Total Price : <strong>Rs. {props.price}</strong></p>
        {controls.map(ctr => {
            return <BuildControl
                        key={ctr.label}
                        label={ctr.label}
                        addIngredient={() => props.addIngredient(ctr.type)}
                        removeIngredient={() => props.removeIngredient(ctr.type)}
                        disabled={props.disabled[ctr.type]}
                    />
        })}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.purchasing}>
            {props.isAuthenticated ? 'ORDER NOW' : 'SIGN IN'}
        </button>
    </div>
)

export default buildControls