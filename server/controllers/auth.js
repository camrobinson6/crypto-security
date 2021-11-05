const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      // console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body
      
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const authenticated = bcrypt.compareSync(password, users[i].passwordHash)
          if (authenticated) {
            let newUserCopy = {...users[i]}
            delete newUserCopy.passwordHash
          }
          
          res.status(200).send(newUserCopy)
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)

        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(req.body.password, salt)

        console.log({salt})
        console.log({passwordHash})
        
        const newUser = {
          username: req.body.username,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: passwordHash
        }
        users.push(newUser)
        let newUserCopy = {...newUser}

        delete newUserCopy.password
        res.status(200).send(newUserCopy)
        console.log(newUserCopy)
    }
}