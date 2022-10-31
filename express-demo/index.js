require("dotenv").config();
const port = process.env.PORT;
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let courses = [
  { id: "1", name: "Course1" },
  { id: "2", name: "Course2" },
  { id: "3", name: "Course3" },
  { id: "4", name: "Course4" },
];

// GET COURSE
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) res.status(404).json("Course not found");
  res.json(course.name);
});

// CREATE COURSE
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send("Bad request.");

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  return res.json(course);
});

// UPDATE COURSE
app.put("/api/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === req.params.id.toString());
  if (!course) return res.status(404).send("Course not found!");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send("Bad request.");

  course.name = req.body.name;
  console.log(course);
  return res.status(200).json(course);
});

// DELETE COURSE
app.delete("/api/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === req.params.id.toString());
  if (!course) return res.status(404).send("Course not found!");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send("Bad request.");

  courses = courses.filter((c) => c.id !== req.params.id);
  return res.status(200).json(courses);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
};

app.listen(port, () => console.log(`Listening on port ${port}...`));
