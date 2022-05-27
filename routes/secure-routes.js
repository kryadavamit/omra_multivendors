const express = require('express');
const router = express.Router();
const UserModel=require("../model/model")






router.get(
  '/profile',
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
);
router.get(
  '/test',
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
);


router.patch(
  '/details',
  (req, res) => {
    const {_id} = req.user;

    try{
    const user = UserModel.findOneAndUpdate({_id},{
      Merchant_Name:req.body.Merchant_Name,
      Merchant_Address:req.body.Merchant_Address,
      TypesOf_Bussiness:req.body.TypesOf_Bussiness,
      SubTypeOf_bussiness:req.body.SubTypeOf_bussiness,
      Year_of_establishment:req.body.Year_of_establishment,
      GST_No:req.body.GST_No,
      PAN_No:req.body.PAN_No,
     

    },{
      new: true,
  upsert: true
    })
    //Fields



    res.json({
      message: 'User Updated Sucessfully',
      user
    })

  }catch(err){
    res.json({
      message: err?.message
    })
  }
  }
);

module.exports = router;