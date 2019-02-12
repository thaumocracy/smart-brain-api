const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')


const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express()


const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'admin',
      password : '1234',
      database : 'smart-brain'
    }
  });


app.use(bodyParser.json())
app.use(cors())


app.get('/',(request,response) => {
    response.send(database.users)
})

app.get('/profile/:id',(request,response) => {
    profile.handleProfileGet(request,response,db)
})

app.post('/signin',(request,response) => {
    signin.handleSignin(request,response,db,bcrypt)
})

app.post('/register', (request,response) => register.handleRegister(request,response , db , bcrypt))

app.post('/imageurl',(request,response) => {
    image.handleApiCall(request,response)
})
app.put('/image',(request,response) => {
    image.handleImage(request,response,db)
})

app.listen(process.event.PORT || 3000,() => {
    console.log(`Server listening on port ${process.env.PORT}`)
})