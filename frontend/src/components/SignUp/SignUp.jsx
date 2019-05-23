import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import {
    Button, Spinner,
    Form, FormFieldWrapper,
    FormTextField, ErrorMessage
} from 'components/controls';

import validateSignUpFields from './validateSignUpFields';

import filterEmail from '../../helpers/filterEmail';

import styles from './SignUp.scss';


const LOGIN_PATH = '/login';
const HOME_PATH = '/';


export default class SignUp extends React.Component {

    static propTypes = {

        onNavigate: PropTypes.func.isRequired,

        onRegister: PropTypes.func.isRequired,

        register: PropTypes.object,
        registerError: PropTypes.object,
        registerProcessing: PropTypes.bool,

        onResendRegisterLink: PropTypes.func.isRequired,

        resendRegisterLink: PropTypes.object,
        resendRegisterLinkError: PropTypes.object,
        resendRegisterLinkProcessing: PropTypes.bool,


        onCheckConfirmationToken: PropTypes.func.isRequired,

        login: PropTypes.object,
        loginError: PropTypes.object,
        loginProcessing: PropTypes.bool,

    };

    constructor(props) {
        super(props);
        this.state = {

            showThanksPage: false,
            showResultPage: false,
            showResultErrorPage: false,


            fName: '',
            lName: '',
            email: '',
            pass: '',
            confPass: '',


            serverError: false

        };

        if (this.isCallFromConfirmLink()) {

            const {search} = window.location;
            const query = queryString.parse(search);
            if (query && query.token) {
                this.token = query.token;
                this.props.onCheckConfirmationToken(this.token);
            }
        }
    }

    isCallFromConfirmLink() {
        const {pathname} = (function () {
            try {
                return window.top.location;
            } catch (e) {
                return window.location;
            }
        })();
        return ~pathname.indexOf('confirm')
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!this.props.register && nextProps.register) {
            this.goToThanksPage()
        }
        if (nextProps.checkConfirmTokenError) {
            this.goHome();
        }
        if (!this.props.checkConfirmationToken && nextContext.checkConfirmationToken) {
            this.setState({showResultPage: true})
        }

        if (!this.props.registerError && nextProps.registerError) {
            this.writeErrorToState(nextProps.registerError)
        }

        if (!this.props.login && nextProps.login) {
            this.setState({showResultPage: true})
        }
        if (!this.props.loginError && nextProps.loginError) {
            this.setState({showResultErrorPage: true})

        }
    }

    writeErrorToState = (error) => {
        this.setState({serverError: error})

    }

    goToThanksPage() {
        this.setState({showThanksPage: true})
    }

    handleGoTo = (path) => () => {
        this.props.onNavigate(path)
    }


    goHome = () => {
        this.props.onNavigate('/')
    }

    clearStateError = () => {
        this.setState({serverError: false})
    }

    resendEmail = () => {
        const {email} = this.state;
        this.props.onResendRegisterLink(email);

    }

    handleFieldChange(fieldKey, {target: {value}}) {
        this.setState({
            [fieldKey]: value
        });
    }

    handleSubmit() {
        const {fName, email, pass} = this.state;
        this.props.onRegister(fName, email, pass);
    }

    renderContent = () => {
        const {
            fName, lName, email, pass, confPass, showThanksPage,
            showResultPage, showResultErrorPage, serverError
        } = this.state;


        const {
            resendRegisterLinkProcessing, registerProcessing, registerError,
            checkConfirmationTokenProcessing
        } = this.props;


        if (showResultErrorPage) {
            return (
                <div className={styles.verifResultWrapper}>
                    <div className={styles.resultSVG}></div>
                    <div className={styles.resultTextWrapper}>
                        <div className={styles.resultText}>
                            {loc('signUp-token-err')}
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

        if (showResultPage) {
            return (
                <div className={styles.verifResultWrapper}>
                    <div className={styles.resultSVG}></div>
                    <div className={styles.resultTextWrapper}>
                        <div className={styles.resultText}>
                            {loc('sign-res-1')}
                        </div>
                        <div className={styles.resultText}>
                            {loc('sign-res-2')}
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

        if (showThanksPage) {
            const {email} = this.state;
            return (
                <div className={styles.form}>
                    <div className={styles.topContent}>
                        <div className={styles.thanks}></div>
                    </div>
                    <div className={styles.botContent}>
                        <div className={styles.thanksText}>{loc('thank-you-for-sign')}</div>
                        <div className={styles.thanksTextSmall}>
                            <span>{loc('thanks-text-1')}</span>
                            <span className={styles.boldEmail}>{filterEmail(email)}</span>
                        </div>
                        <div className={styles.thanksTextSmall}>
                            {loc('thanks-text-2')}
                        </div>

                        <div className={styles.thanksTextSmall}>
                            {loc('thanks-text-3')}
                        </div>

                        <div className={styles.didntGetEmail}>
                            {loc('didnt-get-email')}
                        </div>

                        <div className={styles.resendEmailButton} onClick={this.resendEmail}>
                            <Button
                                text={loc('resend-email')}
                                buttonClassProp={styles.buttonClassProp}
                            />
                        </div>
                    </div>

                </div>
            )
        }
        return (
            <Form
                fieldValues={this.state}
                onFieldChange={::this.handleFieldChange}
                onSubmit={::this.handleSubmit}
                className={styles.form}
                serverError={registerError}
                processing={registerProcessing}
                clientValidate={validateSignUpFields}
            >
                <FormFieldWrapper>
                    <div className={styles.formTitle}>
                        <div>{loc('sign-up')}</div>
                    </div>
                </FormFieldWrapper>

                <FormTextField
                    fieldKey={'fName'}
                    label={loc('fName')}
                    placeholder={loc('fName')}
                    withShadow={false}
                    value={fName}
                />
                <FormTextField
                    fieldKey={'lName'}
                    label={loc('lName')}
                    placeholder={loc('lName')}
                    withShadow={false}
                    value={lName}
                />
                <FormTextField
                    type={'email'}
                    fieldKey={'email'}
                    label={loc('email')}
                    placeholder={loc('email')}
                    withShadow={false}
                    value={email}
                />
                <FormTextField
                    withRightIcon
                    showPassPrompt
                    type={'password'}
                    fieldKey={'pass'}
                    label={loc('pass')}
                    placeholder={loc('pass')}
                    withShadow={false}
                    value={pass}
                />
                <FormTextField
                    withRightIcon
                    type={'password'}
                    fieldKey={'confPass'}
                    label={loc('confPass')}
                    placeholder={loc('confPass')}
                    withShadow={false}
                    value={confPass}
                />

                <div className={styles.signUpButtonWrapper}>
                    <div className={styles.signUpButton}>
                        <Button
                            type={'submit'}
                            text={loc('sign-up')}
                            buttonClassProp={styles.signUpButtonClassProp}
                        />
                    </div>
                </div>

                <FormFieldWrapper
                    className={styles.alreadyHaveWrapper}>
                    <div className={styles.alreadyHaveAccount} onClick={this.handleGoTo(LOGIN_PATH)}>
                        {loc('already-have-account')}
                    </div>
                </FormFieldWrapper>

                {serverError && <ErrorMessage type='commonErrors'
                                              className={styles.errorMessage}
                                              closeErrorAction={this.clearStateError}
                >
                </ErrorMessage>}

            </Form>
        )
    }


    render() {
        return (
            <Fragment>
                {this.renderContent()}
            </Fragment>

        )
    }
}


