<template>
  <div class="container">
    <nav class="navbar professional">
      <p @click="make_login" :class="{ 'active': login }">Login</p>
      <p @click="make_signup" :class="{ 'active': !login }">Sign Up</p>
    </nav>
    <div class="form-container">
      <Login v-if="login" />
      <Signin v-else />
    </div>
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
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333; /* Dark background color */
  padding: 10px;
  position: fixed; /* Add this line */
  top: 0; /* Add this line */
  left: 0; /* Add this line */
  width: 100%; /* Add this line (optional) */
}


.navbar p {
  color: #fff; /* White text color */
  margin: 0 20px;
  cursor: pointer;
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  transition: all 0.3s ease-in-out;
}

.navbar p:hover {
  opacity: 0.8;
}

.active {
  font-weight: bold;
}

.professional p:first-child {
  margin-left: 0;
}

.professional p:last-child {
  margin-right: 0;
}

.form-container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

/* Additional styles for responsiveness */
@media screen and (max-width: 600px) {
  .navbar p {
    margin: 0 10px;
  }
}
</style>
