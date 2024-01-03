<template>
    <div class="postNew">
      <h3 @click="openPerfil(dadosPost.usuario)">{{ dadosPost.userName || 'Nome Padrão' }}</h3>
      <p>{{ dadosPost.email }}</p>
      <v-img v-if="dadosPost.image" :src="dadosPost.image"></v-img>
      <p style="color: black;">{{ dadosPost.text }}</p>
      <div class="button-edit-delete">
        <v-btn @click="openModalEditPost">editar</v-btn>
        <v-btn @click="deletePost">excluir</v-btn>
      </div>
      <modalEditPost ref="modalEditPostRef" :show="showModal" @close-dialog="closeModal" @save-post="savePost" />
    </div>
  </template>
  
  <script>
  import modalEditPost from "./modalEditPost.vue";
  
  export default {
    components: {
      modalEditPost,
    },
    props: {
      dadosPost: Object,
    },
    data() {
      return {
        showModal: false,
      };
    },
    methods: {
      deletePost() {
        this.$store.dispatch("deletePost", this.dadosPost.id);
      },
      openModalEditPost() {
       
        this.showModal = true;
       
        this.$refs.modalEditPostRef.openDialog();
      },
      closeModal() {
        
        this.showModal = false;
      },
      savePost(textEditPost) {
      this.$store.dispatch("editPost", {
        postId: this.dadosPost.id,
        newText: textEditPost,
      });
    },
    openPerfil() {
  console.log('Abrindo perfil para:', this.dadosPost.userName);
  this.$router.push({
    path: `/perfil/${this.dadosPost.email}`,
  });
},

  },

    
  };
  </script>
  
  <style>
  .postNew {
    background-color: #cccccc;
    padding: 6px;
    width: 98%;
    flex-direction: column;
    border-radius: 15px;
    height: auto;
  }
  
  .postNew h3 {
    font-size: 14px;
    color: black;
    margin-left: 4px;
  }
  
  .btn-postar {
    background-color: #f19f05 !important;
    margin-top: -10px !important;
  }
  
  .postNew img {
    max-width: 100%;
    border-radius: 8px;
    margin-top: 8px;
    height: auto;
  }
  
  .button-edit-delete {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  </style>
  