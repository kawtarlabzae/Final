<template>
  <div class="edit-recipe">
    <h2>Edit Recipe</h2>
    <form @submit.prevent="updateRecipe">
      <div>
        <label for="name">Recipe Name:</label>
        <input type="text" v-model="recipe.nom" id="name" class="input-field">
      </div>
      <div>
        <label for="description">Description:</label>
        <input type="text" v-model="recipe.description" id="description" class="input-field">
      </div>
      <div>
        <label for="ingredients">Ingredients:</label>
        <textarea v-model="ingredientInput" id="ingredients" class="input-field" placeholder="Enter ingredients"></textarea>
        <button @click.prevent="addIngredient" class="add-button">Add Ingredient</button>
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            {{ ingredient.nom }}: {{ ingredient.quantité }} {{ ingredient.unité }}
            <button @click.prevent="removeIngredient(index)" class="remove-button">Remove</button>
          </li>
        </ul>
      </div>
      <div>
        <label for="instructions">Instructions:</label>
        <textarea v-model="instructionInput" id="instructions" class="input-field" placeholder="Enter instructions"></textarea>
        <button @click.prevent="addInstruction" class="add-button">Add Instruction</button>
        <ol>
          <li v-for="(instruction, index) in recipe.instructions" :key="index">
            {{ instruction }}
            <button @click.prevent="removeInstruction(index)" class="remove-button">Remove</button>
          </li>
        </ol>
      </div>
      <div>
        <label for="prepTime">Preparation Time (minutes):</label>
        <input type="number" v-model.number="recipe.temps_preparation" id="prepTime" class="input-field">
      </div>
      <div>
        <label for="cookTime">Cooking Time (minutes):</label>
        <input type="number" v-model.number="recipe.temps_cuisson" id="cookTime" class="input-field">
      </div>
      
      <div>
        <label for="servings">Servings:</label>
        <input type="number" v-model.number="recipe.portions" id="servings" class="input-field">
      </div>
      <div>
        <label for="tags">Tags:</label>
        <input type="text" v-model="tagInput" id="tags" class="input-field" placeholder="Enter tags">
        <button @click.prevent="addTag" class="add-button">Add Tag</button>
        <ul>
          <li v-for="(tag, index) in recipe.tags" :key="index">
            {{ tag }}
            <button @click.prevent="removeTag(index)" class="remove-button">Remove</button>
          </li>
        </ul>
      </div>
      <div>
        <label for="image">Image URL:</label>
        <input type="text" v-model="recipe.image" id="image" class="input-field">
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
      catid: this.$route.params.catid,
      recipe: {
        nom: this.$route.params.id,
        description: '',
        ingredients: [],
        instructions: [],
        temps_preparation: 0,
        temps_cuisson: 0,
        regime: '',
        portions: 0,
        tags: [],
        image: ''
      },
      ingredientInput: '',
      instructionInput: '',
      tagInput: ''
    };
  },
  async beforeMount() {
    console.log(this.catid)
    try {

      // Fetch category document from Firestore
      const categoryDoc = await projectFirestore.collection('categories').doc(this.catid).get();
      if (categoryDoc.exists) {

        const categoryData = categoryDoc.data();
        // Find the specific recipe within the category
        const recipe = categoryData.recettes.find(rec => rec.nom === this.recipe.nom);
        console.log(recipe.description)
        if (recipe) {
          this.recipe = { ...recipe };
        } else {
          console.error('Recipe not found');
        }
      } else {
        console.error('Category not found');
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  },
  methods: {
    async updateRecipe() {
      try {
        // Update the specific recipe within the category
        const categoryDoc = await projectFirestore.collection('categories').doc(this.catid).get();
        if (categoryDoc.exists) {
          const categoryData = categoryDoc.data();
          const recipeIndex = categoryData.recettes.findIndex(rec => rec.nom === this.recipe.nom);
          if (recipeIndex !== -1) {
            categoryData.recettes[recipeIndex] = { ...this.recipe };
            await projectFirestore.collection('categories').doc(this.catid).update(categoryData);
            console.log('Recipe updated successfully');
            this.$router.push(`/recipe/${this.catid}`); // Navigate to the recipes page after updating
          } else {
            console.error('Recipe not found in category');
          }
        } else {
          console.error('Category not found');
        }
      } catch (error) {
        console.error('Error updating recipe:', error);
      }
    },
    goBack() {
      this.$router.push(`/recipe/${this.catid}`);
    },
    addIngredient() {
      if (this.ingredientInput.trim() !== '') {
        const [nom, quantité, unité] = this.ingredientInput.split(':').map(str => str.trim());
        this.recipe.ingredients.push({ nom, quantité, unité });
        this.ingredientInput = '';
      }
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    addInstruction() {
      if (this.instructionInput.trim() !== '') {
        this.recipe.instructions.push(this.instructionInput.trim());
        this.instructionInput = '';
      }
    },
    removeInstruction(index) {
      this.recipe.instructions.splice(index, 1);
    },
    addTag() {
      if (this.tagInput.trim() !== '') {
        this.recipe.tags.push(this.tagInput.trim());
        this.tagInput = '';
      }
    },
    removeTag(index) {
      this.recipe.tags.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.edit-recipe {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-field {
  width: calc(100% - 100px); /* Adjust based on button width */
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

.add-button {
  padding: 6px 10px;
  font-size: 14px; /* Adjust font size as needed */
  cursor: pointer;
  background-color: #00ff62;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #00b32a;
}

.remove-button {
  padding: 4px 8px;
  font-size: 12px; /* Adjust font size as needed */
  cursor: pointer;
  background-color: #dc9135;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-left: 5px;
}

.remove-button:hover {
  background-color: #c85423;
}

.submit-button {
  padding: 8px 15px;
  font-size: 14px; /* Adjust font size as needed */
  cursor: pointer;
  background-color: #246734;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #153e1e;
}
</style>
