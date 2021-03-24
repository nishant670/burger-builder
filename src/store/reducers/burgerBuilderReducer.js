import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients : null,
    totalPrice : 50,
    error : false,
    building : false
}

const defaultTotalPrice = {
    totalPrice : 50
}

const INGREDIENT_PRICES = {
    salad : 50,
    meat : 75,
    bacon : 60,
    cheese : 20
}

const reducer = (state = initialState, action) => {

    switch (action.type){
        case actionTypes.ADD_INGREDIENT :
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientType] : state.ingredients[action.ingredientType] + 1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
                building : true
            }
        case actionTypes.REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientType] : state.ingredients[action.ingredientType] - 1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
                building : true
            }
        case actionTypes.SET_DEFAULT_PRICE :
            return {
                ...state,
                totalPrice : defaultTotalPrice.totalPrice
            }
        case actionTypes.SET_INGREDIENT : 
            return {
                ...state,
                ingredients : {
                    bacon : action.ingredients.bacon,
                    salad : action.ingredients.salad,
                    cheese : action.ingredients.cheese,
                    meat : action.ingredients.meat
                },
                building : false
            }
        case actionTypes.FETCH_INGREDIENT_FAILED :
            return {
                ...state,
                error : true
            }
            default :
        return state;
    }
}

export default reducer;