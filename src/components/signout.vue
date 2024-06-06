<template>
  <div class="signout-container">
    <p class="signout-message">Are you sure you want to sign out?</p>
    <button @click="signOut" class="signout-button">Sign Out</button>
  </div>
</template>

<script>
import { auth } from '@/Firebase/config.js';

export default {
  name: 'SignOut',
  methods: {
    async signOut() {
      try {
        await auth.signOut();
        this.$router.push('/'); // Redirect to Home or any other page
      } catch (error) {
        console.error('Error signing out:', error.message);
      }
    }
  }
};
</script>

<style scoped>
.signout-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}

.signout-message {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}

.signout-button {
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  outline: none;
}

.signout-button:hover {
  background-color: #cc0000;
  transform: translateY(-2px);
}

.signout-button:active {
  background-color: #b30000;
  transform: translateY(0);
}
</style>
