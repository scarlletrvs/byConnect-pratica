<template>
  <div class="template">
    <h3>Home</h3>
    <postNew  @post-new="handlePostNew"/>
    <postCard v-for="post in $store.state.posts" :key="post.id" :dados-post="post"/>
  </div>
</template>

<script>
import postNew from '@/components/postNew.vue';
import postCard from '@/components/postCard.vue';
import {mapActions} from 'vuex';
import { auth } from '../configuracao/index';

export default {
  components: {
    postNew,
    postCard
  },
  
  methods: {
    ...mapActions(["armazenarPosts", "fetchUserNameByEmail", "fetchPosts"]),

 
    async handlePostNew(newPost) {
      try {
        await this.$store.dispatch('fetchUserNameByEmail', auth.currentUser.email);

        const post = {
          id: newPost.id,
          userName: this.$store.state.userName || "Nome Padrão",
          image: newPost.imagePost,
          text: newPost.text,
          email: auth.currentUser.email,
        };

        this.armazenarPosts(post);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    },


 
},
async created() {
      // Chame a ação para buscar os posts ao carregar a página
      await this.fetchPosts();
    },
    
}

</script>

<style>
.title {
  color: var(--v-app-primary-light);
}
body {
  background-color: var(--v-app-background-light);
}
.template {
  padding-top: 7.4%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
</style>
