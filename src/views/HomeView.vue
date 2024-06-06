<template>
  <div class="container">
    <header class="header">
      <div class="logo">Cook with ease</div>
      <nav class="navbar professional">
        <p @click="make_login" :class="{ 'active': login }">Login</p>
        <p @click="make_signup" :class="{ 'active': !login }">Sign Up</p>
      </nav>
    </header>
    <div class="form-container">
      <Login v-if="login" />
      <Signin v-else />
    </div>
    <footer class="footer">
      <div class="footer-links">
        <router-link to="/contact" class="footer-link">Contact</router-link>
        <router-link to="/legal" class="footer-link">Legal</router-link>
        <a href="https://www.facebook.com" target="_blank" class="footer-link">Facebook</a>
        <a href="https://www.twitter.com" target="_blank" class="footer-link">Twitter</a>
        <a href="https://www.instagram.com" target="_blank" class="footer-link">Instagram</a>
      </div>
    </footer>
  </div>
</template>

<script>
import Login from '@/components/login.vue';
import Signin from '@/components/Signin.vue';

export default {
  name: 'HomeView',
  components: {
    Login,
    Signin
  },
  data() {
    return {
      login: true
    };
  },
  methods: {
    make_login() {
      this.login = true;
    },
    make_signup() {
      this.login = false;
    }
  }
};
</script>

<style scoped>
.container {
  background-image: url('https://images.wsj.net/im-121422');
  background-size: cover;
  background-position: center;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.8); /* Add background color with opacity */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0a521a;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.logo {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.navbar {
  display: flex;
}

.navbar p {
  color: #fff;
  margin: 0 20px;
  cursor: pointer;
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  transition: opacity 0.3s ease-in-out;
}

.navbar p:hover {
  opacity: 0.8;
}

.active {
  font-weight: bold;
}

.form-container {
  display: flex;
  flex: 1;
  margin-left:38%;
  width: 20%;
  justify-content: center;
  align-items: center;
  margin-top: 100px; /* Adjust for fixed header */
  padding: 10px;
  background-color: aliceblue;
}

.footer {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: auto;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-link {
  color: #fff;
  text-decoration: none;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  transition: opacity 0.3s ease-in-out;
}

.footer-link:hover {
  opacity: 0.8;
}

/* Additional styles for responsiveness */
@media screen and (max-width: 600px) {
  .navbar p {
    margin: 0 10px;
  }

  .footer-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
