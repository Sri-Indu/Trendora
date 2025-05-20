const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
const dbPath = path.join(__dirname, 'auth.db')

let db = null

const initialDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running at localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initialDbAndServer()
app.post('/login', async (req, res) => {
  const {username, password} = req.body
  const selectUserQuery = `SELECT * FROM User WHERE Username='${username}'`
  const dbUser = await db.get(selectUserQuery)
  if (dbUser === undefined) {
    res.status(400)
    res.json({error_msg: 'Invalid User Name'})
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password)
    if (isPasswordMatched === true){
       const payload = {
        username,
      }
      const userDetails = { username: 'rahul', password: 'rahul@2021' }
      const apiUrl = "https://apis.ccbp.in/login"
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      //const jwtToken = jwt.sign(payload, 'MY_SECRET_KEY', {expiresIn: '1h'})
      res.json(data)
    } else {
      res.status(400)
      res.json({error_msg: 'Invalid Password'})
    }
  }
})
app.post('/register', async (req, res) => {
  const {username, password} = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const selectUserQuery = `SELECT * FROM User WHERE Username='${username}'`
  const dbUser = await db.get(selectUserQuery)
  if (dbUser === undefined) {
    const createUserQuery = `INSERT INTO User(username,password) VALUES ('${username}','${hashedPassword}');`
    const dbResponse = await db.run(createUserQuery)
    const newUserId = dbResponse.lastID
    res.json({message:'User Created Successfully'})
  } else {
    res.status(400)
    res.json({error_msg:'User already Exists'})
  }
})
