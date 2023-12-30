<template>
    <div>
    <h1>ByConnect</h1>
    <h3>Cadastro</h3>
    <form class="form" @submit.prevent="submitForm">
      <label for="name">Nome:</label>
      <input type="text" id="name" v-model="formData.name" required>

      <label for="username">Usuário:</label>
      <input type="text" id="username" v-model="formData.username" required>

      <label for="email">E-mail:</label>
      <input type="email" id="email" v-model="formData.email" required>

      <label for="password">Senha:</label>
      <input type="password" id="password" v-model="formData.password" required>

      <label for="confirmPassword">Repetir Senha:</label>
      <input type="password" id="confirmPassword" v-model="formData.confirmPassword" required>

      <label for="phone">Telefone:</label>
      <input type="tel" id="phone" v-model="formData.phone" required>

      <label for="dob">Data de Nascimento:</label>
      <input type="date" id="dob" v-model="formData.dob" required>

      <button @click.prevent="registration" type="submit" class="register-button">Cadastrar</button>
    </form>
    </div>
    
    
    </template>

<script>
  import {mapActions} from "vuex";
  import router from "@/routers/router";

export default {
  data() {
    return {
      formData: {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dob: '',
      },
    };
  },
  methods: {
    ...mapActions([
      "register"
    ]),
    registration(){
     this.register(this.formData)
     router.push("/login"); 
     alert("usuario cadastrado!")
    },

    
    submitForm() {
      console.log('Dados do formulário:', this.formData);
    },
  },
};
</script>


<style>
.register-button {
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin-top: 20px;
  background-color: #F19F05;
}

.form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

</style>