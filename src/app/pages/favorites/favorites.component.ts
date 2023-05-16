import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{

  favorites: any[] = [];

  constructor(private marvelService: MarvelService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  getCharacter(id: string) {
    this.router.navigate(['/character/', id]);
  }

  loadFavorites() {
    this.favorites = this.localStorage.getItem('favorites') || [];
  }

  removeFavorite(character: any) {
    const index = this.favorites.findIndex((fav) => fav.id === character.id);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
    }
  }

  saveFavorites() {
    this.localStorage.setItem('favorites', this.favorites);
  }
}
