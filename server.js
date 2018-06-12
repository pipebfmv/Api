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
    {id: 0, username: 'pipe', password: '666', name: 'Luis Felipe Benavides Narvaez', email: 'felipe@hotmail.com'},
	{id: 1, username: 'john', password: '999', name: 'John Alejandro Gomez Hernandes', email: 'jOHN@hotmail.com'}
];

let groups = [
    {id: 0, group: 'La guanga', integrantes: '200', director: 'Jairo', email: 'jairo@hotmail.com', phone: '3156458578'},
    {id: 1, group: 'Raices', integrantes: '180', director: 'Flavio Criollo', email: 'flavio@hotmail.com', phone: '318789456'}
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

// Listar todos los grupos
app.get('/groups', (req, res) => {
    let pos = 0;
    groups.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(groups)
})

// Eliminar un grupo
app.delete('/groups/:id',(req, res) => {
    let params = req.params;
    group.splice(params.id, 1);
    res.send('Group delete')
})

// Actualizar un grupo
app.put('/groups/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    groups[params.id]['group'] = data.Group;
    groups[params.id]['integrantes'] = data.Integrantes;
	groups[params.id]['email'] = data.Email;
    groups[params.id]['phone'] = data.Phone;
    res.send("Group update")
})

// Crear grupos
app.post('/groups', (req, res) => {
    let data = req.body;
    let consecutive = groups.length;
    let gruopTmp = [{
        id: consecutive,
        group: data.Group,
		integrantes: data.Integrantes,
		director: data.Director,
		email: data.Email,
        phone: data.Phone,
        
        
    }];
    groups.push(groupTmp[0])

    res.send("Gruop create")
})

// *************************************************************
// *************************************************************
 
http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})