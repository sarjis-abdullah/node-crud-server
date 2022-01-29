const express = require("express");
const app = express();
const morgan = require("morgan")
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(morgan('combined'))

const dbService = require("./dbService");
const category = require("./routes/category")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', category)


app.use(async (req, res, next) => {
  const error = new Error("Not found anywhere");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT, () => console.log("app is running"));
