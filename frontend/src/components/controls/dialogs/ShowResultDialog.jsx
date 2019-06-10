import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DashboardDialogForm } from 'components/controls';

import {
    Form,
    FormTextField, ConfirmDialog, FormTextArea, LanguageDropDownList
} from 'components/controls';


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
            description: '',
            isErrorShown: false,
            isConfirmDialogVisible: false
        };
    }

    componentWillMount() {
        const { name, lessonType, year, location, description } = this.props;
        if (name) {
            this.setState({ name, lessonType, year, location, description })
        }
    }

    handleFieldChange(fieldKey, { target: { value } }) {
        this.setState({
            [fieldKey]: value,
            isErrorShown: false
        });
    }


    handleChangeOneOfDropDown(field, e) {

        let newState = Object.assign({}, this.state);

        newState.isErrorShown = false
        newState[field] = e.target.value;


        this.setState({
            ...newState
        });

    }

    handleSubmit = () => {
        const { name, lessonType, year, location, description } = this.state;


        if (this.isNeedToShowError(name, lessonType, year, location, description)) {
            this.setState({ isErrorShown: true })
        } else {
            this.props.submitAction(name, lessonType, year, location, description);
            this.toggleConfirmDialog();
        }
    }

    isNeedToShowError(name, lessonType, year, location, description) {
        let boolVal = false;

        Object.keys(arguments).forEach(el => {
            if (arguments[el] == '') {
                boolVal = true
            }
        });
        return boolVal
    }

    toggleConfirmDialog = () => {
        const { isConfirmDialogVisible } = this.state;
        this.setState({ isConfirmDialogVisible: !isConfirmDialogVisible })
    }

    okConfirmDialog = () => {
        this.toggleConfirmDialog();
        this.props.toggleCreateAction();
    }

    renderConfirmDialog = () => {
        const { name } = this.props
        const { isConfirmDialogVisible } = this.state;
        if (!isConfirmDialogVisible || name) return

        return (
            <ConfirmDialog
                withoutCancelButton
                text={'Added succesfully'}
                onCancel={this.toggleConfirmDialog}
                onClose={this.toggleConfirmDialog}
                onOk={this.okConfirmDialog}

            />
        )
    }

    render() {
        const {
            text,
            title,
            visible,
            textClass,
            deleteDialog
        } = this.props;

        const { name, lessonType, year, location, description, isErrorShown } = this.state;

        const titleText = title || '';
        const textClassName = classNames(styles.text, textClass);


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
                        {isErrorShown &&
                            <span
                                className={styles.errText}
                            >
                                All fields are required
                            </span>
                        }
                        <span
                            className={styles.createBtn}
                            onClick={this.handleSubmit}
                        >
                            Create
                            </span>
                    </div>



                </Form>

                {this.renderConfirmDialog()}
            </DashboardDialogForm >
        );
    }


    handleAction = () => {
        this.props.onAction();
        this.props.onClose();
    };
}
