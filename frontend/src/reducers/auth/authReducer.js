import dotProp from 'dot-prop-immutable';
import parseActionSubype from '../parseActionSubtype';
import { success, fail } from 'reducers/extendActionType';

import createReducerByMap from '../createReducerByMap';
import {
    GET_USER_ROLE,
    TEST,
    REGISTER,
    LOGIN,
    LOGOUT,
    RESEND_REGISTER_LINK,
    CHECK_CONFIRMATION_TOKEN,
    FORGOT_PASSWORD,
    CHECK_RESET_PASS_TOKEN,
    SET_PASSWORD,
    GET_LESSONS,
    CREATE_LESSON,
    DELETE_LESSON,
    GET_LESSON_BY_ID,
    EDIT_LESSON_BY_ID
} from './authActions';

import { requestHandler } from '../RequestReducerHelper';
import * as extendActionType from '../extendActionType';

const initialState = {
    authLoaded: false,
};

const reducerMap = {
    [GET_USER_ROLE]: setUserRole,
    [TEST]: requestHandler('test'),
    [REGISTER]: requestHandler('register'),
    [LOGIN]: login,
    [LOGOUT]: userLogout,
    [RESEND_REGISTER_LINK]: requestHandler('resendRegisterLink'),
    [CHECK_CONFIRMATION_TOKEN]: checkToken,
    [FORGOT_PASSWORD]: requestHandler('forgotPassword'),
    [CHECK_RESET_PASS_TOKEN]: requestHandler('checkResetPassToken'),
    [SET_PASSWORD]: setPassword,
    [GET_LESSONS]: requestHandler('getLessons'),
    [CREATE_LESSON]: requestHandler('createLesson'),
    [DELETE_LESSON]: requestHandler('deleteLesson'),
    [GET_LESSON_BY_ID]: requestHandler('getLessonById'),
    [EDIT_LESSON_BY_ID]: requestHandler('editLesson'),
};

export default createReducerByMap(initialState, reducerMap);


function login(state, action) {
    const nextState = requestHandler('login').exec(state, action);
    if (action.type !== extendActionType.success(LOGIN))
        return nextState;

    return {
        ...nextState,
        authLoaded: true,
        loadedFromToken: false
    };
}

function userLogout(state, action) {
    if (action.type === extendActionType.success(LOGOUT)) {
        return {
            ...state,
            login: null,
            logoutSuccess: true,
        };
    } else if (action.type === extendActionType.fail(LOGOUT)) {
        return {
            ...state,
            logoutError: true,
        };
    }
    return {
        ...state
    }
}

function setUserRole(state, action) {
    const nextState = requestHandler('userRole', { resultKey: 'login' }).exec(state, action);
    if (action.type === GET_USER_ROLE)
        return nextState;

    if (action.type === extendActionType.success(GET_USER_ROLE)) {
        return {
            ...nextState,
            authLoaded: true,
            loadedFromToken: true
        };
    } else {
        return {
            ...nextState,
            authLoaded: true,
        };
    }
}

function checkToken(state, action) {
    const nextState = requestHandler('login').exec(state, action);
    if (action.type !== extendActionType.success(LOGIN))
        return nextState;
    return {
        ...nextState,
        authLoaded: true,
        loadedFromToken: false
    };
}


function setPassword(state, action) {
    const nextState = requestHandler('login').exec(state, action);
    if (action.type !== extendActionType.success(LOGIN))
        return nextState;
    return {
        ...nextState,
        authLoaded: true,
        loadedFromToken: false
    };
}

