const express = require("express");
const router = express.Router();
const dbService = require("../dbService");

router.post("/category", async (request, response) => {
  const body = request.body;
  const db = dbService.getDbServiceInstance();

  const result = db.save(body);
  console.log(result, 1234567);

  result
    .then((data) => {
      response.json(data);
    })
    .catch((err) => console.log(err));
});

// read
router.get("/category", (request, response) => {
  const db = dbService.getDbServiceInstance();
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
  const db = dbService.getDbServiceInstance();
  const result = db.update({ ...body, id: id });

  result.then((data) => response.json(data)).catch((err) => console.log(err));
});

// delete
router.delete("/category/:id", (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.delete(id);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

router.get("/search/:name", (request, response) => {
  const { name } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.searchByName(name);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

module.exports = router