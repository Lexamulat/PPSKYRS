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
        http: { path: '/getLessonById', verb: 'get' },
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
            { arg: 'id', type: 'number', required: true },
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


    const lessons = await app.models.Lesson.find();

    // console.log('get lessons userInstance userInstance', userInstance)
    return lessons
}
async function getLessonById(options, id) {
    const userInstance = await getCurrentUserFromContext(app, options);
    const lessons = await app.models.Lesson.findById(id);

    return lessons
}
async function createLesson(options, name, lessonType, year, location, description) {
    const userInstance = await getCurrentUserFromContext(app, options);


    if (!userInstance) {
        throw CustomError.information('cannot-get-user-inst-for-create-lesson');
    }


    const lessonInstance = await app.models.Lesson.create([{
        name, lessonType, year, location, description, userId: userInstance.id
    }]);

    return 'createLesson'
}
async function editLesson(options, id, name, lessonType, year, location, description) {
    const userInstance = await getCurrentUserFromContext(app, options);

    const lessonInstance = await app.models.Lesson.findById(id);
    if(!lessonInstance){
        throw CustomError.information('cannot-get-lesson-by-id-for-edit');

    }
    await lessonInstance.updateAttributes({name, lessonType, year, location, description});

    return 'editLesson'
}

async function deleteLesson(options, id) {
    const userInstance = await getCurrentUserFromContext(app, options);
    await app.models.Lesson.destroyById(id);

    return 'deleteLesson'
}