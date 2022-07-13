




const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const UserModel = require("../model/model");

const Product = require("../model/products/product");
const ProductProfile = require("../model/products/product_profile");
const path = require("path");
const sharp = require("sharp");
const multer = require("multer");
const fs = require("fs");





router.get('/get_products', async (req,res) =>{
    // const { user } = req.user;
    // const userData = await UserModel.findOne(
    //   { _id: user._id },
    //   { GST_No: 1, Merchant_Name: 1 ,TypesOf_Bussiness: 1}
    // );
    try {
        const product= await Product.find().sort([['createdAt', -1]]);
        console.log(product)
        
        res.status(200).json(product);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
  
  })

  router.get('/getByCategory', async (req,res) =>{
    const category = req.query.category;
    // const { user } = req.user;
    // const userData = await UserModel.findOne(
    //   { _id: user._id },
    //   { GST_No: 1, Merchant_Name: 1 ,TypesOf_Bussiness: 1}
    // );
    console.log({category})
    try {
        const product= await Product.find({category});
        
        res.status(200).json(product);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
  
  })

  router.get('/get_products_count', async (req,res) =>{
    // const { user } = req.user;
    // const userData = await UserModel.findOne(
    //   { _id: user._id },
    //   { GST_No: 1, Merchant_Name: 1 ,TypesOf_Bussiness: 1}
    // );
    try {
        const product= await Product.find({isApproved:false}).sort([['createdAt', -1]])
        
        
        res.status(200).json(product);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
  
  })

  router.get("filterby_search", async(req,res) => {
    console.log("hello basmass",req.query)
    const vendors_name= req.query.vendors_name;
    const product_name=req.query.product_name
    try {
        const data1=await Product.find(vendors_name,product_name
           )

           res.status(200).json(data1)

    } catch (error) {
        res.json(404)
        
    }
  })
 

  
  
  module.exports = router