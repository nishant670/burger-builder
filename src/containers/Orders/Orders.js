import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';

import * as OrderActionCreator from '../../store/actions/orderAction';

export class Orders extends Component {

    // state={
    //     orders : [],
    //     loading : true
    // }

    componentDidMount(){
        this.props.fetchOrdersHandler(this.props.token, this.props.userId);
    }

    render() {
        console.log('orders render' + this.props.orders)
        let orderList = this.props.orders.map(order => {
            return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
        })
        if(this.props.loading){
            orderList = <Spinner />
        }
        return (
            <div>
                {orderList}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrdersHandler : (token, userId) => dispatch(OrderActionCreator.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
