const authmiddleware=require('../middlewares/authmiddleware')
const UNAUTHORIZED=401;
const adminMid = (req, res, next) => {
  if (!req.user.isAdmin) res.status(UNAUTHORIZED).send();

  return next();
};

module.exports={ adminMid}
