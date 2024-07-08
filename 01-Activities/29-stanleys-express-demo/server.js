const express = require('express');
const { readFile } = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;
const { v4: uuid } = require('uuid')

let students = [];

class Student {
    constructor(firstName, lastName) {
        this.id = uuid(),
            this.firstName = firstName,
            this.lastName = lastName
    }
}

const addStudent = (firstName, lastName) => {
    const newStudent = new Student(firstName, lastName);
    students.push(newStudent);
}

const getStudents = () => students;

const getStudentsById = () => students.find(s => s.id === id);

const loadDatabase = () => {
    readFile(`./db/students.json`);
}

const deleteStudent = (id) => {
    students = students.filter(student => student.id != id)
}

app.use(express.static('./public'));
app.use(express.json());

// Input: route / params / querystrings / body (json payload from request)
// Output: View (HTML) / JSON (api) 

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
});

app.get('/api/students', (req, res) => {
    console.log('Get students request received')
    res.json(getStudents())
    console.log(`${students.length} students sent to client`)
})

app.get('/api/students/:id', (req, res) => {
    console.log('Get students request received')
    const selectedStudent = getStudentsById(parseInt(req.params.id))
    res.json(selectedStudent)
    console.log(`${students.length} students sent to client`)
})

app.post('/api/student', (req, res) => {
    const { firstName, lastName } = req.body;
    addStudent(firstName, lastName);
    res.json({ message: `Student added...` })
})

app.delete('/api/students/:id', (req, res) => {
    console.log('Delete student by ID request received')
    deleteStudent(parseInt(req.params.id))
    res.json({ message: `Student id: ${req.params.id} deleted...` })
})

loadDatabase();
app.listen(PORT, () => `Server is listening on port ${PORT}`);