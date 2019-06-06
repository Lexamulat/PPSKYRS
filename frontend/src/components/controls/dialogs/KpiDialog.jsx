import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { KpiSVG } from 'components/SVG';
import getRGBColor from 'components/helpers/getRGBColor';
import { CodeEditorItem } from 'components/pageBlocks';
import { KpiDialogForm } from 'components/controls';

import styles from './KpiDialog.scss';

export default class KpiDialog extends Component {
    static propTypes = {
        title: PropTypes.string,
        onClose: PropTypes.func,
        visible: PropTypes.bool,
        text: PropTypes.string
    };

    static defaultProps = {
        onClose: _.noop
    };

    writeInfoToState(singleItemInfo) {
        const { interval, name, description, protocol, code } = singleItemInfo;
        this.setState({ interval, name, description, protocol, code })
    };

    onEditorClick(e) {
        e.stopPropagation();

    }

    render() {
        const {
            singleItemData,
            onClose,
            title,
            visible,
        } = this.props;

        const titleText = title || '';
        let name, description, interval, protocol, code;

        if (singleItemData) {
            code = singleItemData.code;
            interval = singleItemData.interval / 1000000000;
            name = singleItemData.name;
            description = singleItemData.description;
            protocol = singleItemData.protocol;
        }

        return (
            <KpiDialogForm onClose={this.handleAction}
                visible={visible}
                headerClassName={styles.header}
                dialogClassName={styles.confirmationDialog}
                title={titleText}
                onClose={onClose}
            >


                <div className={styles.dialogWrapper}>

                    <section className={styles.mainInfoBlock}>

                        <div className={styles.topBlock}>
                            <div className={styles.titleBlock}>
                                <KpiSVG
                                    fillColor={getRGBColor('WHITE')}
                                />
                                <div>
                                    {name}
                                </div>
                            </div>

                        </div>
                        <div className={styles.bottomBlock}>
                            <div className={styles.textBlockBottom}>
                                <div>{'Protocol: ' + protocol}</div>
                                <div className={styles.textBlockBottom}>

                                    <div>{'Interval: ' + interval + 's'}</div>
                                </div>
                            </div>
                        </div>


                    </section>

                    <section className={styles.mainContentBlock}>
                        <div className={styles.codeBlock} onClick={this.onEditorClick}>
                            <CodeEditorItem
                                value={code}
                            />
                        </div>
                    </section>
                </div>


            </KpiDialogForm>
        );
    }


    handleAction = () => {
        this.props.onClose();
    };
}
