const { Client } = require("pg");
const database = new Client(process.env.DB_URL);
database.connect();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const bcryptController = {};

/**
 * @desc    Hashes the password and stores username, and hash in req.body
 * @route   POST /register_user
 */
bcryptController.hashPassword = (request, response, next) => {
  const { password, email, first_name, last_name } = request.body;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      return next(err);
    }
    request.body = { hash, email, first_name, last_name };
    return next();
  });
};

/**
 * @desc    Registers the username and hashed password into DB.
 * @route   POST /register_user
 */
bcryptController.createUser = (request, response, next) => {
  const { hash, email, first_name, last_name } = request.body;
  const text = `INSERT INTO users (first_name, last_name, email, hash) VALUES ('${first_name}', '${last_name}','${email}', '${hash}');`;
  database.query(text, (err, res) => {
    if (err) {
      return next(err);
    } else {
      console.log("Registered new user successfully.");
      return next();
    }
  });
};

//checks password input against the database and returns a boolean
/**
 * @desc    Credential validation: compares hashed pw with input pw.
 * @route   POST /check_pw
 */
bcryptController.checkPassword = (request, response, next) => {
  console.log("getting username");
  const { password, email } = request.body;
  const text = `SELECT * FROM users WHERE email='${email}'`;
  
  database.query(text, (err, res) => {
    if (err) next(err);
    else {
      if(!res.rows[0]) return next();
      console.log("Comparing passwords...");
      bcrypt.compare(password, res.rows[0].hash, function (err, res) {
        if (err) return next(err);
        response.locals.result = res;
        return next();
      });
    }
  });
};

module.exports = bcryptController;
