const Bookmarks = require('../models/Bookmarks')
const Ads = require('../models/Ads')
module.exports = {

    async store (req, res){
        const{user_id, ad_id} = req.body
        
        
        const bookmark = 
        await Bookmarks.findOne({
            user_id,
            ad_id
        })
        if (!bookmark){
        await Bookmarks.create({
            user_id,
            ad_id
        })
        }
        return res.send('Ok')
    },

    async index (req,res){
        const{user_id} = req.query
        
        let bookmark =
        await Bookmarks.find({
            user_id
            })
        bookmark = bookmark.map(item => item.ad_id)
        
        let response = []
        for (key in bookmark){
            response[key] = 
            await Ads.findById({
                _id : bookmark[key]
             })
            
        }
            console.log(bookmark)
            console.log(response)
        return res.json(response)
    },
    
    async delete (req, res){
        const {_id, user_id} = req.body
        console.log(req.body)
        await Bookmarks.deleteOne({ad_id:_id, user_id:user_id}, (err, obj)=>{
            console.log("1 bookmark deleted")
            return res.send('ok')  
        
        })
        
      }
    

}