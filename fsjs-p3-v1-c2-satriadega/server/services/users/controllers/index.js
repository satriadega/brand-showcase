const { getDB } = require("../config/mongoConnection");
const Users = require("../models/Users");
const { encrypt } = require("../helpers/password");

class UserController {
  static collection() {
    return getDB().collection("users");
  }
  static async createUser(req, res) {
    console.log(req.body);
    try {
      if (!req.body.email || !req.body.password) {
        throw { name: "Email / Password must be inserted!" };
      }

      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const validateEmail = (email) => {
        return emailPattern.test(email);
      };
      if (!validateEmail(req.body.email)) {
        throw { name: "Email must be valid!" };
      }

      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: encrypt(req.body.password),
        role: "admin",
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
      };
      const users = await Users.findAll();

      const verifyEmail = users.find((el) => el.email === req.body.email);
      if (verifyEmail) {
        throw { name: "Email already registered!" };
      }

      const user = await Users.create(newUser);
      res.status(201).json({ message: user });
    } catch (err) {
      console.log(err);
      if (err.name) {
        res.status(400).json({ message: err.name });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  static async readUsers(req, res) {
    try {
      const users = await Users.findAll();
      users.forEach((element) => {
        delete element.password;
      });
      res.status(200).json({ message: users });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async readUserById(req, res) {
    try {
      const { id } = req.params;
      console.log(id, "<<<<<<<<<<<<<<<<");
      const user = await Users.findByPk(id);
      delete user.password;
      res.status(200).json({ message: user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async deleteUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await Users.deleteByPk(id);
      res.status(200).json({ message: user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
