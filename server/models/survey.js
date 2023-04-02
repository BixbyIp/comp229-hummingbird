let mongoose = require('mongoose')

// create a model class
let surveyModel = mongoose.Schema({
    first_name: String,
    last_name: String,
    telephone: String,
    email: String

},
{
    collection: "survey"
});

module.exports = mongoose.model('Survey',surveyModel )
