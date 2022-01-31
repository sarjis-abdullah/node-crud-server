const express = require("express");
const app = express();
const morgan = require("morgan")
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(morgan('combined'))

// const dbService = require("./dbService");
// const category = require("./routes/category")

//middleware
const coreOptions = {
  origin: "http://localhost:3001/"
}
app.use(cors(coreOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//APIs

// app.use('/', category)

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()

    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

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

const { sequelize, User, Post } = require('./models')


const PORT = process.env.PORT || 3001
app.listen({ port: PORT }, async () => {
  console.log(`Server up on ${PORT}`)
  await sequelize.authenticate()
  console.log('Database Connected!')
})
