<template>
  <div class="template">
    <h3>Perfil</h3>
    <h3>{{ usernameProfile }}</h3>
    <postCard v-for="post in filteredPosts" :key="post.id" :dadosPost="post" />
  </div>
</template>

<script>
import postCard from '@/components/postCard.vue';

export default {
  components: {
    postCard
  },
  data() {
    return {
      allPosts: [],
    };
  },
  computed: {
    filteredPosts() {
      const userEmail = this.$route.params.email;
      return this.allPosts.filter(post => post.email === userEmail);
    },
    usernameProfile() {
      const email = this.$route.params.email;
      const user = this.$store.state.users.find(user => user.email === email);
      return user ? user.username : '';
    },
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch('fetchPostsForUser', this.$route.params.email);
      this.allPosts = this.$store.state.postsFilter;
    },
  },
  async created() {
    await this.fetchData();
    await this.$store.dispatch('fetchUsers');
  },
};
</script>

<style>
.title {
  color: var(--v-app-primary-light);
}

body {
  background-color: var(--v-app-background-light);
}

.template {
  padding-top: 8%;
}
</style>
