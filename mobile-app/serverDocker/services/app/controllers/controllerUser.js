const { User } = require("../models");
const { compare } = require("../helpers/password");
const { signToken } = require("../helpers/jwt");

class ControllerUser {
  static async createUser(req, res, next) {
    const { username, email, password, phoneNumber, address } = req.body;
    try {
      const result = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });

      res.status(201).json({
        id: result.id,
        email: result.email,
      });
    } catch (err) {
      console.log(err.name);
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (email === "" || !email) throw { name: `Email can't be empty` };
      if (password === "" || !password)
        throw { name: `Password can't be empty` };

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) throw { name: "Invalid username or email or password" };

      const isValidPassword = compare(password, user.password);

      if (!isValidPassword)
        throw { name: "Invalid username or email or password" };

      const accessToken = signToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        access_token: accessToken,
        email: user.email,
        username: user.username,
        id: user.id,
        role: user.role,
      });
    } catch (err) {
      next(err);
    }
  }
  static async createAdmin(req, res, next) {
    const { username, email, password, phoneNumber, address } = req.body;
    try {
      const result = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });

      res.status(201).json({
        id: result.id,
        email: result.email,
      });
    } catch (err) {
      console.log(err.name);
      next(err);
    }
  }
}

module.exports = ControllerUser;
