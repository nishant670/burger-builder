import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import burgerReducer from './store/reducers/burgerBuilderReducer';
import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/auth';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
    burgerBuilder : burgerReducer,
    order : orderReducer,
    auth : authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter basename="/luvingtales/">
            <App />
            </BrowserRouter>
    </Provider>
    
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
