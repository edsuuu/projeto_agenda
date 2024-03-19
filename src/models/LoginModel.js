const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');


const LoginSchema = new mongoose.Schema({
     email: { type: String, required: true },
     password: { type: String, required: true },
})

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
     constructor(body) {
          this.body = body;
          this.errors = [];
          this.login = null;
     }
     //erro nesse methodh de login, nao esta autenticando
     
     async logar() {
          this.valida();
          if (this.errors.length > 0) return;

          this.user = await LoginModel.findOne({ email: this.body.email });

          if (!this.user) {
               this.errors.push('Usuário não existe');
               return;  //para não executar o resto do código se o usuário não existe. 

          }

          if (bcryptjs.compareSync(this.body.password, this.user.password)) {
               this.errors.push('Senha inválida');
               this.user = null; //para não retornar o usuário se a senha estiver errada.
               return;
          }
     }

     async register() {
          this.valida();

          if (this.errors.length > 0) return;

          this.userExists();

          if (this.errors.length > 0) return;

          const salt = bcryptjs.genSaltSync();
          this.body.password = bcryptjs.hashSync(this.body.password, salt);

          this.user = await LoginModel.create(this.body);

     }


     async userExists() {
          const user = await LoginModel.findOne({ email: this.body.email });

          if (user) this.errors.push('Usuário já existe');

     }

     valida() {
          this.cleanUp()
          //validacao
          //email precisa ser valido
          //a senha precisa ter entre 3 e 50 caracteres
          if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

          if (this.body.password.length < 3 || this.body.password.length > 20) {
               this.errors.push('A senha precisa ter entre 3 e 20 caracteres')
          };


     }

     cleanUp() {
          for (const key in this.body) {
               if (typeof this.body[key] !== 'string') {
                    this.body[key] = '';
               }
          }
          this.body = {
               email: this.body.email,
               password: this.body.password,

          };
     }
}

module.exports = Login; 