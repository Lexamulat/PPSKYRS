module.exports = function (app) {
  var remotes = app.remotes();
  remotes.after('**', function (ctx, next) {

    // console.log('middle')

    if (!ctx.result)
      ctx.result = {};

    if (ctx.resultType === 'file')
      return next();

    if (!ctx.result.response) {
      ctx.result = transformLoopbackResponse(ctx);
      return next();
    }


    const {result, role, code, status, details = {}, error} = ctx.result.response;
    // if (result && result.role) {
    //   console.log('set cookie')
    //   ctx.res.cookie('access_token', 'eeeeww', {signed: true, maxAge: 300000});
    // }

    ctx.result = {
      status: status || "success",
      code: code || 200,
      result,
      details,
      error
    };

    next();
  });
};

function transformLoopbackResponse(ctx) {


  return {
    result: ctx.result,
    status: "success",
    code: 200,
  };
}
