const app = require('express')();
const express = require('express');
const path = require('path');

/**
 * criar um id randômico para cada novo usuário
 */
const database = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/index.html'));
});

app.post('/users', (req, res) => {
  console.log("adding user: " + JSON.stringify(req.body));
  database.push({ ...req.body, id: createUUID() });
  res.status(200).json({ result: "ok" });
});

app.put('/users/:id', (req, res) => {
  console.log("updating user: " + JSON.stringify(req.body));
  console.log(req.params)
  var match = database.map((item, index) => { if (item.id === req.params.id) return index }).filter(item => item);
  console.log(match)
  res.status(200).json({ result: "ok" });
});

app.get('/users', (req, res) => {
  console.log("listing " + database.length + " users");
  res.status(200).json({ users: database });
});

app.listen(8001);
console.log('Servidor rodando na porta 8001!');


function createUUID() {
  // http://www.ietf.org/rfc/rfc4122.txt
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}