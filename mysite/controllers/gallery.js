const path = require('path');
const fs = require('fs');
const models = require('../models');

module.exports = {
    index: async (req,res,next) => {
        try{
            const list = await models.Gallery.findAll({
                attributes: ['no','url','comment'],
                order: [
                    ['no','desc']
                ]
            });
            res.render('gallery/index',{
                list: list
            });
        } catch(err){
            next(err);
        }
    },
    delete: async (req,res,next) => {
        try{
            const results = await models.Gallery.destroy({
                where: {
                  no: req.params.no
                }
              });
            
            res.redirect("/gallery");
        } catch(err){
            next(err);
        }
        
    },
    upload: async (req,res,next) =>{
        try{
            if(req.file == null){
                res.redirect("/gallery");
            }
            const file = req.file;

            const storeDirectory = path.join(path.dirname(require.main.filename),process.env.STATIC_RESOURCES_DIRECTORY,process.env.GALLERY_STORE_LOCATION);
            const url = path.join(process.env.GALLERY_STORE_LOCATION,file.filename) + path.extname(file.originalname);
            const storePath = path.join(storeDirectory,file.filename) + path.extname(file.originalname);
            
            fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
            const content = fs.readFileSync(file.path);
            fs.writeFileSync(storePath,content,{flag: 'w+'});

            await models.Gallery.create({
                url: url.replace(/\\/gi,'/'),
                comment: req.body.comment || ''
            })
            res.redirect("/gallery");
        } catch(err){
            next(err);
        }
    }
}