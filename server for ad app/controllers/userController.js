const User = require('../models/User')
const bcrypt = require('bcrypt')


module.exports = {
   
    async index(req, res) {
    
    const users =
      await User.findOne({phone})
    
      if(!users){
            users = await User.create({
                phone
            })
        }
    return res.json(users)
  },

  async store(req, res) {
    const {phone, password } = req.body
    

    let users =
      await User.findOne({
        phone
      })
    if (users){
    const iscorrect = bcrypt.compareSync(password, users.password)
    if(iscorrect) return res.json(users)
    else return res.send('Неправильный пароль') 
    }
    
    if (!users) {     
           
        users = 
           await User.create({
            phone, 
            password: bcrypt.hashSync(password, 10) 
          })
          console.log(users)
          return res.json(users)
    }
    
    
  }
}