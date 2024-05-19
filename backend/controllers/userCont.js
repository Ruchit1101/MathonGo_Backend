const User = require('../models/user');
const nodemailer = require('nodemailer');
const fs =require('fs');
const csv = require('csv-parser');
const List= require('../models/list');
exports.addUsers= async(req, res)=>{
       const {Id}=req.params;
       const file=req.file;
       if(!file){
              return res.status(400).json({error:'No file uploaded...'})
       }
       const list= await List.findById(Id);
       if(!list){
              return res.status(404).json({error:'List Not Found...'}) 
       }
       const results =[];
       const errors=[];
       const customProp=list.customProp;
       fs.createReadStream(file.path).pipe(csv()).on('data', (data)=>{
              const user={
                     name:data.name,
                     email:data.email,
                     prop:{}
              };
              for(const key in customProp){
                     user.properties[key]=data[key]||customProp.get(key);
              }
              results.push(user);
       })
       .on('end', async()=>{
              fs.unlinkSync(file.path);
              let count=0;
              for(const userData of results){
                     try{
                            const newUser = new User({...userData, list:Id});
                            await newUser.save();
                            count++;
                     }
                     catch(error){
                            errors.push({user:userData, error:error.message});
                     }
              }
              res.json({
                     count,
                     errorCount:errors.length,
                     errors,
                     totalInList: await User.countDocuments({list:Id}),
              });
       });
};

exports.sendEmail = async (req, res) => {
       const { Id } = req.params;
       const { subject, body } = req.body;
     
       const list = await List.findById(Id).populate('users');
       if (!list) {
         return res.status(404).json({ error: 'List not found' });
       }
     
       const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_PASS
         }
       });
     
       for (const user of list.users) {
         let emailBody = body;
         for (const [key, value] of user.properties.entries()) {
           emailBody = emailBody.replace(`[${key}]`, value);
         }
     
         const mailOptions = {
           from: process.env.EMAIL_USER,
           to: user.email,
           subject,
           text: emailBody
         };
     
         transporter.sendMail(mailOptions, (error, info) => {
           if (error) {
             console.error(`Error sending email to ${user.email}: `, error);
           }
         });
       }
     
       res.json({ message: 'Emails sent successfully' });
};