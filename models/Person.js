const mongoose = require('mongoose');

const Person = mongoose.model('Person',{
name:String,
lastname:String,
email:String,
phone:String,
age:Number,
})

module.exports=Person