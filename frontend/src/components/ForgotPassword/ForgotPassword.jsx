import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {
    Button, Spinner,
    ErrorMessage,
    Form, FormFieldWrapper, FormCheckbox,
    FormTextField,
} from 'components/controls';

import validateForgotFields from './validateForgotFields';

import filterEmail from '../../helpers/filterEmail';


import styles from './ForgotPassword.scss';


const SIGN_IN_PATH = '/login';
const SIGN_UP_PATH = '/signup';


export default class ForgotPassword extends React.Component {

    static propTypes = {

        onNavigate: PropTypes.func.isRequired,

        onForgotPassword: PropTypes.func.isRequired,


        forgotPassword: PropTypes.object,
        forgotPasswordError: PropTypes.object,
        forgotPasswordProcessing: PropTypes.bool,


    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',

            showSentSuccesPage: false
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!this.props.forgotPassword && nextProps.forgotPassword) {
            this.setState({
                showSentSuccesPage: true
            })
        }
        if (!this.props.forgotPasswordError && nextProps.forgotPasswordError) {
            this.writeErrorToState(nextProps.forgotPasswordError)
        }
    }

    writeErrorToState = (error) => {
        this.setState({serverError: error})

    }

    clearStateError = () => {
        this.setState({serverError: false})
    }

    handleFieldChange(fieldKey, {target: {value}}) {
        this.setState({
            [fieldKey]: value
        });
    }


    handleSubmit() {
        const {email} = this.state;
        this.props.onForgotPassword(email);
    }


    handleGoTo = (path) => () => {
        this.props.onNavigate(path)
    }


    renderSentSuccesPage = () => {

        const {email} = this.state;

        return (
            <div className={styles.form}>
                <div className={styles.formTitle}>
                    <div>{loc('forgot')}</div>
                </div>
                <div className={styles.resultSVG}></div>
                <div className={styles.resultTextWrapper}>
                    <div className={styles.textSmall}>
                        {loc('reset-pass-email-1')}
                    </div>
                    <div className={styles.textSmall}>
                        <span>{loc('reset-pass-email-2')}</span>
                        <span className={styles.boldEmail}>{filterEmail(email)}</span>
                    </div>
                </div>

            </div>
        )

    }

    render() {
        const {email, showSentSuccesPage, serverError} = this.state;

        const {forgotPasswordError, forgotPasswordProcessing} = this.props;

        if (showSentSuccesPage) {
            return (
                <Fragment>
                    {this.renderSentSuccesPage()}
                </Fragment>
            )
        }

        return (
            <Form
                fieldValues={this.state}
                onFieldChange={::this.handleFieldChange}
                onSubmit={::this.handleSubmit}
                className={styles.form}
                serverError={forgotPasswordError}
                processing={forgotPasswordProcessing}
                clientValidate={validateForgotFields}
            >
                <FormFieldWrapper>
                    <div className={styles.formTitle}>
                        <div>{loc('forgot')}</div>
                    </div>
                </FormFieldWrapper>

                <div className={styles.forgotNoteWrapper}>
                    <div className={styles.forgotNoteLine}>
                        {loc('forgote-note-line1')}
                    </div>
                    <div className={styles.forgotNoteLine}>
                        {loc('forgote-note-line2')}
                    </div>

                </div>

                <FormTextField
                    type={'email'}
                    fieldKey={'email'}
                    label={loc('email')}
                    placeholder={loc('email')}
                    withShadow={false}
                    value={email}
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

                <div className={styles.checkBoxLine}>
                    <div className={styles.rememberMeWrapper}>
                        <div
                            className={styles.hoverClass}
                            onClick={this.handleGoTo(SIGN_UP_PATH)}
                        >{loc('create-new-account')}</div>
                    </div>
                    <div className={styles.rememberMeWrapper}>
                        <div
                            className={styles.hoverClass}
                            onClick={this.handleGoTo(SIGN_IN_PATH)}
                        >{loc('sign-in')}</div>
                    </div>
                </div>


                {serverError && <ErrorMessage type='commonErrors'
                                              className={styles.errorMessage}
                                              closeErrorAction={this.clearStateError}
                >
                </ErrorMessage>}
            </Form>
        )
    }
}


