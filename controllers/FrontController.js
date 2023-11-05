const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var cloudinary = require('cloudinary').v2;
const CouresModel = require('../models/Course');

cloudinary.config({
    cloud_name: 'dqpruenbu',
    api_key: '647729552238854',
    api_secret: 'e-_ZXBG9zVQyhVTTGYNHg6iWv8s'
})

class FrontController {

    static home = async (req, res) => {
        try {
            const { name, image, id } = req.data1
            const btech = await CouresModel.findOne({userId:id, course:'btech'}) 
            const bca = await CouresModel.findOne({userId:id, course:'bca'}) 
            const mca = await CouresModel.findOne({userId:id, course:'mca'}) 
            console.log(btech);
            res.render('dashboard', {  name: name, image: image,btech:btech, bca:bca, mca:mca })

        } catch (error) {
            console.log(error);
        }
    }

    static about = (req, res) => {
        try {
            const {name,image} = req.data1
            res.render('about',{image,name})
        } catch (error) {
            console.log(error);
        }
    }

    static team = (req, res) => {
        try {
            const { name, image } = req.data1
            res.render('team',{name,image})
        } catch (error) {
            console.log(error);
        }
    }
        
    static profile = (req, res) => {
        try {
            const { name, image, email} = req.data1
            console.log(req.data1);
            res.render('profile',{name:name, image:image, email:email,msg: req.flash('success'),msg1: req.flash('error')})
        } catch (error) {
            console.log(error);
        }
    }

    static contact = (req, res) => {
        try {
            const{ name, image } = req.data1
            res.render('contact',{name,image})
        } catch (error) {
            console.log(error);
        }
    }

    static login = (req, res) => {
        try {
            res.render('login', { msg: req.flash('success'), msg1: req.flash('error') })
        } catch (error) {
            console.log(error);
        }
    }

    static register = (req, res) => {
        try {
            res.render('register', { msg: req.flash('error') })
        } catch (error) {
            console.log(error);
        }
    }

    static pageNotFound = (req, res) => {
        try {
            const{ name, image } = req.data1
            res.render('page_not_found',{name,image})
        } catch (error) {
            console.log(error);
        }
    }

    //user insert

    static userInsert = async (req, res) => {
        try {
            //    console.log(req.files.image)

            const file = req.files.image
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'profileImage'
            })
            //   console.log(imageUpload)
            // res.render('team')
            // console.log(req.body);
            const { name, email, pass, cpass } = req.body
            const user = await UserModel.findOne({ email: email })
            console.log(user);
            if (user) {
                req.flash('error', 'Email alredy exits')
                res.redirect('/register')
            } else {
                if (name && email && pass && cpass) {
                    if (pass == cpass) {
                        // console.log('pass, cpass');
                        const Hashpassword = await bcrypt.hash(pass, 10)
                        const result = new UserModel({
                            name: name,
                            email: email,
                            password: Hashpassword,
                            image: {
                                public_id: imageUpload.public_id,
                                url: imageUpload.secure_url
                            }
                            // ConfirmPassword: cpass,

                        })
                        req.flash('success', 'Registeration Succusfully, Please Login')
                        await result.save()
                        res.redirect('/dashboard') //route ka url
                    } else {
                        // console.log('check');
                        req.flash('error', 'Password and Confirm Password does not exits')
                        res.redirect('/register')
                    }
                } else {
                    req.flash('error', 'all field are required')
                    res.redirect('/register')
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    static varifyLogin = async (req, res) => {
        try {
            // console.log('varifyLogin');
            const { email, password } = req.body
            if (email && password) {
                const user = await UserModel.findOne({ email: email })

                if (user != null) {
                    const isMatched = await bcrypt.compare(password, user.password)  
                    if (isMatched) {
                        if(user.role == 'admin'){
                            const token = jwt.sign({ ID: user.id }, 'Yash12346789bhatt@@');
                            // console.log(token);
                            res.cookie('token', token)
                            res.redirect('/admin/getAllData')
                        }
                        if(user.role == 'student'){
                            const token = jwt.sign({ ID: user.id }, 'Yash12346789bhatt@@');
                            // console.log(token);
                            res.cookie('token', token)
                            res.redirect('/dashboard')
                        }
                        
                    } else {
                        req.flash('error', 'Email & Password does not Match, Try Agian')
                        res.redirect('/')
                    }
                } else {
                    req.flash('error', 'You are not Registered User, Please Register')
                    res.redirect('/')
                }
            } else {
                req.flash('error', 'All field are Required')
                res.redirect('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    static logOut = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/')
        } catch(error) {
            console.log(error);
        }
    }


       // course Update

    //    static profileInsert = async (req, res) => {
    //     try {
    //         const d =req.data1
    //         const {name,email,image} =req.body
    //         const data = await UserModel.findByIdAndUpdate(d._id,{
    //         const imageID = user.image.profile_id,    
    //             name:name,
    //             email:email,
    //             image:image
    //         })
    //          console.log(data);
    //         req.flash('success', 'Profile Successfully Updated !')
    //         res.redirect('/profile')


    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    
    static profileInsert = async (req, res) => {
        try {
            let data = {}
            const { id } = req.data1
            const { name, email, image } = req.body
            if (req.files) {
                const user = await UserModel.findById(id)
                const imageId = user.image.public_id
                console.log(imageId)
                await cloudinary.uploader.destroy(imageId)
                const imageFile = req.files.image
                console.log(imageFile)
                const imageUpload = await cloudinary.uploader.upload(imageFile.tempFilePath, {
                    folder: 'profileImage'
                })
                data = {
                    name,
                    email,
                    image: {
                        public_id: imageUpload.public_id,
                        url: imageUpload.secure_url
                    }
                }
            } else {
                data = {
                    name,
                    email
                }
            }
            await UserModel.findByIdAndUpdate(id, data)
            req.flash('success', 'Profile successfully updated')
            res.redirect('/profile')


        } catch (error) {
            console.log(error);
        }
    }

    static changePassword = async(req,res) =>{
        try{
            const d =req.data1
            console.log(req.body);
            const { oldPass, newPass, cPass } = req.body
             console.log('current Data ->', req.data1.password);
             console.log(oldPass);
             bcrypt.compare(oldPass, req.data1.password, async function(err, result) {
                // result == false
                if(result == true){
                    if(newPass == cPass){
                        console.log('success');
                        const Hashpassword = await bcrypt.hash(newPass, 10)
                        const data = await UserModel.findByIdAndUpdate(d._id,{
                            password:Hashpassword,
                            
                        })
                        req.flash('success', 'Password Successfully change')
                        res.clearCookie('token')
                        res.redirect('/') 
                    }else{
                        req.flash('error', 'New password and Confirm Password  must be same')
                        res.redirect('/profile')
                    }
                 }else{
                    req.flash('error', 'Old password does not match')
                            res.redirect('/profile')
                 }
            });
         
        }catch(error){
            console.log(error);
        }
           
    }

}

module.exports = FrontController