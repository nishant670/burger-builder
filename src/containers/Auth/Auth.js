import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as authAction from '../../store/actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { updateObject, chechkValidity } from '../../shared/utility'

import classes from './Auth.css';

export class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: chechkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })
        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {
        const formElementArr = [];
        for (let key in this.state.controls) {
            formElementArr.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementArr.map(formEl => {
            return <Input
                key={formEl.id}
                elementType={formEl.config.elementType}
                elementConfig={formEl.config.elementConfig}
                value={formEl.config.value}
                invalid={!formEl.config.valid}
                shouldValidate={formEl.config.validation}
                touched={formEl.config.touched}
                changed={(event) => this.inputChangeHandler(event, formEl.id)}
            />
        })

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = this.props.error
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <p>{errorMessage}</p>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthHandler}>
                    Switch to {this.state.isSignUp ? "SignIn" : "SignUp"}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(authAction.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(authAction.authRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
