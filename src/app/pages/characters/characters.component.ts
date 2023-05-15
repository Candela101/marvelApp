import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, concat, map, of, switchMap } from 'rxjs';
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

  constructor(private marvelService: MarvelService, private router: Router) { }

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
}
