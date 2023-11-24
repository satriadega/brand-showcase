const { Post, Tag, Category, sequelize } = require("../models");

class ControllerCategory {
  static async getCategories(req, res, next) {
    try {
      const result = await Category.findAll({ order: [["id", "ASC"]] });
      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req, res, next) {
    const { name } = req.body;

    const trx = await sequelize.transaction();
    try {
      const result = await Category.create(
        {
          name,
        },
        { transaction: trx }
      );
      await trx.commit();
      res.status(201).json(result);
    } catch (err) {
      next(err);
      await trx.rollback();
    }
  }

  static async getCategoryById(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Category.findByPk(+id);
      if (!result) {
        throw { name: "Category Not Found" };
      }
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async updateCategoryById(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    const trx = await sequelize.transaction();
    try {
      const result = await Category.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        },
        { transaction: trx }
      );
      if (result[0] === 0) {
        throw { name: "Category Not Found" };
      }
      await trx.commit();
      res.status(201).json({ message: `Category successfully updated` });
    } catch (err) {
      next(err);
      await trx.rollback();
    }
  }

  static async deleteCategoryById(req, res, next) {
    const { id } = req.params;
    try {
      let result = await Category.destroy({
        where: {
          id: +id,
        },
      });
      if (!result) {
        throw { name: "Category Not Found" };
      } else {
        res.status(200).json({ message: `Category success to delete` });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerCategory;
