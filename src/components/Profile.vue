<template>
    <div class="profile">
      <h1>User Profile</h1>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="user">
        <p><strong>Name:</strong> {{ this.userDoc.user_name }}</p>
        <p><strong>Email:</strong> {{ this.userDoc.email }}</p>
        <p><strong>Location:</strong> {{ this.userDoc.location }}</p>
      </div>
      <button @click="goHome">Go to Home</button>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from '@/Firebase/config.js';
    import { getUser } from '@/Firebase/userstate.js';

  export default {
    name: 'Profile',
    data() {
      return {
        user: null,
        userDoc: null,
      };
    },
    async beforeMount() {
        this.user = getUser();
        const id = this.user.uid;
        this.userDoc = await projectFirestore.collection('users_forum').doc(id).get();
        this.userDoc=this.userDoc.data();
        console.log(this.userDoc);
    },
    methods: {
    goHome() {
      this.$router.push('/home');
    },
}
  };
  </script>
  
  <style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.profile p {
  margin-bottom: 10px;
  font-weight: bold;
}

.profile p strong {
  margin-right: 10px;
}

.profile button {
  padding: 10px 20px;
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.profile button:hover {
  background-color: #444;
}
</style>

  