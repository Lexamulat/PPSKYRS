module.exports = {createRolePrincipal};

async function createRolePrincipal(app, roleName, baseUserModel) {
  if (baseUserModel) {
    const roleModel = await getOrCreateRole(app, roleName);
    const alreadyCreated = await app.models.RoleMapping.findOne({
      where: {
        principalType: app.models.RoleMapping.USER,
        principalId: baseUserModel.id,
        roleId: roleModel.id
      }
    });
    if (alreadyCreated)
      return;

    return await roleModel.principals.create({
      principalType: app.models.RoleMapping.USER,
      principalId: baseUserModel.id
    });
  }

  const users = await app.models.BaseUser.find({where: {role: roleName}});
  return await Promise.all(users.map(createRolePrincipal.bind(this, app, roleName)));
}

async function getOrCreateRole(app, role) {
  const roleModel = await app.models.Role.findOne({where: {name: role}});
  if (roleModel)
    return roleModel;

  return await app.models.Role.create({name: role});
}
