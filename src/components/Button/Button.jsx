import React, { Component } from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

export class Button extends Component {

    static propTypes = {
        onButtonClick: PropTypes.func,
    }
    buttonClickHandler = (e) => {
        this.props.onButtonClick()
    }
    render() {
        const {buttonClickHandler} = this;
        return (
            <>
                <button type="button" onClick={buttonClickHandler} className={s.btn}>Load more</button>
            </>
        )
    }
}

export default Button;
