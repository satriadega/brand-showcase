const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  console.log(err);

  switch (err.name) {
    case "SequelizeValidationError":
      status = 400;
      message = err.errors.map((el) => el.message);
      break;
    case "Tags is empty":
      status = 400;
      message = err.name;
      break;
    case "Post Not Found":
      status = 404;
      message = "Error Not Found";
      break;
    case "Category Not Found":
      status = 404;
      message = "Error Not Found";
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors.map((el) => el.message);
      break;
    case "Invalid username or email or password":
      status = 401;
      message = "Invalid username or email or password";
      break;
    case "Unauthenticated":
      status = 401;
      message = `Invalid Token`;
      break;
    case `Email can't be empty`:
      status = 400;
      message = `Email can't be empty`;
      break;
    case `Password can't be empty`:
      status = 400;
      message = `Password can't be empty`;
      break;
    default:
      break;
  }

  res.status(status).json({ message: message });
};

module.exports = errorHandler;
