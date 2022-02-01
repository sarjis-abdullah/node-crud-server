const express = require("express");
const app = express();
const morgan = require("morgan")
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(morgan('combined'))
const { sequelize, User } = require('./models')

// const dbService = require("./dbService");
// const category = require("./routes/category")
const userResource = require("./routes/user")
const categoryResource = require("./routes/category")

//middleware
const coreOptions = {
  origin: "http://localhost:3001/"
}
app.use(cors(coreOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//APIs

// app.use("/",categoryResource)
app.use("/",categoryResource)
app.use("/",userResource)


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

const PORT = process.env.PORT || 3001
app.listen({ port: PORT }, async () => {
  console.log(`Server up on ${PORT}`)
  await sequelize.authenticate()
  console.log('Database Connected!')
})
