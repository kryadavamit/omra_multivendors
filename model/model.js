
const mongoose = require('mongoose');
const bcrypt= require("bcrypt")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: false,
    unique: true,

  },
  password: {
    type: String,
    required: false
  },
  role: {
    type:String,
    enum:["SuperAdmin","Admin"],
    required:false
  },

  Merchant_Name: {
    type:String,
    required:false
  },
  Merchant_Address: {
    type:String,
    required:false
  },
  TypesOf_Bussiness: {
    type:String,
    required:false
  },
  SubTypeOf_bussiness: {
    type:String,
    required:false
  },

  Year_of_establishment: { 

    type:String,
    required:false
  },
  GST_No: {
    type:String,
    required:false
  },

  PAN_No: {
    type:String,
    required:false
  }


}


 


);





UserSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
  );

  UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }

  const UserModel = mongoose.model('seller', UserSchema);
  

module.exports = UserModel;