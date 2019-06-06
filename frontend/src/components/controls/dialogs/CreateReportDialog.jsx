import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';


import { DashboardDialogForm } from 'components/controls';

import ReportsPageContainer from 'components/ReportsPage/ReportsPageContainer';

import styles from './CreateReportDialog.scss';

const MAX_SCROLLDOWN_HEIGHT = 400;

const HIDE_ALERT_DELAY = 4000;

const UNIX_DATE = '1556728377';

const FAKE = [
    {
        id: '1',
        name: 'name1',
        owner: 'Owner1',

    },
    {
        id: '2',
        name: 'name2',
        owner: 'Owner2',

    },
    {
        id: '3',
        name: 'name3',
        owner: 'Owner3',

    },
    {
        id: '3',
        name: 'name3',
        owner: 'Owner3',

    }, {
        id: '3',
        name: 'name3',
        owner: 'Owner3',

    }, {
        id: '3',
        name: 'name3',
        owner: 'Owner3',

    }, {
        id: '3',
        name: 'name3',
        owner: 'Owner3',

    }, {
        id: '3',
        name: 'name3',
        owner: 'Owner3',

    }, {
        id: '3',
        name: 'name3',
        owner: 'Owner3',

    },
]


export default class CreateReportDialog extends Component {
    static propTypes = {
        title: PropTypes.string,
        showFail: PropTypes.bool,
        withoutCancelButton: PropTypes.bool,
        withoutOkButton: PropTypes.bool,
        onClose: PropTypes.func,
        visible: PropTypes.bool,
        textClass: PropTypes.string,
        text: PropTypes.string,
        onNavigate: PropTypes.func,

        inventoryItemType: PropTypes.string,


        onGetAvaliableReports: PropTypes.func.isRequired,

        getAvaliableReports: PropTypes.any,
        getAvaliableReportsError: PropTypes.object,
        getAvaliableReportsProcessing: PropTypes.bool,
    };

    static defaultProps = {
        onClose: _.noop
    };

    constructor(props) {
        super(props);
        this.state = {
            isCreateAlertVisible: false,
            choosenReportId: null,
            avaliableReportsMas: []
        };
    }
    componentWillMount() {
        const { inventoryItemType } = this.props;
        this.props.onGetAvaliableReports(inventoryItemType);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.inventoryItemType != nextProps.inventoryItemType) {
            this.props.onGetAvaliableReports(nextProps.inventoryItemType);
        }
        if (!this.props.getAvaliableReports && nextProps.getAvaliableReports) {
            this.writeInfoToState(nextProps.getAvaliableReports)
        }
    }

    writeInfoToState(info) {
        this.setState({ avaliableReportsMas: info })
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    chooseBasicReport = (i) => () => {

        const { choosenReportId } = this.state;
        if (choosenReportId == i) {
            this.setState({ choosenReportId: null });

        } else {
            this.setState({ choosenReportId: i });
            clearTimeout(this.timer);
            this.setState({ isCreateAlertVisible: false });
        }
    }

    handleCreate = () => {
        const { choosenReportId } = this.state;

        clearTimeout(this.timer);

        if (choosenReportId === null) {
            this.setState({ isCreateAlertVisible: true });
            this.timer = setTimeout(() => {
                this.setState({ isCreateAlertVisible: false });
            }, HIDE_ALERT_DELAY)
        } else {
            this.props.onNavigate('/create')
        }
    }

    render() {
        const {
            text,
            title,
            visible,
            textClass,
            data
        } = this.props;

        const { isCreateAlertVisible, choosenReportId, avaliableReportsMas } = this.state;

        const { getAvaliableReportsProcessing } = this.props;


        const topLineClass = classNames(styles.titleLine, styles.topLine);

        return (
            <DashboardDialogForm onClose={this.handleAction}
                withoutScrolls
                visible={visible}
                headerClassName={styles.header}
                dialogClassName={styles.confirmationDialog}
                title={loc('avaliable-reports')} >
                {/* {
                    avaliableReportsMas.length == 0 ?
                        <div className={styles.empty}>Empty</div>
                        :
                        <Fragment>
                            <div className={topLineClass}>
                                <div className={styles.titleLineItem}>{loc('Name')}</div>
                                <div className={styles.titleLineItem}>{loc('Owner')}</div>
                                <div className={styles.titleLineItem}>{loc('date-created')}</div>
                            </div>
                            <div className={styles.scrollWrapper}>
                                <Scrollbars autoHide
                                    autoHeight
                                    autoHeightMax={MAX_SCROLLDOWN_HEIGHT}
                                >
                                    {
                                        avaliableReportsMas.map((el, i) => {

                                            const titleLineClass = classNames(styles.titleLine, styles.scrollLine, {
                                                [styles.choosenLine]: i == choosenReportId
                                            })
                                            return (
                                                <div key={'avaliableReports' + i} className={titleLineClass}
                                                    onClick={this.chooseBasicReport(i)}
                                                >
                                                    <div className={styles.titleLineItem}>{el.name}</div>
                                                    <div className={styles.titleLineItem}>{el.owner}</div>
                                                    <div className={styles.titleLineItem}>{moment.unix(UNIX_DATE).format('YYYY-MM-DD')}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </Scrollbars>
                            </div>
                            <div className={styles.bottomLine} onClick={this.handleCreate}>
                                {isCreateAlertVisible && <div className={styles.alert}><span>{loc('create-alert')}</span> </div>}
                                <div className={styles.createBtnWrapper}>
                                    <span>{loc('select')}</span>
                                </div>
                            </div>
                        </Fragment>
                } */}
                <ReportsPageContainer 
                reportsPageWrapperClassProp={styles.reportsPageWrapperClassProp}
                />
            </DashboardDialogForm>
        );
    }


    handleAction = () => {

        clearTimeout(this.timer);

        this.props.onAction();
        this.props.onClose();
    };
}
