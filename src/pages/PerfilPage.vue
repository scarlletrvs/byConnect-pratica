<template>
    <div class="template">
      <h3>perfil</h3>
      <h3>{{ username }}</h3>
     
    </div>
  </template>
  
  <script>
  export default {
   
      methods: {
    fetchData() {
      this.username = this.$route.params.username;
    },
  },
     
    created() {
    this.fetchData();
  }
};
  </script>
  
  <style>
  .title {
    color: var(--v-app-primary-light); /* Cor do texto do Vuetify */
  }
  body {
    background-color: var(--v-app-background-light); /* Cor de fundo do Vuetify no tema light */
  }
  .template{
    padding-top: 8%;
  }
  </style>
  