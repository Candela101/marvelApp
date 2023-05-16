import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  title = 'Comics';
  comics: any[] = [];
  limit: number = 20;
  offset: number = 0;
  favorites: any[] = [];

  constructor(private marvelSvc: MarvelService, private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit() {

    this.getAllComics();
  }

  getAllComics() {

    this.marvelSvc.getComics(this.limit, this.offset).subscribe(data => {
      const favorites = this.localStorage.getItem('favorites') || [];

      this.comics = data.map((comic: any) => {
        comic.isFavorite = favorites.some((fav: any) => fav.id === comic.id);
        return comic;
      });
    });

  }

  getComics(id: string) {
    this.router.navigate(['/comic/', id]);
  }

  loadNextPage() {
    this.offset += this.limit;
    this.getAllComics();
  }

  loadPreviousPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.getAllComics();
    }
  }

  getCurrentPage(): number {
    return Math.floor(this.offset / this.limit) + 1;
  }

  addToFavorites(comic: any) {
    const favorites = this.localStorage.getItem('favorites') || [];
    if (favorites.findIndex((fav: any) => fav.id === comic.id) === -1) {
      favorites.push(comic);
      this.localStorage.setItem('favorites', favorites);
    }
  }

  removeFromFavorites(comic: any) {
    const favorites = this.localStorage.getItem('favorites') || [];
    const index = favorites.findIndex((fav: any) => fav.id === comic.id);
    if (index !== -1) {
      favorites.splice(index, 1);
      this.localStorage.setItem('favorites', favorites);
    }
  }

  isFavorite(comic: any): boolean {
    return this.favorites.some((fav) => fav.id === comic.id);
  }

  saveFavorite() {
    this.localStorage.setItem('favorites', this.favorites);
  }

  loadFavorites(comic: any) {
    this.favorites = this.localStorage.getItem('favorites') || [];
  }

  toggleFavorite(comic: any) {
    comic.isFavorite = !comic.isFavorite;
    if (comic.isFavorite) {
      this.addToFavorites(comic);
    } else {
      this.removeFromFavorites(comic);
    }
  }
}
