const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema(
  {category_id:{ type: String, required: true },
  
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  category_name:{ type: String, required: true },


   
   
    sub_category_name: { type: String, required: false },
    sub_category_image: { type: Array , required: false},
   
},
  {
    timestamps: true,
  }
);

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

module.exports = SubCategory;
