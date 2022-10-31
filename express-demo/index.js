// NODE_MODULE
require("dotenv").config();
const Joi = require("joi");
const port = process.env.PORT;
const helmet = require("helmet");
const express = require("express");
// const morgan = require("morgan");

// LOCAL IMPORTS
const logger = require("./logger");
const authenticate = require("./auth");
const courses = require("./routes/courses");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
// app.use(morgan("tiny"));

app.use(logger);
app.use(authenticate);

app.listen(port, () => console.log(`Listening on port ${port}...`));
