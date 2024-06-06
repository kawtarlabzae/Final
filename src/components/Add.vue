<template>
    <form @submit.prevent="Add" class="generic-form">
      <h2>Add a New Item</h2>
      <table class="centered-table">
        <tr>
          <td>Enter Item Name</td>
          <td>
            <input type="text" v-model="itemName" class="input-field" @input="fetchRecommendations">
            <div v-if="recommendations.length">
              <p>Recommendations:<i>(Case Sensitive)</i></p>
              <ul>
                <li v-for="recommendation in recommendations" :key="recommendation">{{ recommendation }}</li>
              </ul>
            </div>
          </td>
        </tr>
        <tr>
          <td>Give a Brief Description</td>
          <td><input type="text" v-model="description" class="input-field"></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button type="submit" class="submit-button">Submit</button>
          </td>
          <td></td>
          <td>
            <button @click="goHome" class="submit-button">Go to Home</button>
          </td>
        </tr>
      </table>
    </form>
  </template>
<script>
import { projectFirestore } from '@/Firebase/config';
import firebase from 'firebase/app';

export default {
  data() {
    return {
      itemName: "",
      description: "",
      recommendations: []
    };
  },
  methods: {
    goHome() {
      this.$router.push('/home');
    },
    async fetchRecommendations() {
      if (!this.itemName) return;
      try {
        let querySnapshot = await projectFirestore.collection('categories').get();
        let allItems = querySnapshot.docs.map(doc => doc.data().name);
        let lowerCaseItemName = this.itemName.toLowerCase();
        this.recommendations = allItems.filter(name => name.toLowerCase().includes(lowerCaseItemName));
      } catch (error) {
        console.error('Error fetching recommendations: ', error);
      }
    },
    async Add() {
      if (!this.itemName || !this.description) {
        alert('Please fill in both the item name and description.');
        return;
      }
      try {
        let querySnapshot = await projectFirestore.collection('categories').where('name', '==', this.itemName).get();
        const newItem = {
          name: this.itemName,
          description: this.description
        };

        if (querySnapshot.empty) {
          // The category does not exist, create it
          await projectFirestore.collection('categories').add(newItem);
          console.log("Item created successfully.");
        } else {
          console.log("Item already exists.");
        }
        this.goHome();
      } catch (error) {
        console.error('Error adding item: ', error);
      }
    }
  }
};
</script>  
<style scoped>
.generic-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.centered-table {
  margin: 0 auto;
  border-collapse: collapse;
  width: 100%;
}

.centered-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

h2 {
  color: #333;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 8px;
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
}

.submit-button:hover {
  background-color: #444;
}
</style>
