import React from 'react'
import classes from './Input.css'

const Input = (props) => {

    const inputClass = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched){
        inputClass.push(classes.Invalid);
    }

    let inputElement = null;

    switch(props.elementType){
        case ('input') :
            inputElement = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
        break;
        case ('textarea') :
            inputElement = <textarea className={inputClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
        break;
        case ('select') :
            inputElement = (
            <select className={inputClass.join(' ')} value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(opt => {
                    return <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                })}
                </select>
            )
        break;
        default :
        inputElement = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }

    return (
        <div className={classes.Input}> 
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;
