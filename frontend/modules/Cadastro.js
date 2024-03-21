import validator from "validator";

export default class Cadastro {
     constructor(formClass) {
          this.formClass = document.querySelector(formClass);
          this.init();

     }
     init() {
          this.events();

     }
     events() {
          if (!this.formClass) return;
          this.formClass.addEventListener('submit', e => {
               e.preventDefault();
               this.validate(e);
          });
     }
     validate(e) {
          const el = e.target;
          const name = el.querySelector('input[name="name"]');
          const email = el.querySelector('input[name="email"]'); 
          const password = el.querySelector('input[name="password"]');
          let error = false;

          if (!validator.isEmail(email.value)) {
               alert('Email inválido');
               error = true;
          
          }

          if (password.value.length < 3 || password.value > 20) {
               alert('sua senha precisa ter entre 3 a 20 caracteres ');
               error = true;
          }

          if(!error) el.submit();
          

          // console.log(name.value, email.value, password.value);
     }
}