import React, {Component} from 'react';
import PropTypes from 'prop-types';
import uuid from 'node-uuid';
import styles from './TextArea.scss';
import {Scrollbars} from 'react-custom-scrollbars';
import classNames from 'classnames';

export default class TextArea extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        value: PropTypes.string,
        error: PropTypes.string,
        onChange: PropTypes.func,
        className: PropTypes.string,
        initialHeight: PropTypes.number
    };

    static defaultProps = {
        initialHeight: 120
    };

    constructor(props) {
        super(props);
        this.state = {
            currentHeight: props.initialHeight
        };
        this.key = uuid.v4();
        this._caretPosition = 0;
        this._lastKey = '';
    }

    componentWillReceiveProps(next) {
        if (!next.value && this.props.value) {
            const {initialHeight} = this.props;
            const currentHeight = initialHeight;
            if (!this.refs.scrollbar)
                return;
            this.refs.scrollbar.scrollToTop();
            this.setState({currentHeight});
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.value !== nextProps.value;
    }

    componentDidUpdate({value}) {
        if (!this._lastKey)
            return;

        this.restoreCaret(value);
        this._lastKey = null;
    }

    restoreCaret(value) {
        let index;
        if (this._lastKey === 'Backspace' || this._lastKey === 'Delete') {
            const withDelta = this._lastKey === 'Backspace' ? 1 : 0;
            index = this._caretPosition - (value.length - this.props.value.length) * withDelta;
        } else if (this._caretPosition === value.length) {
            index = -1;
        } else {
            index = this._caretPosition + (this.props.value.length - value.length);
        }


        if (index !== -1) {
            this.refs.textarea.selectionStart = this.refs.textarea.selectionEnd = index;
        }
    }

    render() {
        const {
            placeholder,
            value,
            error,
            className,
            initialHeight
        } = this.props;

        const {currentHeight} = this.state;
        const inputClassName = classNames(styles.field, {
            [styles.highlightError]: Boolean(error)
        }, className);

        return (
            <Scrollbars ref='scrollbar' autoHeightMax={initialHeight} autoHide autoHeight>
            <textarea className={inputClassName}
                      key={this.key}
                      rows={5}
                      ref='textarea'
                      style={{height: currentHeight}}
                      placeholder={placeholder}
                      value={value}
                      onChange={::this.handleChange}
                      onKeyDown={this.handleKeyDown}/>
            </Scrollbars>
        );
    }

    handleChange(e) {
        const {onChange, initialHeight} = this.props;
        const currentHeight = e.target ? e.target.scrollHeight : initialHeight;
        this.setState({currentHeight}, onChange(e));
    }

    handleKeyDown = event => {
        this.saveCaret(event);

        if (event.key !== 'Enter')
            return;

        if (!this.props.onEnter)
            return;

        if (event.ctrlKey) {
            const {value, onChange} = this.props;
            const newValue = value + "\r\n";
            onChange({target: {value: newValue}});
            return;
        }

        event.preventDefault();
        this.props.onEnter();
    };


    saveCaret(event) {
        this._caretPosition = Number(event.target.selectionEnd);

        if (event.key === 'Backspace')
            this._lastKey = 'Backspace';
        else if (event.key === 'Delete')
            this._lastKey = 'Delete';
        else
            this._lastKey = event.key;
    }
}
