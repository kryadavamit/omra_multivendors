
const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const UserModel = require("../model/model");

const Category = require("../model/products/category")

const path = require("path");
const sharp = require("sharp");
const multer = require("multer");
const fs = require("fs");

//=====================================================

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "public/images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});








var upload=multer({storage:imageStorage})

router.post(
    "/upload",
    upload.fields([
      {name:'category_image',maxCount:1},
      {name:'category_image2',maxCount:1},
    ]),
    async (req, res) => {
        console.log({"test":req.body})
      
  
        // const { user } = req.user;
  
        // const userData = await UserModel.findOne(
        //   { _id: user._id },
        //   { GST_No: 1, Merchant_Name: 1 ,TypesOf_Bussiness: 1}
        // );
  
        try {
          const category =await new Category({
            
            
            category_name: req.body.category_name,
  
      
  
            
            category_image: `${process.env.BASE_URL}/category-image/${req.files.category_image[0].filename}`,
            // category_image2: req.files.category_image2[0].filename,
            // videos: req.body.videos,
            
        
            // type: req.body.type,
          });
          await category.save();
          res.status(200).send(category);
        } catch (err) {
          res.status(500).send({ message: err?.message });
        }
    }
  );


  router.get('/get_category', async (req,res) =>{
    // const { user } = req.user;
    // const userData = await UserModel.findOne(
    //   { _id: user._id },
    //   { GST_No: 1, Merchant_Name: 1 ,TypesOf_Bussiness: 1}
    // );
    try {
        const product= await Category.find();
        
        res.status(200).json(product);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
  
  })

  module.exports=router