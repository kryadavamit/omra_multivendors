const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerQurySchema = new Schema(
  {
   
   
    product_Id: { type: String, required: false },
    customer_mob: { type: Array , required: false},

    
    
   

   
    

   

    
    
  },
  {
    timestamps: true,
  }
);

const CustomerQueryByProduct = mongoose.model("CustomerQueryByProduct", CustomerQurySchema);

module.exports = CustomerQueryByProduct;
