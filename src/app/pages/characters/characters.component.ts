import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.marvelService.getCharacters(this.limit, this.offset).subscribe((data) => {
      const favorites = this.localStorage.getItem('favorites') || [];

      this.characters = data.map((character: any) => {
        character.isFavorite = favorites.some((fav: any) => fav.id === character.id);
        return character;
      });
    });
  }


  getCharacter(id: string) {
    this.router.navigate(['/character/', id]);
  }

  searchCharacter() {
    if (this.searchQuery) {
      this.marvelService.getCharacterByName(this.searchQuery).subscribe((data) => {
        const favorites = this.localStorage.getItem('favorites') || [];

        this.characters = data.map((character) => {
          character.isFavorite = favorites.some((fav: any) => fav.id === character.id);
          return character;
        });
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
    const favorites = this.localStorage.getItem('favorites') || [];
    if (favorites.findIndex((fav: any) => fav.id === character.id) === -1) {
      favorites.push(character);
      this.localStorage.setItem('favorites', favorites);
    }
  }

  removeFromFavorites(character: any) {
    const favorites = this.localStorage.getItem('favorites') || [];
    const index = favorites.findIndex((fav: any) => fav.id === character.id);
    if (index !== -1) {
      favorites.splice(index, 1);
      this.localStorage.setItem('favorites', favorites);
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

  toggleFavorite(character: any) {
    character.isFavorite = !character.isFavorite;
    if (character.isFavorite) {
      this.addToFavorites(character);
    } else {
      this.removeFromFavorites(character);
    }
  }

}
