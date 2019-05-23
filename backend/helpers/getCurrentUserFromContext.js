const _ = require('lodash');

module.exports = async function (app, ctx) {
  const userId = _.get(ctx, 'accessToken.userId');
  if (!userId)
    return null;
  return await app.models.BaseUser.findOne({where: {id: userId}});
};
