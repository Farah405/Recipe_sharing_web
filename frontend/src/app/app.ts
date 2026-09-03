import { Component, OnInit, signal } from '@angular/core';
import { RecipeService } from './services/recipe';
import { Recipe } from './models/recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('Recipe Sharing');

  recipes: Recipe[] = [];

  isEditing = false;
  editingId = '';

  recipeForm: Recipe = {
    title: '',
    description: '',
    ingredients: [],
    instructions: '',
    category: ''
  };

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe({
      next: (response) => {
        this.recipes = response.recipes;
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }

  addRecipe(): void {
    this.recipeService.createRecipe(this.recipeForm).subscribe({
      next: () => {
        this.resetForm();
        this.loadRecipes();
      },
      error: (error) => {
        console.error('Create Error:', error);
      }
    });
  }

  editRecipe(recipe: Recipe): void {
    this.isEditing = true;
    this.editingId = recipe._id || '';

    this.recipeForm = {
      title: recipe.title,
      description: recipe.description,
      ingredients: [...recipe.ingredients],
      instructions: recipe.instructions,
      category: recipe.category
    };
  }

  updateRecipe(): void {
    if (!this.editingId) return;

    this.recipeService.updateRecipe(
      this.editingId,
      this.recipeForm
    ).subscribe({
      next: () => {
        this.resetForm();
        this.loadRecipes();
      },
      error: (error) => {
        console.error('Update Error:', error);
      }
    });
  }

  deleteRecipe(id: string): void {
    if (!confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        this.loadRecipes();
      },
      error: (error) => {
        console.error('Delete Error:', error);
      }
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingId = '';

    this.recipeForm = {
      title: '',
      description: '',
      ingredients: [],
      instructions: '',
      category: ''
    };
  }

  updateIngredients(value: string): void {
    this.recipeForm.ingredients = value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }
}
