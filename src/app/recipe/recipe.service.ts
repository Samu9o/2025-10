import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Recipe } from './Recipe';
import { recipeData } from './recipeData';

@Injectable({
 providedIn: 'root'
})
export class RecipeService {

constructor(private http: HttpClient) { }

getRecipes(): Observable<Recipe[]> {
 return of(recipeData);
}

getRecipeById(id: number): Observable<Recipe | undefined> {
 const recipe = recipeData.find((r) => r.id === id);
 return of(recipe);
}
}
