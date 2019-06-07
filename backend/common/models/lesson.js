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



module.exports = function (Lesson) {

    Lesson.remoteMethod('getLessons', {
        http: { path: '/getLessons', verb: 'get' },
        accepts: [
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: [
            { arg: 'response', type: 'any', 'root': true },
        ],
    });
    Lesson.getLessons = getLessons;

    Lesson.remoteMethod('getLessonById', {
        http: { path: '/getLessonById', verb: 'post' },
        accepts: [
            { arg: 'options', type: 'object', http: 'optionsFromRequest' },
            { arg: 'id', type: 'number', required: true },
        ],
        returns: [
            { arg: 'response', type: 'any', 'root': true },
        ],
    });
    Lesson.getLessonById = getLessonById;

    Lesson.remoteMethod('createLesson', {
        http: { path: '/createLesson', verb: 'post' },
        accepts: [
            { arg: 'options', type: 'object', http: 'optionsFromRequest' },
            { arg: 'name', type: 'string', required: true },
            { arg: 'lessonType', type: 'string', required: true },
            { arg: 'year', type: 'string', required: true },
            { arg: 'location', type: 'string', required: true },
            { arg: 'description', type: 'string', required: true },
        ],
        returns: [
            { arg: 'response', type: 'any', 'root': true },
        ],
    });
    Lesson.createLesson = createLesson;

    Lesson.remoteMethod('editLesson', {
        http: { path: '/editLesson', verb: 'post' },
        accepts: [
            { arg: 'options', type: 'object', http: 'optionsFromRequest' },
            { arg: 'name', type: 'string', required: true },
            { arg: 'lessonType', type: 'string', required: true },
            { arg: 'year', type: 'string', required: true },
            { arg: 'location', type: 'string', required: true },
            { arg: 'description', type: 'string', required: true },
        ],
        returns: [
            { arg: 'response', type: 'any', 'root': true },
        ],
    });
    Lesson.editLesson = editLesson;


    Lesson.remoteMethod('deleteLesson', {
        http: { path: '/deleteLesson', verb: 'delete' },
        accepts: [
            { arg: 'options', type: 'object', http: 'optionsFromRequest' },
            { arg: 'id', type: 'number', required: true },
        ],
        returns: [
            { arg: 'response', type: 'any', 'root': true },
        ],
    });
    Lesson.deleteLesson = deleteLesson;


};


async function getLessons(options) {
    const userInstance = await getCurrentUserFromContext(app, options);

    console.log('get lessons userInstance userInstance', userInstance)
    return 'get lessons'
}
async function getLessonById(options, id) {
    const userInstance = await getCurrentUserFromContext(app, options);

    console.log('get lesson by id')
    return 'get lesson by id'
}
async function createLesson(options, name, lessonType, year, location, description) {
    const userInstance = await getCurrentUserFromContext(app, options);

    console.log('createLesson')
    return 'createLesson'
}
async function editLesson(options, name, lessonType, year, location, description) {
    const userInstance = await getCurrentUserFromContext(app, options);

    console.log('editLesson')
    return 'editLesson'
}

async function deleteLesson(options, id) {
    const userInstance = await getCurrentUserFromContext(app, options);

    console.log('deleteLesson')
    return 'deleteLesson'
}