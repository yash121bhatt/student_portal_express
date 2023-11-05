const CouresModel = require('../../models/Course')
const nodemailer = require('nodemailer')
class AdminController {

  static GetAllData = async (req, res) => {
    try {
      //   const currentUser =req.data1
      const { name, image, _id } = req.data1
      const data = await CouresModel.find()
      //   console.log(data);
      res.render('admin/getAllData', { name: name, image: image, d: data })
    }
    catch (error) {
      console.log(error);
    }
  }


  static UpdateStatus = async (req, res) => {
    try {
      //  console.log(req.body);
      const { name,email,status,comment } = req.body
      await CouresModel.findByIdAndUpdate(req.params.id, {
        comment: comment,
        status: status
      })
      this.sendEmail(name,email,status,course)
      res.redirect('/admin/getAllData')
    }
    catch (error) {
      console.log(error);
    }
  }

  static sendEmail = async (name,email,status,course) => {
    //  console.log("comment");
    //  console.log(name,email,course);
    // connenct with the smtp server

    let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,

        auth: {
            user: "yash121bhatt@gmail.com",
            pass: "xtigljftnzunrvqr",
        },
    });
    let info = await transporter.sendMail({
        from: "test@gmail.com", // sender address
        to: email, // list of receivers
        subject: `Coures ${status}`, // Subject line
        text: "hello", // plain text body
        html: `<b>${name}</b> Course  <b>${status}</b> successful! `, // html body
    });
};

}

module.exports = AdminController