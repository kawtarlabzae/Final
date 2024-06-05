<template>
  <nav class="navbar">
    <router-link to="/profile" class="nav-link">Profile</router-link>
    <router-link to="/Add_forum" class="nav-link">New Discussion</router-link>
  </nav>
  
</template>

<script>
import { projectFirestore } from '../Firebase/config.js'

export default {
  name: 'Navbar',
  name: 'Category',
  data() {
    return {
     
    };
  },
  async mounted() {
    try {
      let categoriesRes = await projectFirestore.collection('categories').get()
      this.categories = categoriesRes.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
    } catch (err) {
      console.error(err.message)
    }
  },
  
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px;
}

.nav-link {
  color: #fff;
  margin-right: 10px;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}

.home {
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.search-bar input {
  width: 100%;
  max-width: 600px;
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 25px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-bar input:focus {
  border-color: #aaa;
  box-shadow: 0 0 5px rgba(170, 170, 170, 0.5);
  outline: none;
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
  position: relative;
  flex: 1 1 300px;
  padding: 15px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, background-color 0.3s;
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

.sub-category {
  font-size: 14px;
  padding: 5px 10px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-bottom: 5px;
  transition: background-color 0.3s;
}

.sub-category:hover {
  background-color: #ccc;
  cursor: pointer;
}

.sub-category + .sub-category {
  margin-top: 5px;
}
</style>