import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import { DashboardDialogForm } from 'components/controls';

import styles from './ReportDialog.scss';


export default class ReportDialog extends Component {
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

    render() {
        const {
            title,
            visible,
            textClass,
            incomeReport,
            shouldCloseOnOverlayClick,
        } = this.props;

        const titleText = title || '';
        const textClassName = classNames(styles.text, textClass);

        return (
            <DashboardDialogForm
                onClose={this.handleAction}
                shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
                visible={visible}
                headerClassName={styles.header}
                dialogClassName={styles.confirmationDialog}
                title={titleText}>
                <div className={styles.reportWrapper}>
                    {incomeReport}
                </div>
            </DashboardDialogForm>
        );
    }


    handleAction = (e) => {
        this.props.onClose(e);
    };
}
