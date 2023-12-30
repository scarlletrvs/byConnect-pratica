<template>
<div>
<h1>ByConnect</h1>
<h3>Login</h3>
<form class="form">
      <label for="email">E-mail:</label>
      <input type="email" id="email" v-model="user.email" required>

      <label for="password">Senha:</label>
      <input type="password" id="password" v-model="user.password" required>

      <button @click.prevent="sigIn" type="submit" class="login-button">Login</button>
    </form>

    <button @click="goToCadastro">Cadastro</button>


</div>
</template>

<script>
import  {mapActions} from "vuex";

export default {
  data() {
    return {
      user:{}
    };
  },
  methods: {
    ...mapActions([
      "login"
    ]),
    sigIn(){
     this.login(this.user)
    },
 
    goToCadastro() {
      if (this.$route.path !== '/cadastro') {
        this.$router.push('/cadastro');
      }
    },
  },
};
</script>

<style>
.login-button {
  width: 100px; 
  height: 40px; 
  text-align: center;
  line-height: 40px; 
  margin: 20px 0; 
  background-color: #F19F05
}

.form{
    display:flex;
    flex-direction: column;
     margin-top: 4px;
  
}

</style>

