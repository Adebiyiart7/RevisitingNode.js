require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();

const genres = require("./routes/genres");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/genres", genres);

app.listen(port, () => console.log(`Listening on port ${port}...`));
