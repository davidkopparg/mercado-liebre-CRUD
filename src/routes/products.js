// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');



let storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null, path.join(".","public","images","products"))
    } ,
    
    filename: function(req,file,cb){
        return cb(null, Date.now() + path.extname(file.originalname))
       

    }
    
    })
    let uploads =multer({storage: storage});
    // definimos multer para subir archivos



// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/create/',uploads.any(), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/:id',uploads.any(), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
