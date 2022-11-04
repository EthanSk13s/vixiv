const createError = require("http-errors");
const express = require("express");
const favicon = require('serve-favicon');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const handlebars = require("express-handlebars");
const history = require('connect-history-api-fallback');
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const postImageRouter = require("./routes/post_image");
const connection = require("./routes/connection");

const app = express();
const staticFileMiddleWare = express.static(path.join(__dirname, '../ui/dist'));
const COOKIE_SECRET = "CooK!35AReC0Ol";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));

app.use(favicon(__dirname + '/public/favicon.ico'));

/**
 * Check for session cookies and handle them
 */
app.use((req, res, next) => {
  const userCookie = req.signedCookies['login_token'];
  const sessionCookie = connection.sessions[userCookie];

  if (sessionCookie) {
    if (sessionCookie.isExpired()) {
      res.clearCookie('login_token');
      delete connection.sessions[userCookie];
    }
  } else {
    res.clearCookie('login_token');
  }

  next()
})

/*
app.use("/users", usersRouter); // route middleware from ./routes/users.js
app.use("/post_image", postImageRouter);
*/
app.use("/", indexRouter); // route middleware from ./routes/index.js
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);

app.use(history({
  disableDotRule: true,
  verbose: true,
  htmlAcceptHeaders: ['text/html']
}));

app.use(staticFileMiddleWare);
app.use("/public", express.static(path.join(__dirname, "public")));

/**
 * Catch all route, if we get to here then the 
 * resource requested could not be found.
 */
app.use((req,res,next) => {
  next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
})

/**
 * Error Handler, used to render the error html file
 * with relevant error information.
 */
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
