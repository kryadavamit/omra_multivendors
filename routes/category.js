
const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const UserModel = require("../model/model");

const Category = require("../model/products/category")

const path = require("path");
const sharp = require("sharp");
const multer = require("multer");
const fs = require("fs");
const SubCategory = require("../model/products/subcategory");
const Product = require("../model/products/product");

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
           
          });
          await category.save();
          res.status(200).send(category);
        } catch (err) {
          res.status(500).send({ message: err?.message });
        }
    }
  );

  router.patch("/update_category/:_id",upload.fields([
    {name:'category_image',maxCount:1},
    {name:'category_image2',maxCount:1},
]
// upload.fields('banner_image1',5
    ), async (req, res) => {
    const { _id } = req.params;
 
  
    try {
      const user = await Category.updateOne(
        { _id },
        {
          category_name: req.body.category_name,
          category_image: `${process.env.BASE_URL}/category-image/${req.files.category_image[0].filename}`
        },
        {
          new: true,
          upsert: true,
        }
      );
      //Fields
  
      res.json({
        message: "User Updated Sucessfully",
        user,
      });
    } catch (err) {
      res.json({
        message: err?.message,
      });
    }
  });

  router.delete("/delete_category/:_id",(req,res) => {
    const {_id }=req.params
    try {
      const category = Category.findOneAndDelete({_id})
      res.json({
        message: "category deleted Sucessfully",
        category,
      });
      
    } catch (error) {
      res.json({message:error?.message,success:false})
      
    }
  })


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

  router.get('/get_home_cat', async (req,res) =>{
    // const { user } = req.user;
    // const userData = await UserModel.findOne(
    //   { _id: user._id },
    //   { GST_No: 1, Merchant_Name: 1 ,TypesOf_Bussiness: 1}
    // );
    try {
        const product= await Category.find().limit(10);
       
        
        res.status(200).json(product);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
  
  })

  ///  SubCategory Product

  router.post(
    "/add_subcategory",
    upload.single("sub_category_image"),
    async (req, res) => {
        console.log({"test":req.body})
      
  
        const { _id } = req.params;
        console.log({"Test Subcategory":userData._id})
  
        const userData = await Category.findOne(
          { _id: _id},
          {category_name:1}
          
        );
  
        try {
          const category =await new SubCategory({
            category_Id:  userData._id,
            category_name:  userData.category_name,
           
            
            
            sub_category_name: req.body.sub_category_name,
            sub_category_image: `${process.env.BASE_URL}/sub_category_image/${req.files.sub_category_image[0].filename}`,
           
          });
          await category.save();
          res.status(200).send(category);
        } catch (err) {
          res.status(500).send({ message: err?.message });
        }
    }
  );


  router.get('/add_subcategory', async (req,res) =>{
    const { _id } = req.params;
    const userData = await UserModel.findOne(
      { _id: _id},
     
    );
    try {
        const product= await SubCategory.find();
        
        res.status(200).json(product);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
  
  })

  module.exports=router