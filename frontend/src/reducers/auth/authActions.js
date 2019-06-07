export const TEST = 'auth/TEST';
export const LOGIN = 'auth/LOGIN';
export const LOGOUT = 'auth/LOGOUT';

export const REGISTER = 'auth/REGISTER';
export const GET_USER_ROLE = 'auth/GET_USER_ROLE';

export const RESEND_REGISTER_LINK = 'auth/RESEND_REGISTER_LINK';
export const CHECK_CONFIRMATION_TOKEN = 'auth/CHECK_CONFIRMATION_TOKEN';


export const FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD';


export const CHECK_RESET_PASS_TOKEN = 'auth/CHECK_RESET_PASS_TOKEN';

export const SET_PASSWORD = 'auth/SET_PASSWORD';


export const GET_LESSONS = 'auth/GET_LESSONS';


export function getUserRole() {
    return {
        type: GET_USER_ROLE,
        httpRequest: {
            method: 'get',
            path: '/baseUser/getUserRole',
        },
    };
}

export function register(name, email, password) {
    return {
        type: REGISTER,
        httpRequest: {
            method: 'post',
            path: '/baseUser/register',
            data: { name, email, password }
        }
    };
}

export function resendRegisterLink(email) {
    return {
        type: REGISTER,
        httpRequest: {
            method: 'post',
            path: '/baseUser/resendRegisterLink',
            data: { email }
        }
    };
}

export function checkConfirmationToken(confirmationToken) {
    return {
        type: CHECK_CONFIRMATION_TOKEN,
        httpRequest: {
            method: 'post',
            path: '/baseUser/checkConfirmationToken',
            data: { confirmationToken }
        }
    };
}

export function login(email, password, rememberMe) {
    return {
        type: LOGIN,
        httpRequest: {
            method: 'post',
            path: '/baseUser/customLogin',
            data: { email, password, rememberMe }
        }
    };
}

export function logout() {
    return {
        type: LOGOUT,
        httpRequest: {
            method: 'post',
            path: '/baseUser/customLogOut',
        }
    };
}

export function test() {
    return {
        type: TEST,

        httpRequest: {
            method: 'post',
            path: '/baseUser/test',
        }
    };
}


export function forgotPassword(email) {
    return {
        type: FORGOT_PASSWORD,
        httpRequest: {
            method: 'post',
            path: '/baseUser/forgotPassword',
            data: { email }
        }
    };
}

export function setPassword(confirmationToken, newPassword) {
    return {
        type: SET_PASSWORD,
        httpRequest: {
            method: 'post',
            path: '/baseUser/resetPassword',
            data: { confirmationToken, newPassword }
        }
    };
}

export function checkResetPasswordToken(confirmationToken) {
    return {
        type: CHECK_RESET_PASS_TOKEN,
        httpRequest: {
            method: 'post',
            path: '/baseUser/checkResetPassToken',
            data: { confirmationToken }
        }
    };
}


export function getLessons() {
    return {
        type: GET_LESSONS,
        httpRequest: {
            method: 'get',
            path: '/lesson/getLessons',
        }
    };
}

export function createLesson(name, lessonType, year, location, description) {
    return {
        type: GET_LESSONS,
        httpRequest: {
            method: 'post',
            path: '/lesson/createLesson',
            data: { name, lessonType, year, location, description }
        }
    };
}

