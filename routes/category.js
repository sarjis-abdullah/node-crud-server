const express = require("express");
const router = express.Router();
const Service = require("../dbService");
const createError = require("http-errors");
const { validatedCategory } = require("../helpers/validator");

router.post("/category", (request, response, next) => {
  try {
    const body = request.body;
    const {error, value} = validatedCategory.validate(body);
    if (error) {
      throw error;
    }
    const db = new Service();
    console.log(db.save,3456)
    // const db = new Service();

    db.save(value)
      .then((data) => {
        response.json(data);
      })
      .catch((err) => console.log(err, 7777));
  } catch (error) {
    if (error.isJoi) {
      error.status = 422
    }
    next(error);
  }
});

// read
router.get("/category", (request, response) => {
  const db = new Service();
  const result = db.index();

  result
    .then((data) => {
      response.json({ data: data });
    })
    .catch((err) => console.log(err));
});

// update
router.put("/category/:id", (request, response) => {
  const body = request.body;
  const { id } = request.params;
  const db = new Service();
  const result = db.update({ ...body, id: id });

  result.then((data) => response.json(data)).catch((err) => console.log(err));
});

// delete
router.delete("/category/:id", (request, response) => {
  const { id } = request.params;
  const db = new Service();

  const result = db.delete(id);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

router.get("/search/:name", (request, response) => {
  const { name } = request.params;
  const db = new Service();

  const result = db.searchByName(name);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

router.post("/validate-category-name", (request, response, next) => {
  try {
    const {name} = request.body;
    const db = new Service();

    db.isExist(name)
      .then((data) => {
        if (data && data.length) {
          const error = {
            "status": 422,
            "message": "Name is taken"
          }
          throw {error}
        }
        response.json(data);
      })
      .catch((err) => {
        next(error = {
          "status": 422,
          "message": "Name is taken"
        });
      });
  } catch (error) {
    if (error.isJoi) {
      error.status = 422
    }
    next(error);
  }
});

module.exports = router;
