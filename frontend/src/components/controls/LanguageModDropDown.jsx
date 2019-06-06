import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FormLangModDropDownList} from 'components/controls/index'


const LANGUAGES = ['en', 'ru', 'lv'];

export default class LanguageModDropDown extends Component {


    static propTypes = {
        placeholder: PropTypes.string,
    };

    formatLanguagesTypes = value => {
        const {placeholder} = this.props
        if (!value) {
            return placeholder;

        }

        return loc(value);
    };


    render() {
        const {onChange, value, label, withBorder, searchable, ...restProps} = this.props;
        return (
            <FormLangModDropDownList
                searchable={searchable}
                label={label}
                withBorder={withBorder}
                items={LANGUAGES}
                value={value}
                formatter={::this.formatLanguagesTypes}
                onChange={onChange}
                {...restProps}
            />
        )

    }
}
