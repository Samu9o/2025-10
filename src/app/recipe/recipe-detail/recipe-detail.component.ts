import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../Recipe';
import { IngredientModule } from '../../ingredient/ingredient.module';
import { Ingredient } from '../../ingredient/Ingredient';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  standalone: true,
  imports: [CommonModule, IngredientModule],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;
  maxIngredient: { name: string; quantity: number } | null = null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService
        .getRecipeById(+id)
        .subscribe((data: Recipe | undefined) => {
          if (data) {
            this.recipe = data;
            if (this.recipe.ingredientes) {
              const maxIngredient = this.recipe.ingredientes.reduce(
                (max: Ingredient, ingredient: Ingredient) => {
                  const ingredientQuantity = parseFloat(ingredient.cantidad);
                  const maxQuantity = parseFloat(max.cantidad);
                  return ingredientQuantity > maxQuantity ? ingredient : max;
                },
                this.recipe.ingredientes[0]
              );
              this.maxIngredient = {
                name: maxIngredient.nombre,
                quantity: parseFloat(maxIngredient.cantidad),
              };
            }
          } else {
            console.error('Recipe not found');
          }
        });
    }
  }

  navigateToList(): void {
    this.router.navigate(['/recipe']);
  }
}
