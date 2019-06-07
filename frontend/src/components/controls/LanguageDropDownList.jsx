import React, { Component } from 'react';
import { FormDropDownList } from 'components/controls'
import PropTypes from 'prop-types';


const LANGUAGES = ['math', 'rus'];

export default class LanguageDropDownList extends Component {


    static propTypes = {
        placeholder: PropTypes.string,
    };

    formatLanguagesTypes = value => {
        const { placeholder } = this.props
        if (!value) {
            return placeholder;

        }

        return loc(value);

    };


    render() {
        const { onChange, value, label, withBorder, searchable, ...restProps } = this.props;
        return (
            <FormDropDownList
                searchable={searchable}
                label={label}
                withBorder={withBorder}
                items={LANGUAGES}
                value={value}
                formatter={:: this.formatLanguagesTypes}
    onChange = { onChange }
                {...restProps }
/>
        )

    }
}
