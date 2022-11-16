const createError = require("http-errors");
const express = require("express");
const favicon = require('serve-favicon');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const history = require('connect-history-api-fallback');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const postImageRouter = require("./routes/post_image");
const connection = require("./routes/connection");

const app = express();
const staticFileMiddleWare = express.static(path.join(__dirname, '../ui/dist'));
const COOKIE_SECRET = "CooK!35AReC0Ol";
const MAX_AGE = 14400000;

var sessionStore = new MySQLStore({}, connection.db.promise());

app.use(session({
	secret: COOKIE_SECRET,
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
  cookie: {maxAge: MAX_AGE, signed: true}
}))


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/public', express.static(path.join(__dirname, "public")));

/*
app.use("/users", usersRouter); // route middleware from ./routes/users.js
*/
app.use("/", indexRouter); // route middleware from ./routes/index.js
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/image", postImageRouter);

app.use(history({
  disableDotRule: true,
  verbose: true,
  htmlAcceptHeaders: ['text/html']
}));

app.use(staticFileMiddleWare);

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
