const Clarifai = require('clarifai')
const keys = require('../../../keys')

const app = new Clarifai.App({
    apiKey:'fbcf93a2fe2d438cbd15a57985c7a22c'  
  })

const handleApiCall = (request,response) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, request.body.input)
        .then(data => response.json(data))
        .catch(error => response.status(400).json('Something in API wrong'))
}


const handleImage = (request,response,db) => {
    const {id } = request.body
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => response.json(entries[0]))
    .catch(error => response.status(400).json('So Tung Wong'))
}

module.exports = {
    handleImage,
    handleApiCall
}