


const express = require("express");

const router = express.Router();
const path = require("path");
const CustomerQueryByProduct = require("../model/products/CustomerQuery");


router.post(
    "/connect_to_buy",
   
    async (req, res) => {
        console.log({"imagesss":req.body})
      
  
     
  
        try {
          const product =await  CustomerQueryByProduct.create({
            merchant_Id: req.body.merchant_Id,
            product_Id: req.body.product_Id,
            buyer_Message:req.body.buyer_Message,
            buyer_Email: req.body.buyer_Email,
            buyer_Mob: req.body.buyer_Mob
            
           
          });
         
          res.status(200).send(product);
        } catch (err) {
          res.status(500).send({ message: err?.message });
        }
    }
  );

  router.get("/getbuyerQuery", async(req,res) =>{
    
    try {
        const buyerQuery= await CustomerQueryByProduct.find({})
       
        
        res.status(200).json(buyerQuery);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
  })


  module.exports=router