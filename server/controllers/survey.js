let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let passport = require('passport')

// define the User Model instance
let userModel = require('../models/user')
let User = userModel.User; // alias

// create a reference to the survey model
let Survey = require('../models/survey')

module.exports.displaySurveyList = (req,res, next) => {
   
      Survey.find((err,surveyList) => {
            if(err)
            {
               return console.error(err);
            }
            else{
               //console.log(SurveyList)
               res.render('survey/list',{title:'Survey List',SurveyList: surveyList, displayName: req.user ? req.user.displayName : ''})
            }

      }).sort({last_name:1,first_name:1}); // sort by last name and then first name

}

module.exports.displayAddPage= (req,res,next) => {
    res.render('survey/add',{title:'Add Survey',displayName: req.user ? req.user.displayName : ''})
};

module.exports.processAddPage = (req,res,next) => {
    let newSurvey = Survey({
       "first_name": req.body.firstname,
       "last_name": req.body.lastname,
       "telephone": req.body.telephone,
       "email": req.body.email
    });
 
    Survey.create(newSurvey, (err,Survey) => {
       if(err)
       {
          console.log(err);
          res.end(err);
       }
       else{
          //refresh the survey list
          res.redirect('/survey')
       }
    });
 
 };

 module.exports.displayEditPage = (req,res,next) => {
    let id = req.params.id;
 
    Survey.findById(id,(err, surveyToEdit) => {
       if(err)
       {
          console.log(err)
          res.end(err)
       }
       else{
          //show the edit view
          res.render('survey/edit',{title: "Edit Survey",survey: surveyToEdit,displayName: req.user ? req.user.displayName : ''})
       }
 
    });
 };

 module.exports.processEditPage = (req,res,next) => {
    let id = req.params.id
  
    let updatedSurvey = Survey({
     "_id": id,
     "first_name": req.body.firstname,
     "last_name": req.body.lastname,
     "telephone": req.body.telephone,
     "email": req.body.email
    });
  
    Survey.updateOne({_id: id},updatedSurvey, (err) => {
    
        if(err)
        {
           console.log(err);
           res.end(err);
        }
        else{
           // refresh survey list
           res.redirect('/survey');
        }
    });

}

module.exports.performDelete = (req,res,next) => {

    let id = req.params.id;
 
    Survey.remove({_id: id},(err) =>
    {
       if(err)
       {
          console.log(err);
          res.end(err)
       }
       else{
          // refresh the survey list
          res.redirect('/survey')
       }
    });
 
 };



