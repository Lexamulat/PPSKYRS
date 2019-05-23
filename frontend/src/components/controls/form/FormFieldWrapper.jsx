import React, {Component, Children} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class FormFieldWrapper extends Component {
    static propTypes = {
        className: PropTypes.string,
        error: PropTypes.any,
        value: PropTypes.any
    };

    static defaultProps = {
        type: 'FormFieldWrapper'
    };

    render() {
        const {
            className,
            children,
            value,
            error,
            onChange
        } = this.props;

        const fieldClassName = classNames(className);

        return (
            <div className={fieldClassName}>
                {Children.map(children, (c, i) => {
                    const props = {
                        key: i,
                        ref: i
                    };
                    const {className, children, ...wrapperProps} = this.props;
                    if (!c)
                        return c;

                    if (!c.props)
                        return React.cloneElement(c, props);

                    const {fieldKey, type} = c.props;

                    if (!fieldKey && !type)
                        return c;

                    if (type === 'FormFieldWrapper') {
                        return React.cloneElement(c, {...wrapperProps, ...c.props, ...props});
                    }

                    props.value = c.props.value ? c.props.value : value[fieldKey];
                    props.error = error[fieldKey] || c.props.error;
                    props.onChange = c.props.onChange ? c.props.onChange : onChange(fieldKey);
                    return React.cloneElement(c, props);
                })}
            </div>
        );
    }
}
