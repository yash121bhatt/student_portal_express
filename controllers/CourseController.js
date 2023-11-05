const CouresModel = require('../models/Course')
const nodemailer = require('nodemailer')
class CourseController {

    static courseInsert = async (req, res) => {
        try {

            // console.log(req.body);
            const { id } = req.data1
            const { name, email, phone, city, address, course } = req.body
            const result = new CouresModel({
                name: name,
                email: email,
                phone: phone,
                city: city,
                address: address,
                course: course,
                userId: id
            })
            console.log(result);
            await result.save()
            this.sendEmail(name,email,course)
            res.redirect('/courseDisplay')

        } catch (error) {
            console.log(error);
        }
    }


    static courseDisplay = async (req, res) => {
        try {
            const { name, image, id } = req.data1
              
            // console.log(req.body);
            console.log(id);
            const data = await CouresModel.find({
                userId : id
            })
            console.log(data);
            // console.log(data);
            res.render('courseDisplay', { d: data, name: name, image: image })

        } catch (error) {
            console.log(error);
        }
    }


    static courseView = async (req, res) => {
        try {
            const { name, image } = req.data1
            //   console.log(req.params.id);
            const data = await CouresModel.findById(req.params.id)
            console.log(data);
            res.render('courseView', { d: data, name: name, image: image })

        } catch (error) {
            console.log(error);
        }
    }

    static courseEdit = async (req, res) => {
        try {
            const { name, image } = req.data1
            console.log(req.params.id);
            const data = await CouresModel.findById(req.params.id)
            console.log(data);
            res.render('courseEdit', { d: data, name: name, image: image })


        } catch (error) {
            console.log(error);
        }
    }

    static courseUpdate = async (req, res) => {
        try {

            const { name, email, phone, city, address, course } = req.body
            const data = await CouresModel.findByIdAndUpdate(req.params.id, {

                name: name,
                email: email,
                phone: phone,
                city: city,
                address: address,
                course: course
            })
            res.redirect('/courseDisplay')  //route ka path
            // console.log(data);


        } catch (error) {
            console.log(error);
        }
    }


    static courseDelete = async (req, res) => {
        try {

            //   console.log(req.params.id);
            const data = await CouresModel.findByIdAndDelete(req.params.id)
            console.log(data);
            res.redirect('/courseDisplay')

        } catch (error) {
            console.log(error);
        }
    }


    static sendEmail = async (name,email,course) => {
        // console.log("comment");
        // console.log(name,email,course);
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
            subject: `Create Blog Registration Succesfully`, // Subject line
            text: "hello", // plain text body
            html: `<b>${name}</b> Registration is  <b>${course}</b> successful! `, // html body
        });
    };

}
module.exports = CourseController