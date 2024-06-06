<template>
    <div class="edit-category">
      <h2>Edit Category</h2>
      <form @submit.prevent="updateCategory">
        <div>
          <label for="name">Category Name:</label>
          <input type="text" v-model="category.name" id="name" class="input-field">
        </div>
        <div>
          <label for="description">Description:</label>
          <input type="text" v-model="category.description" id="description" class="input-field">
        </div>
        <button type="submit" class="submit-button">Save Changes</button>
        <button @click="goBack" class="submit-button">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from '@/Firebase/config.js';

export default {
  name: 'EditCategory',
  data() {
    return {
      category: {
        id: this.$route.params.id,
        name: '',
        description: ''
      }
    };
  },
  async beforeMount() {
    try {
      const categoryDoc = await projectFirestore.collection('categories').doc(this.category.id).get();
      if (categoryDoc.exists) {
        const categoryData = categoryDoc.data();
        this.category.name = categoryData.name;
        this.category.description = categoryData.description;
      } else {
        console.error('Category not found');
      }
    } catch (error) {
      console.error('Error fetching category details:', error);
    }
  },
  methods: {
    async updateCategory() {
      try {
        const categoryRef = projectFirestore.collection('categories').doc(this.category.id);
        await categoryRef.update({
          name: this.category.name,
          description: this.category.description
        });
        console.log('Category updated successfully');
        this.$router.push('/home');
      } catch (error) {
        console.error('Error updating category:', error);
      }
    },
    goBack() {
      this.$router.push('/home');
    }
  }
};

  </script>
  
  <style scoped>
  .edit-category {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f7f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .input-field {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #eaeaea;
  }
  
  .input-field:focus {
    border-color: #888;
    background-color: #fff;
  }
  
  .submit-button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #555;
    color: #fff;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-right: 10px;
  }
  
  .submit-button:hover {
    background-color: #444;
  }
  </style>
  