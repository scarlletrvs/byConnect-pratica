<template>
    <div>
      <div class="user" v-for="user in this.$store.state.users" :key="user.email">
        <h3>{{ user.username }}</h3>
        <p>{{ user.email }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
      };
    },
    async created() {
      await this.$store.dispatch('fetchUsers');
      console.log("users perfil", this.$store.state.users);
    },
  };
  </script>
  
<style>
.user{
    background-color: azure;
    color: black;
}
</style>
