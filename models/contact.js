const mongoose = require('mongoose');// schema is made by mongoose so we require mongoose

//Define Schema
const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});

//Define collection name like Table name
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;