const express = require('express');
const app = express();
const cors = require("cors");
const port = 5000;

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors());
//this is my DB
const students = [
  {
    name: 'Marc',
    age: 20
  },
  {
    name: 'Zheniya',
    age: 23
  },
  {
    name: 'Victoria',
    age: 21
  },
  {
    name: 'Dean',
    age: 34
  },
  {
    name: 'Monica',
    age: 3434
  }
]

app.get('/', (req, res) => {
  res.send('hello from the server!')
})

app.get('/students', (req,res) => {
  res.json(students)
})

app.post('/students', (req, res) => {
  students.push(req.body)
  res.sendStatus(200)
})

app.listen(port, err => {
  if(err) throw new Error('Something is not working, sorry :( ...')
  console.log(`Server is running amazingly on port ${port}`)
})