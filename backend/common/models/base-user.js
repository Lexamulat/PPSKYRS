'use strict';

const app = require('../../server/server');
const _ = require('lodash');
const CustomError = require('../../helpers/customError');
const getCurrentUserFromContext = require('../../helpers/getCurrentUserFromContext');
const sendEmail = require('../../helpers/sendEmail');

const addAuthCookie = require('../../helpers/addAuthCookie');
const delAuthCookie = require('../../helpers/delAuthCookie');

const uuidv4 = require('uuid/v4');
const { TEACHER, STUDENT } = require('../../server/datasources/constants/userRoles');


module.exports = function (BaseUser) {

  BaseUser.remoteMethod('getUserRole', {
    http: { path: '/getUserRole', verb: 'get' },
    accepts: [
      { arg: 'options', type: 'object', http: 'optionsFromRequest' }
    ],
    returns: [
      { arg: 'response', type: 'any', 'root': true },
    ],
  });
  BaseUser.getUserRole = getUserRole;

  BaseUser.remoteMethod('register', {
    http: { path: '/register', verb: 'post' },
    accepts: [
      { arg: 'name', type: 'string', required: true },
      { arg: 'email', type: 'string', required: true },
      { arg: 'password', type: 'string', required: true },
    ],

    returns: [
      { arg: 'response', type: 'any' },
    ],
  });
  BaseUser.register = register;

  BaseUser.remoteMethod('resendRegisterLink', {
    http: { path: '/resendRegisterLink', verb: 'post' },
    accepts: [
      { arg: 'email', type: 'string', required: true },
    ],
    returns: [
      { arg: 'response', type: 'any' },
    ],
  });
  BaseUser.resendRegisterLink = resendRegisterLink;

  BaseUser.remoteMethod('forgotPassword', {
    http: { path: '/forgotPassword', verb: 'post' },
    accepts: [
      { arg: 'email', type: 'string', required: true },
    ],
    returns: [
      { arg: 'response', type: 'any' },
    ],
  });
  BaseUser.forgotPassword = forgotPassword;


  BaseUser.remoteMethod('checkConfirmationToken', {
    http: { path: '/checkConfirmationToken', verb: 'post' },
    accepts: [
      { arg: 'res', type: 'object', http: { source: 'res' } },
      { arg: 'confirmationToken', type: 'string', required: true },
    ],
    returns: [
      { arg: 'response', type: 'any', 'root': true },
    ],
  });
  BaseUser.checkConfirmationToken = checkConfirmationToken;


  BaseUser.remoteMethod('resetPassword', {
    http: { path: '/resetPassword', verb: 'post' },
    accepts: [
      { arg: 'res', type: 'object', http: { source: 'res' } },
      { arg: 'confirmationToken', type: 'string', required: true },
      { arg: 'newPassword', type: 'string', required: true },
    ],
    returns: [
      { arg: 'response', type: 'any', 'root': true },
    ],
  });
  BaseUser.resetPassword = resetPassword;


  BaseUser.remoteMethod('checkResetPassToken', {
    http: { path: '/checkResetPassToken', verb: 'post' },
    accepts: [
      { arg: 'confirmationToken', type: 'string', required: true },
    ],
    returns: [
      { arg: 'response', type: 'any', 'root': true },
    ],
  });
  BaseUser.checkResetPassToken = checkResetPassToken;


  BaseUser.remoteMethod('customLogin', {
    http: { path: '/customLogin', verb: 'post' },
    accepts: [
      { arg: 'res', type: 'object', http: { source: 'res' } },
      { arg: 'email', type: 'string', required: true },
      { arg: 'password', type: 'string', required: true },
      { arg: 'rememberMe', type: 'boolean', required: true },
    ],
    returns: [
      { arg: 'response', type: 'any' },
    ],
  });
  BaseUser.customLogin = customLogin;

  BaseUser.remoteMethod('customLogOut', {
    http: { path: '/customLogOut', verb: 'post' },
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } },
      { arg: 'res', type: 'object', http: { source: 'res' } },
    ],
    returns: [
      { arg: 'response', type: 'any', 'root': true },
    ],
  });
  BaseUser.customLogOut = customLogOut;


  BaseUser.remoteMethod('test', {
    http: { path: '/test', verb: 'post' },
    accepts: [],
    returns: [
      { arg: 'response', type: 'any', 'root': true },
    ],
  });
  BaseUser.test = test;

  BaseUser.remoteMethod('getPing', {
    http: { path: '/getPing', verb: 'get' },
    accepts: [],
    returns: [
      { arg: 'response', type: 'any', 'root': true },
    ],
  });
  BaseUser.getPing = getPing;


  BaseUser.remoteMethod('getLessons', {
    http: { path: '/getLessons', verb: 'get' },
    accepts: [],
    returns: [
      { arg: 'response', type: 'any', 'root': true },
    ],
  });
  BaseUser.getLessons = getLessons;
};


async function getUserRole(options) {
  const userInstance = await getCurrentUserFromContext(app, options);

  if (!userInstance)
    return;

  return {
    id: userInstance.id,
    language: userInstance.language,
    role: userInstance.role,
    accessToken: _.get(options, 'accessToken.id')
  };
}

async function test() {
  return { responceData: 'pong' }
}

async function getPing() {
  return { responceData: 'pong' }
}


async function customLogin(res, email, password, rememberMe) {
  const TWO_WEEKS = 60 * 60 * 24 * 7 * 2;

  const accessToken = await app.models.BaseUser.login({
    email,
    password,
    ttl: TWO_WEEKS
  });

  const baseUser = await app.models.BaseUser.findById(accessToken.userId)

  addAuthCookie(res, accessToken, { rememberMe });

  return {
    result: {
      role: baseUser.role,
      id: baseUser.id
    }
  }
}


async function customLogOut(req, res) {

  const token = req.accessToken.id;

  await app.models.BaseUser.logout(token);

  delAuthCookie(res);

}

async function register(name, email, password) {

  if (await isEmailExist(email)) {
    throw CustomError.information('email-is-already-exist');
  }

  //take care of emailVerified field this val must be=1 for success login
  const userInstance = await app.models.BaseUser.create([{
    role: TEACHER,
    name,
    email,
    password
  }]);
  if (!userInstance[0]) {
    throw CustomError.information('register-err');
  }

  const verificationToken = uuidv4();


  await userInstance[0].updateAttributes({
    verificationToken
  });

  await resendRegisterLink(email, verificationToken)
}


async function checkConfirmationToken(res, confirmationToken) {

  const userInstance = await checkVerifToken(confirmationToken);
  if (!userInstance) {
    throw CustomError.information('confirm-register-token-err');
  }

  await userInstance.updateAttributes({
    emailVerified: true,
    verificationToken: null
  });

  const accessToken = await userInstance.createAccessToken();
  if (!accessToken) {
    throw CustomError.information('cannot-create-access-token');
  }

  addAuthCookie(res, accessToken, { rememberMe: true });


  return {
    role: userInstance.role,
    id: userInstance.id
  }

}


async function checkResetPassToken(confirmationToken) {
  const userInstance = await app.models.BaseUser.findOne({ where: { verificationToken: confirmationToken } });
  if (!userInstance) {
    throw CustomError.information('incorrect-token');
  }
}

async function resetPassword(res, confirmationToken, newPassword) {

  const userInstance = await app.models.BaseUser.findOne({ where: { verificationToken: confirmationToken } });
  if (!userInstance) {
    throw CustomError.information('incorrect-token');
  }

  await userInstance.updateAttributes({ password: newPassword, verificationToken: null });

  const loginRes = await customLogin(res, userInstance.email, newPassword)

  return loginRes.result

}


async function resendRegisterLink(email) {

  const userInstanceToken = await app.models.BaseUser.findOne({
    where: { email },
    fields: { verificationToken: true }
  });
  if (!userInstanceToken) {
    throw CustomError.information('no-user-with-suchEmail');
  }

  const confirmRegisterLinkSubject = app.get('confirmRegisterLinkSubject');
  const frontendUrl = app.get('frontendUrl');

  const link = `${frontendUrl}/confirm?token=${userInstanceToken.verificationToken}`;

  await sendEmail(email, confirmRegisterLinkSubject, link);

}

async function forgotPassword(email) {

  const userInstance = await app.models.BaseUser.findOne({
    where: { email },
  });
  if (!userInstance) {
    throw CustomError.information('no-user-with-suchEmail');
  }

  const verificationToken = uuidv4();
  await userInstance.updateAttributes({
    verificationToken
  });

  const resetPassLinkSubject = app.get('resetPassLinkSubject');
  const frontendUrl = app.get('frontendUrl');

  const link = `${frontendUrl}/resetpass?token=${verificationToken}`;

  await sendEmail(email, resetPassLinkSubject, link);

}

async function isEmailExist(email) {
  const numOfUsersWithSuchEmail = await app.models.BaseUser.count({ email });
  return Boolean(numOfUsersWithSuchEmail);
}


async function checkVerifToken(verificationToken) {
  const where = {
    verificationToken
  }

  const user = await app.models.BaseUser.findOne({ where });
  if (!user) {
    throw CustomError.information('incorrect-token');
  }
  return user

}


async function getLessons() {
  console.log('get lessons')
  return 'wow'
}