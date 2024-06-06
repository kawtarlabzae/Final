<template>
  <div class="container">
    <header class="header">
      <div class="logo">Cook with ease</div>
      <nav class="navbar professional">
        <router-link to="/profile" class="nav-link">Profile</router-link>
        <router-link to="/signout" class="nav-link">Sign out</router-link>
      </nav>
    </header>
    <div class="content">
      <div class="categories">
        <div v-for="category in categories" :key="category.id" class="category">
          <div @click="recipes(category.id)" class="category-name">{{ category.nom }}</div>
        </div>
      </div>
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
import { projectFirestore } from '@/Firebase/config.js';

export default {
  name: 'Home',
  data() {
    return {
      categories: [],
    };
  },
  async mounted() {
    try {
      let categoriesRes = await projectFirestore.collection('categories').get();
      this.categories = categoriesRes.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
    } catch (err) {
      console.error(err.message);
    }
  },
  methods: {
    recipes(id) {
      this.$router.push({ name: 'Recipe', params: { id: id } });
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0a521a;
  padding: 10px 20px;
  width: 100%;
}

.logo {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.navbar {
  display: flex;
}

.navbar .nav-link {
  color: #fff;
  margin: 0 20px;
  cursor: pointer;
  font-size: 18px;
  text-decoration: none;
  transition: opacity 0.3s ease-in-out;
}

.navbar .nav-link:hover {
  opacity: 0.8;
}

.content {
  flex: 1;
  padding: 20px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category {
  flex: 1 1 300px;
  padding: 15px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, background-color 0.3s;
  cursor: pointer;
}

.category:hover {
  transform: scale(1.05);
  background-color: #fafafa;
}

.category-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.footer {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: auto; /* Ensures footer is at the bottom */
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-link {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: opacity 0.3s ease-in-out;
}

.footer-link:hover {
  opacity: 0.8;
}

/* Additional styles for responsiveness */
@media screen and (max-width: 600px) {
  .navbar .nav-link {
    margin: 0 10px;
  }

  .footer-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
