import { connect } from 'react-redux'

import CreateReportDialog from './CreateReportDialog';
import { push } from 'connected-react-router';

import { getAvaliableReports } from 'reducers/report/reportActions';


const mapStateToProps = (state) => {
    return {
        ...state.report
    };

};

const mapDispatchToProps = {
    onNavigate: push,
    onGetAvaliableReports: getAvaliableReports
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateReportDialog);