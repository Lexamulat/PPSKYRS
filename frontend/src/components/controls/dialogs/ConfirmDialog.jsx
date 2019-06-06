import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import { DashboardDialogForm } from 'components/controls';


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
                    {!withoutOkButton && < button label={okLabel}
                        type={okButtonType}
                        className={styles.button}
                        color={COLORS.BLUE}
                        onClick={this.handleOK} />
                    }
                    {!withoutCancelButton && <button label={cancelLabel}
                        type='cancel'
                        color={COLORS.GREY}
                        className={styles.button}
                        onClick={this.handleCancel} />
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
