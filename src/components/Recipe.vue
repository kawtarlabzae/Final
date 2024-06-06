<template>
  <div class="container">
    <header class="header">
      <div class="logo">Cook with ease</div>
      <nav class="navbar">
        <router-link to="/profile" class="nav-link">Profile</router-link>
        <router-link to="/signout" class="nav-link">Sign out</router-link>
      </nav>
    </header>
    <div class="content">
      <div class="recipes">
        <h1>Recipes in Category {{ categoryName }}</h1>
        <div class="filters">
          <input type="text" v-model="searchQuery" placeholder="Search recipes by name" class="search-bar">
          <select v-model="selectedTag" class="tag-filter">
            <option value="">All Tags</option>
            <option v-for="tag in allTags" :value="tag">{{ tag }}</option>
          </select>
        </div>
        <div v-if="filteredRecipes.length === 0">
          <p>There are no recipes in this category yet.</p>
        </div>
        <div v-else class="recipe-list">
          <div v-for="recipe in filteredRecipes" :key="recipe.nom" class="recipe-card">
            <h3>{{ recipe.nom }}</h3>
            <img :src="recipe.image" alt="Image" class="recipe-image" />
            <p>{{ recipe.description }}</p>
            <h4>Ingredients:</h4>
            <div class="ingredients-list">
              <div v-for="ingredient in recipe.ingredients" :key="ingredient.nom" class="ingredient">
                <p>{{ ingredient.nom }}: {{ ingredient.quantité }} {{ ingredient.unité }}</p>
              </div>
            </div>
            <h4>Instructions:</h4>
            <div class="instructions-list">
              <div v-for="(instruction, index) in recipe.instructions" :key="index" class="instruction">
                <p>{{ instruction }}</p>
              </div>
            </div>
            <p><strong>Preparation Time:</strong> {{ recipe.temps_preparation }} minutes</p>
            <p><strong>Cooking Time:</strong> {{ recipe.temps_cuisson }} minutes</p>
            <p><strong>Servings:</strong> {{ recipe.portions }}</p>
            <p><strong>Tags:</strong> {{ recipe.tags.join(', ') }}</p>
            <div class="button-group">
              <button @click="editRecipe(recipe.nom)" class="edit-button">
                <i class="fas fa-pen"></i> Edit
              </button>
              <button @click="deleteRecipe(recipe.nom)" class="delete-button">
                <i class="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
        <button @click="toggleAddForm" class="toggle-add-form-button">
          {{ showAddForm ? 'Hide Add Form' : 'Show Add Form' }}
        </button>
        <div v-if="showAddForm" class="add-recipe">
          <h2>Add a New Recipe</h2>
          <form @submit.prevent="addRecipe">
            <label for="recipeName">Recipe Name:</label>
            <input type="text" id="recipeName" v-model="newRecipe.nom" required />
            <label for="recipeDescription">Description:</label>
            <textarea id="recipeDescription" v-model="newRecipe.description" required></textarea>
            <label for="recipeImage">Image URL:</label>
            <input type="text" id="recipeImage" v-model="newRecipe.image" required />
            <label for="recipeIngredients">Ingredients (comma-separated):</label>
            <input type="text" id="recipeIngredients" v-model="newIngredients" placeholder="name:quantity unit" required />
            <label for="recipeInstructions">Instructions (comma-separated):</label>
            <input type="text" id="recipeInstructions" v-model="newInstructions" required />
            <label for="preparationTime">Preparation Time (minutes):</label>
            <input type="number" id="preparationTime" v-model.number="newRecipe.temps_preparation" required />
            <label for="cookingTime">Cooking Time (minutes):</label>
            <input type="number" id="cookingTime" v-model.number="newRecipe.temps_cuisson" required />
            <label for="servings">Servings:</label>
            <input type="number" id="servings" v-model.number="newRecipe.portions" required />
            <label for="tags">Tags (comma-separated):</label>
            <input type="text" id="tags" v-model="newTags" required />
            <button type="submit" class="add-button">Add Recipe</button>
          </form>
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
  name: 'Recipes',
  data() {
    return {
      categoryId: this.$route.params.id,
      recipes: [],
      categoryName: '',
      showAddForm: false,
      newRecipe: {
        nom: '',
        description: '',
        image: '',
        ingredients: [],
        instructions: [],
        temps_preparation: 0,
        temps_cuisson: 0,
        regime: '',
        portions: 0,
        tags: [],
      },
      newIngredients: '',
      newInstructions: '',
      newTags: '',
      searchQuery: '',
      selectedTag: '',
    };
  },
  async mounted() {
    try {
      const categoryDoc = await projectFirestore
        .collection('categories')
        .doc(this.categoryId)
        .get();

      if (categoryDoc.exists) {
        this.categoryName = categoryDoc.data().name;
        this.recipes = categoryDoc.data().recettes || [];
      } else {
        console.error("No such category!");
      }
    } catch (err) {
      console.error(err.message);
    }
  },
  computed: {
    filteredRecipes() {
      return this.recipes.filter(recipe => 
        recipe.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedTag === '' || recipe.tags.includes(this.selectedTag))
      );
    },
    allTags() {
      const tags = new Set();
      this.recipes.forEach(recipe => {
        recipe.tags.forEach(tag => tags.add(tag));
      });
      return Array.from(tags);
    },
  },
  methods: {
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
    },
    editRecipe(recipeId) {
      this.$router.push({ name: 'EditCategory', params: { id: recipeId, catid: this.categoryId } });
    },
    async deleteRecipe(recipeId) {
      try {
        const updatedRecipes = this.recipes.filter(recipe => recipe.nom !== recipeId);
        await projectFirestore
          .collection('categories')
          .doc(this.categoryId)
          .update({ recettes: updatedRecipes });

        this.recipes = updatedRecipes;
      } catch (err) {
        console.error(err.message);
      }
    },
    async addRecipe(event) {
      event.preventDefault();
      try {
        this.newRecipe.ingredients = this.newIngredients.split(',').map(ingredient => {
          const parts = ingredient.split(':').map(part => part && part.trim());
          if (parts.length >= 2) {
            return { nom: parts[0], quantité: parseFloat(parts[1]), unité: parts[2] || '' };
          } else {
            console.error('Invalid ingredient format:', ingredient);
            return null;
          }
        }).filter(ingredient => ingredient);

        this.newRecipe.instructions = this.newInstructions.split(',').map(instruction => instruction && instruction.trim()).filter(instruction => instruction);
        this.newRecipe.tags = this.newTags.split(',').map(tag => tag && tag.trim()).filter(tag => tag);

        console.log('Adding new recipe:', this.newRecipe);

        const updatedRecipes = [...this.recipes, this.newRecipe];
        await projectFirestore
          .collection('categories')
          .doc(this.categoryId)
          .update({
            recettes: updatedRecipes
          });

        this.recipes = updatedRecipes;

        this.newRecipe = {
          nom: '',
          description: '',
          image: '',
          ingredients: [],
          instructions: [],
          temps_preparation: 0,
          temps_cuisson: 0,
          regime: '',
          portions: 0,
          tags: [],
        };
        this.newIngredients = '';
        this.newInstructions = '';
        this.newTags = '';

        this.showAddForm = false;
      } catch (err) {
        console.error('Error adding recipe:', err.message);
      }
    },
  },
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
.recipe-card {
  width: 100%; /* Add this line to set the width of a specific recipe card to 100% */
}

.container {


  display: flex;
  flex-direction: column;
  flex: 1;
}
.recipe-card {
  width: 100%; /* Ensure the recipe card takes full width of its container */
}

@media screen and (min-width: 769px) {
  .recipe-card {
    width: calc(50% - 40px); /* Increase width for larger screens */
  }
}

@media screen and (min-width: 1024px) {
  .recipe-card {
    width: calc(33.33% - 40px); /* Set a more balanced width for wider screens */
  }
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
  font-family: 'Arial', sans-serif;
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
  width :100%;
  margin: 0 auto;
}

.recipes {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 2.5em;
  text-align: center;
  color: #333;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-bar,
.tag-filter {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width:100%;
  justify-content: center;
}

.recipe-card {
  width:40%;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: calc(33% - 40px);
  margin: 10px;
  transition: transform 0.3s ease;
}

.recipe-card:hover {
  transform: translateY(-10px);
}

.recipe-card h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #007bff;
}

.recipe-image {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
}

.recipe p {
  margin: 5px 0;
  color: #555;
}

.recipe h4 {
  margin: 15px 0 10px;
  color: #444;
}

.ingredients-list,
.instructions-list {
  padding-left: 20px;
  margin-bottom: 15px;
}

.ingredient,
.instruction {
  margin-bottom: 5px;
  color: #666;
}

.button-group {
  display: flex;
  gap: 10px;
}

.edit-button,
.delete-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #ff0000;
}

.delete-button:hover {
  background-color: #cc0000;
}

.add-recipe {
  margin-top: 30px;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.add-recipe h2 {
  margin-bottom: 15px;
  text-align: center;
  color: #333;
}

.add-recipe form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.add-recipe label {
  font-weight: bold;
  color: #444;
}

.add-recipe input,
.add-recipe textarea {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.add-button {
  background-color: #28a745;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #218838;
}

.toggle-add-form-button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 20px auto;
  display: block;
}

.toggle-add-form-button:hover {
  background-color: #0056b3;
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

</style>
