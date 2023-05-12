import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  title: string = 'Characters';
  characters?: Observable<any>;
  searchQuery: string = '';

  constructor(private marvelService: MarvelService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.characters = this.marvelService.getCharacters();
  }

  getCharacter(id: string) {
    this.router.navigate(['/character/', id]);
  }

  searchCharacter() {
    if (this.searchQuery) {
      this.marvelService.getCharacterByName(this.searchQuery).subscribe(data => {
        this.characters = of(data);
      });
    } else {
      this.ngOnInit();
    }
  }
}
