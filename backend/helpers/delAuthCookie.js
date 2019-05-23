module.exports = function delAuthCookie(res) {
  res.cookie('access_token', '', {
    expires: new Date(),
  });
};
