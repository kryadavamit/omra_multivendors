const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerQurySchema = new Schema(
  {
    merchant_Id: {
      type: String,
      required: false,
    },
    product_Id: { type: String, required: false },
    buyer_Message: {
      type:String,
      required:false,
    },
    buyer_Email: {
      type: String,
      required: false,
    },
    buyer_Mob: { type: String, required: false },

  },
  {
    timestamps: true,
  }
);

const CustomerQueryByProduct = mongoose.model(
  "CustomerQueryByProduct",
  CustomerQurySchema
);

module.exports = CustomerQueryByProduct;
