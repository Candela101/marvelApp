import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';
import { CharacterComponent } from './pages/character/character.component';
import { ComicsComponent } from './pages/comics/comics.component';
import { ComicComponent } from './pages/comic/comic.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

const routes: Routes = [
  {path:'characters', component:CharactersComponent},
  {path:'character/:id', component:CharacterComponent},
  {path:'comics', component:ComicsComponent},
  {path:'comic/:id', component:ComicComponent},
  {path: 'favorites', component: FavoritesComponent},

  {path:'', pathMatch:'full', redirectTo:'/characters'},
  {path:'**', pathMatch:'full', redirectTo:'/characters'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
