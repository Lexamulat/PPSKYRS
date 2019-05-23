const {TEACHER, STUDENT} = require('../datasources/constants/userRoles');
const {createRolePrincipal} = require('../domain/role/roleManagement');

module.exports = async function (app) {
  await createRolePrincipal(app, TEACHER);
  await createRolePrincipal(app, STUDENT);

};



