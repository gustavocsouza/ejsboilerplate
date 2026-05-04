require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const helmet = require('helmet');
const csurf = require("csurf");

const routes = require("./routes");
const { checkCsrfToken, csrfMiddleware } = require("./src/middlewares/csurf");
const { flashMessages } = require("./src/middlewares/flash");
const { sessionMiddleware } = require("./src/middlewares/session");

const app = express();

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => app.emit("dbConnected"))
  .catch((e) => console.log(e));

app.use(
  helmet({
    referrerPolicy: false,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: "d8daf7879a6dw",
  store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION_STRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csurf());
app.use(csrfMiddleware);
app.use(checkCsrfToken);
app.use(flashMessages);
app.use(sessionMiddleware);

app.use(routes);

app.on("dbConnected", () => {
  app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
  });
});
