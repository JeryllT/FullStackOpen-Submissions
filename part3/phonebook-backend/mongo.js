const mongoose = require('mongoose')

if (process.argv < 3) {
    console.log('Please adhere to the follow format: node mongo.js <password> <name> <number>')
    process.exit(1)
}

const pass = process.argv[2]
const url = `mongodb+srv://fullstackopen:${pass}@fsc.sz66ka8.mongodb.net/phonebook?retryWrites=true&w=majority`

const connection = mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('returning all persons documents')
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
        })

} else if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    connection
        .then(result => {
            console.log('connected')
    
            const person = new Person({
                name: name,
                number: number
            })
    
            return person.save()
        })
        .then(() => {
            console.log(`Added ${name} number ${number} to phonebook`)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))

} else {
    console.log('Please adhere to the follow format: node mongo.js <password> <name> <number>')
    process.exit(1)
}







