const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// create
app.post('/category', (request, response) => {
    const body = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.save(body);

    result
    .then(data => {
        response.json(data)
    })
    .catch(err => console.log(err));
});

// read
app.get('/category', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.index();
    
    result
    .then(data => {
        response.json({data : data})
    })
    .catch(err => console.log(err));
})

// update
app.put('/category/:id', (request, response) => {
    const body = request.body;
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.update({...body, id: id});
    
    result
    .then(data => response.json(data))
    .catch(err => console.log(err));
});

// delete
app.delete('/category/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.delete(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.listen(process.env.PORT, () => console.log('app is running'));