import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DashboardDialogForm } from 'components/controls';

import {
    Button, Form, FormCheckbox,
    FormTextField, FormFieldWrapper, ErrorMessage, FormTextArea, LanguageDropDownList
} from 'components/controls';


import LangModDropDown from 'components/LangModDropDown/LangModDropDown';


import styles from './ShowResultDialog.scss';

export default class ShowResultDialog extends Component {
    static propTypes = {
        title: PropTypes.string,
        showFail: PropTypes.bool,
        withoutCancelButton: PropTypes.bool,
        withoutOkButton: PropTypes.bool,
        onClose: PropTypes.func,
        visible: PropTypes.bool,
        textClass: PropTypes.string,
        text: PropTypes.string
    };

    static defaultProps = {
        onClose: _.noop
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lessonType: '',
            year: '',
            location: '',
            description: ''
        };
    }

    componentWillMount() {
        console.log('will')
    }

    handleFieldChange(fieldKey, { target: { value } }) {
        this.setState({
            [fieldKey]: value
        });
    }



    handleSubmit() {
        const { email, pass, rememberMe } = this.state;
        this.props.onLogin(email, pass, rememberMe);
    }


    handleChangeOneOfDropDown(field, e) {

        let newState = Object.assign({}, this.state);


        if (field === 'day' || field === 'month' || field === 'year') {
            newState = calcDateState(field, e.target.value, newState);
        } else {
            newState[field] = e.target.value;
        }

        newState.percentage = calcPercentage(newState, NUM_OF_CALCED_STATE_FIELDS, EXCLUDE);

        this.setState({
            ...newState
        });

    }




    render() {
        const {
            text,
            title,
            visible,
            textClass,
            data
        } = this.props;

        const { name, lessonType, year, location, description } = this.state;

        const titleText = title || '';
        const textClassName = classNames(styles.text, textClass);

        console.log('LOC', loc('lessonType'))

        return (
            <DashboardDialogForm onClose={this.handleAction}
                visible={visible}
                headerClassName={styles.header}
                dialogClassName={styles.confirmationDialog}
                title={titleText}>

                <Form
                    fieldValues={this.state}
                    onFieldChange={this.handleFieldChange.bind(this)}
                    onSubmit={this.handleSubmit.bind(this)}
                    className={styles.text}
                    serverError={{}}
                    processing={false}
                    clientValidate={() => { }}
                >
                    {/* <FormFieldWrapper>
                        <div className={styles.formTitle}>
                            <div>{loc('welcome-back')}</div>
                        </div>
                    </FormFieldWrapper> */}

                    <FormTextField
                        fieldKey={'name'}
                        type={'name'}
                        label={loc('name')}
                        placeholder={loc('name')}
                        value={name}
                    />

                    <LanguageDropDownList
                        searchable
                        canBeNotSelected
                        label={loc('lesson-type')}
                        fieldKey={'lessonType'}
                        placeholder={loc('lesson-type')}
                        value={lessonType}
                        className={styles.dropDownList}
                        labelClassName={styles.labelClassName}
                        onChange={this.handleChangeOneOfDropDown.bind(this, 'lessonType')}
                    />

                    <FormTextField
                        withRightIcon
                        showPassPrompt
                        type={'year'}
                        fieldKey={'year'}
                        label={loc('year')}
                        placeholder={loc('year')}
                        value={year}
                    />
                    <FormTextArea
                        fieldKey={'location'}
                        label={loc('location')}
                        placeholder={loc('location')}
                        withShadow={false}
                        className={styles.areaClassName}
                        labelClassName={styles.labelClassName}

                        value={location}
                        initialHeight={50}
                    />

                    <FormTextArea
                        fieldKey={'description'}
                        label={loc('description')}
                        placeholder={loc('description')}
                        withShadow={false}
                        className={styles.descriptionClassName}
                        labelClassName={styles.labelClassName}

                        value={description}
                        initialHeight={150}
                    />

                    <div className={styles.create}>
                        <span className={styles.createBtn}>Create</span>
                    </div>



                </Form>
            </DashboardDialogForm >
        );
    }


    handleAction = () => {
        this.props.onAction();
        this.props.onClose();
    };
}
