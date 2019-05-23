import * as extendActionType from 'reducers/extendActionType.js';
import {
    LOGIN,
    CHECK_CONFIRMATION_TOKEN,
    LOGOUT,
    GET_USER_ROLE,
    SET_PASSWORD,
} from 'reducers/auth/authActions';


const saveAccessTokenActionTypes = [
    extendActionType.success(LOGIN),
    extendActionType.success(CHECK_CONFIRMATION_TOKEN),
    extendActionType.success(SET_PASSWORD),

];

const removeAccessTokenActionTypes = [
    extendActionType.success(LOGOUT),
    extendActionType.fail(GET_USER_ROLE)
];


export default function authMiddleware({dispatch, getState}) {
    return next => action => {
        if (typeof action === 'function')
            return action(dispatch, getState);

        const {type, result} = action;
        if (needSaveAccessToken(type)) {
            saveAccessToken(result.accessToken);
        }

        if (needRemoveAccessToken(type)) {
            removeAccessToken();
        }

        // if (action && action.type === LOGOUT_BY_SERVER)
        //     window.location = '/';

        next(action);
    };
};

function needSaveAccessToken(type) {
    return saveAccessTokenActionTypes.includes(type);
}

function saveAccessToken(accessToken) {
    localStorage.setItem('token', accessToken);
    localStorage.removeItem('customerUuid');
}

function needRemoveAccessToken(type) {
    return removeAccessTokenActionTypes.includes(type);
}

function removeAccessToken() {
    localStorage.removeItem('token');
}
