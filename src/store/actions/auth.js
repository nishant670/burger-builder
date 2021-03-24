import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    };
};

export const authSuccess = (tokenId, userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        userId : userId,
        idToken : tokenId
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
         type : actionTypes.AUTH_LOGOUT
    }
}

export const authFail = error => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    };
};

export const authRedirectPath = path => {
    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const authExpiration = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtGNsiCdp7XCuDkiRk5LF308Z-njW_X74';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtGNsiCdp7XCuDkiRk5LF308Z-njW_X74';
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(authExpiration(response.data.expiresIn));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data.error.message))
        })
    };
};

export const authStatus = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout());
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const userId = localStorage.getItem('userId');
        if(expirationDate <= new Date()){
            dispatch(authLogout());
        }
        else{
            dispatch(authSuccess(token, userId));
            dispatch(authExpiration((expirationDate.getTime() - new Date().getTime() / 1000)));
        }
        }
    }
}