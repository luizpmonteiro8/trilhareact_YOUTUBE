const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let contacts = [];
let id = 1;

// Create
app.post('/contacts', (req, res) => {
  const { name, phone } = req.body;
  const contact = { id: id++, name, phone };
  contacts.push(contact);
  res.status(201).json(contact);
});

// Read
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// Update
app.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  const contact = contacts.find(c => c.id == id);
  
  if (contact) {
    contact.name = name;
    contact.phone = phone;
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// Delete
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  contacts = contacts.filter(c => c.id != id);
  res.status(204).end();
});

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});


//npm init -y
//npm install express cors body-parser