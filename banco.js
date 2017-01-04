// banco.js
var mongoose = require('mongoose');
 
// Cria um novo Schema com os campos que iremos utilizar no model Contato
var bancoSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  id: String,
  dispositivos: Number
});
 
//Define o model do banco
mongoose.model('banco', bancoSchema);
