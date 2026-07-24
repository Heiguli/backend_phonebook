const mongoose = require('mongoose')

const password = process.argv[2]

/*if (process.argv.length < 5) {
  console.log('give password as argument')
  process.exit(1)
}*/


const url =  `mongodb+srv://hseikki_db_user:${password}@cluster0.vu7rnfn.mongodb.net/phonebookApp?appName=Cluster0`
mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})


if (process.argv.length === 5) {
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
