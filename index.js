require("dotenv").config();
const port = process.env.PORT;
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const courses = [
  { id: "1", name: "Course1" },
  { id: "2", name: "Course2" },
  { id: "3", name: "Course3" },
  { id: "4", name: "Course4" },
];

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.json([1, 2, 3]);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) res.status(404).json("Course not found");
  res.json(course.name);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json(result.error.details[0].message); // Bad Request
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  return res.json(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.filter((c) => c.id === req.params.id.toString());

  if (!course) return res.status(404).send("Course not found!");

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) return res.status(400).send("Bad request.");

  cours;
  return res.status(200).json;
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
