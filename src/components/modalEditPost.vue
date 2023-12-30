<template>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Edite seu post
        </v-card-title>
        <v-card-text>
          <v-textarea v-model="textEditPost" label="Texto do post"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog" color="primary">Cancelar</v-btn>
          <v-btn @click="savePost" color="success">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
        textEditPost: "",
      };
    },
    watch: {
    show(newVal) {
      if (newVal) {
        this.textEditPost = this.initialText;
      }
    },
  },
    methods: {
      openDialog() {
        try {
          this.dialog = true;
          this.textEditPost = "";
          console.log("Modal aberto");
        } catch (error) {
          console.log("Erro ao tentar abrir modal", error);
        }
      },
      closeDialog() {
        this.dialog = false;
      },
      savePost() {
        this.$emit("save-post", this.textEditPost);
      this.closeDialog();
      },
    },
  };
  </script>
  
  <style scoped>
  .v-dialog--active {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  </style>
  