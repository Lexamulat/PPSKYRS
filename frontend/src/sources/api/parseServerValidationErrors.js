import _ from 'lodash';
import localizeServerError from './localizeServerError';

export default function parseValidationErrors(error) {
    if (!error)
        return {};

    const validationErrors = parseDetails(error);

    return {
        ...validationErrors
    };
}

function parseDetails(error) {
    return _.mapValues(error.details, ({kind}, fieldKey) => ({
        key: kind,
        label: localizeServerError(kind, fieldKey)
    }));
}
