import React from 'react';
import PropTypes from 'prop-types';

import {
    Button, Form, FormCheckbox,
    FormTextField, FormFieldWrapper, ErrorMessage
} from 'components/controls';

import validateSignInFields from './validateSignInFields';


import styles from './SignIn.scss';


export default class SignIn extends React.Component {

    static propTypes = {

        onNavigate: PropTypes.func.isRequired,

        onLogin: PropTypes.func.isRequired,

        login: PropTypes.object,
        loginError: PropTypes.object,
        loginProcessing: PropTypes.bool,


    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            rememberMe: false,

            serverError: false
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!this.props.login && nextProps.login) {
            this.props.onNavigate('/')
        }
        if (!this.props.loginError && nextProps.loginError) {
            this.writeErrorToState(nextProps.loginError)
        }
    }

    handleFieldChange(fieldKey, {target: {value}}) {
        this.setState({
            [fieldKey]: value
        });
    }

    writeErrorToState = (error) => {
        this.setState({serverError: error})

    }

    clearStateError = () => {
        this.setState({serverError: false})
    }


    handleSubmit() {
        const {email, pass, rememberMe} = this.state;
        this.props.onLogin(email, pass, rememberMe);
    }


    handleGoTo = (path) => () => {
        this.props.onNavigate(path)
    }


    toggleRememberMe = () => {
        this.setState((prev) => {
            return {rememberMe: !prev.rememberMe}
        });
    }


    render() {

        const {email, pass, rememberMe, serverError} = this.state;

        const {loginError, loginProcessing} = this.props;

        return (
            <Form
                fieldValues={this.state}
                onFieldChange={::this.handleFieldChange}
                onSubmit={::this.handleSubmit}
                className={styles.form}
                serverError={serverError ? serverError : {}}
                processing={loginProcessing}
                clientValidate={validateSignInFields}
            >
                <FormFieldWrapper>
                    <div className={styles.formTitle}>
                        <div>{loc('welcome-back')}</div>
                    </div>
                </FormFieldWrapper>

                <FormTextField
                    fieldKey={'email'}
                    type={'email'}
                    label={loc('email')}
                    placeholder={loc('email')}
                    value={email}
                />

                <FormTextField
                    withRightIcon
                    showPassPrompt
                    type={'password'}
                    fieldKey={'pass'}
                    label={loc('pass')}
                    placeholder={loc('pass')}
                    value={pass}
                />

                <div className={styles.checkBoxLine}>
                    <FormCheckbox
                        fieldKey={'any'}
                        onChange={this.toggleRememberMe}
                        className={styles.checkBox}
                        checkboxLabel={loc('remember')}
                        checked={rememberMe}
                    />
                    <div className={styles.rememberMeWrapper}>
                        <div
                            className={styles.hoverClass}
                            onClick={this.handleGoTo('/forgot')}
                        >{loc('forgot')}</div>
                    </div>
                </div>

                <div className={styles.signUpButtonWrapper}
                >
                    <div className={styles.signUpButton}>
                        <Button
                            type={'submit'}
                            text={loc('sign-in')}
                            buttonClassProp={styles.signUpButtonClassProp}
                        />
                    </div>
                </div>

                <div className={styles.createAccountWrapper}>
                    <div className={styles.createAccount} onClick={this.handleGoTo('/signup')}>
                        {loc('create-new-account')}
                    </div>
                </div>

                {serverError && <ErrorMessage
                    type='commonErrors'
                    closeErrorAction={this.clearStateError}
                >
                    {serverError && loc('credentials-mismatch')}
                </ErrorMessage>
                }
            </Form>
        )
    }
}


