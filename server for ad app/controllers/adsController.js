const Ads = require('../models/Ads')


module.exports = {
  async store(req, res) {
    const {_id, ad_name, description, user_id, ad_category, price } = req.body
    
    let adlist =
        await Ads.findOne({
            _id:_id
        })
        if (adlist){
          await Ads.updateOne(adlist,{
            ad_name, 
            description,
            user_id,
            ad_category,
            price
          })
        }
        if (!adlist){
          await Ads.create({
            ad_name, 
            description,
            user_id,
            ad_category,
            price
          })
        }

    return res.json(adlist)
  },
  
  async index(req, res){
    const {ad_category, user_id} = req.query
    let adlist={}
    if (ad_category==="Все"){
      adlist = await Ads.find()
    }
    else if (user_id) {
      adlist = await Ads.find({
        user_id:user_id
      })
    }
    else
    {
      adlist = await Ads.find({
      ad_category: ad_category
    })
    }
    return res.json(adlist)
  },

  async delete (req, res){
    const {_id} = req.body
    console.log(req.body)
    await Ads.deleteOne({_id:_id}, (err, obj)=>{
      console.log("1 document deleted")
      return res.send('ok')  
    
    })
    
  }
}