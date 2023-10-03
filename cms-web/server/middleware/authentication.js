const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async function (req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Unauthenticated" };
    }

    const decoded = verifyToken(access_token);
    // console.log(decoded);

    const findUser = await User.findOne({
      where: {
        id: decoded.id,
        email: decoded.email,
      },
    });

    if (!findUser) {
      throw { name: "Unauthenticated" };
    }
    // console.log(findUser);
    req.user = {
      id: findUser.id,
      email: findUser.email,
      role: findUser.role,
    };
    // console.log("nyampe sini");
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authentication;
