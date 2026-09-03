import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = '/api/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<{ count: number; recipes: Recipe[] }> {
    return this.http.get<{ count: number; recipes: Recipe[] }>(this.apiUrl);
  }

  createRecipe(recipe: Recipe): Observable<{ message: string; recipe: Recipe }> {
    return this.http.post<{ message: string; recipe: Recipe }>(
      this.apiUrl,
      recipe
    );
  }

  updateRecipe(
    id: string,
    recipe: Partial<Recipe>
  ): Observable<{ message: string; recipe: Recipe }> {
    return this.http.put<{ message: string; recipe: Recipe }>(
      `${this.apiUrl}/${id}`,
      recipe
    );
  }

  deleteRecipe(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/${id}`
    );
  }
}
