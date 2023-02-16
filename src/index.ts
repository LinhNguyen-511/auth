// import express, dotenv, jwt
const express = require('express')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

// create express app
const app = express()

dotenv.config()

// listen to port 
const port = process.env.PORT 
app.listen(port, () => {console.log("halo")})

app.get('/', (req, res) => {
    res.send('Hello baybe!')
})