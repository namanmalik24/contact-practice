const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let contacts = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '111-111-1111' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '222-222-2222' }
];

let nextId = 3;

app.get('/', (req, res) => {
    
  
    res.send('Welcome to the Contact Book API!');
  
});

app.get('/contacts', (req, res) => {
  res.json(contacts);
});

app.get('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const contact = contacts.find(c => c.id === parseInt(id));
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send('Contact not found');
  }
});

app.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email) {
    return res.status(400).send('Name and email are required');
  }
  const newContact = {
    id: nextId++,
    name,
    email,
    phone
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const contactIndex = contacts.findIndex(c => c.id === parseInt(id));

  if (contactIndex !== -1) {
    const originalContact = contacts[contactIndex];
    const updatedContact = { ...originalContact, ...req.body };
    contacts[contactIndex] = updatedContact;
    res.json(updatedContact);
  } else {
    res.status(404).send('Contact not found');
  }
});

app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const contactIndex = contacts.findIndex(c => c.id === parseInt(id));

  if (contactIndex !== -1) {
    contacts.splice(contactIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Contact not found');
  }
});

app.listen(port, () => {
  console.log(`Contact Book API listening on port ${port}`);
});