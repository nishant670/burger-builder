import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingType => {
    return {
        type : actionType.ADD_INGREDIENT,
        ingredientType : ingType
    }
}

export const removeIngredient = ingType => {
    return {
        type : actionType.REMOVE_INGREDIENT,
        ingredientType : ingType
    }
}

export  const setDefaultPrice = () => {
    return {
        type : actionType.SET_DEFAULT_PRICE
    }
}

export const setIngredient = ingredients => {
    return {
        type : actionType.SET_INGREDIENT,
        ingredients : ingredients
    }
}

export const fetchIngredientFailed = () => {
    return {
        type : actionType.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredient = () => {
    return dispatch => {
        return (
            axios.get('https://burger-builder-2c8dc.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredient(response.data))
            })
            .catch(error => {
                return dispatch(fetchIngredientFailed())
            })
        )
    }
}