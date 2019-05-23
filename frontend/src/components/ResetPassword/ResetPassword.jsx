import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import {
    Button,
    Form, FormFieldWrapper,
    FormTextField,
} from 'components/controls';

import validatePasswordFields from './validatePasswordFields';


import styles from './ResetPassword.scss';


export default class ResetPassword extends React.Component {

    static propTypes = {

        onNavigate: PropTypes.func.isRequired,


        onCheckResetPasswordToken: PropTypes.func.isRequired,

        checkResetPassToken: PropTypes.object,
        checkResetPassTokenError: PropTypes.object,
        checkResetPassTokenProcessing: PropTypes.bool,

        onSetPassword: PropTypes.func.isRequired,

        login: PropTypes.object,
        loginError: PropTypes.object,
        loginProcessing: PropTypes.bool,


    };

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            pass: '',
            confPass: '',

            showErrorPage: false,
        };

        this.state.showResultPage = true;

        const {search} = window.location;
        const query = queryString.parse(search);
        if (query && query.token) {
            this.state.token = query.token
        } else {
            this.handleGoTo('/')
        }
    }

    componentWillMount() {
        const {token} = this.state;
        this.props.onCheckResetPasswordToken(token)
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if (!this.props.checkResetPassTokenError && nextProps.checkResetPassTokenError) {
            this.setState({showErrorPage: true})
        }

        if (!this.props.login && nextProps.login && nextProps.login.role) {
            this.goHome()
        }
    }

    goHome = () => {
        this.props.onNavigate('/')
    }

    handleGoTo = (path) => () => {
        this.props.onNavigate(path)
    }

    handleFieldChange(fieldKey, {target: {value}}) {
        this.setState({
            [fieldKey]: value
        });
    }


    handleSubmit() {
        const {pass, token} = this.state;
        this.props.onSetPassword(token, pass);
    }


    render() {
        const {pass, confPass, showErrorPage} = this.state;

        const {loginError, loginProcessing} = this.props;

        if (showErrorPage) {
            return (
                <div className={styles.verifResultWrapper}>
                    <div className={styles.resultSVG}></div>
                    <div className={styles.resultTextWrapper}>
                        <div className={styles.resultText}>
                            {loc('signUp-token-err-1')}
                        </div>
                        <div className={styles.resultText}>
                            {loc('signUp-token-err-2')}
                            <span>&nbsp;</span>
                            <span
                                className={styles.hereText}
                                onClick={this.handleGoTo('/forgot')}>
                                {loc('here')}
                            </span>
                        </div>
                    </div>
                    <div className={styles.goToTutorButton} onClick={this.goHome}>
                        <Button
                            text={loc('go-to-tutor')}
                            buttonClassProp={styles.buttonClassProp}
                        />
                    </div>
                </div>
            )
        }

        return (
            <Form

                fieldValues={this.state}
                onFieldChange={:: this.handleFieldChange}
                onSubmit={:: this.handleSubmit}
                className={styles.form}
                serverError={loginError}
                processing={loginProcessing}
                clientValidate={validatePasswordFields}
            >
                <FormFieldWrapper>
                    <div className={styles.formTitle}>
                        <div>{loc('enter-new-pass')}</div>
                    </div>
                </FormFieldWrapper>

                <FormTextField
                    withRightIcon
                    type={'password'}
                    fieldKey={'pass'}
                    label={loc('pass')}
                    placeholder={loc('pass')}
                    value={pass}
                />
                <FormTextField
                    withRightIcon
                    type={'password'}
                    fieldKey={'confPass'}
                    label={loc('confPass')}
                    placeholder={loc('confPass')}
                    value={confPass}
                />

                <div className={styles.actionButtonWrapper}>
                    <div className={styles.actionButton}>
                        <Button
                            type={'submit'}
                            text={loc('reset-password')}
                            buttonClassProp={styles.signUpButtonClassProp}
                        />
                    </div>
                </div>
            </Form>
        )
    }
}


