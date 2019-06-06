import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {
    LanguageModDropDown
} from 'components/controls';

import styles from './LangModDropDown.scss';

export default class LangModDropDown extends React.Component {

    static propTypes = {
        handleUpdate: PropTypes.func.isRequired,
    };

    state = {
        langMode: 'en'
    };

    componentWillMount() {
        const langMode = localStorage.getItem('translations');
        if (langMode) {
            this.setState({langMode});
        }
    }

    handleChangeOneOfDropDown(field, e) {

        if (this.isNeedUpadateTranslations(e.target.value)) {
            this.setState({
                [field]: e.target.value
            });

            this.changeTranslationsMode(e.target.value);
        }

    }

    isNeedUpadateTranslations(incomeValue) {
        const {langMode} = this.state;
        return !(incomeValue === langMode)

    }

    changeTranslationsMode = (mode) => {
        __changeLocale(mode);
        this.props.handleUpdate();
    }

    render() {
        const {langMode} = this.state;
        return (
            <LanguageModDropDown
                withoutShadow
                label={loc('language')}
                fieldKey={'langMode'}
                placeholder={loc('language')}
                value={langMode}
                className={styles.langModDropDown}
                headClass={styles.headClassName}
                listClass={styles.listClass}
                onChange={this.handleChangeOneOfDropDown.bind(this, 'langMode')}
            />
        );
    }
}
