import React, {Component} from 'react';
import {FormDropDownList} from 'components/controls'
import PropTypes from 'prop-types';


const LANGUAGES = ['ar', 'zh', 'da', 'nl', 'en', 'et',
    'fr', 'de', 'is', 'in', 'it', 'ja', 'ko','lv', 'no', 'pl', 'pt', 'ro', 'ru',
    'es', 'sv', 'tr'];

export default class LanguageDropDownList extends Component {


    static propTypes = {
        placeholder: PropTypes.string,
    };

    formatLanguagesTypes = value => {
        const {placeholder} = this.props
        if (!value) {
            return placeholder;

        }

        // return loc(value);
        return value;

    };


    render() {
        const {onChange, value, label, withBorder, searchable, ...restProps} = this.props;
        return (
            <FormDropDownList
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
