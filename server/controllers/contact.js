let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let passport = require('passport')

// define the User Model instance
let userModel = require('../models/user')
let User = userModel.User; // alias

// create a reference to the contact model
let Contact = require('../models/contact')

module.exports.displayContactList = (req,res, next) => {
   
      Contact.find((err,contactList) => {
            if(err)
            {
               return console.error(err);
            }
            else{
               //console.log(ContactList)
               res.render('contact/list',{title:'BusinessContactsList',ContactList: contactList, displayName: req.user ? req.user.displayName : ''})
            }

      }).sort({last_name:1,first_name:1}); // sort by last name and then first name

}

module.exports.displayAddPage= (req,res,next) => {
    res.render('contact/add',{title:'Add Contact',displayName: req.user ? req.user.displayName : ''})
};

module.exports.processAddPage = (req,res,next) => {
    let newContact = Contact({
       "first_name": req.body.firstname,
       "last_name": req.body.lastname,
       "telephone": req.body.telephone,
       "email": req.body.email
    });
 
    Contact.create(newContact, (err,Contact) => {
       if(err)
       {
          console.log(err);
          res.end(err);
       }
       else{
          //refresh the contact list
          res.redirect('/contact-list')
       }
    });
 
 };

 module.exports.displayEditPage = (req,res,next) => {
    let id = req.params.id;
 
    Contact.findById(id,(err, contactToEdit) => {
       if(err)
       {
          console.log(err)
          res.end(err)
       }
       else{
          //show the edit view
          res.render('contact/edit',{title: "Edit Contact",contact: contactToEdit,displayName: req.user ? req.user.displayName : ''})
       }
 
    });
 };

 module.exports.processEditPage = (req,res,next) => {
    let id = req.params.id
  
    let updatedContact = Contact({
     "_id": id,
     "first_name": req.body.firstname,
     "last_name": req.body.lastname,
     "telephone": req.body.telephone,
     "email": req.body.email
    });
  
    Contact.updateOne({_id: id},updatedContact, (err) => {
    
        if(err)
        {
           console.log(err);
           res.end(err);
        }
        else{
           // refresh contact list
           res.redirect('/contact-list');
        }
    });

}

module.exports.performDelete = (req,res,next) => {

    let id = req.params.id;
 
    Contact.remove({_id: id},(err) =>
    {
       if(err)
       {
          console.log(err);
          res.end(err)
       }
       else{
          // refresh the contact list
          res.redirect('/contact-list')
       }
    });
 
 };



