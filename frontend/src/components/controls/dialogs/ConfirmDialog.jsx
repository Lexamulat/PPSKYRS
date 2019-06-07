import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import { Button, DashboardDialogForm } from 'components/controls';


import styles from './ConfirmDialog.scss';

export default class ConfirmDialog extends Component {
    static propTypes = {
        title: PropTypes.string,
        onOk: PropTypes.func,
        withoutCancelButton: PropTypes.bool,
        withoutOkButton: PropTypes.bool,
        shouldCloseOnOverlayClick: PropTypes.bool,
        onCancel: PropTypes.func,
        onClose: PropTypes.func,
        visible: PropTypes.bool,
        headerClass: PropTypes.string,
        buttonOkLabel: PropTypes.string,
        buttonCancelLabel: PropTypes.string,
        okButtonType: PropTypes.string,
        textClass: PropTypes.string,
        text: PropTypes.string,

    };

    static defaultProps = {
        okButtonType: 'danger',
        onCancel: _.noop,
        onClose: _.noop
    };

    render() {
        const {
            text,
            title,
            visible,
            okButtonType,
            withoutCancelButton,
            withoutOkButton,
            textClass,
            headerClass,
            shouldCloseOnOverlayClick
        } = this.props;

        const okLabel = this.props.buttonOkLabel || 'OK';
        const cancelLabel = this.props.buttonCancelLabel || 'Cancel';
        const textClassName = classNames(styles.text, textClass);
        const headerClassName = classNames(styles.header, headerClass);

        return (
            <DashboardDialogForm onClose={this.handleCancel}
                visible={visible}
                shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
                headerClassName={headerClassName}
                title={title}>

                <div className={textClassName}>
                    {text}
                </div>

                <div className={styles.buttonsPanel}>
                    {!withoutOkButton &&
                        <div className={styles.btnWrap}>
                            < Button label={okLabel}
                                type={okButtonType}
                                text={'OK'}
                                buttonClassProp={styles.buttonOk}
                                color={'blue'}
                                onClick={this.handleOK} />
                        </div>

                    }
                    {!withoutCancelButton &&
                        <div className={styles.btnWrap}>
                            <Button label={cancelLabel}
                                type='cancel'
                                color={'grey'}
                                text={'Cancel'}
                                buttonClassProp={styles.buttonCancel}
                                onClick={this.handleCancel} />
                        </div>

                    }
                </div>
            </DashboardDialogForm>
        );
    }

    handleCancel = () => {
        this.props.onCancel();
        this.props.onClose();
    };

    handleOK = () => {
        this.props.onOk();
        this.props.onClose();
    };
}
