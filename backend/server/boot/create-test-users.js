const {TEACHER, STUDENT} = require('../../server/datasources/constants/userRoles');

module.exports = function (app) {
  app.models.BaseUser.findOne({where: {role: TEACHER}})
    .then(res => {
      if (!res) {
        createTestUsers(app);
      }
    })
};


async function createTestUsers(app) {
  /*Create teacher*/
  const teacherInstance = await app.models.BaseUser.create({
    role: TEACHER,
    name: 'Teacher',
    email: 't@t.com',
    password: 'ttt',
    emailVerified: 1
  });

  const studentInstance = await app.models.BaseUser.create({
    role: STUDENT,
    name: 'STUDENT',
    email: 's@s.com',
    password: 'sss',
    emailVerified: 1
  });





}
