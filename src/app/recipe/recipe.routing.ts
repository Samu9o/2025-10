import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes: Routes = [
    {
        path: 'recipe',
        component: RecipeListComponent
    },
    {
        path: 'recipe/:id',
        component: RecipeDetailComponent
    }
];


@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class RecipeRoutingModule { }
