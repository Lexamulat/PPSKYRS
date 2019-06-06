import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ReactModal from 'react-modal';
import { Scrollbars } from 'react-custom-scrollbars';

import styles from './KpiDialogForm.scss';


export default class KpiDialogForm extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        shouldCloseOnOverlayClick: PropTypes.bool,
        title: PropTypes.any,
        containerClassName: PropTypes.any,
        dialogClassName: PropTypes.any,
        contentClassName: PropTypes.any,
        headerClassName: PropTypes.any,
        children: PropTypes.any,
        onClose: PropTypes.func,
        isLong: PropTypes.bool,
        withoutScrools: PropTypes.bool,
    };

    static defaultProps = {
        visible: true,
        shouldCloseOnOverlayClick: true
    };

    renderContent() {
        const {
            isLong,
            contentClassName,
            containerClassName,
            withoutScrolls,
            title,
            headerClassName,
            children,
            scrollBarConfig,
        } = this.props;

        const bodyClassName = classNames(containerClassName, styles.body);
        const wrapper = classNames(contentClassName, styles.contentWrapper, isLong && styles.long);
        const header = classNames(headerClassName, styles.header);


        if (withoutScrolls) {
            return (
                <div className={wrapper} >
                    <div className={styles.scrollInnerContainer}>
                        <header className={header}>
                            {title}
                        </header>
                        <section className={bodyClassName}>
                            {children}
                        </section>
                    </div>
                </div>
            )
        }
        return (
            <div className={wrapper} id='super'>
                <div className={styles.scrollInnerContainer}>
                    <header className={header}>
                        {title}
                    </header>

                    <section className={bodyClassName}>
                        <Scrollbars autoHeight autoHeightMax='90vh' {...scrollBarConfig}>
                            {children}
                        </Scrollbars>
                    </section>

                </div>
            </div>
        );
    }

    render() {
        const {
            visible,
            shouldCloseOnOverlayClick,
            dialogClassName,
            onClose,
        } = this.props;

        const className = classNames(dialogClassName, styles.dialog);
        return (
            <ReactModal
                isOpen={visible}
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={className}
                contentLabel=''
                shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
                onRequestClose={onClose}>
                {onClose && <div className={styles.closeButton}
                    onClick={onClose} />}
                {this.renderContent()}
            </ReactModal>
        );
    }
}
