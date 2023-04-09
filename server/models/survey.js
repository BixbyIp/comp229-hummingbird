let mongoose = require('mongoose')

// create a model class
let surveyModel = mongoose.Schema({
    title: String,
    start_date: Date,
    end_date: Date,
    description: String
},
{
    collection: "survey"
});

module.exports = mongoose.model('Survey',surveyModel)
