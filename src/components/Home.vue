<template>
  <div class="home">
    <nav class="navbar">
      <router-link to="/profile" class="nav-link">Profile</router-link>
      <router-link to="/add" class="nav-link">New Discussion</router-link>
    </nav>
    
    <div class="categories">
      <div 
        v-for="category in categories" 
        :key="category.id" 
        class="category"
      >
        <div @click="toggleDescription(category.id)" class="category-name">
          {{ category.name }}
        </div>
        <div v-if="category.showDescription" class="category-description">
          <p>{{ category.description }}</p>
          <button @click="editCategory(category)">Edit</button>
          <button @click="deleteCategory(category.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { projectFirestore } from '@/Firebase/config.js';

export default {
  name: 'Home',
  data() {
    return {
      categories: []
    };
  },
  async mounted() {
    try {
      let categoriesRes = await projectFirestore.collection('categories').get();
      this.categories = categoriesRes.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        showDescription: false // Initially hide all descriptions
      }));
    } catch (err) {
      console.error(err.message);
    }
  },
  methods: {
    toggleDescription(id) {
      this.categories = this.categories.map(category => 
        category.id === id 
          ? { ...category, showDescription: !category.showDescription } 
          : category
      );
    },
    async deleteCategory(id) {
      try {
        await projectFirestore.collection('categories').doc(id).delete();
        this.categories = this.categories.filter(category => category.id !== id);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    },
    editCategory(category) {
      this.$router.push({ name: 'EditCategory', params: { id: category.id} });
    }
  }
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
  cursor: pointer;
}

.category-description {
  font-size: 16px;
  color: #555;
}

button {
  padding: 10px 15px;
  margin: 5px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #555;
  color: #fff;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #444;
}
</style>
