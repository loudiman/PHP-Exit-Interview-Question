const express = require('express');
const db = require('../db');

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

async function processLogin(username, password) {
    username = 2233915
    password = "Test"
    try {
        const [rows] = await db.query("SELECT * FROM user WHERE username = ? AND hashed_password = ?", [username, password]);
        return rows;
    } catch (err) {
        console.error('Error in processLogin:', err);
        throw err;
    }
}

app.post('/login',async (req, res) => {
    console.log("Received")
    const { username, password } = req.body

    rows = await processLogin(username, password);

    if(rows.length < 0){
        console.log("Invalid Creds")
        res.status(401).json({
            error:'Invalid Credentials'
        });
        return;
    }

    console.log(rows)

    console.log("Checking account type")
    if(rows[0].type == 1){
        console.log("Admin login")
        res.redirect('/admin')
    }



});

app.listen(PORT, () =>{
    console.log("Server is running")
})


function printRow(row){
    console.log("Username: "+row.username)
    console.log("Type: "+row.type)
}