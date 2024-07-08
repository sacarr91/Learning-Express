const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const students = [];

class Student {
    constructor(id, firstName, lastName) {
        this.id = id,
            this.firstName = firstName,
            this.lastName = lastName
    }
}

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
});

app.delete('/', (req, res) => {
    res.send(`gotchu fam. she gone.`)
})
app.listen(PORT, () => `Server is listening on port ${PORT}`);