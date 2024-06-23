const jwt=require('jsonwebtoken')
const UNAUTHORIZED=401;

 const authmiddleware= (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) return res.status(UNAUTHORIZED).send();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.status(UNAUTHORIZED).send();
  }

  return next();
};
module.exports={authmiddleware}
