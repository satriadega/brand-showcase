const { Post, Tag, Category, User, sequelize } = require("../models");

class ControllerPost {
  static async getPosts(req, res, next) {
    try {
      const result = await Post.findAll({
        order: [["id", "ASC"]],
        include: [Category, Tag, User],
      });
      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async createPost(req, res, next) {
    const { title, content, imgUrl, categoryId, tags } = req.body;
    const authorId = req.user.id;
    const trx = await sequelize.transaction();
    try {
      const result = await Post.create(
        {
          title,
          content,
          imgUrl,
          categoryId,
          authorId,
        },
        { transaction: trx }
      );
      console.log(tags, "<<<<<<<");
      console.log(result.id);
      if (!tags) {
        throw { name: "Tags is empty" };
      }
      await Tag.bulkCreate(
        tags.map((el) => ({ name: el, postId: result.id })),
        {
          transaction: trx,
        }
      );
      await trx.commit();
      res.status(201).json(result);
    } catch (err) {
      next(err);
      await trx.rollback();
    }
  }

  static async getPostById(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Post.findByPk(+id, { include: [Category, Tag] });
      if (!result) {
        throw { name: "Post Not Found" };
      }
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async updatePostById(req, res, next) {
    const { id } = req.params;
    const { title, content, imgUrl, categoryId, tags } = req.body;
    const authorId = req.user.id;
    const trx = await sequelize.transaction();
    try {
      if (!tags) {
        throw { name: "Tags is empty" };
      }
      const result = await Post.update(
        {
          title,
          content,
          imgUrl,
          categoryId,
          authorId,
        },
        {
          where: {
            id,
          },
        },
        { transaction: trx }
      );
      if (result[0] === 0) {
        throw { name: "Post Not Found" };
      }
      await Tag.destroy({
        where: {
          postId: id,
        },
      });
      await Tag.bulkCreate(
        tags.map((el) => ({ name: el, postId: id })),
        {
          transaction: trx,
        }
      );
      await trx.commit();
      res.status(201).json({ message: `Post successfully updated` });
    } catch (err) {
      next(err);
      await trx.rollback();
    }
  }

  static async deletePostById(req, res, next) {
    const { id } = req.params;
    try {
      let result = await Post.destroy({
        where: {
          id: +id,
        },
      });
      if (!result) {
        throw { name: "Post Not Found" };
      } else {
        res.status(200).json({ message: `Post success to delete` });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerPost;
