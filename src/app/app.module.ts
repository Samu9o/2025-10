import { NgModule } from '@angular/core';

import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RecipeRoutingModule } from './recipe/recipe.routing';
import { AppComponent } from './app.component';
import { RecipeModule } from './recipe/recipe.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RecipeModule, HttpClientModule, RecipeRoutingModule,
    ],
  providers: [RecipeModule, provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
