const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const app = express()

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ***************************************************************
// ***************************************************************

let users = [
    {id: 0, username: 'pipe', password: '666', name: 'Luis Felipe Benavides Narvaez', email: 'felipe@hotmail.com'}
];

let contacts = [
    {id: 0, name: 'Carlos Mosquera', phone: '1111111111', email: 'aaaaa@gmail.com'},
    {id: 1, name: 'Sara Gonzalez', phone: '2222222222', email: 'bbbbb@hotmail.com'}
];

// ***************************************************************
// ***************************************************************

app.get('/', (req, res) => {
    res.status(200).send("Welcome to API REST")
})

app.get('/users', (req, res) => {
    res.send(users)
})

// Validar usuarios al momento de hacer login
app.post('/validateUser', (req, res) => {
    let data = req.body;
    let usersTmp = [{success: false, id: 0, username: '', password: '', name: '', email: ''}];

    users.some(function (value, index, _arr) {
        if( (value.username == data.Username) && (value.password == data.Password) ){
            usersTmp[0]['success'] = true;
            usersTmp[0]['id'] = value.id;
            usersTmp[0]['username'] = value.username;
            usersTmp[0]['password'] = value.password;
            usersTmp[0]['name'] = value.name;
            usersTmp[0]['email'] = value.email;
           
            return true;
        }else{
            return false;
        }
    });

    res.send(usersTmp)
})

// Crear usuarios para una nueva cuenta
app.post('/createUser', (req, res) => {
    let data = req.body;
    let consecutive = users.length;
    let usersTmp = [{
        success: true,
        id: consecutive,
        username: data.Username,
        password: data.Password,
        name: data.Name,
        email: data.Email,
        
    }];
    users.push(usersTmp[0])

    res.send(usersTmp)
})

// Listar todos los contactos
app.get('/contacts', (req, res) => {
    let pos = 0;
    contacts.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(contacts)
})

// Eliminar un contacto
app.delete('/contacts/:id',(req, res) => {
    let params = req.params;
    contacts.splice(params.id, 1);
    res.send('Contact delete')
})

// Actualizar un contacto
app.put('/contacts/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    contacts[params.id]['name'] = data.Name;
    contacts[params.id]['phone'] = data.Phone;
    contacts[params.id]['email'] = data.Email;
    res.send("Contact update")
})

// Crear contactos
app.post('/contacts', (req, res) => {
    let data = req.body;
    let consecutive = contacts.length;
    let contactTmp = [{
        id: consecutive,
        name: data.Name,
        phone: data.Phone,
        email: data.Email,
        
    }];
    contacts.push(contactTmp[0])

    res.send("Contact create")
})

// *************************************************************
// *************************************************************
 
http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})