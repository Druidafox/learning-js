import { model } from 'mongoose';

const Person = model('Person', {
    name: String,
    lastname: String,
    email: String,
    phone: String,
    age: Number,
})

export default Person;