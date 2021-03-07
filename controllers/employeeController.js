const express = require('express')
const router = express.Router()
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Employee = require("../src/models/employeeschema");


router.get('/', (req, res) => {
    res.render("add-edit-employee.hbs", {
        viewTitle: "Insert Employee"
    });
});


router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    // console.log('reqq',req.body)
    // console.log(res)
    // const result = await cloudinary.uploader.upload(req.file.path);
    // res.json(result)
    // Create new user
    // console.log(req.body)
    let employee = new Employee({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      pancard: req.body.pancard,
      // cloudinary_id: result.secure_url,
      basicsalary: req.body.basicsalary,
      da: req.body.da,
      hra: req.body.hra,
      medical: req.body.medical,
      proftax: req.body.proftax,
      incometax: req.body.incometax,
      providentfund: req.body.providentfund
    });

    // Save user
    const ans = await employee.save();
    console.log('ans',ans)
    res.end()
  } 
  catch (err) {
    console.log(err);
    res.end()
  }
});

module.exports = router
