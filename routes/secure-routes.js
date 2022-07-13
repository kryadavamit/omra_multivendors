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
const { sendEmail } = require("../lib/mailer");
const { request } = require("http");

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

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

// const videoUpload = multer({
//   storage: videoStorage,
//   limits: {
//   fileSize: 10000000 // 10000000 Bytes = 10 MB
//   },
//   fileFilter(req, file, cb) {
//     // upload only mp4 and mkv format
//     if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
//        return cb(new Error('Please upload a video'))
//     }
//     cb(undefined, true)
//  }
// })

router.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});
router.get("/test", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

router.patch("/details", async (req, res) => {
  const { _id } = req.user;
  console.log(_id);

  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: _id },
      {
        Merchant_Name: req.body.Merchant_Name,
        Merchant_Address: req.body.Merchant_Address,
        TypesOf_Bussiness: req.body.TypesOf_Bussiness,
        SubTypeOf_bussiness: req.body.SubTypeOf_bussiness,
        Merchant_Designation: req.body.Merchant_Designation,
        Year_of_establishment: req.body.Year_of_establishment,
        GST_No: req.body.GST_No,
        PAN_No: req.body.PAN_No,
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

router.get("/details", async (req, res) => {
  const { _id } = req.user;
  console.log(_id);

  try {
    const user = await UserModel.findOne({ _id: _id });
    //Fields

    res.json({
      success: "Sucessfully",
      user,
    });
  } catch (err) {
    res.json({
      message: err?.message,
    });
  }
});

router.get("/userDetails", async (req, res) => {
  const { _id, password, email } = req.user;
  console.log(_id);

  try {
    const user = await UserModel.find({});
    //Fields

    res.json({
      success: "Sucessfully",
      user,
    });
  } catch (err) {
    res.json({
      message: err?.message,
    });
  }
});

router.patch("/companyprofile", async (req, res) => {
  const { _id } = req.user;
  console.log({ "amit badman": req.user });

  try {
    const user = await UserModel.findOneAndUpdate(
      { _id },
      {
        Merchant_Name: req.body.Merchant_Name,
        company_Name: req.body.company_Name,
        description: req.body.description,
        Category1: req.body.Category1,
        Category2: req.body.Category2,
        Category3: req.body.Category3,
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

router.get("/companyprofile", async (req, res) => {
  const { _id } = req.user;
  console.log({ "amit badman": req.user });

  try {
    const user = await UserModel.findOne({ _id });
    //Fields

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.json({
      message: err?.message,
    });
  }
});
const upload = multer({ storage: imageStorage });

router.post(
  "/upload_product",
  upload.fields([
    { name: "product_image1" },
    { name: "product_image2" },
    { name: "product_image3" },
    { name: "product_image4" },
    { name: "product_image5" },
  ]),
  async (req, res) => {
    // const time = new Date().getTime();

    // let compressImagePath = path.join(
    //   __dirname,
    //   "../",
    //   "public",
    //   "images",
    //   fileName
    // );

    //     try {
    //     let ImageUrls = [];

    //     if (!req.files) return res.status(400).send("No files were uploaded.");

    //     await Promise.all( req.files.map(async (file) => {
    //         sharp(file.path)
    //           .resize(800, 800)
    //           .jpeg({ quality: 80 })
    //           .toFile( path.join(
    //             __dirname,
    //             "../",
    //             "public",
    //             "images",
    //             req.user.user?._id + "-product-" + file?.originalname
    //           ), async (err) => {
    //             if (err) {
    //               fs.unlinkSync(file.path);
    //               res.json({ success: false, message: err?.message });
    //             } else {
    //               fs.unlinkSync(file.path);
    //               console.log(`${process.env.BASE_URL}/product-image/${req.user.user?._id + "-product-" + file?.originalname }`);
    //               ImageUrls.push(
    //                 `${process.env.BASE_URL}/product-image/${req.user.user?._id + "-product-" + file?.originalname }`
    //               );
    // return  `${process.env.BASE_URL}/product-image/${req.user.user?._id + "-product-" + file?.originalname }`;
    //               console.log(ImageUrls);
    //             }
    //           });
    //       })).then((res) => {
    //         console.log({res,test:"test"})
    //         res.json({
    //           success: true,
    //           message: "avatar uploaded successfully",
    //           url:  ImageUrls,
    //         });
    //       }
    //     );

    // await Product.findOneAndUpdate(
    //   { auther_Id: req.user?.user?._id },
    //   {
    //     $set: {
    //       product_image: ImageUrls,
    //     },
    //   },
    //   {
    //     new: true,
    //     upsert: true,
    //   }
    // );
    // } catch (err) {
    //   console.log(err?.message);
    // }

    // const { user } = req.user;
    const { _id } = req.user;
    console.log({ heooloojhh: req.user });

    const userData = await UserModel.findOne(
      { _id: _id },
      { GST_No: 1, Merchant_Name: 1, TypesOf_Bussiness: 1 ,SubTypeOf_bussiness:1,Merchant_Address:1}
    );

    try {
      const product = await new Product({
        auther_Id: _id,
        Vendor_Id: userData.GST_No,
        vendors_name: userData.Merchant_Name,
        TypesOf_Bussiness: userData.TypesOf_Bussiness,
        SubTypeOf_bussiness:userData.SubTypeOf_bussiness,
        Merchant_Address:userData.Merchant_Address,
        product_name: req.body.product_name,
        manufacturer_name: req.body.manufacturer_name,
        manufacturer_phone_no: req.body.manufacturer_phone_no,
        manufacturer_address: req.body.manufacturer_address,
        brand: req.body.brand,


        product_image1: req.files.product_image1?.length > 0 ? `${process.env.BASE_URL}/product-image/${req.files.product_image1[0].filename}`: undefined,
        product_image2: req.files.product_image2?.length > 0 ? `${process.env.BASE_URL}/product-image/${req.files.product_image2[0].filename}`: undefined,
        product_image3: req.files.product_image3?.length > 0 ? `${process.env.BASE_URL}/product-image/${req.files.product_image3[0].filename}`: undefined,
        product_image4: req.files.product_image4?.length > 0 ? `${process.env.BASE_URL}/product-image/${req.files.product_image4[0].filename}`: undefined,
        product_image5: req.files.product_image5?.length > 0 ? `${process.env.BASE_URL}/product-image/${req.files.product_image5[0].filename}`: undefined,

        // product_image2: req.files.product_image2[0].filename,
        // videos: req.body.videos,
        category: req.body.category,
        sub_category: req.body.sub_category,
        price: req.body.price,
        product_Specification: req.body.product_Specification,
        product_description: req.body.product_description,
        capacity: req.body.capacity,
        model_no: req.body.model_no,
        type: req.body.type,
      });
      await product.save();
      res.status(200).send(product);
    } catch (err) {
      res.status(500).send({ message: err?.message });
    }
  }
);

//=============================================

router.patch(
  "/update_product_By",
  upload.fields([
    { name: "product_image1" },
    { name: "product_image2" },
    { name: "product_image3" },
    { name: "product_image4" },
    { name: "product_image5" },
  ]),
  async (req, res) => {
    const { _id } = req.user;
    console.log(req.body);
    console.log(_id);

    try {
      const user = await Product.findOneAndUpdate(
        { _id: _id },
        {
          product_name: req.body.product_name,
          manufacturer_name: req.body.manufacturer_name,
          manufacturer_phone_no: req.body.manufacturer_phone_no,
          manufacturer_address: req.body.manufacturer_address,
          brand: req.body.brand,

          product_image1: `${process.env.BASE_URL}/product-image/${req.files.product_image1[0].filename}`,
          product_image2: `${process.env.BASE_URL}/product-image/${req.files.product_image2[0].filename}`,
          product_image3: `${process.env.BASE_URL}/product-image/${req.files.product_image3[0].filename}`,
          product_image4: `${process.env.BASE_URL}/product-image/${req.files.product_image4[0].filename}`,
          product_image5: `${process.env.BASE_URL}/product-image/${req.files.product_image5[0].filename}`,

          // product_image2: req.files.product_image2[0].filename,
          // videos: req.body.videos,
          category: req.body.category,
          sub_category: req.body.sub_category,
          price: req.body.price,
          product_Specification: req.body.product_Specification,
          product_description: req.body.product_description,
          capacity: req.body.capacity,
          model_no: req.body.model_no,
          type: req.body.type,
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
  }
);

router.get("/get_products", async (req, res) => {
  // const { user } = req.user;
  // const userData = await UserModel.findOne(
  //   { _id: user._id },
  //   { GST_No: 1, Merchant_Name: 1 ,TypesOf_Bussiness: 1}
  // );
  try {
    const product = await Product.find();

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
///
router.get("/get_product/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// update product====================================Update product==

router.patch("/update_product/:_id", async (req, res) => {
  const { _id } = req.params;
  const update_product = req.body;
  console.log(req.body.category);
  console.log(_id);

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post Available");

    const product = await Product.findOne({ _id });
    product.isApproved = req.body.isApproved;

    await product.save();
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({ message: err?.message });
  }
});

//===================================  declined 

router.patch("/declined_product/:_id", async (req, res) => {
  const { _id } = req.params;
  const update_product = req.body;
  console.log(req.body.category);
  console.log(_id);

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post Available");

    const product = await Product.findOne({ _id });
    product.isDeclined = req.body.isDeclined;
    product.status = req.body.status;
    product.message = req.body.message;

    await product.save();
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({ message: err?.message });
  }
});

/// product profile

router.post("/company_profile", async (req, res) => {
  const { user } = req;

  const userData = await ProductProfile.findOne(
    { _id: user.id },
    { GST_No: 1, Merchant_Name: 1 }
  );

  try {
    const product = new ProductProfile({
      Vendor_Id: userData.GST_No,
      vendors_name: userData.Merchant_Name,
      product_name: req.body.product_name,
      description: req.body.description,

      type: req.body.type,
    });
    await product.save();
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({ message: err?.message });
  }
});

module.exports = router;
