import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, concat, map, of, switchMap } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  title: string = 'Characters';
  characters: any[] = [];
  searchQuery: string = '';
  limit: number = 20;
  offset: number = 0
  favorites: any[] = [];

  constructor(private marvelService: MarvelService, private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    this.marvelService.getCharacters(this.limit, this.offset)
      .subscribe(data => {
        this.characters = data;
      });
  }
  
  getCharacter(id: string) {
    this.router.navigate(['/character/', id]);
  }

  searchCharacter() {
    if (this.searchQuery) {
      this.marvelService.getCharacterByName(this.searchQuery).subscribe(data => {
        this.characters = data;
      });
    } else {
      this.ngOnInit();
    }
  }
    
  loadNextPage() {
    this.offset += this.limit;
    this.getCharacters();
  }

  loadPreviousPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.getCharacters();
    }
  }

  getCurrentPage(): number {
    return Math.floor(this.offset / this.limit) + 1;
  }

  addToFavorites(character: any) {
    if (!this.isFavorite(character)) {
      this.favorites.push(character);
      this.saveFavorites();
    }
  }

  removeFromFavorites(character: any) {
    const index = this.favorites.findIndex((fav) => fav.id === character.id);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
    }
  }

  isFavorite(character: any): boolean {
    return this.favorites.some((fav) => fav.id === character.id);
  }

  saveFavorites() {
    this.localStorage.setItem('favorites', this.favorites);
  }

  loadFavorites() {
    this.favorites = this.localStorage.getItem('favorites') || [];
  }
}
