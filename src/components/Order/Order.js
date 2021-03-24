import React from 'react';
import classes from './Order.css'

const Order = (props) => {

    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name : ingredientName,
            amount : props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ing => {
    return <span 
            key={ing.name}
            style={{
                border: "1px solid #f0c",
                padding : 5,
                margin : "0 5px",
                fontSize : "0.8em"
            }}>
                {ing.name} ({ing.amount})
            </span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientOutput}</p>
    <p>Total Price <strong>Rs {props.price}</strong></p>
        </div>
    )
}

export default Order;