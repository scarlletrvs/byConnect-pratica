<!-- App.vue -->
<template>
  <v-theme-provider root>
    <v-app>
      <v-navigation-drawer app v-model="drawer" v-if="shouldShowDrawer">

        <v-list>
          
          <v-list-item link to ="/">
            <v-icon>mdi-home</v-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item :to="`/perfil/${$store.state.userProfile}`">
            <v-icon>mdi-account</v-icon>
            <v-list-item-content>
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to ="/config">
            <v-icon>mdi-cog</v-icon>
            <v-list-item-content>
              <v-list-item-title>Configurações</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to ="/usuarios">
            <v-icon>mdi-account-multiple</v-icon>
            <v-list-item-content>
              <v-list-item-title>Usuários</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>
      
      <v-app-bar app class="appBar"  v-if="shouldShowDrawer">
        <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title >By Connect  </v-toolbar-title>
        <v-btn icon  class="icon" @click="toggleTheme">
        <v-icon>
          mdi-weather-night
        </v-icon>
      </v-btn>
        <v-btn class="btn-sair" @click="singOut">Sair</v-btn>
      </v-app-bar>
     
      <router-view @click="closeDrawer"></router-view>
        </v-app>
  </v-theme-provider>
</template>

<script>
import { mapActions} from "vuex";
import router from "./routers/router";
import { auth } from "./configuracao";


export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    shouldShowDrawer() {
      return !['/login', '/cadastro'].includes(this.$route.path);
    },
   
  
  },
  methods: {
    ...mapActions(["logout"]),

    singOut(){
     this.logout()
     router.go(0);   
      },

    toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      },

    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    closeDrawer() {
      if (this.drawer) {
        this.drawer = false;
      }
    },
  
  },
  async created() {
    
    await this.$store.dispatch('fetchUser')
    await this.$store.dispatch('fetchUserprofile', auth.currentUser.email)
  



},
 
}
</script>
import  {mapActions} from "vuex";

<style>
.appBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  padding: 0 16px; 
}

.btn-sair {
  margin-left: auto; 
}
.icon{
  
  margin-left: 5px;
}
</style>
