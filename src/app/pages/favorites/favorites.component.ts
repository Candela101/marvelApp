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

  getComics(id: string) {
    this.router.navigate(['/comic/', id]);
  }

  loadFavorites() {
    this.favorites = this.localStorage.getItem('favorites') || [];
    this.favorites.forEach((item) => {
      if (item.isFavorite === undefined) {
        item.isFavorite = true;
      }
    });
  }

  removeFavorite(item: any) {
    const index = this.favorites.findIndex((fav) => fav.id === item.id);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      item.isFavorite = false;
      this.saveFavorites();
    }
  }

  saveFavorites() {
    this.localStorage.setItem('favorites', this.favorites);
  }

  toggleFavorite(item: any) {
    item.isFavorite = !item.isFavorite;
    if (item.isFavorite) {
      this.favorites.push(item);
    } else {
      const index = this.favorites.findIndex((fav) => fav.id === item.id);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      }
    }
    this.saveFavorites();
  }
}
