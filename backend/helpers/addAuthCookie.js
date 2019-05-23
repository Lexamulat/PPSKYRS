module.exports = function addAuthCookie(res, token, {rememberMe = true, cookieName = 'access_token', ...options} = {}) {
  if (rememberMe) {
    res.cookie(cookieName, token.id, {
      signed: true,
      httpOnly: true,
      expires: new Date(+token.created + token.ttl * 1000),
    });
  } else {
    res.cookie(cookieName, token.id, {
      signed: true,
      httpOnly: true,
      expires: 0,
    });
  }
};
