const handleSignin = (request,response , db , bcrypt) => {

    const { email , password} = request.body
    if(!email || !password){
       return response.status(400).json('Incorrect form submission')
    }

    db.select('email','hash').from('login')
    .where('email','=',email)
    .then(data => {
        const isValid = bcrypt.compareSync(password,data[0].hash)
        if(isValid){
            return db.select('*')
            .from('users')
            .where('email','=',email)
            .then(user => {
                console.log(user)
                response.json(user[0])
            })
            .catch(error => response.status(400).json('Unable to get user'))
        } else {
            response.status(400).json('Som Teng Wong')
        }

    }).catch(error => response.status(400).json('Som Teng Wong'))
}

module.exports = {
    handleSignin,
}