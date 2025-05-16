import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../Recipe';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, AfterViewInit {
  recipes: Recipe[] = [];
  selected: Boolean = false;
  selectedRecipe: Recipe | null = null;
  @ViewChild('ingredientChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((data: Recipe[]) => {
      this.recipes = data.map((recipe) => ({
        ...recipe,
        ingredientCount: recipe.ingredientes.length,
      }));

      // Create chart after recipes are loaded
      setTimeout(() => {
        this.createIngredientChart();
      });
    });
  }

  onSelect(recipe: Recipe) {
    this.selectedRecipe = recipe;
    this.selected = true;
  }

  navigateToDetail(recipeId: number): void {
    this.router.navigate(['/recipe', recipeId]);
  }

  ngAfterViewInit(): void {
    this.createIngredientChart();
  }

  createIngredientChart(): void {
    if (this.recipes.length === 0) return;

    setTimeout(() => {
      const ctx = this.chartCanvas?.nativeElement.getContext('2d');
      if (!ctx) return;

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.recipes.map(recipe => recipe.nombre),
          datasets: [{
            label: 'Cantidad de Ingredientes',
            data: this.recipes.map(recipe => recipe.ingredientes.length),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Cantidad de Ingredientes por Receta',
              font: {
                size: 16
              }
            }
          }
        }
      });
    }, 100);
  }
}
