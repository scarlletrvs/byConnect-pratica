import {
  createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from "firebase/auth";
  import Vue from "vue";
  import Vuex from "vuex";
  import { auth } from "../configuracao/index"; 
  import router from "../routers/router";
  import { collection, query, where, getDocs, doc, setDoc, deleteDoc} from "firebase/firestore";
  import { db } from "../configuracao/index.js";
  Vue.use(Vuex);
  
  const store = new Vuex.Store({
    state: {
      emailExists: null,
      userName: '',
      user: '',
      userProfile: '',
      usernameProfile:[],
      posts:[

      ]
      , postsFilter:[

      ],
      users:[

      ],
     
    },
    mutations: {
      SET_USER(state, user) {
        state.user = user;
        console.log(state.user)
      }, 
      SET_USER_PROFILE(state, email) {
        state.userProfile = email;
        console.log("teste 2", state.userProfile )
      },
      SET_USER_NAME_PROFILE(state, userName) {
        state.usernameProfile = userName;
        console.log("teste3",state.usernameProfile)
      
      },
    
      CLEAR_USER(state) {
        state.user = null;
       
      },
      ADD_POST(state, post){
         state.posts.push(post);
      
      },
      DELETE_POST(state, id){
        state.posts = state.posts.filter(post=>post.id !== id)
      },
      SET_USER_NAME(state, userName) {
        state.userName = userName;
      
      },
      SET_POSTS(state, posts) {
        state.posts = posts;
      },
      SET_POSTS_FILTER(state, postsFilter) {
       state.postsFilter= postsFilter;
      },
      EDIT_POST(state, { postId, newText }) {
        const index = state.posts.findIndex(post => post.id === postId);
        if (index !== -1) {
          state.postsFilter[index].text = newText;
        }
      },
      SET_USERS(state, users) {
        state.users = users.map(user => ({ username: user.username, email: user.email }));
        console.log("usuarios", state.users);
      },
   
      
      
    },
    actions: {
      async login({ commit }, details) {
        const email = details.email || "";
        const password = details.password || ""; 
        try {
          await signInWithEmailAndPassword(auth, email, password); 
          console.log("auth register", auth.currentUser);
          commit("SET_USER", auth.currentUser);
          router.push("/" );
        } catch (error) {
          console.error("Erro durante o login:", error);
          if (error.code === "auth/invalid-login-credentials") {
            alert("As credenciais de email e senha estão incorretas!");
          } else {
            alert(error.message);
          }
        }
      },
      
      async logout({commit}){
      await  signOut(auth);

      commit("CLEAR_USER");
      router.go(0); 
      },

      async register({ commit }, details) {
        try {
          const email = details.email;
          const password = details.password;
      
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
          const user = userCredential.user;
      
          const usersCollection = doc(db, "Users", user.email);
          const docRef = await setDoc(usersCollection, details);
      
          console.log("Documento adicionado com ID:", docRef);
          
          commit("SET_USER", user);
           router.go(0); 
        
        } catch (error) {
          console.log("Não foi possível fazer o cadastro!", error.message);
        }
      }, 
      async armazenarPosts({commit}, post){

        try{
          const postsCollection = doc(db, "Posts", post.id);
           await setDoc(postsCollection, post);
           commit("ADD_POST", post);
          
        }catch(error){
          console.log(error);
        }
     
       console.log(post)
      },
     async fetchUserNameByEmail({ commit }, postEmail) {
    try {
      const q = query(collection(db, 'Users'), where('email', '==', postEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        commit('SET_USER_NAME', userData.username);
        console.log("nome", userData.username);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },

  async fetchUserprofile({ commit }, ) {
    try {
      const email = this.state.userProfile;
  
      // Obter a referência do documento do usuário
      const q = query(collection(db, 'Posts'), where('email', '==', email));
      const userDocSnapshot = await getDocs(q);

  
      if (userDocSnapshot.exists()) {
        // Se o usuário existe, obter o nome de usuário
        const userData = userDocSnapshot.data();
    
  
        // Enviar o nome de usuário via commit
        commit('SET_USER_NAME_PROFILE', userData);
        console.log("Nome de usuário recuperado:", userData);
      } 
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  },
  
  
  
  async fetchPosts({ commit }) {
    try {
      const q = query(collection(db, 'Posts'));
      const querySnapshot = await getDocs(q);

      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });

      commit('SET_POSTS', posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  },
  async deletePost({ commit }, postId) {
    try {
      const postRef = doc(db, 'Posts', postId);
      
      await deleteDoc(postRef);

      commit('DELETE_POST', postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  },
  async editPost({ commit }, { postId, newText }) {
    try {
      const postRef = doc(db, 'Posts', postId);
      await setDoc(postRef, { text: newText }, { merge: true });
      commit('EDIT_POST', { postId, newText });
    } catch (error) {
      console.error('Error editing post:', error);
    }
  },
  async fetchPostsForUser({ commit }, postEmail) {
    try {
      const q = query(collection(db, 'Posts'), where('email', '==', postEmail));
      const querySnapshot = await getDocs(q);

      const postsFilter = [];
      querySnapshot.forEach((doc) => {
        postsFilter.push(doc.data());
      });

      console.log('Posts recuperados para o usuário:', postsFilter);

      commit('SET_POSTS_FILTER', postsFilter);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  },
  async fetchUsers({ commit }) {
    try {
      const q = query(collection(db, 'Users'));
      const querySnapshot = await getDocs(q);

      const users = [];
      querySnapshot.forEach((doc) => {
      users.push(doc.data());
      });

      commit('SET_USERS', users);
     
     
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },

  
  async fetchUser({ commit }) {
    auth.onAuthStateChanged(async (user) => {
      if (user === null) {
        commit("CLEAR_USER");
      } else {
        commit("SET_USER", user);
        console.log("teste", user);

        const email = user.email;
        commit("SET_USER_PROFILE", email);         

        if (router.currentRoute.name === "login") {
          router.push("/");
        }
      }
    });
  },



},         
    
  });

 
  export { store };
  