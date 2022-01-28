const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async index() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM categories;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async save(body) {
        try {
            const {description, name, slug} = body
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO categories (name, description, slug) VALUES (?,?,?);";

                connection.query(query, [name, description, slug] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            
            return {
                id : insertId,
                ...body
            };
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM categories WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async update(body) {
        try {
            const {description, name, slug} = body
            let {id} = body
            id = parseInt(id, 10)
            const insertId = await new Promise((resolve, reject) => {
                const query = "UPDATE categories SET name = ?, description = ?, slug = ? WHERE id = ?";
    
                connection.query(query, [name,description, slug, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(id);
                })
            });
    
            return {
                ...body,
                id: insertId
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM categories WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;