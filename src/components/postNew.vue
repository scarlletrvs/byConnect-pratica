<template>
    <div class="postNew">
      <h3>Faça uma nova postagem!</h3>
      <v-text-field v-model="newPostText" placeholder="Digite aqui!" solo hiden-details></v-text-field>
      <div class="buttons-post">
        <v-file-input 
        class="btn-camera"
        accept="image/png, image/jpeg, image/bmp"
        v-model="imagePost"
        @change="onImageChange"
        :prepend-icon="'mdi-camera'"
      ></v-file-input>
      <v-btn @click="newPost" class="btn-postar">Postar</v-btn>
      </div>
     
     
    </div>
  </template>
  
  <style>
  .postNew {
    background-color: #cccccc;
    padding: 6px;
    width: 98%;
    flex-direction: column;
    border-radius: 15px;
  }
  .postNew h3 {
    font-size: 14px;
    color: black;
    margin-left: 4px;
  }
  .btn-postar {
    background-color: #f19f05 !important;
    margin-top: -8px !important;
  }
  .buttons-post{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .btn-camera{
    margin-top: -12px !important;
    margin-left: 6px;
    
  }
   .btn-camera .v-icon {
  color: rgb(11, 11, 11);
  font-size: 2.6rem;
  transition: color 0.3s;
}
  </style>
  
  <script>
  import { v4 as uuidv4 } from "uuid";
  
  export default {
    data() {
      return {
        newPostText: "",
        imagePost: null,
      };
    },
    methods: {
  newPost() {
    if (this.newPostText.trim() === "" && !this.imagePost) {
      return;
    }

    const post = {
      
      id: uuidv4(),
      text: this.newPostText,
      imagePost: this.imagePost
    };
    
    this.$emit("post-new", post);
    
    if (this.newPostText.trim() !== "") {
      this.newPostText = "";
    }

    if (this.imagePost) {
      this.imagePost = null;
    }
    console.log(post);
  },
  onImageChange() {
    const conversor = new FileReader();
      const imagem = this.imagePost;
        conversor.readAsDataURL(imagem);
        conversor.onload = () => {
          this.imagePost = conversor.result;
          
        }; 
        console.log(this.imagePost)
    },
},


    props: {
     dadosPost: Object,
    
      
      
    },
  };
  </script>
  